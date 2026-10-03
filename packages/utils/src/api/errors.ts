/**
 * Standard API Error Class with status code and details support.
 */
export class ApiError extends Error {
  public statusCode: number;
  public code?: string;
  public details?: unknown;

  constructor(statusCode: number, message: string, details?: unknown, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.details = details;
    this.code = code;

    // Restore prototype chain for instanceof checks
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
