# Storybook 10 (`apps/storybook`)

Next.js + Vite Storybook environment powering the interactive component playground and living documentation for the Timmbr Design System.

## Technology Stack

- **Storybook 10 (`@storybook/nextjs-vite`)**: Combines Vite's near-instant HMR with Next.js App Router mock support (`next/image`, `next/link`, `next/navigation`).
- **Tailwind CSS v4**: Built with `@tailwindcss/vite` and native `@theme` tokens from `@timmbr/theme`.
- **Addons**:
  - `@storybook/addon-essentials`: Controls, Actions, Viewport, Backgrounds, Measure & Outline.
  - `@storybook/addon-interactions`: Visual interaction tests inside stories.
  - `@storybook/addon-themes`: Interactive light/dark mode switcher.
  - `@storybook/addon-links`: In-story cross-referencing.

## Running Storybook Locally

From the monorepo root:

```bash
pnpm storybook
```

Storybook will start on port `6006` at [http://localhost:6006](http://localhost:6006).

## Building Static Storybook

```bash
pnpm build-storybook
```

Outputs the static production bundle to `storybook-static/`.
