# @timmbr/icons

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
