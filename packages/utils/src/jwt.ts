import { jwtDecode } from 'jwt-decode';

export const ACCESS_TOKEN_COOKIE = 'timmbr_access_token';

export interface DecodedJwt {
  sub?: string;
  email?: string;
  role?: string;
  exp?: number;
  iat?: number;
  [key: string]: unknown;
}

/**
 * Safely parses and decodes a JWT token across Edge runtime, Node.js, and browser environments.
 * Returns null if the token is invalid, malformed, or empty.
 */
export function parseJwt<T = DecodedJwt>(token: string): T | null {
  if (!token || typeof token !== 'string') return null;
  try {
    return jwtDecode<T>(token);
  } catch {
    return null;
  }
}

/**
 * Checks if a JWT token is expired, taking into account clock skew.
 *
 * @param token - The JWT token string.
 * @param skewSeconds - Clock skew tolerance in seconds (defaults to 10s).
 * @returns true if token is missing, malformed, or expired.
 */
export function isTokenExpired(token: string, skewSeconds = 10): boolean {
  const decoded = parseJwt<DecodedJwt>(token);
  if (!decoded || typeof decoded.exp !== 'number') return true;
  return decoded.exp * 1000 <= Date.now() - skewSeconds * 1000;
}

/**
 * Verifies if the token contains an authorized role.
 *
 * @param token - The JWT token string.
 * @param allowedRoles - List of authorized roles (defaults to ['ADMIN', 'MASTER']).
 * @returns true if the role in the token matches one of the allowed roles.
 */
export function isTokenAuthorized(
  token: string,
  allowedRoles: string[] = ['ADMIN', 'MASTER']
): boolean {
  const decoded = parseJwt<DecodedJwt>(token);
  if (!decoded || typeof decoded.role !== 'string') return false;
  return allowedRoles.includes(decoded.role);
}

export { jwtDecode };
