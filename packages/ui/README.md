# @timmbr/ui

High-performance, Next.js App Router-compatible UI component library for the Timmbr Design System. Built with **Radix UI**, **Tailwind CSS v4**, **Class Variance Authority (CVA)**, and **Vite (Library Mode)**.

## Key Architectural Principles

1. **Next.js App Router & RSC Compatible**:
   - Preserves `'use client'` directives via `rollup-plugin-preserve-directives`.
   - Uses `preserveModules: true` so bundlers can tree-shake unused components without bundling unnecessary client boundaries.
2. **Dual-Layer Animation Architecture**:
   - Global toggle support via `TimmbrConfigProvider` or `AnimationProvider`.
   - Component-level override support via the `motion` prop on animated components.
3. **Hierarchical Global & Local Configuration**:
   - Global defaults can be set via `TimmbrConfigProvider` (optional; zero config needed out of the box).
   - Any component prop locally overrides global defaults.

## Installation

Within the monorepo:

```bash
pnpm add @timmbr/ui --filter your-app
```

## Setup in Consuming Next.js App

### 1. Configure CSS (Tailwind v4)

In `app/globals.css`:

```css
@import "tailwindcss";
@import "@timmbr/theme/theme.css";

@source "../node_modules/@timmbr/ui/dist";
@source "../node_modules/@timmbr/icons/dist";
```

### 2. Optional: Wrap with `TimmbrConfigProvider`

In `app/layout.tsx`:

```tsx
import { TimmbrConfigProvider } from '@timmbr/ui';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TimmbrConfigProvider
          config={{
            animations: { enabled: true },
            components: {
              button: { defaultVariant: 'default', defaultSize: 'default' },
            },
          }}
        >
          {children}
        </TimmbrConfigProvider>
      </body>
    </html>
  );
}
```

## Available Components

| Category | Components | Description |
| :--- | :--- | :--- |
| **Layout** | `Container`, `Stack`, `Inline`, `Grid`, `GridItem`, `Center`, `Divider`, `PageHeader`, `VisuallyHidden` | Responsive containers, flex and grid layout, separators, and page titles with description, actions and a back link. |
| **Typography** | `Heading`, `Text` | Typography primitives restricted to semantic elements (`<p>`, `<span>`, `<h1>`–`<h6>`) with design token scaling. |
| **Actions** | `Button`, `LinkButton` | Accessible buttons and anchor links with `next/link` default SPA routing, adornment icons, loading spinners, cross-zone delegation, and destructive variants. |
| **Forms** | `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`, `RangeSlider`, `OtpInput`, `ImageUpload`, `FormField`, `Label`, `Fieldset`, `FormActions` | Form primitives with labels, helper text, validation error states, one-time codes and uploads. |
| **Data Display** | `Card`, `MediaCard`, `Badge`, `Chip`, `Avatar`, `IconTile`, `Price`, `Rating`, `DataList`, `List`, `Table`, `Stat`, `Accordion`, `Icon` | Surfaces and cards (`MediaCard` is the media + text template that feature cards build on), status pills, prices with discounts, read-only ratings, key-value lists, tables and KPIs. |
| **Feedback** | `Alert`, `EmptyState`, `Progress`, `Skeleton`, `Spinner`, `Toast` | Status banners, empty states, progress, shimmer loaders and toasts. |
| **Overlays** | `Dialog`, `AlertDialog`, `ConfirmDialog`, `Drawer`, `ResponsiveDialog`, `Dropdown`, `Popover`, `Tooltip`, `AuthModal` | Dialogs and confirmations, off-canvas drawers and bottom sheets (`ResponsiveDialog`: dialog on desktop, bottom sheet on phones), menus (with icons and destructive items), popovers, tooltips and the sign-in modal. |
| **Navigation** | `NavHeader`, `NavFooter`, `SideBarNavigation`, `SubNav`, `Tabs`, `Pagination`, `Stepper` | Site header and footer, app sidebar, in-page section navigation (`SubNav`), tabs, pagination and step progress (`Stepper`). |

Use theme tokens (`bg-card`, `border-border`, `text-muted-foreground`, …) and the DS primitives (`Text`, `Stack`, `Card` parts…) inside components rather than palette steps or raw typography, so a theme change lands in one place.

Storybook uses the same groups (`Foundations` holds the design tokens).


## Component Usage


### Button & LinkButton

```tsx
import { Button, LinkButton } from '@timmbr/ui';

export function NavigationExample() {
  return (
    <div className="flex gap-4 items-center">
      {/* 1. Internal same-zone navigation: uses next/link by default, styled as a link */}
      <LinkButton href="/dashboard">
        Go to Dashboard
      </LinkButton>

      {/* 2. Button visual appearance if desired */}
      <LinkButton href="/signup" variant="primary">
        Sign Up
      </LinkButton>

      {/* 3. Cross-zone boundary: NEVER use next/link across zones. Always use crossZone */}
      <LinkButton href="/docs" crossZone>
        Documentation (Cross-Zone)
      </LinkButton>
    </div>
  );
}
```

### Accordion

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@timmbr/ui';

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Timmbr?</AccordionTrigger>
        <AccordionContent>
          An enterprise-grade UI design system.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Locally disabled animation?</AccordionTrigger>
        {/* Local override disables motion strictly on this panel */}
        <AccordionContent motion={false}>
          This panel opens instantaneously without animations.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
```

## Component Folder Layout Standards

Every component in `@timmbr/ui` adheres to this flat, predictable layout:

```text
packages/ui/src/components/ComponentName/
├── ComponentName.tsx           # Component implementation & Radix slot integration
├── ComponentName.styles.ts     # CVA definitions for Tailwind variants
├── ComponentName.types.ts      # TypeScript interfaces
├── ComponentName.stories.tsx   # Storybook stories & playground
├── ComponentName.test.tsx      # Vitest / React Testing Library specs
└── index.ts                    # Barrel export
```
