import { ApiError } from './errors';
import type {
  ApiClientConfig,
  ApiErrorResponse,
  ApiSuccessResponse,
  PaginatedResult,
  RequestOptions,
} from './types';
import { ACCESS_TOKEN_COOKIE } from '../jwt';

interface QueuedRequest {
  resolve: (token: string | null) => void;
  reject: (error: Error) => void;
}

/** The server refused the refresh (401/403), i.e. the session is really over. */
function isSessionRejected(error: unknown): boolean {
  return error instanceof ApiError && (error.statusCode === 401 || error.statusCode === 403);
}

/** Bodies `fetch` sends as-is; everything else is JSON-encoded. */
function isRawBody(body: unknown): boolean {
  return (
    typeof body === 'string' ||
    (typeof FormData !== 'undefined' && body instanceof FormData) ||
    (typeof URLSearchParams !== 'undefined' && body instanceof URLSearchParams) ||
    (typeof Blob !== 'undefined' && body instanceof Blob) ||
    body instanceof ArrayBuffer ||
    ArrayBuffer.isView(body) ||
    (typeof ReadableStream !== 'undefined' && body instanceof ReadableStream)
  );
}

export class ApiClient {
  private baseUrl: string;
  private apiPrefix: string;
  private refreshEndpoint: string;
  private defaultHeaders?: Record<string, string>;
  private tokenGetter?: () => string | null | undefined | Promise<string | null | undefined>;
  private tokenSetter?: (token: string | null) => void | Promise<void>;
  private onUnauthorized?: () => void | Promise<void>;
  private defaultRevalidate?: number | false;
  private defaultCache?: RequestCache;

  // Token refresh concurrency mutex
  private isRefreshing = false;
  private failedQueue: QueuedRequest[] = [];

  constructor(config?: ApiClientConfig) {
    const globalProcess = typeof globalThis !== 'undefined'
      ? (globalThis as { process?: { env?: Record<string, string | undefined> } }).process
      : undefined;

    const rawBaseUrl = config?.baseUrl ?? globalProcess?.env?.NEXT_PUBLIC_API_URL ?? '';

    this.apiPrefix = config?.apiPrefix ?? '/api/v1';
    this.refreshEndpoint = config?.refreshEndpoint ?? '/auth/refresh';

    // Normalize base URL without trailing slashes and without duplicated api prefix
    const cleanHost = rawBaseUrl
      .replace(/\/+$/, '')
      .replace(new RegExp(`${this.apiPrefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\/?$`), '');

    this.baseUrl = cleanHost ? `${cleanHost}${this.apiPrefix}` : this.apiPrefix;
    this.defaultHeaders = config?.defaultHeaders;
    this.tokenGetter = config?.tokenGetter;
    this.tokenSetter = config?.tokenSetter;
    this.onUnauthorized = config?.onUnauthorized;
    this.defaultRevalidate = config?.defaultRevalidate;
    this.defaultCache = config?.defaultCache;
  }

  public setTokenGetter(getter: () => string | null | undefined | Promise<string | null | undefined>) {
    this.tokenGetter = getter;
  }

  public setTokenSetter(setter: (token: string | null) => void | Promise<void>) {
    this.tokenSetter = setter;
  }

  public setOnUnauthorized(callback: () => void | Promise<void>) {
    this.onUnauthorized = callback;
  }

  private processQueue(error: Error | null, token: string | null = null) {
    this.failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
    this.failedQueue = [];
  }

  public buildUrl(
    endpoint: string,
    params?: Record<string, string | number | boolean | undefined | null>
  ): string {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

    // If endpoint is already a full absolute URL, use it directly
    if (/^https?:\/\//i.test(endpoint)) {
      const url = new URL(endpoint);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            url.searchParams.append(key, String(value));
          }
        });
      }
      return url.toString();
    }

    const fullPath = `${this.baseUrl}${cleanEndpoint}`;

    // For relative URLs in SSR or client
    if (typeof window === 'undefined' && !this.baseUrl.startsWith('http')) {
      const qs = params
        ? Object.entries(params)
            .filter(([, v]) => v !== undefined && v !== null)
            .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
            .join('&')
        : '';
      return qs ? `${fullPath}?${qs}` : fullPath;
    }

    const baseOrigin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    const url = new URL(fullPath, this.baseUrl.startsWith('http') ? this.baseUrl : baseOrigin);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return url.toString();
  }

  /**
   * Attempts to refresh the access token using credentials / HTTP-only refresh cookie.
   */
  private async executeTokenRefresh(): Promise<string> {
    const refreshUrl = this.buildUrl(this.refreshEndpoint);

    let response: Response;
    try {
      response = await fetch(refreshUrl, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (networkError) {
      throw new ApiError(0, 'Network error: Unable to connect to server', null, undefined, {
        cause: networkError,
      });
    }

    if (!response.ok) {
      throw new ApiError(response.status, 'Session expired. Please log in again.');
    }

    const payload = await response.json();
    const accessToken: string = payload?.data?.accessToken || payload?.accessToken;

    if (!accessToken) {
      throw new ApiError(500, 'Malformed refresh token response from server');
    }

    if (this.tokenSetter) {
      await this.tokenSetter(accessToken);
    }

    return accessToken;
  }

  /**
   * Public interface to refresh the access token with mutex locking.
   */
  public async refreshToken(): Promise<string> {
    if (this.isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        this.failedQueue.push({
          resolve: (token) => {
            if (token) resolve(token);
            else reject(new ApiError(401, 'Session expired. Please log in again.'));
          },
          reject,
        });
      });
    }

    this.isRefreshing = true;

    try {
      const newAccessToken = await this.executeTokenRefresh();
      this.processQueue(null, newAccessToken);
      return newAccessToken;
    } catch (refreshError) {
      this.processQueue(refreshError as Error, null);
      // Only a rejected refresh ends the session. A network blip or a 5xx
      // doesn't mean the refresh token is invalid.
      if (this.onUnauthorized && isSessionRejected(refreshError)) {
        await this.onUnauthorized();
      }
      throw refreshError;
    } finally {
      this.isRefreshing = false;
    }
  }

  public async request<T = unknown>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { params, body, headers, token, skipAuth, _retry, _envelope, next, cache, ...restOptions } = options;

    const isRefreshRoute = endpoint === this.refreshEndpoint;
    const requestHeaders = new Headers(this.defaultHeaders);

    if (headers) {
      new Headers(headers).forEach((value, key) => {
        requestHeaders.set(key, value);
      });
    }

    const sendsJson = body !== undefined && body !== null && !isRawBody(body);
    if (sendsJson && !requestHeaders.has('Content-Type')) {
      requestHeaders.set('Content-Type', 'application/json');
    }

    // Auth resolution
    if (!skipAuth && !isRefreshRoute) {
      let resolvedToken = token;
      if (!resolvedToken && this.tokenGetter) {
        resolvedToken = (await this.tokenGetter()) || undefined;
      }

      // Automatically resolve token from server cookies in Next.js Server Components
      if (!resolvedToken && typeof window === 'undefined') {
        try {
          const dynamicImport = new Function('specifier', 'return import(specifier)');
          const nextHeaders = (await dynamicImport('next/headers')) as {
            cookies: () => Promise<{ get: (name: string) => { value?: string } | undefined }>;
          };
          const cookieStore = await nextHeaders.cookies();
          resolvedToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
        } catch {
          // Outside Next.js server context or static generation
        }
      }

      if (resolvedToken && !requestHeaders.has('Authorization')) {
        requestHeaders.set('Authorization', `Bearer ${resolvedToken}`);
      }
    }

    const url = this.buildUrl(endpoint, params);

    let serializedBody: BodyInit | null | undefined = undefined;
    if (body !== undefined && body !== null) {
      serializedBody = sendsJson ? JSON.stringify(body) : (body as BodyInit);
    }

    const method = (restOptions.method ?? 'GET').toUpperCase();

    // Next.js Extended Fetch Options
    const fetchInit: RequestInit & { next?: { revalidate?: number | false; tags?: string[] } } = {
      ...restOptions,
      headers: requestHeaders,
      body: serializedBody,
      credentials: restOptions.credentials || 'include',
    };

    if (cache || this.defaultCache) {
      fetchInit.cache = cache || this.defaultCache;
    }

    // ISR caching only makes sense for reads; mutations always hit the network.
    const defaultRevalidate =
      method === 'GET' && !fetchInit.cache ? this.defaultRevalidate : undefined;
    if (next || defaultRevalidate !== undefined) {
      fetchInit.next = {
        revalidate: next?.revalidate ?? defaultRevalidate,
        tags: next?.tags,
      };
    }

    let response: Response;
    try {
      response = await fetch(url, fetchInit as RequestInit);
    } catch (networkError) {
      throw new ApiError(0, 'Network error: Unable to connect to server', networkError, undefined, {
        cause: networkError,
      });
    }

    // Handle 401 Unauthorized with token refresh mutex
    if (response.status === 401 && !skipAuth && !isRefreshRoute && !_retry) {
      let isJwtError = true;
      try {
        const errorJson = (await response.clone().json()) as ApiErrorResponse;
        if (errorJson?.code) {
          isJwtError =
            errorJson.code === 'TOKEN_EXPIRED' ||
            errorJson.code === 'UNAUTHORIZED' ||
            errorJson.code === 'TOKEN_INVALID';
        }
      } catch {
        // Fallback: retry with refresh token
      }

      if (isJwtError) {
        const newAccessToken = await this.refreshToken();
        return this.request<T>(endpoint, {
          ...options,
          token: newAccessToken,
          _retry: true,
        });
      }
    }

    if (!response.ok) {
      let errorMessage = `HTTP error ${response.status}`;
      let errorDetails: unknown = null;
      let errorCode: string | undefined = undefined;

      try {
        const errorJson = (await response.json()) as ApiErrorResponse;
        if (Array.isArray(errorJson.message)) {
          errorMessage = errorJson.message.join(', ');
        } else if (typeof errorJson.message === 'string') {
          errorMessage = errorJson.message;
        }
        errorCode = errorJson.code;
        errorDetails = errorJson;
      } catch {
        errorMessage = response.statusText || errorMessage;
      }

      throw new ApiError(response.status, errorMessage, errorDetails, errorCode);
    }

    if (response.status === 204) {
      return null as T;
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const text = await response.text();
      if (!text) return null as T;

      let json: unknown;
      try {
        json = JSON.parse(text);
      } catch (parseError) {
        throw new ApiError(response.status, 'Malformed JSON response from server', text, undefined, {
          cause: parseError,
        });
      }
      // Seamlessly unwrap NestJS standard envelope { success: true, data: T }
      if (
        !_envelope &&
        json &&
        typeof json === 'object' &&
        'data' in json &&
        (json as ApiSuccessResponse).success === true
      ) {
        return (json as ApiSuccessResponse<T>).data;
      }
      return json as T;
    }

    return (await response.text()) as unknown as T;
  }

  public get<T = unknown>(endpoint: string, options?: Omit<RequestOptions, 'body'>): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  /**
   * GET a paginated list, keeping the pagination `meta` that `get` drops when
   * it unwraps the envelope: `{ data: T[], meta: { page, total, … } }`.
   */
  public async getPaginated<T = unknown>(
    endpoint: string,
    options?: Omit<RequestOptions, 'body'>
  ): Promise<PaginatedResult<T>> {
    const envelope = await this.request<Partial<PaginatedResult<T>> | null>(endpoint, {
      ...options,
      method: 'GET',
      _envelope: true,
    });
    const data = Array.isArray(envelope?.data) ? envelope.data : [];
    const meta = envelope?.meta ?? {
      page: 1,
      limit: data.length,
      total: data.length,
      totalPages: 1,
      hasNextPage: false,
      hasPrevPage: false,
    };
    return { data, meta };
  }

  public post<T = unknown>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'POST', body });
  }

  public put<T = unknown>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body });
  }

  public patch<T = unknown>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'PATCH', body });
  }

  public delete<T = unknown>(endpoint: string, options?: Omit<RequestOptions, 'body'>): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

/**
 * Factory function to create custom ApiClient instances.
 */
export function createApiClient(config?: ApiClientConfig): ApiClient {
  return new ApiClient(config);
}

/**
 * Default singleton API client instance for global usage.
 */
export const api = new ApiClient();
