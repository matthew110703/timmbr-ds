import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ApiClient, createApiClient } from '../client';
import { ApiError, isApiError } from '../errors';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });

describe('ApiClient', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('builds URL correctly with default prefix and query parameters', () => {
    const client = new ApiClient({ baseUrl: 'http://localhost:4000' });
    const url = client.buildUrl('/pages/home', { section: 'hero', page: 1 });
    expect(url).toBe('http://localhost:4000/api/v1/pages/home?section=hero&page=1');
  });

  it('handles absolute endpoints without double prefixing', () => {
    const client = new ApiClient({ baseUrl: 'http://localhost:4000' });
    const url = client.buildUrl('https://custom.api.com/v2/items', { q: 'chair' });
    expect(url).toBe('https://custom.api.com/v2/items?q=chair');
  });

  it('unwraps NestJS standard response envelope { success: true, data: T }', async () => {
    const mockData = { id: '1', title: 'Modern Sofa', price: 999 };
    const mockFetch = vi.fn().mockResolvedValue(
      json({ success: true, statusCode: 200, message: 'Product retrieved', data: mockData })
    );
    global.fetch = mockFetch;

    const client = new ApiClient({ baseUrl: 'http://localhost:4000' });
    const result = await client.get('/products/1');

    expect(result).toEqual(mockData);
    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:4000/api/v1/products/1',
      expect.objectContaining({ method: 'GET' })
    );
  });

  it('returns null for an empty JSON body', async () => {
    global.fetch = vi.fn().mockResolvedValue(
      new Response('', { status: 200, headers: { 'content-type': 'application/json' } })
    );

    const client = new ApiClient({ baseUrl: 'http://localhost:4000' });
    await expect(client.post('/auth/logout')).resolves.toBeNull();
  });

  it('passes Next.js cache and revalidation options to fetch', async () => {
    const mockFetch = vi.fn().mockResolvedValue(json({ success: true, data: { ok: true } }));
    global.fetch = mockFetch;

    const client = new ApiClient({ baseUrl: 'http://localhost:4000' });
    await client.get('/pages/home', {
      cache: 'force-cache',
      next: { revalidate: 60, tags: ['page-home'] },
    });

    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:4000/api/v1/pages/home',
      expect.objectContaining({
        cache: 'force-cache',
        next: { revalidate: 60, tags: ['page-home'] },
      })
    );
  });

  it('applies defaultRevalidate to GETs only', async () => {
    const mockFetch = vi.fn().mockImplementation(() => Promise.resolve(json({ success: true, data: {} })));
    global.fetch = mockFetch;

    const client = new ApiClient({ baseUrl: 'http://localhost:4000', defaultRevalidate: 60 });
    await client.get('/pages/home');
    await client.post('/auth/otp/send', { identifier: 'a@b.co' });

    expect(mockFetch.mock.calls[0][1].next).toEqual({ revalidate: 60, tags: undefined });
    expect(mockFetch.mock.calls[1][1].next).toBeUndefined();
  });

  it('sends URLSearchParams as-is instead of JSON-encoding it', async () => {
    const mockFetch = vi.fn().mockResolvedValue(json({ success: true, data: {} }));
    global.fetch = mockFetch;
    const body = new URLSearchParams({ q: 'chair' });

    const client = new ApiClient({ baseUrl: 'http://localhost:4000' });
    await client.post('/search', body);

    const init = mockFetch.mock.calls[0][1];
    expect(init.body).toBe(body);
    expect((init.headers as Headers).get('Content-Type')).toBeNull();
  });

  it('throws ApiError with status, code and retryAfter on failed response', async () => {
    global.fetch = vi.fn().mockResolvedValue(
      json(
        {
          statusCode: 429,
          code: 'OTP_COOLDOWN',
          message: 'Please wait 42s',
          details: { retryAfter: 42 },
        },
        429
      )
    );

    const client = new ApiClient({ baseUrl: 'http://localhost:4000' });
    const error = await client.post('/auth/otp/send').catch((e: unknown) => e);

    expect(isApiError(error)).toBe(true);
    expect(error).toMatchObject({ statusCode: 429, code: 'OTP_COOLDOWN' });
    expect((error as ApiError).retryAfter).toBe(42);
  });

  it('injects Bearer token from tokenGetter', async () => {
    const mockFetch = vi.fn().mockResolvedValue(json({ success: true, data: { user: 'nexus' } }));
    global.fetch = mockFetch;

    const client = new ApiClient({
      baseUrl: 'http://localhost:4000',
      tokenGetter: () => 'test-jwt-token',
    });

    await client.get('/user/me');

    const callHeaders = mockFetch.mock.calls[0][1].headers as Headers;
    expect(callHeaders.get('Authorization')).toBe('Bearer test-jwt-token');
  });

  describe('token refresh', () => {
    it('refreshes once on an expired token and retries the request', async () => {
      const tokenSetter = vi.fn();
      global.fetch = vi
        .fn()
        .mockResolvedValueOnce(json({ code: 'TOKEN_EXPIRED', message: 'expired' }, 401))
        .mockResolvedValueOnce(json({ success: true, data: { accessToken: 'fresh' } }))
        .mockResolvedValueOnce(json({ success: true, data: { id: 'u1' } }));

      const client = new ApiClient({ baseUrl: 'http://localhost:4000', tokenSetter });

      await expect(client.get('/user/me')).resolves.toEqual({ id: 'u1' });
      expect(tokenSetter).toHaveBeenCalledWith('fresh');
    });

    it('does not refresh for non-token 401s (e.g. a wrong OTP)', async () => {
      const mockFetch = vi
        .fn()
        .mockResolvedValue(json({ code: 'OTP_INVALID', message: 'Incorrect code' }, 401));
      global.fetch = mockFetch;

      const client = new ApiClient({ baseUrl: 'http://localhost:4000' });

      await expect(client.post('/auth/otp/verify')).rejects.toMatchObject({ code: 'OTP_INVALID' });
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('ends the session when the refresh is rejected', async () => {
      const onUnauthorized = vi.fn();
      global.fetch = vi
        .fn()
        .mockResolvedValueOnce(json({ code: 'TOKEN_EXPIRED' }, 401))
        .mockResolvedValueOnce(json({ code: 'TOKEN_REVOKED' }, 401));

      const client = new ApiClient({ baseUrl: 'http://localhost:4000', onUnauthorized });

      await expect(client.get('/user/me')).rejects.toMatchObject({ statusCode: 401 });
      expect(onUnauthorized).toHaveBeenCalledTimes(1);
    });

    it('keeps the session on a network error during refresh', async () => {
      const onUnauthorized = vi.fn();
      global.fetch = vi
        .fn()
        .mockResolvedValueOnce(json({ code: 'TOKEN_EXPIRED' }, 401))
        .mockRejectedValueOnce(new TypeError('Failed to fetch'));

      const client = new ApiClient({ baseUrl: 'http://localhost:4000', onUnauthorized });

      const error = await client.get('/user/me').catch((e: ApiError) => e);
      expect((error as ApiError).isNetworkError).toBe(true);
      expect(onUnauthorized).not.toHaveBeenCalled();
    });

    it('shares one refresh between concurrent 401s', async () => {
      const mockFetch = vi.fn().mockImplementation((url: string) => {
        if (url.endsWith('/auth/refresh')) {
          return Promise.resolve(json({ success: true, data: { accessToken: 'fresh' } }));
        }
        const auth = (mockFetch.mock.calls.at(-1)?.[1]?.headers as Headers | undefined)?.get(
          'Authorization'
        );
        return Promise.resolve(
          auth === 'Bearer fresh'
            ? json({ success: true, data: { ok: true } })
            : json({ code: 'TOKEN_EXPIRED' }, 401)
        );
      });
      global.fetch = mockFetch;

      const client = new ApiClient({ baseUrl: 'http://localhost:4000' });
      await Promise.all([client.get('/a'), client.get('/b')]);

      const refreshCalls = mockFetch.mock.calls.filter(([url]) => String(url).endsWith('/auth/refresh'));
      expect(refreshCalls).toHaveLength(1);
    });
  });

  it('creates custom instances with createApiClient factory', () => {
    const customClient = createApiClient({
      baseUrl: 'https://thirdparty.api.com',
      apiPrefix: '/v3',
    });

    expect(customClient.buildUrl('/status')).toBe('https://thirdparty.api.com/v3/status');
  });
});
