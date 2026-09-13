# Hierarchical Global & Local Configuration System

The Timmbr Design System incorporates a dual-tier configuration architecture designed for enterprise flexibility:

```text
┌─────────────────────────────────────────────────────────────┐
│  Global Tier (TimmbrConfigProvider)                         │
│  - Sets application-wide animation toggles                  │
│  - Configures default component variants & sizes            │
│  - Sets theme mode & styling prefixes                       │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│  Local Tier (Component Props)                               │
│  - Takes highest priority                                   │
│  - Directly overrides any global configuration value        │
│  - Zero overhead when omitted                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 1. Global Level Configuration

The `TimmbrConfigProvider` enables application developers to customize design system defaults across the entire app tree without wrapping or modifying individual components.

```tsx
import { TimmbrConfigProvider } from '@timmbr/ui';

export function App({ children }: { children: React.ReactNode }) {
  return (
    <TimmbrConfigProvider
      config={{
        animations: {
          enabled: true,
        },
        theme: {
          mode: 'system',
        },
        components: {
          button: {
            defaultVariant: 'outline', // All buttons become outline by default!
            defaultSize: 'lg',
          },
          accordion: {
            defaultMotion: true,
          },
          icon: {
            defaultSize: 20,
          },
        },
      }}
    >
      {children}
    </TimmbrConfigProvider>
  );
}
```

---

## 2. Local Level Component Overrides

Any component can locally override global settings via standard props:

```tsx
// This button overrides the global 'outline' default with 'default' (primary green)
<Button variant="default">Save Changes</Button>

// This button explicitly disables animations for this instance
<Button motion={false}>Instant Feedback</Button>

// This accordion panel explicitly disables animations locally
<AccordionContent motion={false}>
  Content without animation
</AccordionContent>
```

---

## 3. Fallback Mechanism (Zero Configuration Needed)

If an application does not include `TimmbrConfigProvider`, components automatically use `defaultTimmbrConfig`:

- `animations.enabled`: `true`
- `theme.mode`: `'light'`
- `button.defaultVariant`: `'default'`
- `button.defaultSize`: `'default'`
- `accordion.defaultMotion`: `true`
- `icon.defaultSize`: `24`

This ensures that components work standalone in prototypes, unit tests, and minimal applications without requiring provider boilerplate.
