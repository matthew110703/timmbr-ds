/** Same-origin base path of the shell's auth BFF (served on every zone's domain). */
export const AUTH_API_PREFIX = '/api/auth';

/**
 * Every BFF route, defined once. The browser client (`authApi`) builds its
 * URLs from this, and the shell's `/api/auth/[...action]` route table is
 * generated from it, so a path can't change on one side only.
 */
export const AUTH_ROUTES = {
  otpSend: { path: 'otp/send', method: 'POST' },
  otpVerify: { path: 'otp/verify', method: 'POST' },
  login: { path: 'login', method: 'POST' },
  passwordSet: { path: 'password/set', method: 'POST' },
  logout: { path: 'logout', method: 'POST' },
  session: { path: 'session', method: 'GET' },
  banner: { path: 'banner', method: 'GET' },
  oauthStart: { path: 'oauth/start', method: 'GET' },
  oauthCallback: { path: 'oauth/callback', method: 'GET' },
} as const satisfies Record<string, { path: string; method: 'GET' | 'POST' }>;

export type AuthRouteName = keyof typeof AUTH_ROUTES;

/** `/api/auth/<path>` for a route, e.g. `authRoutePath('session')` → `/api/auth/session`. */
export function authRoutePath(name: AuthRouteName): string {
  return `${AUTH_API_PREFIX}/${AUTH_ROUTES[name].path}`;
}

/** Query params that open the sign-in modal: `/?signin=1&returnTo=/account`. */
export const SIGN_IN_PARAM = 'signin';
export const RETURN_TO_PARAM = 'returnTo';

/** BroadcastChannel every storefront tab listens on for LOGIN / LOGOUT. */
export const AUTH_CHANNEL_NAME = 'timmbr_auth';
