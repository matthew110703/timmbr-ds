/**
 * Executes an asynchronous API request within a safe try-catch wrapper,
 * returning the provided fallback value when an error occurs while logging a formatted warning.
 *
 * @param apiFn - Async function returning a promise of T
 * @param fallback - Fallback value returned if the request throws
 * @param logPrefix - Optional log prefix for debug/warning output (default: '[API]')
 * @returns The resolved data or fallback value
 */
export async function safeApiCall<T>(
  apiFn: () => Promise<T>,
  fallback: T,
  logPrefix: string = '[API]'
): Promise<T> {
  try {
    const result = await apiFn();
    return result ?? fallback;
  } catch (error) {
    console.warn(`${logPrefix} Request failed, returning fallback:`, error);
    return fallback;
  }
}
