# @timmbr/theme

Design tokens, Tailwind CSS v4 `@theme` styles, typography definitions, and presets for the Timmbr Design System, directly grounded in Figma specifications.

---

## Token Inventory (Figma Direct Alignment)

### 1. Typography Hierarchy
- **Headings (H1–H6)**: Set in `DM Serif Display` (Regular 400, Line Height `1.3em`).
  - `h1`: 64px (4rem) — `.text-h1`
  - `h2`: 48px (3rem) — `.text-h2`
  - `h3`: 32px (2rem) — `.text-h3`
  - `h4`: 24px (1.5rem), tracking `-0.02em` — `.text-h4`
  - `h5`: 20px (1.25rem) — `.text-h5`
  - `h6`: 20px (1.25rem) — `.text-h6`
- **Subtitles & Body & Captions**: Set in `Manrope` (Line Height `1.3em`).
  - `Subtitle 1` & `Subtitle 2`: 18px, SemiBold 600 — `.text-subtitle-1`, `.text-subtitle-2`
  - `Body 1`: 16px, Regular 400 — `.text-body-1`
  - `Body 2 Medium`: 14px, Medium 500 — `.text-body-2-medium`
  - `Body 2 Semibold`: 14px, SemiBold 600 — `.text-body-2-semibold`
  - `Body 2`: 14px, Regular 400 — `.text-body-2`
  - `Body 2 Light`: 14px, Light 300 — `.text-body-2-light`
  - `Body 3`: 12px, Regular 400 — `.text-body-3`
  - `Body 3 Light (Captions)`: 12px, Light 300 — `.text-body-3-light`
- **Component & Page Titles**: Set in `Outfit` (Bold 700, Line Height `1.3em`).
  - `Page Title`: 48px — `.text-page-title`

### 2. Primary Palette (Terra-cotta Timber Scale)
- `1000`: `#60321D` (`--color-primary-1000`)
- `900`: `#733C23` (`--color-primary-900`)
- `800`: `#864629` (`--color-primary-800`)
- `700`: `#9A502E` (`--color-primary-700`)
- `600`: `#AD5A34` (`--color-primary-600`)
- **`500` (Base / Main)**: `#C0643A` (`--color-primary` / `--color-primary-500`)
- `400`: `#C6744E` (`--color-primary-400`)
- `300`: `#CD8361` (`--color-primary-300`)
- `200`: `#D39375` (`--color-primary-200`)
- `100`: `#D9A289` (`--color-primary-100`)
- `50`: `#E0B29D` (`--color-primary-50`)

> [!TIP]
> You can use `bg-primary` or `text-primary` directly to target the base 500 shade, or specify shades explicitly like `bg-primary-600`.

### 3. Backgrounds
- `BG -1 (Subtle)`: `#DDD5CA` (`bg-bg-subtle` / `var(--color-bg-subtle)`)
- `BG 1 (Surface 1)`: `#F5EDE0` (`bg-bg-1` / `var(--color-bg-1)`)
- `BG 2 (Surface 2)`: `#F7F1E6` (`bg-bg-2` / `var(--color-bg-2)`)

### 4. Grey Scale (Neutral Scale)
- `1000`: `#0B0B0B` (Deepest Charcoal/Black)
- `900`: `#232323`
- `800`: `#3C3C3C`
- `700`: `#545454`
- `600`: `#6D6D6D`
- `500`: `#858585` (`bg-grey` / `var(--color-grey)`)
- `400`: `#9D9D9D`
- `300`: `#B6B6B6`
- `200`: `#CECECE`
- `100`: `#E7E7E7` (Borders/Dividers)
- `50`: `#FFFFFF` (Pure White)

---

## Usage

### 1. In CSS with Tailwind v4

In your application's `globals.css`:

```css
@import "tailwindcss";
@import "@timmbr/theme/theme.css";

/* Scan Timmbr component distributions */
@source "../node_modules/@timmbr/ui/dist";
@source "../node_modules/@timmbr/icons/dist";
```

### 2. In TypeScript

```typescript
import { tokens } from '@timmbr/theme';

console.log(tokens.colors.primary[500]); // "#C0643A"
console.log(tokens.colors.backgrounds.surface1); // "#F5EDE0"
console.log(tokens.typography.styles.h1.fontSize); // "64px"
```
