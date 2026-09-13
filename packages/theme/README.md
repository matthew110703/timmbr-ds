# @timmbr/theme

Design tokens, Tailwind CSS v4 `@theme` styles, animations, and presets for the Timmbr Design System.

## Features

- **Tailwind CSS v4 `@theme`**: Native CSS variable definitions for colors, radiuses, keyframes, and animations.
- **Brand Palette**: Curated brand color scale (`50` through `950`).
- **Global Animation Suppressor**: Out-of-the-box selector `[data-animations-disabled="true"]` to instantly disable all transitions/animations across the DOM tree.
- **Design Tokens (TypeScript)**: Typed token object exported for programmatic access.

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

console.log(tokens.colors.brand[500]); // "#22c55e"
```
