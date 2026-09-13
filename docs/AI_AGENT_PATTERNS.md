# AI Agent Patterns & Code Generation Standards

This guide provides explicit patterns and rules for AI coding agents generating code within the Timmbr Design System monorepo.

---

## Pattern 1: Authoring a New Component

When instructed to create a component (e.g. `Badge`), execute the following steps:

1. Create directory `packages/ui/src/components/Badge/`
2. Create `Badge.styles.ts`:
   ```typescript
   import { cva, type VariantProps } from 'class-variance-authority';

   export const badgeVariants = cva(
     'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
     {
       variants: {
         variant: {
           default: 'bg-brand-50 text-brand-700 ring-brand-600/20',
           outline: 'text-slate-700 ring-slate-200',
         },
       },
       defaultVariants: {
         variant: 'default',
       },
     }
   );

   export type BadgeVariants = VariantProps<typeof badgeVariants>;
   ```
3. Create `Badge.types.ts`:
   ```typescript
   import type * as React from 'react';
   import type { BadgeVariants } from './Badge.styles';

   export interface BadgeProps
     extends React.HTMLAttributes<HTMLSpanElement>,
       BadgeVariants {}
   ```
4. Create `Badge.tsx`:
   ```tsx
   'use client';

   import * as React from 'react';
   import { cn } from '@timmbr/utils';
   import { badgeVariants } from './Badge.styles';
   import type { BadgeProps } from './Badge.types';

   export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
     ({ className, variant, ...props }, ref) => {
       return (
         <span
           ref={ref}
           className={cn(badgeVariants({ variant, className }))}
           {...props}
         />
       );
     }
   );
   Badge.displayName = 'Badge';
   ```
5. Create `Badge.stories.tsx`:
   Define stories for each variant and state.
6. Create `Badge.test.tsx`:
   Verify accessibility and variant classes.
7. Create `index.ts`:
   Export all artifacts.
8. Re-export in `packages/ui/src/index.ts`.

---

## Pattern 2: Component Slot Composition (`asChild`)

When a component renders an interactive element (e.g., `button`, `a`), always implement the Radix UI `Slot` pattern:

```tsx
import { Slot } from '@radix-ui/react-slot';

const Comp = asChild ? Slot : 'button';
return <Comp ref={ref} {...props} />;
```

---

## Pattern 3: Dual-Layer Animation Integration

When implementing animations:
1. Wrap keyframes in CSS utility classes or Tailwind classes.
2. Check `useGlobalAnimation()`.
3. Accept an optional local `motion?: boolean` prop on animated subcomponents.
4. Calculate `shouldAnimate = globalMotion && motion`.
5. If `!shouldAnimate`, apply `transition-none duration-0`.
