# @timmbr/theme

## 1.3.0

### Minor Changes

- - **Semantic colour tokens** are now registered with Tailwind (`@theme inline`), so `text-foreground`, `text-muted-foreground`, `bg-background`, `bg-card`, `border-border`, `bg-secondary`, `ring-ring`, … generate real utilities and follow light/dark mode. Previously these classes produced no CSS.
  - **Type scale as Tailwind utilities** (`@utility`): `text-h1`…`text-h6`, `text-page-title`, `text-subtitle-1/2`, `text-body-1/2/3` (+ `-medium`, `-semibold`, `-light`). They set family, size, line-height and default weight, while `font-*`, `leading-*` and `tracking-*` placed alongside still apply.
  - **New caption sizes**: `text-caption` (10px) and `text-caption-lg` (11px).
  - The plain `.font-display` / `.font-sans` / `.font-title` classes were removed; the equivalent Tailwind utilities (from the `--font-*` tokens) are unchanged.
  - JS `tokens`: semantic colours now match the CSS (`success` #059669, `warning` #D97706, `error` #DC2626, `info` #2563EB) and `typography.styles` gains `caption` and `captionLg`.

## 1.2.0

### Minor Changes

- Add footer layout tokens and Tailwind theme mappings.

## 1.1.0

### Minor Changes

- Add enterprise `SideBarNavigation`, imperative `Toast` system, `LinkButton`, sidebar motion choreography variants, and JWT utilities across the design system.
