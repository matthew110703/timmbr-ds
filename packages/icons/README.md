# @timmbr/icons

Icon abstraction system wrapping `lucide-react` icons and custom SVG icons under a unified, performant API for the Timmbr Design System.

## Installation

```bash
pnpm add @timmbr/icons --filter @timmbr/ui
```

## Features

- **Standardized API**: Every icon supports `size`, `customSize`, `className`, and SVG attributes.
- **Lucide Integration**: Seamlessly wrap any icon from `lucide-react`.
- **Custom SVGs**: First-class support for custom branded SVGs (`LogoIcon`, `SpinnerIcon`, etc.).

## Usage

```tsx
import { Icon, ChevronDown, LogoIcon, SpinnerIcon } from '@timmbr/icons';

// Using a Lucide Icon
export function Example() {
  return (
    <div className="flex items-center gap-4">
      <Icon icon={ChevronDown} size={20} className="text-brand-500" />
      <Icon icon={LogoIcon} size={32} />
      <Icon icon={SpinnerIcon} size={24} />
    </div>
  );
}
```
