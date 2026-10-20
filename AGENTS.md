# AI Agent Instructions for Timmbr Design System

Welcome to the **Timmbr Design System** repository. When performing any development, refactoring, or maintenance in this repository, you MUST adhere to the architecture standards and rules defined below.

---

## 1. Monorepo Topology & Boundaries

The repository is configured as a PNPM Workspace managed by Turborepo:

- **`packages/ui` (`@timmbr/ui`)**: React component library. Consumes `@timmbr/theme`, `@timmbr/icons`, `@timmbr/motion`, `@timmbr/hooks`, `@timmbr/utils`. Never bundle consumer dependencies.
- **`packages/motion` (`@timmbr/motion`)**: Shared animation infrastructure, physics transitions, layout engine, and motion primitives powered by `motion/react`.
- **`packages/theme` (`@timmbr/theme`)**: Design tokens, CSS variables, and Tailwind CSS v4 `@theme` definitions.
- **`packages/icons` (`@timmbr/icons`)**: Unified icon wrapper for Lucide icons and custom SVGs.
- **`packages/hooks` (`@timmbr/hooks`)**: Pure React hooks.
- **`packages/utils` (`@timmbr/utils`)**: Pure TypeScript/JavaScript utilities (`cn`, formatters). Zero React dependency.
- **`packages/config-typescript` (`@timmbr/tsconfig`)**: Shared tsconfig definitions.
- **`packages/config-eslint` (`@timmbr/eslint-config`)**: Shared ESLint rules.
- **`apps/storybook`**: Living documentation and component workbench running Storybook 10 with Tailwind CSS v4.

---

## 2. Component Authoring Standards

When adding or modifying any component in `@timmbr/ui`:

1. **Strict 6-File Layout**:
   - `ComponentName.tsx`
   - `ComponentName.styles.ts`
   - `ComponentName.types.ts`
   - `ComponentName.stories.tsx`
   - `ComponentName.test.tsx`
   - `index.ts`
2. **Next.js App Router & RSC Compatibility**:
   - Add `'use client';` at the top of client components.
   - Vite is configured with `rollup-plugin-preserve-directives` and `preserveModules: true`. Do NOT remove these plugins.
3. **Radix Composition (`asChild`)**:
   - Always support `asChild` composition using `@radix-ui/react-slot` whenever rendering interactive elements like buttons, links, or items.
4. **Hierarchical Configuration**:
   - Connect components to `useTimmbrConfig()` and `useGlobalAnimation()`.
   - Ensure local props override global configuration defaults gracefully.
   - Components MUST function seamlessly with zero configuration when `TimmbrConfigProvider` is not present in the tree.
5. **Complex Component Decomposition & Subcomponents**:
   - For complex, multi-element components (e.g. `SideBarNavigation`, data tables, complex dialogs), decompose internal elements into modular subcomponents under a `subcomponents/` directory.
   - Extract pure logic, calculations, path evaluation, and persistence utilities into a co-located `ComponentName.helpers.ts` or static content file.
   - Re-export the main component and subcomponents cleanly in `index.ts`.
6. **Motion-First Animation Architecture**:
   - **Centralization in `@timmbr/motion`**: All motion animations, spring physics, transition tokens, and animation variants MUST reside strictly within `@timmbr/motion`. All other packages (`@timmbr/ui`, apps) MUST ONLY consume from `@timmbr/motion`. Never write ad-hoc motion physics or variants inside components.
   - **First Priority (Motion Animations)**: Every interactive component MUST animate primarily using `@timmbr/motion` (`motion/react`, `AnimatePresence`, spring physics, layout animations). Extend `MotionProps` (`motion?: MotionProp`), connect with `useGlobalAnimation()`, and resolve via `resolveMotion()`.
   - **Fallback (Vanilla CSS)**: When motion is disabled (`motion={false}`, `disableAnimations={true}`, reduced-motion preferences, or non-motion contexts), components MUST cleanly fall back to vanilla CSS transitions and standard keyframes with zero layout breaking or visual glitches.

---

## 3. Tailwind CSS v4 Best Practices

- This project uses **Tailwind CSS v4**.
- Do NOT compile CSS inside `@timmbr/ui`.
- Define tokens inside `@theme` in `packages/theme/src/theme.css`.
- In consuming apps and Storybook, import `@import "@timmbr/theme/theme.css";` and use `@source` to scan UI components.

---

## 4. Verification Workflow

Before reporting completion of any task:
1. Run `pnpm run build` to ensure topological builds succeed without error.
2. Run `pnpm run test` to verify unit test coverage.
3. Run `pnpm --filter @timmbr/storybook build` if Storybook stories or configurations were updated.
4. **Autonomous Browser MCP Verification**:
   - **When to Run**: Run strictly upon completing UI component additions, functional modifications, or styling updates (milestone completion). Do **NOT** run MCP unnecessarily for intermediate micro-edits, type refactors, or documentation changes.
   - **Ultra-Fast Direct Canvas Protocol**: Always navigate directly to the isolated story canvas to bypass the heavy Storybook Manager UI:
     `http://localhost:6006/iframe.html?id=<story-id>&viewMode=story`
   - **Deep Prop & DOM Telemetry**: Use `evaluate_script` with `() => window.__TIMMBR_INSPECT__()` to inspect active props (`variant`, `size`, `state`), computed styles, dimensions, and ARIA attributes in a single fast call.
   - **Console Hygiene**: Inspect console messages (`list_console_messages`) to guarantee zero runtime errors or unhandled warnings.
   - **Visual Confirmation**: Capture a screenshot (`take_screenshot`) to verify visual accuracy against Figma specifications before reporting completion.

---

## 5. Git Operations Policy

- **NEVER** run `git add`, `git commit`, or stage files automatically.
- All file staging, reviewing, and committing must be left strictly to the user/developer.

---

## 6. Package Publishing Policy

- **NEVER** automatically execute `pnpm release`, `pnpm release:all`, or run `node scripts/publish.mjs`.
- Publishing packages to NPM, tagging releases, or running live package deployment commands MUST be left entirely to the user/developer.
- AI agents may only run dry-run simulations (`--dry-run`) when specifically requested to test packaging.

---

## 7. Storybook Story Authoring Standards

### Story Layout & Meta Defaults for Overview/Documentation Stories

All Overview-category stories (Home, Packages pages, etc.) must use the following meta pattern:

```ts
const meta: Meta = {
  title: 'Overview/StoreName',
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { page: null },
    options: { showPanel: false },
  },
};
```

### Storybook Story ID Format

Storybook derives story IDs from the `title` field + export name:
- All lowercase, spaces → `-`, forward slashes → `-`, PascalCase words stay as one token (no separator inserted).
- Pattern: `{group}-{component}--{storyExport}`
- Examples:
  - `title: 'Actions/Button'` + `export const Default` → `actions-button--default`
  - `title: 'Data Display/Accordion'` + `export const Default` → `data-display-accordion--default`
  - `title: 'Navigation/NavHeader'` + `export const Default` → `navigation-navheader--default`
  - `title: 'Overview/Packages'` + `export const UI` → `overview-packages--ui`

### In-Frame Navigation Links

Stories render inside an `<iframe>`. Use `target="_parent"` to navigate the outer Storybook shell:

```tsx
<a href={`/?path=/story/${storyId}`} target="_parent">...</a>
```

Never use `window.location` or `history.pushState` directly inside stories.

### Build-Time Dynamic Data in Stories

**Package versions** — import `package.json` files directly via relative path (no workspace dep required):

```ts
import uiPkg from '../../../../packages/ui/package.json';
// use: uiPkg.version
```

**Export counts** — use namespace imports for hook/util packages (requires the package to be listed in `apps/storybook/package.json` dependencies):

```ts
import * as allHooks from '@timmbr/hooks'; // needs "@timmbr/hooks": "workspace:*" in storybook deps
import * as allUtils from '@timmbr/utils';
const HOOK_COUNT = Object.keys(allHooks ?? {}).length;
const UTIL_COUNT = Object.keys(allUtils ?? {}).length;
```

**Component directory count** — use `import.meta.glob` (no module execution, no `'use client'` collision):

```ts
const componentEntries = import.meta.glob('../../../../packages/ui/src/components/*/index.ts');
const COMPONENT_COUNT = Object.keys(componentEntries ?? {}).length;
```

### NEVER: Wildcard Namespace Import of `@timmbr/ui`

Do **NOT** write:
```ts
import * as allUI from '@timmbr/ui'; // ❌ FORBIDDEN
```
This forces Rollup to bundle every component module into a shared chunk. Each component file has a `'use client'` directive; multiple directives in one chunk cause a fatal Rollup bundling error.

Use `import.meta.glob` for counting, or specific named imports for individual components.

### Fallback Values for Dynamic Stats

Always guard dynamic numeric values and version strings against `undefined`, `null`, or `NaN`:

```ts
// Centralized guard — place near the constant derivations
const fmt = (n: number) => (Number.isFinite(n) && n > 0 ? String(n) : '–');

// Version display
v{pkg.version || '–'}
```

### Sidebar Sort Order

Story ordering is controlled by `storySort.order` in `apps/storybook/.storybook/preview.tsx`. Nested groups use array syntax:

```ts
order: ['Overview', ['Home', 'Packages'], 'Foundations', [...], ...]
```

Add new Overview-level stories to the nested `['Home', 'Packages', ...]` sub-array.

