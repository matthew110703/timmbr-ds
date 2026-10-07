# @timmbr/hooks

## 1.0.0

### Patch Changes

- First stable release.

  - `useAuthModal` now reads a shared store (`useSyncExternalStore`), so every instance — including ones mounted after the modal opened — sees the same `isOpen` / `modalOptions`. Options are cleared on close.
  - Removed `setIsOpen` (it only changed one instance and broke sync) and the unused `returnUrl` option. Use `open()` / `close()` or `openAuthModal()` / `closeAuthModal()`.
  - The package build is marked `'use client'` (all exports are client hooks) and is no longer minified.
