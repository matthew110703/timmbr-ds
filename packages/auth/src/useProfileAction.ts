import { useCallback, useMemo } from 'react';
import type { NavActionItem } from '@timmbr/ui';
import { openAuthModal } from '@timmbr/hooks';
import { resolveAuthMessages, type AuthMessages } from './messages';
import { getFirstName, useSession, whenSessionReady } from './session';

export interface UseProfileActionOptions {
  /** Where a signed-in user goes. Defaults to the account zone. */
  accountHref?: string;
  /** Header copy (LOGIN, ACCOUNT, aria labels). */
  messages?: Partial<AuthMessages['profile']>;
}

export interface ProfileActionProps {
  /** Pass as `actions.profile` on NavHeader. */
  profileAction: Partial<NavActionItem>;
  /** Pass as `onAuthTrigger` on NavHeader (with `authMode="modal"`). */
  onAuthTrigger: () => void;
}

/**
 * The header's profile action, identical in every zone:
 *
 * - loading:    skeleton in the (fixed-width) label slot, so nothing shifts
 * - signed out: LOGIN, which opens the auth modal on the current page
 * - signed in:  first name (or ACCOUNT), linking to the account zone
 *
 * A click while still loading waits for the session, so a signed-in user who
 * clicks during page load goes to their account instead of the modal.
 */
export function useProfileAction({
  accountHref = '/account',
  messages,
}: UseProfileActionOptions = {}): ProfileActionProps {
  const { status, user } = useSession();
  const copy = useMemo(() => resolveAuthMessages({ profile: messages }).profile, [messages]);

  const onAuthTrigger = useCallback(async () => {
    const session = await whenSessionReady();
    if (session.status === 'authenticated') window.location.assign(accountHref);
    else openAuthModal();
  }, [accountHref]);

  const profileAction = useMemo<Partial<NavActionItem>>(() => {
    if (status === 'authenticated' && user) {
      return {
        label: getFirstName(user) ?? copy.accountFallback,
        href: accountHref,
        // The account zone is a separate app: full navigation.
        crossZone: true,
        ariaLabel: copy.accountAriaLabel(user.name),
      };
    }
    return {
      label: copy.login,
      ariaLabel: copy.loginAriaLabel,
      isLoading: status === 'loading',
    };
  }, [status, user, copy, accountHref]);

  return { profileAction, onAuthTrigger: () => void onAuthTrigger() };
}
