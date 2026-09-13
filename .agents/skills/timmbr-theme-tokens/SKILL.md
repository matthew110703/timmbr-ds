---
name: timmbr-theme-tokens
description: Guidelines for defining, modifying, and consuming design tokens in Tailwind CSS v4 and TypeScript within the Timmbr Design System (@timmbr/theme).
---

# Timmbr Theme Tokens Skill

This skill explains how design tokens are defined and managed within `@timmbr/theme` across Tailwind CSS v4 and TypeScript.

## 1. Dual-Format Token Strategy

Timmbr maintains tokens in two synchronized representations:
1. **Tailwind CSS v4 `@theme` block** (`packages/theme/src/theme.css`): Native CSS custom properties consumable via standard CSS `@import` and utility classes (`bg-brand-500`, `text-brand-900`, `animate-accordion-down`).
2. **TypeScript Token Map** (`packages/theme/src/tokens.ts`): Strongly-typed JavaScript object consumable in scripts, tests, Canvas, or styled primitives.

## 2. Adding a New Token

When adding new tokens (e.g., a new semantic color or animation):

1. **Update `packages/theme/src/tokens.ts`**:
   ```typescript
   export const tokens = {
     colors: {
       brand: { ... },
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

## 3. Global Animation Supression

Every theme consumer automatically inherits:
```css
[data-animations-disabled="true"] * {
  animation-duration: 0.001ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.001ms !important;
}
```
This enables zero-latency tests and instant accessibility controls across the entire DOM tree.
