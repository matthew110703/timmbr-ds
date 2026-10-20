# @timmbr/hooks

## 1.3.0

### Minor Changes

- Add eight new utility hooks: `useDebounce`, `useIsomorphicLayoutEffect`, `useEventListener`, `useOnClickOutside`, `useWindowSize`, `useLocalStorage`, `usePrevious`, `useToggle`.

## 1.2.0

### Minor Changes

- Add `usePrefersReducedMotion` hook

## 1.1.0

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

## 1.0.0

### Patch Changes

- First stable release.

  - `useAuthModal` now reads a shared store (`useSyncExternalStore`), so every instance — including ones mounted after the modal opened — sees the same `isOpen` / `modalOptions`. Options are cleared on close.
  - Removed `setIsOpen` (it only changed one instance and broke sync) and the unused `returnUrl` option. Use `open()` / `close()` or `openAuthModal()` / `closeAuthModal()`.
  - The package build is marked `'use client'` (all exports are client hooks) and is no longer minified.
