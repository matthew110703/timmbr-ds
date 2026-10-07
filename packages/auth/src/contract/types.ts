import type { AuthModalBannerData } from '@timmbr/ui';

/**
 * Wire contract between the browser and the shell's `/api/auth/*` BFF.
 * The shell's route handlers import these same types, so a change on either
 * side fails the other's type check instead of breaking at runtime.
 *
 * Every BFF response is wrapped by the shell as `{ success, data }`; the types
 * below describe `data`. The client unwraps it via `createApiClient`.
 */

/** The signed-in user as the storefront sees it (never includes tokens). */
export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

/** What the BFF returns to the browser after a sign-in step. */
export interface SignInResult {
  user: SessionUser;
  isNewUser?: boolean;
  hasPassword?: boolean;
  passwordSetupToken?: string;
}

/** `GET /api/auth/session` */
export interface SessionResponse {
  user: SessionUser | null;
}

/** `POST /api/auth/otp/send` */
export interface OtpSendResponse {
  /** Masked email / phone the code was sent to */
  destination: string;
  codeLength: number;
  /** Seconds until the code expires */
  expiresIn: number;
  /** Seconds until another code may be requested */
  resendAvailableIn: number;
}

export type OtpIntent = 'login' | 'reset';

/** `GET /api/auth/banner`: the auth modal's promo banner (null = none). */
export interface AuthBannerResponse {
  banner: AuthModalBannerData | null;
}

/** Messages on the cross-tab auth channel. */
export type AuthBroadcast = { type: 'LOGIN' } | { type: 'LOGOUT' };
