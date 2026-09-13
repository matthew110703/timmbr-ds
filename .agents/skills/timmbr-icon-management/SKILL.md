---
name: timmbr-icon-management
description: Guidelines for managing Lucide icons and registering custom SVGs in @timmbr/icons.
---

# Timmbr Icon Management Skill

This skill documents how to register custom SVGs and expose icons from `lucide-react` through `@timmbr/icons`.

## 1. Icon Component API

All icons in the Timmbr Design System share the unified `<Icon />` wrapper:

```typescript
import { Icon, ChevronRight, LogoIcon } from '@timmbr/icons';

// Lucide Icon with standard sizing
<Icon icon={ChevronRight} size={20} className="text-slate-500" />

// Custom SVG with custom sizing
<Icon icon={LogoIcon} customSize className="w-12 h-12" />
```

## 2. Adding a Custom SVG Icon

To add a new custom SVG icon:

1. Create a new component inside `packages/icons/src/custom/[Name]Icon.tsx`:
   ```tsx
   import * as React from 'react';

   export const SparkleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
     <svg
       viewBox="0 0 24 24"
       fill="none"
       xmlns="http://www.w3.org/2000/svg"
       {...props}
     >
       <path
         d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
         fill="currentColor"
       />
     </svg>
   );
   SparkleIcon.displayName = 'SparkleIcon';
   ```

2. Export the icon in `packages/icons/src/custom/index.ts`.
3. Export the icon in `packages/icons/src/index.ts`.
4. Rebuild the icon package:
   ```bash
   pnpm --filter @timmbr/icons build
   ```
