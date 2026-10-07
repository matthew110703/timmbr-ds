import { RETURN_TO_PARAM, SIGN_IN_PARAM } from './constants';

/**
 * Accept only same-origin relative paths ("/account/orders?x=1"), so a crafted
 * `returnTo` can't send users to another site after sign-in (open redirect).
 */
export function safeReturnTo(value: string | null | undefined, fallback = '/'): string {
  if (!value || !value.startsWith('/')) return fallback;
  // "//evil.com" and "/\evil.com" are protocol-relative in browsers
  if (value.startsWith('//') || value.startsWith('/\\')) return fallback;
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u001f]/.test(value)) return fallback;
  return value;
}

/** Shell URL that opens the sign-in modal and returns to `returnTo` afterwards. */
export function buildSignInPath(returnTo: string): string {
  const params = new URLSearchParams({ [SIGN_IN_PARAM]: '1', [RETURN_TO_PARAM]: safeReturnTo(returnTo) });
  return `/?${params.toString()}`;
}
