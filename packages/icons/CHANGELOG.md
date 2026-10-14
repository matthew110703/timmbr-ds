# @timmbr/icons

## 1.6.0

### Minor Changes

- Export `CreditCard`, `Landmark`, `Banknote`, `QrCode`, `CalendarClock` and `XCircle`.

## 1.5.0

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
  - @timmbr/utils@1.6.0

## 1.4.1

### Patch Changes

- Updated dependencies [bd600de]
  - @timmbr/utils@1.5.0

## 1.4.0

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

## 1.3.0

### Minor Changes

- Add `GoogleIcon`, `AppleIcon` and `GitHubIcon` brand icons (accept all SVG props; `aria-hidden` by default). `GoogleIcon` keeps Google's official brand colours; Apple and GitHub use `currentColor`.

### Patch Changes

- Updated dependencies
  - @timmbr/utils@1.3.0

## 1.2.1

### Patch Changes

- Updated dependencies
  - @timmbr/utils@1.2.0

## 1.2.0

### Minor Changes

- Add accessible `AlertDialog` and `ImageUpload` component suites to `@timmbr/ui`, and export additional media icons from `@timmbr/icons`.

  - **AlertDialog**: Radix-based accessible modal confirmation with `@timmbr/motion` animations, CVA variants, and clean spacing.
  - **ImageUpload**: Multi-format image and video upload component with dropzone, single preview, thumbnail cards, and modal previews.
  - **Icons**: Added `UploadCloud`, `ImageIcon`, `Play`, `Film`, `Video`, and `Maximize2` exports.

## 1.1.0

### Minor Changes

- Add enterprise `SideBarNavigation`, imperative `Toast` system, `LinkButton`, sidebar motion choreography variants, and JWT utilities across the design system.

### Patch Changes

- Updated dependencies
  - @timmbr/utils@1.1.0
