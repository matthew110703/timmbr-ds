import { useCallback, useEffect, useRef, useState } from "react";
import type { AuthModalSetPasswordMode, AuthModalStep } from "@timmbr/ui";
import { isApiError } from "@timmbr/utils";
import { authApi } from "./api";
import type { OtpIntent, SignInResult } from "./contract/types";
import { authErrorMessage } from "./errors";
import { DEFAULT_AUTH_MESSAGES, type AuthMessages } from "./messages";
import { broadcastAuth, loadSession, setSignedIn } from "./session";
import {
  isOAuthResultMessage,
  OAUTH_CHANNEL_NAME,
  type OAuthResultMessage,
} from "./contract/oauth";

/** How long the SUCCESS step stays visible before the modal closes. */
const SUCCESS_CLOSE_DELAY_MS = 1200;
const DEFAULT_OTP_LENGTH = 6;

/** Default size of the social sign-in popup window. */
export const DEFAULT_OAUTH_POPUP = { width: 520, height: 640 };

export interface UseAuthFlowOptions {
  onSuccess?: () => void;
  onClose?: () => void;
  /** Error copy (API errors, popup blocked / cancelled). Defaults to English. */
  messages?: Pick<AuthMessages, "errors" | "oauthCallback">;
  /** Size of the social sign-in popup window (not the modal). */
  oauthPopup?: { width?: number; height?: number };
}

/**
 * State machine behind the storefront auth modal:
 *
 *   IDENTIFIER ─ Continue ──────────────▶ OTP ──┬─▶ SET_PASSWORD (new account, skippable)
 *       │                                 ▲     └─▶ SUCCESS
 *       └─ Use password ─▶ PASSWORD ──────┼──────────▶ SUCCESS
 *                           └ Forgot ─────┘ (intent=reset) ─▶ SET_PASSWORD (reset) ─▶ SUCCESS
 *
 * Google OAuth runs in a popup and closes the modal directly on success.
 */
export function useAuthFlow({
  onSuccess,
  onClose,
  messages = DEFAULT_AUTH_MESSAGES,
  oauthPopup,
}: UseAuthFlowOptions) {
  const popupWidth = oauthPopup?.width ?? DEFAULT_OAUTH_POPUP.width;
  const popupHeight = oauthPopup?.height ?? DEFAULT_OAUTH_POPUP.height;
  const errorCopy = messages.errors;
  const { popupBlocked, popupError } = messages.oauthCallback;
  const [step, setStep] = useState<AuthModalStep>("IDENTIFIER");
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [otpLength, setOtpLength] = useState(DEFAULT_OTP_LENGTH);
  const [otpIntent, setOtpIntent] = useState<OtpIntent>("login");
  const [destination, setDestination] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [setPasswordMode, setSetPasswordMode] = useState<AuthModalSetPasswordMode>("create");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [oauthLoadingProvider, setOauthLoadingProvider] = useState<string | null>(null);

  /** Single-use token from OTP verification that authorises POST /password/set. */
  const passwordSetupRef = useRef<string | null>(null);
  const popupCleanupRef = useRef<(() => void) | null>(null);
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** Bumped on reset: responses from an older flow are ignored. */
  const flowIdRef = useRef(0);

  // One tick per second; rescheduled only while counting down.
  useEffect(() => {
    if (resendCountdown <= 0) return;
    const timer = setTimeout(() => setResendCountdown((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  useEffect(() => {
    return () => {
      popupCleanupRef.current?.();
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
    };
  }, []);

  const reset = useCallback((prefillIdentifier = "") => {
    flowIdRef.current++;
    if (successTimerRef.current) {
      clearTimeout(successTimerRef.current);
      successTimerRef.current = null;
    }
    popupCleanupRef.current?.();
    passwordSetupRef.current = null;
    setStep("IDENTIFIER");
    setIdentifier(prefillIdentifier);
    setOtp("");
    setOtpIntent("login");
    setDestination("");
    setResendCountdown(0);
    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError(null);
    setIsLoading(false);
    setOauthLoadingProvider(null);
  }, []);

  /**
   * Run one request for the current flow: manages loading/error state and
   * drops the outcome if the flow was reset (e.g. modal closed) meanwhile.
   */
  const runStep = useCallback(
    async (task: () => Promise<void>, onError?: (err: unknown) => boolean) => {
      const flowId = flowIdRef.current;
      setIsLoading(true);
      setError(null);
      try {
        await task();
      } catch (err) {
        if (flowId === flowIdRef.current && !onError?.(err)) {
          setError(authErrorMessage(err, errorCopy));
        }
      } finally {
        if (flowId === flowIdRef.current) setIsLoading(false);
      }
      return flowId === flowIdRef.current;
    },
    [errorCopy],
  );

  const finishWithSuccessStep = useCallback(() => {
    setStep("SUCCESS");
    successTimerRef.current = setTimeout(() => {
      successTimerRef.current = null;
      onSuccess?.();
      onClose?.();
      reset();
    }, SUCCESS_CLOSE_DELAY_MS);
  }, [onSuccess, onClose, reset]);

  /** Signed in: share the session, then continue to SET_PASSWORD or SUCCESS. */
  const completeSignIn = useCallback(
    (res: SignInResult, intent: OtpIntent | "password") => {
      setSignedIn(res.user);
      broadcastAuth({ type: "LOGIN" });

      const offerPassword = intent === "reset" || (intent === "login" && res.isNewUser);
      if (res.passwordSetupToken && offerPassword) {
        passwordSetupRef.current = res.passwordSetupToken;
        setSetPasswordMode(intent === "reset" ? "reset" : "create");
        setStep("SET_PASSWORD");
        return;
      }
      finishWithSuccessStep();
    },
    [finishWithSuccessStep],
  );

  // ─── Code delivery ─────────────────────────────────────────────────────────

  const sendCode = useCallback(
    (intent: OtpIntent) => {
      const id = identifier.trim();
      if (!id) return;
      return runStep(
        async () => {
          const flowId = flowIdRef.current;
          const res = await authApi.sendOtp(id);
          if (flowId !== flowIdRef.current) return;
          setOtpIntent(intent);
          setDestination(res.destination);
          setOtpLength(res.codeLength);
          setResendCountdown(res.resendAvailableIn);
          setOtp("");
          setStep("OTP");
        },
        (err) => {
          // A code was sent moments ago and is still valid: go enter it.
          if (isApiError(err) && err.code === "OTP_COOLDOWN") {
            setOtpIntent(intent);
            setDestination((d) => d || id);
            setResendCountdown(err.retryAfter ?? 0);
            setStep("OTP");
            return true;
          }
          return false;
        },
      );
    },
    [identifier, runStep],
  );

  const handleIdentifierSubmit = useCallback(() => {
    if (!isLoading) return sendCode("login");
  }, [isLoading, sendCode]);

  const handleResendOtp = useCallback(() => {
    if (resendCountdown === 0 && !isLoading) return sendCode(otpIntent);
  }, [resendCountdown, isLoading, sendCode, otpIntent]);

  const handleForgotPassword = useCallback(() => {
    if (!isLoading) return sendCode("reset");
  }, [isLoading, sendCode]);

  // ─── Verification / sign-in ────────────────────────────────────────────────

  const handleOtpSubmit = useCallback(() => {
    if (otp.length !== otpLength || isLoading) return;
    return runStep(async () => {
      const flowId = flowIdRef.current;
      const res = await authApi.verifyOtp(identifier.trim(), otp, otpIntent);
      // The session is valid even if the modal closed meanwhile; only the UI
      // transition is skipped for a stale flow.
      if (flowId !== flowIdRef.current) {
        setSignedIn(res.user);
        broadcastAuth({ type: "LOGIN" });
        return;
      }
      completeSignIn(res, otpIntent);
    });
  }, [otp, otpLength, isLoading, runStep, identifier, otpIntent, completeSignIn]);

  const handleUsePassword = useCallback(() => {
    if (!identifier.trim()) return;
    setError(null);
    setPassword("");
    setStep("PASSWORD");
  }, [identifier]);

  const handlePasswordSubmit = useCallback(() => {
    if (!password || isLoading) return;
    return runStep(async () => {
      const flowId = flowIdRef.current;
      const res = await authApi.login(identifier.trim(), password);
      if (flowId !== flowIdRef.current) return;
      completeSignIn(res, "password");
    });
  }, [password, isLoading, runStep, identifier, completeSignIn]);

  // ─── Password setup ────────────────────────────────────────────────────────

  const handleSetPasswordSubmit = useCallback(() => {
    const setupToken = passwordSetupRef.current;
    if (!setupToken || !newPassword || newPassword !== confirmPassword || isLoading) return;
    return runStep(async () => {
      const flowId = flowIdRef.current;
      // Rotates the session: other sessions are revoked, this one continues.
      const res = await authApi.setPassword(setupToken, newPassword);
      setSignedIn(res.user);
      if (flowId !== flowIdRef.current) return;
      passwordSetupRef.current = null;
      finishWithSuccessStep();
    });
  }, [newPassword, confirmPassword, isLoading, runStep, finishWithSuccessStep]);

  const handleSkipSetPassword = useCallback(() => {
    passwordSetupRef.current = null;
    finishWithSuccessStep();
  }, [finishWithSuccessStep]);

  const handleEditIdentifier = useCallback(() => {
    setStep("IDENTIFIER");
    setOtp("");
    setPassword("");
    setResendCountdown(0);
    setError(null);
  }, []);

  // ─── Google OAuth (popup) ──────────────────────────────────────────────────

  const startOAuthFlow = useCallback(
    (providerId: string) => {
      popupCleanupRef.current?.();

      const left = window.screenX + (window.outerWidth - popupWidth) / 2;
      const top = window.screenY + (window.outerHeight - popupHeight) / 2;
      const popup = window.open(
        authApi.oauthStartUrl(providerId),
        `timmbr_${providerId}_auth`,
        `width=${popupWidth},height=${popupHeight},left=${left},top=${top},status=no,toolbar=no,menubar=no`,
      );

      if (!popup) {
        setError(popupBlocked);
        return;
      }

      setError(null);
      setOauthLoadingProvider(providerId);

      // The popup lands on our /oauth/callback page, which reports the result via
      // postMessage (verified: our origin + that exact window) or, if the provider
      // severed window.opener, via a same-origin BroadcastChannel. It also
      // broadcasts LOGIN, so every tab restores even if this modal was closed.
      const handleResult = async (data: OAuthResultMessage) => {
        cleanup();
        if (data.status !== "success") {
          setError(popupError);
          return;
        }

        const session = await loadSession();
        if (session.status !== "authenticated") {
          setError(popupError);
          return;
        }

        // The popup already showed its own success state, so close right away.
        onSuccess?.();
        onClose?.();
        reset();
      };

      const handleMessage = (event: MessageEvent) => {
        if (
          event.origin === window.location.origin &&
          event.source === popup &&
          isOAuthResultMessage(event.data)
        ) {
          void handleResult(event.data);
        }
      };

      const channel =
        "BroadcastChannel" in window ? new BroadcastChannel(OAUTH_CHANNEL_NAME) : null;
      if (channel) {
        channel.onmessage = (event) => {
          if (isOAuthResultMessage(event.data)) void handleResult(event.data);
        };
      }

      // Stop the spinner once the popup is gone. Listeners stay attached: a
      // severed opener can make `popup.closed` read true while the flow is
      // still running, and the BroadcastChannel result may arrive afterwards.
      const checkClosedTimer = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosedTimer);
          setOauthLoadingProvider(null);
        }
      }, 500);

      const cleanup = () => {
        window.removeEventListener("message", handleMessage);
        channel?.close();
        clearInterval(checkClosedTimer);
        setOauthLoadingProvider(null);
        popupCleanupRef.current = null;
      };

      popupCleanupRef.current = cleanup;
      window.addEventListener("message", handleMessage);
    },
    [popupBlocked, popupError, popupWidth, popupHeight, onSuccess, onClose, reset],
  );

  return {
    // State
    step,
    identifier,
    otp,
    otpLength,
    destination,
    resendCountdown,
    password,
    newPassword,
    confirmPassword,
    setPasswordMode,
    isLoading,
    oauthLoadingProvider,
    error,
    // Setters
    setIdentifier,
    setOtp,
    setPassword,
    setNewPassword,
    setConfirmPassword,
    // Actions
    handleIdentifierSubmit,
    handleUsePassword,
    handleOtpSubmit,
    handleResendOtp,
    handlePasswordSubmit,
    handleForgotPassword,
    handleSetPasswordSubmit,
    handleSkipSetPassword,
    handleEditIdentifier,
    startOAuthFlow,
    reset,
  };
}
