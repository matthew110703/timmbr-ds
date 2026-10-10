import { createElement, useCallback, useMemo, type ReactNode } from 'react';
import type { NavActionItem, NavActionMenuItem } from '@timmbr/ui';
import { openAuthModal } from '@timmbr/hooks';
import { LogOut } from '@timmbr/icons';
import { resolveAuthMessages, type AuthMessages } from './messages';
import { getFirstName, signOut, useSession, whenSessionReady, type SignOutOptions } from './session';

export interface UseProfileActionOptions {
  /** Where a signed-in user goes. Defaults to the account zone. */
  accountHref?: string;
  /** Header copy (LOGIN, ACCOUNT, aria labels, "Log out"). */
  messages?: Partial<AuthMessages['profile']>;
  /**
   * Links for the signed-in menu (desktop), e.g. My orders / Your account.
   * Owned by the zone (its strings); "Log out" is appended here.
   */
  menuItems?: NavActionMenuItem[];
  /** Icon of the "Log out" item (default: the LogOut icon; `null` for none). */
  logoutIcon?: ReactNode;
  /** Passed to `signOut()` when "Log out" is chosen. */
  signOutOptions?: SignOutOptions;
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
 * - signed in:  first name (or ACCOUNT). Desktop opens a menu (the zone's
 *               `menuItems` + Log out); mobile links to the account zone
 *
 * A click while still loading waits for the session, so a signed-in user who
 * clicks during page load goes to their account instead of the modal.
 */
export function useProfileAction({
  accountHref = '/account',
  messages,
  menuItems,
  logoutIcon,
  signOutOptions,
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
        // Desktop: a menu (zone links + Log out). Mobile/overflow: the href above.
        menu: [
          ...(menuItems ?? []),
          {
            id: 'logout',
            label: copy.logout,
            icon: logoutIcon === undefined ? createElement(LogOut, { size: 16 }) : logoutIcon,
            onSelect: () => void signOut(signOutOptions),
            destructive: true,
            separatorBefore: Boolean(menuItems?.length),
          },
        ],
      };
    }
    return {
      label: copy.login,
      ariaLabel: copy.loginAriaLabel,
      isLoading: status === 'loading',
    };
  }, [status, user, copy, accountHref, menuItems, logoutIcon, signOutOptions]);

  return { profileAction, onAuthTrigger: () => void onAuthTrigger() };
}
