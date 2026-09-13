# @timmbr/utils

Pure JavaScript and TypeScript utility helpers for the Timmbr Design System.

## Installation

Within the monorepo:

```bash
pnpm add @timmbr/utils --filter @timmbr/ui
```

## Features & Exports

### `cn(...inputs)`
A high-performance helper combining `clsx` and `tailwind-merge` to resolve conflicting Tailwind CSS classes.

```typescript
import { cn } from '@timmbr/utils';

const className = cn('px-4 py-2 bg-brand-500', isLarge && 'px-6 py-3', 'hover:bg-brand-600');
```

### Formatters
- `formatNumber(value, locale?)`: Locale-aware number formatting.
- `truncate(str, length)`: Safe string truncation with ellipsis.
- `capitalize(str)`: Capitalizes the first character of a string.
