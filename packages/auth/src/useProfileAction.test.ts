import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const hooks = vi.hoisted(() => ({ openAuthModal: vi.fn() }));
vi.mock('@timmbr/hooks', () => hooks);

import { __resetSessionForTests, clearSession, setSignedIn } from './session';
import { useProfileAction } from './useProfileAction';
import { DEFAULT_AUTH_MESSAGES } from './messages';

const USER = { id: 'u1', name: 'Daenerys Targaryen', email: 'dany@example.com', role: 'USER' };
const copy = DEFAULT_AUTH_MESSAGES.profile;

beforeEach(() => __resetSessionForTests());
afterEach(() => {
  vi.clearAllMocks();
  vi.unstubAllGlobals();
});

describe('useProfileAction', () => {
  it('shows a skeleton (isLoading) while the session loads', () => {
    const { result } = renderHook(() => useProfileAction());
    expect(result.current.profileAction).toMatchObject({ label: copy.login, isLoading: true });
    expect(result.current.profileAction.href).toBeUndefined();
  });

  it('shows LOGIN and opens the modal in place when signed out', async () => {
    const { result } = renderHook(() => useProfileAction());
    act(() => clearSession());

    expect(result.current.profileAction).toMatchObject({ label: 'LOGIN', isLoading: false });
    await act(async () => result.current.onAuthTrigger());
    expect(hooks.openAuthModal).toHaveBeenCalledTimes(1);
  });

  it('shows the first name linking to the account zone when signed in', () => {
    const { result } = renderHook(() => useProfileAction());
    act(() => setSignedIn(USER));

    expect(result.current.profileAction).toMatchObject({
      label: 'Daenerys',
      href: '/account',
      crossZone: true,
      ariaLabel: copy.accountAriaLabel('Daenerys Targaryen'),
    });
  });

  it('builds the signed-in menu from the zone links plus Log out', () => {
    const menuItems = [
      { id: 'orders', label: 'My orders', href: '/account/orders' },
      { id: 'account', label: 'Your account', href: '/account' },
    ];
    const { result } = renderHook(() => useProfileAction({ menuItems }));
    act(() => setSignedIn(USER));

    const menu = result.current.profileAction.menu!;
    expect(menu.map((m) => m.id)).toEqual(['orders', 'account', 'logout']);
    expect(menu[2]).toMatchObject({ label: copy.logout, destructive: true, separatorBefore: true });
    expect(menu[2].icon).toBeTruthy();
  });

  it('has no menu while loading or signed out', () => {
    const { result } = renderHook(() => useProfileAction({ menuItems: [{ id: 'a', label: 'A', href: '/a' }] }));
    expect(result.current.profileAction.menu).toBeUndefined();
    act(() => clearSession());
    expect(result.current.profileAction.menu).toBeUndefined();
  });

  it('falls back to ACCOUNT for placeholder names', () => {
    const { result } = renderHook(() => useProfileAction());
    act(() => setSignedIn({ ...USER, name: 'Customer' }));
    expect(result.current.profileAction.label).toBe(copy.accountFallback);
  });

  it('sends an already signed-in user to their account instead of the modal', async () => {
    const assign = vi.fn();
    vi.stubGlobal('location', { ...window.location, assign });
    const { result } = renderHook(() => useProfileAction({ accountHref: '/account/orders' }));
    act(() => setSignedIn(USER));

    await act(async () => result.current.onAuthTrigger());

    expect(assign).toHaveBeenCalledWith('/account/orders');
    expect(hooks.openAuthModal).not.toHaveBeenCalled();
  });
});
