/**
 * Next.js Extended Fetch Options & Standard API Types
 */

export interface RequestOptions extends Omit<RequestInit, 'body'> {
  /**
   * Query parameters to append to the URL.
   */
  params?: Record<string, string | number | boolean | undefined | null>;

  /**
   * Request payload for POST/PUT/PATCH methods (will be JSON serialized if not FormData or string).
   */
  body?: unknown;

  /**
   * Explicit Bearer token override for this specific request.
   */
  token?: string;

  /**
   * Skip automatic authorization header injection.
   */
  skipAuth?: boolean;

  /**
   * Internal flag to avoid infinite retry loops on 401.
   */
  _retry?: boolean;

  /**
   * Next.js App Router caching & revalidation options.
   */
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };

  /**
   * Standard Web Request cache mode ('default', 'no-store', 'reload', 'force-cache', 'only-if-cached').
   */
  cache?: RequestCache;
}

export interface ApiClientConfig {
  /**
   * Base URL of the API (e.g. "http://localhost:4000" or "https://api.timmbr.com").
   * Defaults to process.env.NEXT_PUBLIC_API_URL or empty string (relative).
   */
  baseUrl?: string;

  /**
   * API path prefix prepended to all relative endpoints. Defaults to "/api/v1".
   */
  apiPrefix?: string;

  /**
   * Endpoint used to refresh access tokens on 401. Defaults to "/auth/refresh".
   */
  refreshEndpoint?: string;

  /**
   * Default headers applied to every request.
   */
  defaultHeaders?: Record<string, string>;

  /**
   * Getter callback for retrieving the active access token.
   */
  tokenGetter?: () => string | null | undefined | Promise<string | null | undefined>;

  /**
   * Setter callback for persisting a newly refreshed access token.
   */
  tokenSetter?: (token: string | null) => void | Promise<void>;

  /**
   * Callback invoked when a session expires and token refresh fails.
   */
  onUnauthorized?: () => void | Promise<void>;

  /**
   * Default Next.js revalidation time (in seconds) for GET requests.
   */
  defaultRevalidate?: number | false;

  /**
   * Default RequestCache mode.
   */
  defaultCache?: RequestCache;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface ApiSuccessResponse<T = unknown> {
  success: true;
  statusCode: number;
  code?: string;
  message?: string;
  data: T;
  path?: string;
  method?: string;
  timestamp?: string;
}

export interface ApiErrorResponse {
  statusCode: number;
  message: string | string[];
  error?: string;
  code?: string;
  timestamp?: string;
  path?: string;
}
