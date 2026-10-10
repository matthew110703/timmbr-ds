import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const authApi = vi.hoisted(() => ({ logout: vi.fn(), logoutAll: vi.fn(), session: vi.fn() }));
vi.mock('./api', () => ({ authApi }));

import { __resetSessionForTests, getSession, setSignedIn, signOut, signOutEverywhere } from './session';

const USER = { id: 'u1', name: 'Dany', email: 'dany@example.com', role: 'USER' };

function stubLocation(pathname: string) {
  const assign = vi.fn();
  vi.stubGlobal('location', { ...window.location, pathname, assign });
  return assign;
}

beforeEach(() => {
  __resetSessionForTests();
  setSignedIn(USER);
  authApi.logout.mockResolvedValue(null);
  authApi.logoutAll.mockResolvedValue(null);
});
afterEach(() => {
  vi.clearAllMocks();
  vi.unstubAllGlobals();
});

describe('signOut', () => {
  it('logs out and stays on a public page', async () => {
    const assign = stubLocation('/products');
    await signOut();
    expect(authApi.logout).toHaveBeenCalledTimes(1);
    expect(getSession().status).toBe('anonymous');
    expect(assign).not.toHaveBeenCalled();
  });

  it('leaves a protected page for the home page', async () => {
    const assign = stubLocation('/account/orders');
    await signOut();
    expect(assign).toHaveBeenCalledWith('/');
  });

  it('honours custom protected prefixes and redirect', async () => {
    const assign = stubLocation('/checkout/payment');
    await signOut({ protectedPrefixes: ['/checkout'], redirectTo: '/cart' });
    expect(assign).toHaveBeenCalledWith('/cart');
  });
});

describe('signOutEverywhere', () => {
  it('revokes every session, clears this one and leaves a protected page', async () => {
    const assign = stubLocation('/account/security');
    await signOutEverywhere();
    expect(authApi.logoutAll).toHaveBeenCalledTimes(1);
    expect(getSession().status).toBe('anonymous');
    expect(assign).toHaveBeenCalledWith('/');
  });
});
