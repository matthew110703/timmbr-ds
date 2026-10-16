# @timmbr/ui

## 1.13.1

### Patch Changes

- Updated dependencies
  - @timmbr/hooks@1.2.0

## 1.13.0

### Minor Changes

- Add `as` prop to `Stack` and `Inline` for polymorphic rendering.

  - `Stack` and `Inline` both accept `as?: React.ElementType`, allowing them to render as any semantic HTML element (e.g. `as="article"`, `as="section"`, `as="header"`, `as="nav"`) or a custom component while keeping their layout styles.
  - When `asChild` is also set, `asChild` takes precedence (existing Radix Slot behaviour is unchanged).
  - Fully backward-compatible — the default render element (`div`) is unchanged.

## 1.12.0

### Minor Changes

- Add `ZoneProgress` component — mount once in each zone's root layout. Handles within-zone router progress (history API patching), cross-zone navigation loading bar, and cross-zone link hover prefetch via `<link rel="prefetch">` injection.

## 1.11.1

### Patch Changes

- Updated dependencies
  - @timmbr/motion@1.2.5

## 1.11.0

### Minor Changes

- - New `RadioCard`: a selectable row or tile (icon, label, description, optional trailing element) that works inside `RadioGroup`, for choices like a payment method or a delivery speed.
  - `NavHeader`: `actions.wishlist` and `actions.cart` accept `false` to hide those actions, so a zone can show the same header in a slimmer state (e.g. checkout).

### Patch Changes

- Updated dependencies
  - @timmbr/icons@1.6.0

## 1.10.0

### Minor Changes

- Header search: recent searches and typeahead suggestions.

  - `@timmbr/ui` `NavHeader` search:
    - New `recentSearches` (with `onRecentSearchRemove`, `onClearRecentSearches` and labels), `results` (suggested products with a loading state, an empty label and a "See all results" row that submits) and `onResultSelect`.
    - The desktop popover and the mobile drawer share one panel (`NavSearchPanel`). The input is an ARIA combobox whose listbox holds only the option rows: arrow keys move through them, Enter picks the active row or submits the text, Delete removes the active recent search. With custom `popoverContent`, Enter simply submits.
    - The built-in mock "popular searches" list is gone. `popularSearches` still works, but only shows when it's passed.
    - Empty submits are ignored on desktop too. The mobile drawer honours `linkComponent` and `ariaLabel`.
    - The popover is right-aligned and wider than the input, with room for product rows.
  - `@timmbr/hooks`:
    - `useRecentSearches({ storageKey, max })`: localStorage-backed, shared live across components and tabs, and hydration-safe.
    - `useSearchSuggestions(query, fetcher, options)`: debounced, aborts superseded requests, and keeps recent answers in memory (failed requests aren't remembered, so they're retried).
  - `@timmbr/icons`: `History`.

- Listing page building blocks.

  - `@timmbr/ui`:
    - New: `FilterPanel` (with `FilterOptionList`, `FilterToggleRow`, `FilterPriceSlider`), `FilterDrawer` (full-screen two-pane mobile filters with staged changes), `FilterChips`, `Breadcrumb` and `Swatch`.
    - `FilterDrawer` group tabs follow the vertical tabs pattern (one tab stop; Up/Down/Home/End) and use generated ids, so two drawers can't clash.
    - `Drawer`: `size="full"` and `showClose`.
    - `RangeSlider`: `thumbLabels` and `resetDisabled`. Reset is now an underlined text button using theme colours (readable in dark mode).
    - `Select`: `ariaLabel`, and the visible label is now linked to the trigger.
    - `Chip`: `removeLabel`. The remove button is keyboard-reachable on non-interactive chips, and interactive chips remove on Delete/Backspace (a consumer `onKeyDown` runs first and can `preventDefault()` to opt out).
    - `Breadcrumb` only shows the mobile "…" when something is actually collapsed.
    - `NavMenuColumns` promo title uses the `text-subtitle-1` token (theme compliance).
  - `@timmbr/utils`: `listing-state`, a framework-free listing URL state: `parseListingSearchParams`, a canonical `serializeListingSearchParams`, `listingReducer`, `encodeFilters`/`decodeFilters`, `countActiveFilters` and `niceRange`.
  - `@timmbr/hooks`: `useDebouncedCallback` (`flush`/`cancel`/`isPending`).
  - `@timmbr/icons`: `SlidersHorizontal` and `ArrowUpDown`.

- Product page building blocks.

  - `@timmbr/ui`:
    - `ProductGallery`: swipeable main image (scroll-snap) with arrows, thumbnails (phones too), a "2 / 5" counter and a fullscreen viewer with pinch, double-tap and wheel zoom. `renderImage` lets apps draw with their own image component. The first image loads with high priority.
    - `ProductGallery` also has `thumbnails="left"` (a vertical column from lg up) and desktop hover zoom (`hoverZoom`, `zoomScale`): a lens over the image and a magnified pane beside it.
    - `OptionPicker`: swatches, photo tiles (`display="image"` with `imageUrl`) or compact pills in a radio group (arrow keys, one tab stop). The selected option uses the brand accent. Sold-out options are struck through but selectable, impossible combinations are disabled, and long lists become a dropdown.
    - The fullscreen viewer swipes between images on touch; its side arrows show from tablet up.
    - New `Snackbar`: `snackbar(message, { description, action, variant, duration })` (plus `.success`, `.info`, `.warning`, `.error`, `.dismiss`). One at a time at the bottom, an inverse surface with one inline action (its `onClick` receives the click event). It pauses while hovered, focused or touched, can be swiped away, and is announced to screen readers. Re-showing the same `id` updates it and restarts its timer. `SnackbarHost` (with `dismissLabel`) is mounted by `TimmbrConfigProvider`.
    - `Toast`: on phones, `toast()` shows a snackbar instead, but only while a `SnackbarHost` is mounted, so apps that render `ToastContainer` on its own keep their toasts. Toasts with a JSX action or `dismissible: false` stay toasts. `onOpenChange(false)` and the container's default `duration` carry over. Opt out per call with `layout: "toast"`, or for the whole app with `toast.mobileLayout: "toast"`. Toasts no longer overflow narrow screens, and bottom toasts and snackbars rise above pinned bars via `--toast-offset-bottom`.
    - `ProductGallery` fullscreen viewer: lifting the fingers after a pinch keeps the zoom, closing it returns focus to the image now showing, and a half-finished gesture is dropped on close.
    - `MediaCard`: the footer sits at the bottom of the card (`mt-auto`), so footers line up across a grid row when titles wrap.
    - `Price` (`md`): a wrapped discount ("48% Off") starts flush left (row gap instead of a leading margin).
    - `QuantityStepper`: − value + that stops at min/max, with arrow keys.
    - `StockMeter`: an "Only N left" line with a bar, shown only at or below a threshold.
  - `@timmbr/hooks`: `useStoredList`, a generic localStorage list (e.g. recently viewed) that is cross-tab and hydration-safe. `useRecentSearches` now uses it, with the same API.
  - `@timmbr/auth`: cart store for header badges and "in your cart" states: `useCartCount`, `useCartQuantity`, `setCartLines`, `setCartCount`, `bumpCartCount`, `loadCartCount`, `getCartCount`, `getCartQuantity`. It loads once per page through the shell's `/api/core` proxy (not once per component), reloads when the shopper changes (sign-in, or a different user), never lets an older load answer overwrite a newer update, and stays in step across tabs.
  - `@timmbr/icons`: `Minus`, `ZoomIn`, `ZoomOut`.

### Patch Changes

- Updated dependencies
- Updated dependencies
- Updated dependencies
  - @timmbr/hooks@1.1.0
  - @timmbr/icons@1.5.0
  - @timmbr/utils@1.6.0
  - @timmbr/motion@1.2.4

## 1.9.0

### Minor Changes

- bd600de: Generic helpers for data-driven navigation menus.

  - `@timmbr/utils` `mapTree(nodes, fn)`: maps any tree bottom-up (`fn` gets each node and its already-mapped children), e.g. to copy a tree with fewer fields before passing it to a client component.
  - `@timmbr/ui` `toNavMenuItems(menus, options)`: turns plain menu data (`{ id, label, groups, tiles?, aside? }`) into `NavHeader` items that open `NavMenuColumns` on desktop and `NavMenuTiles` in the mobile tab panel. Options: `crossZone`, `linkComponent`, `popoverWidth` (default `'container'`).

### Patch Changes

- Updated dependencies [bd600de]
  - @timmbr/utils@1.5.0
  - @timmbr/icons@1.4.1
  - @timmbr/motion@1.2.3

## 1.8.0

### Minor Changes

- ecc1b16: Add `NavMenuColumns` and `NavMenuPromo` (Figma 105:108 mega-menu dropdown).

  - `NavMenuColumns`: a mega-menu panel for `NavHeader` item popovers or any menu panel. It takes a flat list of groups (a bold heading, optionally linked, with links and an optional "more" link) and splits them in order into balanced columns separated by thin dividers (`packNavMenuGroups` minimises the tallest column; up to `columns`, default 3 with an aside and 4 without). An optional `aside` sits after the columns on wide screens. Links render through the header's `linkComponent` (or the component's own), fall back to plain `<a>` with `crossZone`, and close the header popover when clicked.
  - `NavMenuPromo`: an image promo card for the aside, with a headline (words in `<em>` use the display face), a subtitle, a divider and an offer badge. The whole card becomes a link when `href` is set.
  - The NavHeader mega-menu story now uses both.
  - `NavMenuTiles`: image tiles for a mobile menu panel (88px rounded squares with a one-line, truncated label; filled row by row in `rows` rows that scroll sideways; tiles without an image show the label's initial; renders nothing without items).
  - `NavHeaderItem.mobileContent`: content for the mobile/tablet tab panel, falling back to `content` (so a desktop mega menu no longer has to show on phones). The header context gains `closeMenus()`, which closes the desktop popover and the mobile panel; the menu templates call it when a link is followed.

## 1.7.0

### Minor Changes

- 6196bac: **`MediaCard`**: new `fullTitle` prop, the browser's hover text (HTML `title` attribute) so a title clamped to two lines can still be read in full. It defaults to `title` when that is a string. With `href` it is set on the title link, which covers the whole card; otherwise on the title element. `linkComponent` now also receives `title`.

## 1.6.0

### Minor Changes

- **Account area building blocks (generic, no business logic)**

  `@timmbr/ui`

  - **`SubNav`**: in-page section navigation. It's a vertical list on desktop and a horizontally scrolling row on small screens. It sets the active item from `activeHref` (the most specific nested match wins) with `aria-current="page"`, and has a `footer` slot and a `linkComponent`. `mobileLayout="wrap"` wraps the items onto several lines on small screens instead of scrolling. The active item uses dark brand text on a light tint plus an edge bar (WCAG AA). `SubNavAction` is a footer button shaped like the items (icon column, `tone="destructive"`, `loading`).
  - **`PageHeader`**: page or section title with `description`, `actions`, a `back` link and a heading level (`as`).
  - **`Stepper`**: progress tracker. Steps before `current` are complete, `status="error"` marks the current step as failed, and it can be horizontal or vertical.
  - **`MediaCard`**: layout template with `media`, `title`, `subtitle`, `meta`, `aside` and `footer` slots, in vertical (grid) or horizontal (list row) orientation. Build feature cards (products, line items…) on top of it. Also `eyebrow` (above the title), `mediaTopStart` / `mediaTopEnd` overlays (badges, a wishlist toggle), `mediaZoom`, `mediaClassName` and `titleClassName`.
  - **`Price`**: price with a struck-through `compareAt` and the saving ("51% Off", via `formatDiscount`); `discountPercent()` helper.
  - **`Rating`**: read-only average rating "4.5 ★ (817)" with an accessible description.
  - **`Button`**: new `destructive-outline` and `destructive-ghost` variants.
  - **`AlertDialog`**: `AlertDialogAction` / `AlertDialogCancel` are now styled as Buttons (`variant`, `size`; primary / outline by default, untouched with `asChild`). New `AlertDialogMedia` icon circle (`tone`).
  - **`ResponsiveDialog`**: one API that renders a centred Dialog from `breakpoint` up (default 640px) and a bottom sheet below it. **`Drawer`** gains `DrawerBody` (scrolls on its own), styled `DrawerTitle` / `DrawerDescription`, a flex layout and safe-area padding on the bottom side.
  - **`Tabs`**: `TabsList scrollable` lets the row scroll sideways when it doesn't fit and shows round chevron buttons at the edges with more tabs; the `underline` variant has tighter spacing between tabs.
  - **`Grid`**: `rowGap` / `colGap` now emit literal `gap-y-*` / `gap-x-*` classes, so Tailwind in the consuming app generates them (they used to be built at runtime and silently had no effect).
  - **Theme tokens and primitives (one place to change):** the components added or changed in this release use semantic theme tokens (`bg-card`, `border-border`, `text-muted-foreground`, `bg-secondary`/`text-secondary-foreground`, `ring-ring`) instead of palette steps, and render their text through `Text`. `Text`/`Heading`/`Icon` `foreground="muted"` now reads `text-muted-foreground` (same colour).
  - **`Card`**: `sectioned` (the padding moves to CardHeader / CardContent / CardFooter so dividers run edge to edge), `CardHeader divider` and `actions`, `CardFooter justify`, `selected`, `variant="inset"`, a focus ring on `interactive`. Fix: `CardDescription` used the beige `text-muted` surface colour.
  - **`IconTile`** (new): an icon in a tinted circle (`size`, `tone`).
  - **`List`**: `divided` combines with `variant="bordered"`; `ListItem asChild` renders a link row inside the `<li>`; focus ring on interactive rows.
  - **`DataList`**: `inset` (edge-to-edge rows), `orientation="justified"` (summaries), `DataListItem emphasis="total"`, `DataListLabel tone="strong"` and `description`, `DataListAction`.
  - **`Text`**: `variant="overline"`, `tabular`, `truncate`; `foreground="success" | "warning"` on Text, Heading and Icon.
  - **Layout**: `Stack direction` (responsive), responsive `gap` objects (`{ base: 6, lg: 8 }`) and half steps (0.5 / 1.5 / 2.5) on Stack / Inline / Grid, `Inline rowGap` / `colGap`, `Grid cols.base` and `template` (CSS variable per breakpoint), `GridItem span`. All emitted classes are literal, so the consuming app's Tailwind generates them.
  - **Forms**: `Fieldset` (legend + gap), `FormActions` (stacked on phones, a row from `sm`, optional divider), `ResponsiveDialogForm` (form wrapping the body and the pinned footer).
  - **Dialogs**: `size` on `AlertDialogContent` / `ResponsiveDialogContent`; `AlertDialogHeader` spaces `AlertDialogMedia`; `ConfirmDialog` (new) stays open with a spinner until `onConfirm` settles.
  - **Buttons**: fix — `variant="link"` keeps its inline size at any `size`; `size="icon-sm"`, `shape="circle"`, `variant="overlay"` (pressed state), `fullWidth`; icons sized by button size. `LinkButton`: `variant="back"`, `fullWidth`.
  - **`MediaCard`**: `href` + `linkComponent` (stretched title link), `mediaFallback`, any CSS `ratio`, `titleSize`, `spacing="relaxed"`.
  - **`Pagination`**: fix — `PaginationLink asChild` now works; Previous / Next take `href` + `linkComponent` (URL paging), `label` / `ariaLabel` (localisable), `disabled`; new `PaginationSummary`.
  - **`PageHeader`**: `titleId`; `back` renders through `LinkButton variant="back"` (base-path aware; `crossZone` for another app). **`EmptyState`**: `fullWidth`. **`TabsList`**: `loading`. **`VisuallyHidden`** (new).
  - **`DropdownMenuItem`**: `icon` (also placed inside an `asChild` link) and `destructive` props; NavHeader menus use them.
  - **Storybook**: every story is grouped as Foundations · Layout · Typography · Actions · Forms · Data Display · Feedback · Overlays · Navigation, matching the README.
  - **`Badge`**: new `warning` and `info` variants.
  - **NavHeader**: actions accept a `menu` (`NavActionMenuItem[]`). In the desktop bar the action opens a dropdown menu. On mobile and in the overflow it stays a plain link to its `href`.

  `@timmbr/utils`

  - `formatCurrency(amount, currency = 'INR', locale = 'en-IN')` drops decimals for whole amounts and accepts numeric strings.
  - `formatDate(date, preset | Intl options, locale)` with presets in `DATE_FORMATS` (`date`, `dateTime`, `time`).

  `@timmbr/icons`

  - `Truck`, `MapPin`, `Lock`, `Pencil`, `Receipt`, `ShoppingBag`, `ShieldCheck`, `Star`, `Palette`, `LocateFixed`, `KeyRound`, `Smartphone`, `MessageSquareText`, `Mail`, `MonitorSmartphone`.

  `@timmbr/auth`

  - `useProfileAction({ menuItems })`: when signed in, the profile action gets a desktop menu made of the zone's links plus **Log out**. The menu copy is in `messages.profile.logout`. Log out has the `LogOut` icon (override with `logoutIcon`) and is marked destructive.
  - `signOut(options)` logs out on this device and leaves protected pages (default `/account/*`, so the user goes to `/`). `signOutEverywhere(options)` revokes every session.
  - Contract routes `passwordChange` (`POST /api/auth/password/change`) and `logoutAll` (`POST /api/auth/logout-all`), plus `authApi.changePassword()` and `authApi.logoutAll()`. The shell must serve both routes.

### Patch Changes

- Updated dependencies
  - @timmbr/utils@1.4.0
  - @timmbr/icons@1.4.0
  - @timmbr/motion@1.2.2

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
