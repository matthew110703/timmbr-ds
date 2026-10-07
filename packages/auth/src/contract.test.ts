import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { __resetSessionForTests, getSession, loadSession } from './session';
import { authApi } from './api';

/**
 * Contract with the shell's BFF: every response is wrapped as
 * `{ success, data }`. These tests use the real API client (no mocks), so a
 * reader that forgets to unwrap `data` fails here, not in the browser.
 */
const USER = { id: 'u1', name: 'Daenerys Targaryen', email: 'dany@example.com', role: 'USER' };

function respondWith(body: unknown, status = 200) {
  const fetchMock = vi.fn().mockResolvedValue(
    new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })
  );
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

beforeEach(() => __resetSessionForTests());
afterEach(() => vi.unstubAllGlobals());

describe('BFF envelope contract', () => {
  it('reads the signed-in user from { success, data: { user } }', async () => {
    const fetchMock = respondWith({ success: true, data: { user: USER } });

    const session = await loadSession();

    expect(session).toEqual({ status: 'authenticated', user: USER });
    expect(getSession().user?.name).toBe('Daenerys Targaryen');
    const [url, init] = fetchMock.mock.calls[0]!;
    expect(new URL(String(url), window.location.origin).pathname).toBe('/api/auth/session');
    expect(init.cache).toBe('no-store');
  });

  it('treats { data: { user: null } } as signed out', async () => {
    respondWith({ success: true, data: { user: null } });
    expect((await loadSession()).status).toBe('anonymous');
  });

  it('unwraps the banner response', async () => {
    const banner = { title: 'FRESH', imageUrl: 'https://cdn.example/banner.png' };
    const fetchMock = respondWith({ success: true, data: { banner } });

    await expect(authApi.banner()).resolves.toEqual({ banner });
    expect(new URL(String(fetchMock.mock.calls[0]![0]), window.location.origin).pathname).toBe('/api/auth/banner');
  });
});
