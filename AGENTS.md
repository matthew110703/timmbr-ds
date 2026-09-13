# AI Agent Instructions for Timmbr Design System

Welcome to the **Timmbr Design System** repository. When performing any development, refactoring, or maintenance in this repository, you MUST adhere to the architecture standards and rules defined below.

---

## 1. Monorepo Topology & Boundaries

The repository is configured as a PNPM Workspace managed by Turborepo:

- **`packages/ui` (`@timmbr/ui`)**: React component library. Consumes `@timmbr/theme`, `@timmbr/icons`, `@timmbr/hooks`, `@timmbr/utils`. Never bundle consumer dependencies.
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
3. Run `pnpm --filter storybook build` if Storybook stories or configurations were updated.
