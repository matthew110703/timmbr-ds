# @timmbr/tsconfig

Shared TypeScript configurations for packages and applications across the Timmbr Design System monorepo.

## Available Configurations

- **`@timmbr/tsconfig/base.json`**: Base compiler options for Node/browser modern ESNext TypeScript packages with strict type checking and declaration map generation.
- **`@timmbr/tsconfig/react-library.json`**: Extends `base.json` with React JSX runtime options (`react-jsx`) and DOM library definitions.

## Usage

In any package's `tsconfig.json`:

```json
{
  "extends": "@timmbr/tsconfig/react-library.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src"]
}
```
