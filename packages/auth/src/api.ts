import { createApiClient, type RequestOptions } from '@timmbr/utils';
import { authRoutePath } from './contract/constants';
import type {
  AuthBannerResponse,
  OtpIntent,
  OtpSendResponse,
  SessionResponse,
  SignInResult,
} from './contract/types';

/**
 * Auth calls from the browser go to the shell's BFF (Backend For Frontend) routes on the same origin
 * (every zone is served from the storefront domain), never to timmbr-core
 * directly. Responses carry the user, never tokens; the session lives in
 * httpOnly cookies set by the BFF.
 *
 * Paths come from `AUTH_ROUTES` (the shared contract), which the shell's route
 * table is generated from too.
 *
 * `createApiClient` unwraps the shell's `{ success, data }` envelope. Never
 * call these routes with a raw `fetch`: that's how a zone ends up reading
 * `json.user` (always undefined) instead of `json.data.user`.
 */
const bff = createApiClient({ baseUrl: '', apiPrefix: '' });

const AUTH_REQUEST: RequestOptions = { skipAuth: true, cache: 'no-store' };

export const authApi = {
  sendOtp(identifier: string) {
    return bff.post<OtpSendResponse>(authRoutePath('otpSend'), { identifier }, AUTH_REQUEST);
  },

  verifyOtp(identifier: string, code: string, intent: OtpIntent = 'login') {
    return bff.post<SignInResult>(authRoutePath('otpVerify'), { identifier, code, intent }, AUTH_REQUEST);
  },

  login(identifier: string, password: string) {
    return bff.post<SignInResult>(authRoutePath('login'), { identifier, password }, AUTH_REQUEST);
  },

  /** `token` is the single-use setup token from OTP verification; the cookie carries the session. */
  setPassword(token: string, password: string) {
    return bff.post<SignInResult>(authRoutePath('passwordSet'), { token, password }, AUTH_REQUEST);
  },

  logout() {
    return bff.post<null>(authRoutePath('logout'), undefined, AUTH_REQUEST);
  },

  /** Sign out on every device. */
  logoutAll() {
    return bff.post<null>(authRoutePath('logoutAll'), undefined, AUTH_REQUEST);
  },

  /**
   * Change the password. Other devices are signed out; this one gets a fresh
   * session (the BFF signs back in with the new password).
   */
  changePassword(currentPassword: string, newPassword: string) {
    return bff.post<SignInResult>(
      authRoutePath('passwordChange'),
      { currentPassword, newPassword },
      AUTH_REQUEST
    );
  },

  session() {
    return bff.get<SessionResponse>(authRoutePath('session'), AUTH_REQUEST);
  },

  /** The auth modal's promo banner (the shell reads it from the CMS). */
  banner() {
    return bff.get<AuthBannerResponse>(authRoutePath('banner'), { skipAuth: true });
  },

  /** Where the Google popup starts (binds the flow to this browser). */
  oauthStartUrl(provider: string) {
    return `${authRoutePath('oauthStart')}?provider=${encodeURIComponent(provider)}`;
  },
};
