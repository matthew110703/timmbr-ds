# @timmbr/auth

## 1.0.0

### Major Changes

- New package: browser-side sign-in for the storefront, shared by the shell and every zone. It talks to the shell's same-origin `/api/auth/*` BFF and never sees a token.

  - `<AuthModalHost />`: mount once per zone layout, next to `{children}`. It loads the session, syncs logins and logouts across tabs, renders the auth modal (lazy-loaded on first open, with the banner from `GET /api/auth/banner`) and handles `?signin=1&returnTo=`.
  - `useProfileAction()`: NavHeader profile props that are the same everywhere. It shows a skeleton while loading, LOGIN when signed out (opening the modal in place) and the first name when signed in (linking to `/account`).
  - Session store (`useSession`, `loadSession`, `whenSessionReady`, `logout`, `getFirstName`), `authApi`, `useAuthFlow` and `authErrorMessage`, with all copy overridable.
  - `AuthModalHost` accepts `className` (the dialog, e.g. `max-w-[960px]`) and `oauthPopup` (`{ width, height }` of the Google popup window).
  - `@timmbr/auth/contract`: `AUTH_ROUTES` (every BFF path and method, defined once; the shell builds its route table from it), wire types and constants (`SessionUser`, `SignInResult`, `SIGN_IN_PARAM`, `safeReturnTo`, the OAuth popup messages…), free of React and safe to import from server code.

### Patch Changes

- Updated dependencies
  - @timmbr/ui@1.5.0
