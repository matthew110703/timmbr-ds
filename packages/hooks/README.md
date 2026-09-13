# @timmbr/hooks

Shared React hooks for the Timmbr Design System.

## Installation

```bash
pnpm add @timmbr/hooks --filter @timmbr/ui
```

## Available Hooks

### `useMediaQuery(query: string): boolean`
SSR-safe media query listener that updates dynamically on viewport changes.

```typescript
import { useMediaQuery } from '@timmbr/hooks';

const isMobile = useMediaQuery('(max-width: 768px)');
```

### `useControllableState<T>(props)`
Enables components to be consumed seamlessly in either controlled (via `value` and `onChange`) or uncontrolled (via `defaultValue`) modes.

### `useMounted(): boolean`
Hydration-safe hook that returns `true` after component mounts on the client.
