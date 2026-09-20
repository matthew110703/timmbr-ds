---
name: timmbr-motion-authoring
description: Guidelines and best practices for authoring, composing, and consuming motion primitives, spring transitions, shared layout animations, and dual-layer animation controls in the Timmbr Design System (@timmbr/motion & @timmbr/ui).
---

# Timmbr Motion & Animation Authoring Skill

This skill outlines the animation architecture, physics configurations, primitives, and dual-layer motion patterns within the Timmbr Design System.

---

## 1. Architectural Model & Package Boundaries

```text
                    ┌──────────────────┐
                    │  @timmbr/motion  │
                    │                  │
                    │ transitions      │
                    │ variants         │
                    │ primitives       │
                    │ presence         │
                    │ layout engine    │
                    └────────┬─────────┘
                             │
                    ┌────────┴─────────┐
                    ▼                  ▼
             @timmbr/ui          Timmbr Apps
             (Consumer)          (Custom Animations)
```

- **`@timmbr/motion`**: Shared animation infrastructure powered by `motion/react`.
- **`@timmbr/ui`**: Primary consumer. Integrates motion primitives, spring physics, and shared layout indicators into components (`Tabs`, `Toast`, `Dialog`, `Drawer`, etc.).
- **Timmbr Applications**: Direct optional consumer for page-level transitions, interactive drag sandboxes, and custom layouts.

---

## 2. Spring Physics & Transition Presets

Always consume standardized transitions from `@timmbr/motion`:

```typescript
import { transitions } from '@timmbr/motion';
```

| Preset | Physics / Curve | Use Case |
| :--- | :--- | :--- |
| `transitions.instant` | `duration: 0` | Testing, reduced-motion fallback, instantaneous state changes |
| `transitions.fast` | `duration: 0.15, ease: [0.16, 1, 0.3, 1]` | Micro-interactions, tooltips, dropdown menus |
| `transitions.normal` | `duration: 0.25, ease: [0.16, 1, 0.3, 1]` | Dialogs, sheets, general UI disclosures |
| `transitions.slow` | `duration: 0.40, ease: [0.16, 1, 0.3, 1]` | Hero cards, large drawer expansions |
| `transitions.spring` | `type: 'spring', stiffness: 500, damping: 35` | Tab gliders, segmented controls, switches |
| `transitions.bouncy` | `type: 'spring', stiffness: 400, damping: 15` | Playful UI badges, notification pings |
| `transitions.gentle` | `type: 'spring', stiffness: 180, damping: 24` | Floating modals, subtle toasts |

---

## 3. Motion Primitives in `@timmbr/motion`

When building animated views or wrappers:

1. **`FadeView`**:
   ```tsx
   import { FadeView } from '@timmbr/motion';

   <FadeView duration="normal">
     <Content />
   </FadeView>
   ```

2. **`ScaleView`**:
   ```tsx
   import { ScaleView } from '@timmbr/motion';

   <ScaleView duration="normal">
     <ModalCard />
   </ScaleView>
   ```

3. **`SlideView`**:
   ```tsx
   import { SlideView } from '@timmbr/motion';

   <SlideView direction="up" duration="fast">
     <ToastBanner />
   </SlideView>
   ```

4. **`TransitionView`**:
   Multi-preset primitive supporting `fade`, `slide-up`, `slide-down`, `scale`, and `pop`:
   ```tsx
   import { TransitionView } from '@timmbr/motion';

   <TransitionView preset="pop" duration="fast">
     <BadgeCount />
   </TransitionView>
   ```

5. **`Presence` (`AnimatePresence`)**:
   Provides enter and exit choreography for conditionally mounted elements:
   ```tsx
   import { Presence, FadeView } from '@timmbr/motion';

   <Presence>
     {isVisible && (
       <FadeView key="notice">
         <Notice />
       </FadeView>
     )}
   </Presence>
   ```

---

## 4. Shared Layout & Glider Indicators

When building tab gliders, segmented pills, or floating indicators across multiple buttons:

- **DO NOT** use standard HTML `<div>` with CSS `transition-all` (CSS transitions cannot animate across unmounting and mounting DOM nodes).
- **DO** use `motion.div` with a unique `layoutId` and spring physics:

```tsx
import { motion } from '@timmbr/motion';

{isActive && (
  <motion.div
    layoutId={`glider-indicator-${uniqueInstanceId}`}
    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
    className="absolute inset-0 bg-primary rounded-md shadow-xs pointer-events-none -z-0"
  />
)}
```

---

## 5. Dual-Layer Animation Control & Accessibility

Every animated component in `@timmbr/ui` MUST implement the dual-layer motion contract:

1. **Global Control**:
   `useGlobalAnimation()` extracts whether animations are globally enabled from `TimmbrConfigProvider`.
2. **Local Control**:
   Each component exposes an optional `motion?: boolean` prop.
3. **Resolution**:
   Use `resolveMotion(localMotion, globalMotion)` from `@timmbr/ui`:
   ```tsx
   const globalMotion = useGlobalAnimation();
   const { shouldAnimate, motionClass } = resolveMotion(motion, globalMotion);
   ```
4. **Graceful Zero-Motion Fallback**:
   When `shouldAnimate === false`:
   - Disable CSS animations: `!shouldAnimate && 'transition-none animate-none'`.
   - Apply static active classes (e.g., static background colors or immediate transforms) so UI state remains clear without latency.
   - Set motion transition duration to `0`.
