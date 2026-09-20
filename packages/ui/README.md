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
| **Actions** | `Button` | Accessible button with adornment icons, loading spinner, CVA variants, and `asChild` composition. |
| **Typography** | `Text`, `Heading` | Typography primitives restricted to semantic elements (`<p>`, `<span>`, `<h1>`–`<h6>`) with design token scaling. |
| **Surfaces** | `Card`, `Avatar`, `Badge`, `Chip`, `Divider` | Display primitives including user avatars, status pills, elevated cards, interactive chips, and separators. |
| **Layout** | `Container`, `Stack`, `Inline`, `Grid`, `Center` | Responsive breakpoint containers, flex distribution, responsive CSS grid, and centered wrappers. |
| **Form Controls** | `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`, `RangeSlider`, `FormField`, `Label` | Comprehensive form primitives with labels, helper text, validation error states, and dual-thumb sliders. |
| **Navigation** | `Tabs`, `Pagination` | Radix-driven accessible tabs with spring-physics glider indicator and multi-page pagination. |
| **Feedback** | `Alert`, `Progress`, `Skeleton`, `Spinner`, `Toast` | Status banners, determinate/indeterminate progress, shimmer loaders, and card-deck multi-toasts with hover-spread. |
| **Overlays** | `Dialog`, `Drawer`, `Dropdown`, `Popover`, `Tooltip` | Centered dialogs, off-canvas sliding drawers, contextual dropdowns, interactive popovers, and accessible tooltips. |
| **Data Display** | `Table`, `DataList`, `Stat`, `EmptyState` | Structured data tables with pagination, key-value data lists, KPI metrics, and empty state placeholders. |
| **Visual Media** | `Icon` | Unified icon wrapper supporting Lucide icons, external image URLs, raw SVGs, and clickable modes. |


## Component Usage


### Button

```tsx
import { Button } from '@timmbr/ui';
import Link from 'next/link';

export function Example() {
  return (
    <div className="flex gap-4">
      {/* Standard variants */}
      <Button variant="default">Primary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>

      {/* Composition with Next.js Link via asChild */}
      <Button asChild>
        <Link href="/dashboard">Go to Dashboard</Link>
      </Button>
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
