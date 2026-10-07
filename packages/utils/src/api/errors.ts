import type { ApiErrorResponse } from './types';

/**
 * Error thrown for failed API calls. `statusCode` 0 means the request never
 * reached the server (network/CORS failure).
 */
export class ApiError extends Error {
  public statusCode: number;
  public code?: string;
  /** The parsed error body (the API's `{ success: false, code, message, details }` envelope). */
  public details?: unknown;

  constructor(
    statusCode: number,
    message: string,
    details?: unknown,
    code?: string,
    options?: { cause?: unknown }
  ) {
    super(message, options);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.details = details;
    this.code = code;

    // Restore prototype chain for instanceof checks
    Object.setPrototypeOf(this, new.target.prototype);
  }

  /** True when the request never got a response (offline, DNS, CORS). */
  get isNetworkError(): boolean {
    return this.statusCode === 0;
  }

  /** Seconds to wait before retrying, from the body's `details.retryAfter` (429s). */
  get retryAfter(): number | undefined {
    const value = (this.details as ApiErrorResponse | undefined)?.details?.retryAfter;
    return typeof value === 'number' ? value : undefined;
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}
