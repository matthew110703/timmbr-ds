# @timmbr/ui

## 1.5.0

### Minor Changes

- **AuthModal** — new sign-in modal with a full step flow: `IDENTIFIER` → `OTP` | `PASSWORD` → `SET_PASSWORD` (create / reset) → `SUCCESS`.

  - Steps: email/phone identifier with "Use password instead", one-time code with resend countdown, password sign-in with "Forgot password?", create/reset password (create is skippable), success confirmation.
  - All copy is overridable via the `labels` prop (`DEFAULT_AUTH_MODAL_LABELS` exported).
  - Accessible: labelled inputs, errors announced (`role="alert"`, `aria-invalid`, `aria-describedby`), buttons keep their name while loading (`aria-busy`), focus moves to the heading on the success step.
  - Forms never fall back to a native page-reloading submit.
  - The promo banner renders only from consumer-provided data (no hardcoded image or campaign copy); `banner.promoTermsUrl` replaces `termsUrl`.
  - OAuth providers are disabled while a request is in flight; built-in Google / Apple / GitHub icons come from `@timmbr/icons`.

  **Theme compliance** — every component now takes colour and type strictly from `@timmbr/theme`:

  - Hard-coded hex values, Tailwind default palette colours (`red-500`, `emerald-500`, `slate-*`…) and `white`/`black` are replaced with theme tokens (`primary-*`, `grey-*`, `destructive`, `success`, `warning`, `border-warm`…).
  - Font sizes use the theme type scale (`text-h1`…`text-h6`, `text-subtitle-*`, `text-body-*`, `text-caption*`) instead of Tailwind sizes / arbitrary pixels. `Heading` and `Text` variants map 1:1 to the scale.
  - Monospace digits use `tabular-nums` (theme font) instead of `font-mono`.
  - A `theme-compliance` test now fails the build on any non-theme colour or type class in components.
  - Visual note: text that previously used the (then non-functional) semantic classes such as `text-foreground` now renders with the intended theme colours, and line-height follows the scale (1.3).

  **Spinner**

  - Colour lives on the wrapper and the icon inherits it, so `className="text-…"` now recolours the spinner (fixes invisible white spinners on primary buttons).
  - New `iconClassName` and `decorative` (no status role; for use inside busy buttons) props.
  - `spinnerVariants` now carries only `variant`; sizes moved to the new `spinnerIconVariants`. Update any direct imports of `spinnerVariants({ size })`.

  **NavHeader**

  - Default actions are ordered Wishlist, Cart, Profile; Profile has high priority so it stays visible when space is tight.
  - The mobile actions bar now honours `authMode` / `onAuthTrigger`, and the auth trigger uses `openAuthModal()` from `@timmbr/hooks`.
  - The brand logo cross-fades to the mini logo when search expands (both stay mounted; no blink).

  **OtpInput** — `defaultValue` is now applied; errors are announced and linked to the input; uses theme tokens.

- **NavHeader profile action without layout shift**

  - New `isLoading` on nav action items: the label slot shows a skeleton instead of the text (also in the overflow menu), and the button gets `aria-busy`.
  - New `labelClassName` on nav action items. The profile label slot (`PROFILE_LABEL_CLASS`) is centred under the icon and sized to its text between the width of LOGIN and 64px, so the loading skeleton and LOGIN are the same width (no shift for signed-out visitors) and gaps stay even. Long names are truncated, and the full text is kept in `title`.
  - The default profile label is now `LOGIN` (was `PROFILE`).

### Patch Changes

- Updated dependencies
  - @timmbr/utils@1.3.0
  - @timmbr/hooks@1.0.0
  - @timmbr/icons@1.3.0
  - @timmbr/theme@1.3.0
  - @timmbr/motion@1.2.1

## 1.4.2

### Patch Changes

- Add a font family option to the Text component.

## 1.4.1

### Patch Changes

- Export the NavFooter component and its related types and utilities from the package entry point.

## 1.4.0

### Minor Changes

- Add a configurable NavFooter component with responsive navigation and content sections.

### Patch Changes

- Updated dependencies
  - @timmbr/theme@1.2.0
  - @timmbr/motion@1.2.0
  - @timmbr/utils@1.2.0
  - @timmbr/icons@1.2.1

## 1.3.1

### Patch Changes

- Fix NavBrand miniLogo DOM conditional rendering and NavActions overflow slot reservation.

## 1.3.0

### Minor Changes

- ### NavHeader Mobile Responsiveness & Modular Architecture

  - **Mobile & Tablet Responsive Flow**: Horizontal category tab slider with cross-browser hidden scrollbars and expandable category drawer.
  - **Mobile Full-Screen Search Drawer**: Accessible search drawer modal with back navigation, real-time input clear, and popular search suggestion chips.
  - **Dynamic Space-Aware Action Overflow**: Automatic viewport measurement and overflow popover menu for action items.
  - **Modular Configuration Architecture**: Cohesive configuration objects (`navigation`, `actions`, `mobile`, `search`, `offerBanner`) with seamless backward-compatible normalization for flat shorthand props.
  - **Master Section Toggles**: `showNavItems`, `showSearch`, `showActions`, and `showOfferBanner`.
  - **Icon Badge Count Presentation**: Clean circular badge attachments on icons with decoupled text labels.

## 1.2.0

### Minor Changes

- Add accessible `AlertDialog` and `ImageUpload` component suites to `@timmbr/ui`, and export additional media icons from `@timmbr/icons`.

  - **AlertDialog**: Radix-based accessible modal confirmation with `@timmbr/motion` animations, CVA variants, and clean spacing.
  - **ImageUpload**: Multi-format image and video upload component with dropzone, single preview, thumbnail cards, and modal previews.
  - **Icons**: Added `UploadCloud`, `ImageIcon`, `Play`, `Film`, `Video`, and `Maximize2` exports.

### Patch Changes

- Updated dependencies
  - @timmbr/icons@1.2.0

## 1.1.0

### Minor Changes

- Add enterprise `SideBarNavigation`, imperative `Toast` system, `LinkButton`, sidebar motion choreography variants, and JWT utilities across the design system.

### Patch Changes

- Updated dependencies
  - @timmbr/motion@1.1.0
  - @timmbr/icons@1.1.0
  - @timmbr/theme@1.1.0
  - @timmbr/utils@1.1.0
