# Antigravity & Gemini Rules for Timmbr Design System

This file establishes the operational rules for Google Gemini / Antigravity AI agents in this repository.

## Operational Directives

1. **Package Scope**:
   All internal monorepo packages are scoped under `@timmbr/*` (`@timmbr/ui`, `@timmbr/motion`, `@timmbr/icons`, `@timmbr/hooks`, `@timmbr/theme`, `@timmbr/utils`, `@timmbr/tsconfig`, `@timmbr/eslint-config`).
2. **Framework Alignment**:
   - Storybook version: **Storybook 10** (`@storybook/nextjs-vite`).
   - Tailwind version: **Tailwind CSS v4** (`@theme` syntax in `packages/theme/src/theme.css`).
   - Node Package Manager: **pnpm** (with workspaces).
   - Build Tooling: **Turborepo** + **Vite (Library Mode)**.
3. **Workspace Skills**:
   Refer to `.agents/skills/` for detailed authoring workflows:
   - `timmbr-component-authoring`: Step-by-step component generation.
   - `timmbr-motion-authoring`: Motion primitives, spring transitions, and layout physics.
   - `timmbr-theme-tokens`: Token extension guidelines.
   - `timmbr-icon-management`: Lucide and custom SVG patterns.
4. **Documentation Integrity**:
   Every package under `packages/*` and app under `apps/*` MUST maintain an accurate, up-to-date `README.md`.
5. **Autonomous Browser MCP Verification**:
   - **When to Run**: Run strictly upon completing UI component additions, functional modifications, or styling updates (milestone completion). Do **NOT** run MCP unnecessarily for intermediate micro-edits, type refactors, or documentation changes.
   - **Ultra-Fast Direct Canvas Protocol**: Always navigate directly to `http://localhost:6006/iframe.html?id=<story-id>&viewMode=story` to bypass the heavy Storybook Manager UI.
   - **Deep Prop & DOM Telemetry**: Use `evaluate_script` with `() => window.__TIMMBR_INSPECT__()` to inspect active props (`variant`, `size`, `state`), computed styles, dimensions, and ARIA attributes in a single fast call.
   - **Console Hygiene & Screenshots**: Verify console logs (`list_console_messages`) for zero runtime errors and capture a screenshot (`take_screenshot`) before reporting completion.
6. **Git Operations Policy**:
   Do NOT stage (`git add`) or commit (`git commit`) files automatically. All file staging and committing must be left entirely to the user unless explicitly requested.
