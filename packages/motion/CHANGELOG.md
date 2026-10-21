# @timmbr/motion

## 1.2.6

### Patch Changes

- Export animate and useMotionValue from the motion index so Panel and other components can use them.

## 1.2.5

### Patch Changes

- Fix missing sub-entry JS files for `transitions`, `variants`, `presence`, `gestures`, and `layout`. These paths were declared in `package.json` exports but never built, causing module-not-found errors at runtime for any consumer importing e.g. `@timmbr/motion/variants`.

## 1.2.4

### Patch Changes

- Updated dependencies
  - @timmbr/utils@1.6.0

## 1.2.3

### Patch Changes

- Updated dependencies [bd600de]
  - @timmbr/utils@1.5.0

## 1.2.2

### Patch Changes

- Updated dependencies
  - @timmbr/utils@1.4.0

## 1.2.1

### Patch Changes

- Updated dependencies
  - @timmbr/utils@1.3.0

## 1.2.0

### Minor Changes

- Add shared motion variants for footer navigation.

### Patch Changes

- Updated dependencies
  - @timmbr/utils@1.2.0

## 1.1.0

### Minor Changes

- Add enterprise `SideBarNavigation`, imperative `Toast` system, `LinkButton`, sidebar motion choreography variants, and JWT utilities across the design system.

### Patch Changes

- Updated dependencies
  - @timmbr/utils@1.1.0
