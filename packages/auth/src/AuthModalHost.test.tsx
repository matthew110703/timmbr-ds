import * as React from 'react';
import { render, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const hooks = vi.hoisted(() => ({
  openAuthModal: vi.fn(),
  closeAuthModal: vi.fn(),
  useAuthModal: () => ({ isOpen: false, modalOptions: {}, open: vi.fn(), close: vi.fn() }),
}));
vi.mock('@timmbr/hooks', () => hooks);

const authApi = vi.hoisted(() => ({ session: vi.fn(), banner: vi.fn() }));
vi.mock('./api', () => ({ authApi }));

import { AuthModalHost, __resetAuthModalHostForTests } from './AuthModalHost';
import { __resetSessionForTests, getSession } from './session';

const USER = { id: 'u1', name: 'Dany', email: 'dany@example.com', role: 'USER' };

beforeEach(() => {
  __resetSessionForTests();
  __resetAuthModalHostForTests();
  window.history.replaceState(null, '', '/');
});
afterEach(() => {
  vi.clearAllMocks();
  vi.unstubAllGlobals();
});

describe('AuthModalHost', () => {
  it('loads the session once, even when mounted twice', async () => {
    authApi.session.mockResolvedValue({ user: USER });
    render(
      <>
        <AuthModalHost />
        <AuthModalHost />
      </>
    );

    await waitFor(() => expect(getSession().status).toBe('authenticated'));
    expect(authApi.session).toHaveBeenCalledTimes(1);
  });

  it('renders nothing (no modal code) until the modal is first opened', () => {
    authApi.session.mockResolvedValue({ user: null });
    const { container } = render(<AuthModalHost />);
    expect(container).toBeEmptyDOMElement();
  });

  it('opens the modal for ?signin=1 and returns to returnTo after sign-in', async () => {
    authApi.session.mockResolvedValue({ user: null });
    window.history.replaceState(null, '', '/?signin=1&returnTo=%2Faccount');

    render(<AuthModalHost />);

    await waitFor(() => expect(hooks.openAuthModal).toHaveBeenCalledTimes(1));
    // The params are removed from the address bar.
    expect(window.location.search).toBe('');

    const assign = vi.fn();
    vi.stubGlobal('location', { ...window.location, assign });
    hooks.openAuthModal.mock.calls[0]![0].onSuccess();
    expect(assign).toHaveBeenCalledWith('/account');
  });

  it('goes straight to returnTo when already signed in', async () => {
    authApi.session.mockResolvedValue({ user: USER });
    const assign = vi.fn();
    window.history.replaceState(null, '', '/?signin=1&returnTo=%2Faccount');
    vi.stubGlobal('location', { ...window.location, href: window.location.href, assign });

    render(<AuthModalHost />);

    await waitFor(() => expect(assign).toHaveBeenCalledWith('/account'));
    expect(hooks.openAuthModal).not.toHaveBeenCalled();
  });

  it('rejects an off-site returnTo', async () => {
    authApi.session.mockResolvedValue({ user: USER });
    const assign = vi.fn();
    window.history.replaceState(null, '', '/?signin=1&returnTo=%2F%2Fevil.com');
    vi.stubGlobal('location', { ...window.location, href: window.location.href, assign });

    render(<AuthModalHost />);

    await waitFor(() => expect(assign).toHaveBeenCalledWith('/'));
  });

  it('ignores ?signin=1 when handleSignInParam is false', async () => {
    authApi.session.mockResolvedValue({ user: null });
    window.history.replaceState(null, '', '/?signin=1&returnTo=%2Faccount');

    render(<AuthModalHost handleSignInParam={false} />);

    await waitFor(() => expect(getSession().status).toBe('anonymous'));
    expect(hooks.openAuthModal).not.toHaveBeenCalled();
    expect(window.location.search).toBe('?signin=1&returnTo=%2Faccount');
  });
});
