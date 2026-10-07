import { isApiError } from '@timmbr/utils';
import { DEFAULT_AUTH_MESSAGES, type AuthMessages } from './messages';

interface ErrorEnvelope {
  details?: { attemptsLeft?: number };
  errors?: { message?: string }[] | null;
}

/** Map an auth API failure to user-facing copy, keyed by the backend error `code`. */
export function authErrorMessage(
  error: unknown,
  copy: AuthMessages['errors'] = DEFAULT_AUTH_MESSAGES.errors
): string {
  if (!isApiError(error)) return copy.GENERIC;
  if (error.isNetworkError) return copy.NETWORK;

  const body = error.details as ErrorEnvelope | undefined;

  switch (error.code) {
    case 'OTP_INVALID':
      return copy.OTP_INVALID(body?.details?.attemptsLeft);
    case 'OTP_COOLDOWN':
      return copy.OTP_COOLDOWN(error.retryAfter);
    case 'RATE_LIMITED':
      return copy.RATE_LIMITED(error.retryAfter);
    case 'INVALID_IDENTIFIER':
    case 'INVALID_CREDENTIALS':
    case 'EMAIL_NOT_VERIFIED':
    case 'OTP_EXPIRED':
    case 'OTP_LOCKED':
    case 'OTP_RATE_LIMITED':
    case 'PHONE_LOGIN_UNAVAILABLE':
    case 'PASSWORD_SETUP_TOKEN_INVALID':
    case 'ACCOUNT_DEACTIVATED':
    case 'OTP_NOT_ALLOWED':
      return copy[error.code];
  }

  // Any other 429 (e.g. a proxy, or an older API returning TOO_MANY_REQUESTS).
  if (error.statusCode === 429) return copy.RATE_LIMITED(error.retryAfter);

  // DTO validation (e.g. password policy): the first field message is the useful one.
  if (error.statusCode === 400) {
    return body?.errors?.[0]?.message ?? copy.VALIDATION_ERROR;
  }
  return copy.GENERIC;
}
