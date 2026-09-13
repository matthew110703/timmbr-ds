# Antigravity & Gemini Rules for Timmbr Design System

This file establishes the operational rules for Google Gemini / Antigravity AI agents in this repository.

## Operational Directives

1. **Package Scope**:
   All internal monorepo packages are scoped under `@timmbr/*` (`@timmbr/ui`, `@timmbr/icons`, `@timmbr/hooks`, `@timmbr/theme`, `@timmbr/utils`, `@timmbr/tsconfig`, `@timmbr/eslint-config`).
2. **Framework Alignment**:
   - Storybook version: **Storybook 10** (`@storybook/nextjs-vite`).
   - Tailwind version: **Tailwind CSS v4** (`@theme` syntax in `packages/theme/src/theme.css`).
   - Node Package Manager: **pnpm** (with workspaces).
   - Build Tooling: **Turborepo** + **Vite (Library Mode)**.
3. **Workspace Skills**:
   Refer to `.agents/skills/` for detailed authoring workflows:
   - `timmbr-component-authoring`: Step-by-step component generation.
   - `timmbr-theme-tokens`: Token extension guidelines.
   - `timmbr-icon-management`: Lucide and custom SVG patterns.
4. **Documentation Integrity**:
   Every package under `packages/*` and app under `apps/*` MUST maintain an accurate, up-to-date `README.md`.
