---
name: timmbr-theme-tokens
description: Guidelines for defining, modifying, and consuming design tokens in Tailwind CSS v4 and TypeScript within the Timmbr Design System (@timmbr/theme).
---

# Timmbr Theme Tokens Skill

This skill explains how design tokens are defined and managed within `@timmbr/theme` across Tailwind CSS v4 and TypeScript.

## 1. Dual-Format Token Strategy

Timmbr maintains tokens in two synchronized representations:
1. **Tailwind CSS v4 `@theme` block** (`packages/theme/src/theme.css`): Native CSS custom properties consumable via standard CSS `@import` and utility classes (`bg-primary`, `bg-primary-500`, `text-grey-900`, `text-h1`, `font-display`).
2. **TypeScript Token Map** (`packages/theme/src/tokens.ts`): Strongly-typed JavaScript object consumable in scripts, tests, Canvas, or styled primitives.

## 2. Core Token Scales from Figma

- **Primary Scale**: `colors.primary[50..1000]`. Base/Main is `500` (`#C0643A`). Accessible via `--color-primary` (default) and `--color-primary-500`.
- **Backgrounds**: `colors.backgrounds`: `subtle` (`#DDD5CA`), `surface1` (`#F5EDE0`), `surface2` (`#F7F1E6`).
- **Greys Scale**: `colors.greys[50..1000]`. Neutral scale from `#FFFFFF` (50) to `#0B0B0B` (1000).
- **Typography Fonts**:
  - `display`: `DM Serif Display` (for Headings H1–H6)
  - `sans`: `Manrope` (for Subtitles, Body, and Captions)
  - `title`: `Outfit` (for Component and Page Headers)

## 3. Adding or Updating Tokens

When adding new tokens:

1. **Update `packages/theme/src/tokens.ts`**:
   ```typescript
   export const tokens = {
     colors: {
       primary: { ... },
       newScale: {
         50: '#...',
         500: '#...',
         900: '#...',
       },
     },
   };
   ```

2. **Update `packages/theme/src/theme.css`**:
   ```css
   @theme {
     --color-newScale-50: #...;
     --color-newScale-500: #...;
     --color-newScale-900: #...;
   }
   ```

3. Rebuild the theme package:
   ```bash
   pnpm --filter @timmbr/theme build
   ```

## 4. Global Animation Suppression

Every theme consumer automatically inherits:
```css
[data-animations-disabled="true"] * {
  animation-duration: 0.001ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.001ms !important;
}
```
This enables zero-latency tests and instant accessibility controls across the entire DOM tree.
