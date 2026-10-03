import { ApiError } from './errors';
import type {
  ApiClientConfig,
  ApiErrorResponse,
  ApiSuccessResponse,
  RequestOptions,
} from './types';
import { ACCESS_TOKEN_COOKIE } from '../jwt';

interface QueuedRequest {
  resolve: (token: string | null) => void;
  reject: (error: Error) => void;
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

    const response = await fetch(refreshUrl, {
      method: 'POST',
      credentials: 'include',
    });

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
      if (this.onUnauthorized) {
        await this.onUnauthorized();
      }
      throw refreshError;
    } finally {
      this.isRefreshing = false;
    }
  }

  public async request<T = unknown>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { params, body, headers, token, skipAuth, _retry, next, cache, ...restOptions } = options;

    const isRefreshRoute = endpoint === this.refreshEndpoint;
    const requestHeaders = new Headers(this.defaultHeaders);

    if (headers) {
      new Headers(headers).forEach((value, key) => {
        requestHeaders.set(key, value);
      });
    }

    if (!requestHeaders.has('Content-Type') && body && !(body instanceof FormData)) {
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
      serializedBody =
        body instanceof FormData || typeof body === 'string' ? (body as BodyInit) : JSON.stringify(body);
    }

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

    if (next || this.defaultRevalidate !== undefined) {
      fetchInit.next = {
        revalidate: next?.revalidate ?? this.defaultRevalidate,
        tags: next?.tags,
      };
    }

    let response: Response;
    try {
      response = await fetch(url, fetchInit as RequestInit);
    } catch (networkError) {
      throw new ApiError(0, 'Network error: Unable to connect to server', networkError);
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
        try {
          const newAccessToken = await this.refreshToken();
          return this.request<T>(endpoint, {
            ...options,
            token: newAccessToken,
            _retry: true,
          });
        } catch {
          throw new ApiError(401, 'Session expired. Please log in again.');
        }
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
      const json = await response.json();
      // Seamlessly unwrap NestJS standard envelope { success: true, data: T }
      if (json && typeof json === 'object' && 'data' in json && (json as ApiSuccessResponse).success === true) {
        return (json as ApiSuccessResponse<T>).data;
      }
      return json as T;
    }

    return (await response.text()) as unknown as T;
  }

  public get<T = unknown>(endpoint: string, options?: Omit<RequestOptions, 'body'>): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
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
