# @timmbr/auth

Browser-side sign-in for the Timmbr storefront. It is shared by the shell and every zone.

The **server side** lives only in the shell:
- `/api/auth/*`
- the session cookies
- the token refresh
- the internal key

This package is the client for those same-origin routes. It never sees a token.

## Use in a zone

```tsx
// app/layout.tsx (stays a server component)
import { AuthModalHost } from "@timmbr/auth";

<body>
  <Header />
  {children}
  <AuthModalHost />
</body>
```

```tsx
// components/Header.tsx
"use client";
import { useProfileAction } from "@timmbr/auth";

const { profileAction, onAuthTrigger } = useProfileAction();
<NavHeader authMode="modal" onAuthTrigger={onAuthTrigger} actions={{ profile: profileAction, cart }} />;
```

Add `@timmbr/auth` to `transpilePackages`.

## Server code

Import wire types and constants from `@timmbr/auth/contract`. It has no React and no `'use client'`.

## Contract

- **Envelope:** every response is `{ success, data }`. `authApi` unwraps it, so never call these routes with a raw `fetch`.
- **Sign-in URL:** `/?signin=1&returnTo=<relative path>`.
- **Broadcast:** the `timmbr_auth` BroadcastChannel carries `{ type: "LOGIN" | "LOGOUT" }`.
