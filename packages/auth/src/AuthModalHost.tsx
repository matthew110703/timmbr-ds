import * as React from 'react';
import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import type { AuthModalBannerData, AuthModalLabels, AuthModalLegalProps, AuthOAuthProvider } from '@timmbr/ui';
import { openAuthModal, useAuthModal } from '@timmbr/hooks';
import { authApi } from './api';
import { RETURN_TO_PARAM, SIGN_IN_PARAM } from './contract/constants';
import { safeReturnTo } from './contract/returnTo';
import { resolveAuthMessages, type AuthMessagesOverrides } from './messages';
import {
  clearSession,
  getFirstName,
  loadSession,
  onAuthBroadcast,
  useSession,
  type SessionState,
} from './session';
import { useAuthFlow } from './useAuthFlow';

// The dialog (Radix, OTP input, all steps) is only downloaded once someone
// opens it, instead of on every page load.
const AuthModal = lazy(() =>
  import('@timmbr/ui/components/AuthModal/AuthModal').then((m) => ({ default: m.AuthModal }))
);

export type AuthOAuthProviderId = 'google';

export interface AuthModalHostProps {
  /** Override any of the flow's copy (errors, success step, popup messages). */
  messages?: AuthMessagesOverrides;
  /** Override the modal's own labels (see `DEFAULT_AUTH_MODAL_LABELS` in @timmbr/ui). */
  labels?: Partial<AuthModalLabels>;
  /** Site Terms / Privacy links shown under the form. */
  legal?: AuthModalLegalProps;
  /** Social sign-in providers to offer. Defaults to Google. */
  oauthProviders?: AuthOAuthProviderId[];
  /** Banner used until (or if) `GET /api/auth/banner` provides one. */
  fallbackBanner?: AuthModalBannerData;
  /**
   * Handle `?signin=1&returnTo=…` on this page: open the modal and continue to
   * `returnTo` once signed in. Protected zones redirect here. Defaults to true.
   */
  handleSignInParam?: boolean;
  /**
   * Classes for the modal dialog itself, e.g. its size:
   * `className="max-w-[960px]"` (merged with the defaults via tailwind-merge).
   */
  className?: string;
  /** Size of the social sign-in popup window. Defaults to 520×640. */
  oauthPopup?: { width?: number; height?: number };
}

const DEFAULT_LEGAL: AuthModalLegalProps = { termsUrl: '/terms', privacyUrl: '/privacy' };
const PROVIDER_NAMES: Record<AuthOAuthProviderId, string> = { google: 'Google' };

/**
 * Everything a zone needs for sign-in, in one element. Mount it once in the
 * root layout, next to `{children}` (not around it, so pages stay
 * server-rendered):
 *
 * - loads who is signed in (once per page) and keeps it in sync across tabs
 * - renders the auth modal; open it from anywhere with `openAuthModal()`
 * - handles the `?signin=1&returnTo=` redirect from protected zones
 *
 * All requests go to the shell's same-origin `/api/auth/*`; this never sees a token.
 */
export function AuthModalHost({
  messages: messageOverrides,
  labels,
  legal = DEFAULT_LEGAL,
  oauthProviders = ['google'],
  fallbackBanner,
  handleSignInParam = true,
  className,
  oauthPopup,
}: AuthModalHostProps) {
  const messages = useMemo(() => resolveAuthMessages(messageOverrides), [messageOverrides]);

  useSessionBootstrap(handleSignInParam);

  const { isOpen, close, modalOptions } = useAuthModal();
  const { user } = useSession();

  // Mount (and fetch the banner) on first open; stay mounted for the close animation.
  const [hasOpened, setHasOpened] = useState(false);
  if (isOpen && !hasOpened) setHasOpened(true);
  const banner = useAuthBanner(hasOpened, fallbackBanner);

  const flow = useAuthFlow({ onSuccess: modalOptions.onSuccess, onClose: close, messages, oauthPopup });
  const { reset, startOAuthFlow, oauthLoadingProvider, step } = flow;

  // Every open starts a fresh flow, pre-filled with this open's identifier.
  const openIdentifier = modalOptions.initialIdentifier;
  useEffect(() => {
    if (isOpen) reset(openIdentifier);
  }, [isOpen, openIdentifier, reset]);

  // Closing manually (X, overlay, Esc) stops timers/listeners immediately.
  // Leaving once signed in (success / optional password) still counts as a login.
  const handleClose = useCallback(() => {
    if (step === 'SUCCESS' || step === 'SET_PASSWORD') modalOptions.onSuccess?.();
    close();
    reset();
  }, [step, modalOptions, close, reset]);

  const providerKey = oauthProviders.join(',');
  const providers = useMemo<AuthOAuthProvider[]>(
    () =>
      (providerKey ? (providerKey.split(',') as AuthOAuthProviderId[]) : []).map((id) => ({
        id,
        name: PROVIDER_NAMES[id],
        onClick: () => startOAuthFlow(id),
        isLoading: oauthLoadingProvider === id,
      })),
    [providerKey, startOAuthFlow, oauthLoadingProvider]
  );

  if (!hasOpened) return null;

  return (
    <Suspense fallback={null}>
      <AuthModal
        isOpen={isOpen}
        onClose={handleClose}
        banner={banner ? { data: banner } : undefined}
        labels={labels}
        form={{
          step,
          isLoading: flow.isLoading,
          error: flow.error,

          identifier: flow.identifier,
          onIdentifierChange: flow.setIdentifier,
          onIdentifierSubmit: flow.handleIdentifierSubmit,
          onUsePassword: flow.handleUsePassword,

          otp: flow.otp,
          otpLength: flow.otpLength,
          onOtpChange: flow.setOtp,
          onOtpSubmit: flow.handleOtpSubmit,
          onResendOtp: flow.handleResendOtp,
          resendCountdown: flow.resendCountdown,
          destination: flow.destination,
          onEditIdentifier: flow.handleEditIdentifier,

          password: flow.password,
          onPasswordChange: flow.setPassword,
          onPasswordSubmit: flow.handlePasswordSubmit,
          onForgotPassword: flow.handleForgotPassword,

          setPasswordMode: flow.setPasswordMode,
          newPassword: flow.newPassword,
          onNewPasswordChange: flow.setNewPassword,
          confirmPassword: flow.confirmPassword,
          onConfirmPasswordChange: flow.setConfirmPassword,
          onSetPasswordSubmit: flow.handleSetPasswordSubmit,
          onSkipSetPassword: flow.handleSkipSetPassword,

          successTitle: messages.success.title(getFirstName(user)),
          successMessage: messages.success.message,
        }}
        oauth={providers.length > 0 ? { providers } : undefined}
        legal={legal}
        className={className}
      />
    </Suspense>
  );
}

// ─── Session bootstrap ───────────────────────────────────────────────────────

/** Mounted host instances: only the first one bootstraps (guards double mounts). */
let bootstrapOwners = 0;

/**
 * Loads who is signed in once per page, keeps it in sync with logins/logouts
 * in other tabs, and handles the sign-in redirect `?signin=1&returnTo=/account`.
 */
function useSessionBootstrap(handleSignInParam: boolean) {
  useEffect(() => {
    if (bootstrapOwners++ > 0) {
      return () => {
        bootstrapOwners--;
      };
    }

    void loadSession().then((session) => {
      if (handleSignInParam) handleSignInRedirect(session);
    });

    const unsubscribe = onAuthBroadcast((message) => {
      if (message.type === 'LOGIN') void loadSession();
      if (message.type === 'LOGOUT') clearSession();
    });
    return () => {
      bootstrapOwners--;
      unsubscribe();
    };
  }, [handleSignInParam]);
}

function handleSignInRedirect(session: SessionState) {
  const url = new URL(window.location.href);
  if (url.searchParams.get(SIGN_IN_PARAM) !== '1') return;

  const returnTo = safeReturnTo(url.searchParams.get(RETURN_TO_PARAM));
  url.searchParams.delete(SIGN_IN_PARAM);
  url.searchParams.delete(RETURN_TO_PARAM);
  window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);

  // `returnTo` may be another zone (a separate app), so continue with a full
  // navigation.
  const goToReturnTo = () => window.location.assign(returnTo);
  if (session.status === 'authenticated') goToReturnTo();
  else openAuthModal({ onSuccess: goToReturnTo });
}

// ─── Banner ──────────────────────────────────────────────────────────────────

// One fetch per page load, shared by every caller.
let bannerPromise: Promise<AuthModalBannerData | null> | null = null;

function loadBanner(): Promise<AuthModalBannerData | null> {
  bannerPromise ??= authApi
    .banner()
    .then((res) => res.banner)
    .catch(() => {
      bannerPromise = null; // retry on the next open
      return null;
    });
  return bannerPromise;
}

/** The modal's promo banner, fetched the first time `enabled` is true (first open). */
function useAuthBanner(
  enabled: boolean,
  fallback: AuthModalBannerData | undefined
): AuthModalBannerData | undefined {
  const [banner, setBanner] = useState<AuthModalBannerData | undefined>(fallback);

  useEffect(() => {
    if (!enabled) return;
    let active = true;
    loadBanner().then((data) => {
      if (active && data) setBanner(data);
    });
    return () => {
      active = false;
    };
  }, [enabled]);

  return banner;
}

/** Test helper. */
export function __resetAuthModalHostForTests() {
  bootstrapOwners = 0;
  bannerPromise = null;
}
