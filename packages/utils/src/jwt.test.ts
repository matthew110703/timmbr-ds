import { describe, it, expect } from 'vitest';
import { parseJwt, isTokenExpired, isTokenAuthorized, ACCESS_TOKEN_COOKIE } from './jwt';

// Helper to create unencoded mock JWT tokens for testing
function createMockJwt(payload: Record<string, unknown>): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = 'mock-signature';
  return `${header}.${body}.${signature}`;
}

describe('JWT Utilities (@timmbr/utils)', () => {
  it('exports the correct default ACCESS_TOKEN_COOKIE name', () => {
    expect(ACCESS_TOKEN_COOKIE).toBe('timmbr_access_token');
  });

  describe('parseJwt', () => {
    it('returns decoded payload for a valid JWT', () => {
      const token = createMockJwt({
        sub: 'user-123',
        email: 'admin@timmbr.com',
        role: 'ADMIN',
      });

      const decoded = parseJwt(token);
      expect(decoded).toEqual({
        sub: 'user-123',
        email: 'admin@timmbr.com',
        role: 'ADMIN',
      });
    });

    it('returns null for an invalid or malformed token', () => {
      expect(parseJwt('')).toBeNull();
      expect(parseJwt('not-a-jwt')).toBeNull();
      expect(parseJwt('abc.def')).toBeNull();
    });
  });

  describe('isTokenExpired', () => {
    it('returns false for a non-expired token', () => {
      const expInFuture = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
      const token = createMockJwt({ sub: 'user-123', exp: expInFuture });

      expect(isTokenExpired(token)).toBe(false);
    });

    it('returns true for an expired token', () => {
      const expInPast = Math.floor(Date.now() / 1000) - 60; // 1 minute ago
      const token = createMockJwt({ sub: 'user-123', exp: expInPast });

      expect(isTokenExpired(token)).toBe(true);
    });

    it('returns true if exp is missing or token is invalid', () => {
      const tokenNoExp = createMockJwt({ sub: 'user-123' });
      expect(isTokenExpired(tokenNoExp)).toBe(true);
      expect(isTokenExpired('invalid-token')).toBe(true);
    });

    it('accounts for clock skew tolerance', () => {
      // Expired 5 seconds ago (within 10s grace window) -> not yet considered expired
      const expiredRecently = Math.floor(Date.now() / 1000) - 5;
      const tokenRecentlyExpired = createMockJwt({ sub: 'user-123', exp: expiredRecently });
      expect(isTokenExpired(tokenRecentlyExpired, 10)).toBe(false);

      // Expired 15 seconds ago (past 10s grace window) -> considered expired
      const expiredLongAgo = Math.floor(Date.now() / 1000) - 15;
      const tokenLongExpired = createMockJwt({ sub: 'user-123', exp: expiredLongAgo });
      expect(isTokenExpired(tokenLongExpired, 10)).toBe(true);
    });
  });

  describe('isTokenAuthorized', () => {
    it('returns true for ADMIN role by default', () => {
      const token = createMockJwt({ sub: 'admin-1', role: 'ADMIN' });
      expect(isTokenAuthorized(token)).toBe(true);
    });

    it('returns true for MASTER role by default', () => {
      const token = createMockJwt({ sub: 'master-1', role: 'MASTER' });
      expect(isTokenAuthorized(token)).toBe(true);
    });

    it('returns false for standard USER role by default', () => {
      const token = createMockJwt({ sub: 'user-1', role: 'USER' });
      expect(isTokenAuthorized(token)).toBe(false);
    });

    it('supports custom allowedRoles parameter', () => {
      const token = createMockJwt({ sub: 'user-1', role: 'USER' });
      expect(isTokenAuthorized(token, ['USER', 'CUSTOMER'])).toBe(true);
      expect(isTokenAuthorized(token, ['ADMIN'])).toBe(false);
    });

    it('returns false for invalid token or missing role', () => {
      expect(isTokenAuthorized('')).toBe(false);
      expect(isTokenAuthorized('invalid')).toBe(false);
      const tokenNoRole = createMockJwt({ sub: 'no-role' });
      expect(isTokenAuthorized(tokenNoRole)).toBe(false);
    });
  });
});
