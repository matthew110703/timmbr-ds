# Timmbr Design System (`timmbr-ds`)

An enterprise-grade, highly scalable, Next.js App Router-compatible UI design system monorepo powered by **PNPM Workspaces**, **Turborepo**, **Vite (Library Mode)**, **Tailwind CSS v4**, and **Storybook 10**.

---

## Workspace Packages & Apps

| Package / App | Description | Directory |
| :--- | :--- | :--- |
| **`@timmbr/ui`** | Next.js App Router/RSC-compatible React component library | [`packages/ui`](file:///./packages/ui) |
| **`@timmbr/motion`** | High-performance motion primitives, physics spring transitions & shared layout | [`packages/motion`](file:///./packages/motion) |
| **`@timmbr/icons`** | Unified wrapper for Lucide icons and custom SVGs | [`packages/icons`](file:///./packages/icons) |
| **`@timmbr/theme`** | Tailwind CSS v4 `@theme` styles, tokens, and animations | [`packages/theme`](file:///./packages/theme) |
| **`@timmbr/hooks`** | Pure React hooks for viewport, state, and hydration | [`packages/hooks`](file:///./packages/hooks) |
| **`@timmbr/utils`** | Pure JS/TS helpers (`cn`, number/string formatters) | [`packages/utils`](file:///./packages/utils) |
| **`@timmbr/tsconfig`** | Base and React library TypeScript configurations | [`packages/config-typescript`](file:///./packages/config-typescript) |
| **`@timmbr/eslint-config`**| Shared ESLint rules for TypeScript and React | [`packages/config-eslint`](file:///./packages/config-eslint) |
| **`storybook`** | Storybook 10 interactive workbench with Next.js mocks | [`apps/storybook`](file:///./apps/storybook) |

---

## Architectural Highlights

- **Next.js App Router & RSC Tree-Shaking**: `@timmbr/ui` preserves individual `'use client'` boundaries on a per-file basis using `rollup-plugin-preserve-directives` and `preserveModules: true`. Unused components are never bundled.
- **Tailwind CSS v4 CSS-First Distribution**: Consuming apps directly import `@timmbr/theme/theme.css` and utilize native `@source` directives. No CSS duplication or specificity fighting.
- **Hierarchical Configuration Architecture**: Global app-level defaults via `TimmbrConfigProvider` coupled with component-level prop overrides.
- **Dual-Layer Animation System**: Global animation suppression for testing and accessibility alongside fine-grained component motion controls.
- **Living Documentation**: Storybook 10 configured with `@storybook/nextjs-vite` and `@tailwindcss/vite`.
- **AI Agent Automation**: Comprehensive instructions (`AGENTS.md`, `GEMINI.md`) and Antigravity workspace skills (`.agents/skills/`).

---

## Getting Started

### Prerequisites

- **Node.js**: `>= 20.0.0`
- **pnpm**: `>= 9.0.0`

### Quickstart

```bash
# 1. Install all dependencies across the monorepo
pnpm install

# 2. Build all packages topologically using Turborepo
pnpm run build

# 3. Run unit tests
pnpm run test

# 4. Start Storybook 10 development workbench
pnpm storybook
```

---

## Turborepo Scripts

- `pnpm run build`: Builds all libraries and apps respecting the dependency graph.
- `pnpm run dev`: Runs all watch processes in parallel.
- `pnpm run test`: Runs Vitest test suites.
- `pnpm run lint`: Runs ESLint across all workspaces.
- `pnpm run clean`: Cleans build artifacts (`dist`, `storybook-static`, `.turbo`).
- `pnpm changeset`: Generates a semantic version bump changeset.

---

## Detailed Documentation

- [Architecture & Technical Deep Dive](file:///./docs/ARCHITECTURE.md)
- [Hierarchical Configuration Guide](file:///./docs/DESIGN_SYSTEM_CONFIG.md)
- [AI Agent & Code Generation Patterns](file:///./docs/AI_AGENT_PATTERNS.md)
- [Component Authoring Skill](file:///./.agents/skills/timmbr-component-authoring/SKILL.md)
- [Motion Authoring Skill](file:///./.agents/skills/timmbr-motion-authoring/SKILL.md)
- [Theme Tokens Skill](file:///./.agents/skills/timmbr-theme-tokens/SKILL.md)
- [Icon Management Skill](file:///./.agents/skills/timmbr-icon-management/SKILL.md)
