# @timmbr/ui

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
