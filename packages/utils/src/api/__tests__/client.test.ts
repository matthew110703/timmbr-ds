import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ApiClient, createApiClient } from '../client';
import { ApiError } from '../errors';

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
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => ({
        success: true,
        statusCode: 200,
        message: 'Product retrieved',
        data: mockData,
      }),
    });

    global.fetch = mockFetch;

    const client = new ApiClient({ baseUrl: 'http://localhost:4000' });
    const result = await client.get('/products/1');

    expect(result).toEqual(mockData);
    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:4000/api/v1/products/1',
      expect.objectContaining({
        method: 'GET',
      })
    );
  });

  it('passes Next.js cache and revalidation options to fetch', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => ({ success: true, data: { ok: true } }),
    });

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

  it('throws ApiError with status and details on failed response', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => ({
        statusCode: 404,
        code: 'NOT_FOUND',
        message: 'Page not found',
      }),
    });

    global.fetch = mockFetch;

    const client = new ApiClient({ baseUrl: 'http://localhost:4000' });

    await expect(client.get('/pages/invalid')).rejects.toThrow(ApiError);
  });

  it('injects Bearer token from tokenGetter', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: async () => ({ success: true, data: { user: 'nexus' } }),
    });

    global.fetch = mockFetch;

    const client = new ApiClient({
      baseUrl: 'http://localhost:4000',
      tokenGetter: () => 'test-jwt-token',
    });

    await client.get('/user/me');

    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:4000/api/v1/user/me',
      expect.objectContaining({
        headers: expect.any(Headers),
      })
    );

    const callHeaders = mockFetch.mock.calls[0][1].headers as Headers;
    expect(callHeaders.get('Authorization')).toBe('Bearer test-jwt-token');
  });

  it('creates custom instances with createApiClient factory', () => {
    const customClient = createApiClient({
      baseUrl: 'https://thirdparty.api.com',
      apiPrefix: '/v3',
    });

    expect(customClient.buildUrl('/status')).toBe('https://thirdparty.api.com/v3/status');
  });
});
