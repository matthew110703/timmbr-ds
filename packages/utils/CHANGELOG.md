# @timmbr/utils

## 1.3.0

### Minor Changes

- **API client**

  - A network error (or 5xx) while refreshing the token no longer logs the user out: `onUnauthorized` runs only when the server rejects the refresh (401/403). The original refresh error is rethrown instead of a generic "Session expired".
  - `defaultRevalidate` applies to GET requests only; mutations always hit the network.
  - `URLSearchParams`, `Blob`, `ArrayBuffer`/views and `ReadableStream` bodies are sent as-is (no JSON encoding or forced `Content-Type`).
  - Empty JSON responses return `null`; malformed JSON throws an `ApiError` instead of a raw `SyntaxError`.

  **Errors**

  - New `isApiError()` type guard.
  - `ApiError` gains `isNetworkError`, `retryAfter` (from the body's `details.retryAfter` on 429s) and an optional `cause`.
  - `ApiErrorResponse` now types `details`.

  **Other**

  - `cn()` recognises the `@timmbr/theme` type scale (`text-h1`…`text-caption`) as font sizes, so tailwind-merge no longer drops one of `text-body-2 text-primary`. `THEME_TEXT_STYLES` is exported.
  - `isTokenExpired()` now treats tokens as expired `skewSeconds` _before_ `exp` (the skew was previously applied in the wrong direction).

## 1.2.0

### Minor Changes

- Add typed API client utilities, request helpers, and error types.

## 1.1.0

### Minor Changes

- Add enterprise `SideBarNavigation`, imperative `Toast` system, `LinkButton`, sidebar motion choreography variants, and JWT utilities across the design system.
