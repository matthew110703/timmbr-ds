# @timmbr/motion

High-performance, physics-based motion primitives, transitions, variants, presence, and layout choreography for the Timmbr Design System. Built on `motion/react`.

---

## Architectural Role

`@timmbr/motion` serves as the centralized motion and physics infrastructure across the Timmbr monorepo:

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

1. **`@timmbr/ui`**: Consumes spring transitions and `motion.div` for components like `Tabs` glider indicators, `Toast` deck animations, `Dialog` scaling, and `Drawer` slides.
2. **Consuming Applications**: Can directly import motion primitives and physics transitions for page-level choreography, drag-and-drop sandboxes, and bespoke UI transitions.

---

## Installation

Within the monorepo:

```bash
pnpm add @timmbr/motion --filter your-app
```

---

## Primitives & Components

### 1. `FadeView`
Animate opacity on mount and exit:

```tsx
import { FadeView } from '@timmbr/motion';

export function Banner() {
  return (
    <FadeView duration="normal">
      <p>Content fades in cleanly with ease-out curve.</p>
    </FadeView>
  );
}
```

### 2. `ScaleView`
Scale in with spring or cubic-bezier physics:

```tsx
import { ScaleView } from '@timmbr/motion';

export function ModalContent() {
  return (
    <ScaleView duration="normal">
      <div className="bg-card p-6 rounded-lg shadow-lg">Modal Body</div>
    </ScaleView>
  );
}
```

### 3. `SlideView`
Slide into place from any cardinal direction (`up`, `down`, `left`, `right`):

```tsx
import { SlideView } from '@timmbr/motion';

export function NotificationToast() {
  return (
    <SlideView direction="up" duration="fast">
      <div>Incoming update!</div>
    </SlideView>
  );
}
```

### 4. `TransitionView`
Multi-preset component supporting `fade`, `slide-up`, `slide-down`, `scale`, and `pop`:

```tsx
import { TransitionView } from '@timmbr/motion';

export function DynamicBadge() {
  return (
    <TransitionView preset="pop" duration="fast">
      <span className="badge">New</span>
    </TransitionView>
  );
}
```

### 5. `Presence` (`AnimatePresence`)
Lifecycle wrapper for mounting and unmounting DOM animations:

```tsx
import { Presence, FadeView } from '@timmbr/motion';

export function ToggleableAlert({ show }: { show: boolean }) {
  return (
    <Presence>
      {show && (
        <FadeView key="alert">
          <Alert>Operation completed successfully</Alert>
        </FadeView>
      )}
    </Presence>
  );
}
```

---

## Physics & Transition Presets

Standardized spring and easing curves accessible via `transitions`:

```typescript
import { transitions } from '@timmbr/motion';

// Available transitions
transitions.instant; // 0ms duration (reduced motion / testing)
transitions.fast;    // 150ms cubic-bezier(0.16, 1, 0.3, 1)
transitions.normal;  // 250ms cubic-bezier(0.16, 1, 0.3, 1)
transitions.slow;    // 400ms expressive curve
transitions.spring;  // Spring physics (stiffness: 500, damping: 35)
transitions.bouncy;  // Playful spring (stiffness: 400, damping: 15)
transitions.gentle;  // Soft spring (stiffness: 180, damping: 24)
```

---

## Shared Layout Gliders

Use `motion.div` with `layoutId` to create gliding active indicators across disconnected DOM nodes:

```tsx
import { motion } from '@timmbr/motion';

export function SegmentedControl({ activeTab, tabs, onSelect }) {
  return (
    <div className="flex gap-1 p-1 bg-grey-100 rounded-lg">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button key={tab.id} onClick={() => onSelect(tab.id)} className="relative px-3 py-1.5 text-xs font-semibold">
            {isActive && (
              <motion.div
                layoutId="active-pill"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                className="absolute inset-0 bg-primary rounded-md shadow-xs -z-0"
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
```
