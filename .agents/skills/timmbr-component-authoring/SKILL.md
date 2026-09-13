---
name: timmbr-component-authoring
description: Guidelines and step-by-step procedures for authoring new React UI components in the Timmbr Design System (@timmbr/ui). Use whenever creating or refactoring a UI component.
---

# Timmbr Component Authoring Skill

This skill dictates the exact conventions, directory structures, and implementation patterns for all components inside `packages/ui/src/components/`.

## 1. Strict Component Folder Layout

Every component MUST reside in its own dedicated directory with the exact following files:

```text
packages/ui/src/components/[ComponentName]/
├── [ComponentName].tsx           # Component implementation & Radix slot integration
├── [ComponentName].styles.ts     # CVA variant definitions using Tailwind CSS classes
├── [ComponentName].types.ts      # TypeScript interfaces and prop types
├── [ComponentName].stories.tsx   # Storybook playground & stories
├── [ComponentName].test.tsx      # Vitest / React Testing Library unit tests
└── index.ts                    # Component barrel export
```

## 2. Component File Conventions

### A. Component Styles (`[ComponentName].styles.ts`)
- Use `class-variance-authority` (`cva`) to define variants and default variants.
- Export `[componentName]Variants` and its inferred type:
  ```typescript
  import { cva, type VariantProps } from 'class-variance-authority';

  export const badgeVariants = cva('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold', {
    variants: {
      variant: {
        default: 'bg-brand-500 text-white',
        secondary: 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100',
        destructive: 'bg-red-500 text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  });

  export type BadgeVariants = VariantProps<typeof badgeVariants>;
  ```

### B. Types (`[ComponentName].types.ts`)
- Extend the corresponding native HTML element props and the CVA variant props.
- If the component supports `asChild` composition, include `asChild?: boolean`.
- If the component features animations, include `motion?: boolean` for local animation overrides.

### C. Component Implementation (`[ComponentName].tsx`)
- Always add `'use client';` at the top of client-side components to preserve RSC compatibility.
- Use `React.forwardRef` to ensure ref-forwarding.
- Use `Slot` from `@radix-ui/react-slot` when `asChild === true`.
- Merge class names with `cn` from `@timmbr/utils`.
- Resolve variant and motion defaults using `useTimmbrConfig()` and `useGlobalAnimation()`.
- Set `ComponentName.displayName = 'ComponentName'`.

### D. Unit Tests (`[ComponentName].test.tsx`)
- Test default rendering and role accessibility.
- Test variant and size classes.
- Test `asChild` composition when supported.
- Test user interactions (clicks, keyboard).
- Test local override behavior against global config defaults.

### E. Index Export (`index.ts`)
- Export everything from `[ComponentName].tsx`, `[ComponentName].styles.ts`, and `[ComponentName].types.ts`.
- Re-export the component in `packages/ui/src/index.ts`.
