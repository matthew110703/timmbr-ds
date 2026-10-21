import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Panel, PanelHeader, PanelTitle, PanelDescription, PanelBody, PanelFooter } from '.';
import { Button } from '../Button';
import { Badge } from '../Badge';
import { Text } from '../Text';

// ── App-shell decorator ───────────────────────────────────────────────────────
// Renders a full-height split layout so Panel stories feel like a real app.

interface AppShellProps {
  children: React.ReactNode;
  note?: string;
}

function AppShell({ children, note = 'Select an element to inspect its properties' }: AppShellProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-background font-sans">
      {/* Simulated canvas / main content area */}
      <div className="flex-1 overflow-auto bg-muted/20 p-8">
        <div className="mx-auto max-w-xl space-y-4">
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <p className="text-sm font-semibold text-foreground">Canvas</p>
            <p className="mt-1 text-xs text-muted-foreground">{note}</p>
          </div>
          {/* Placeholder blocks */}
          <div className="grid grid-cols-2 gap-4">
            {['Layer A', 'Layer B', 'Layer C', 'Layer D'].map((name) => (
              <div
                key={name}
                className="flex h-24 items-center justify-center rounded-md border border-dashed border-border bg-card text-xs text-muted-foreground"
              >
                {name}
              </div>
            ))}
          </div>
          <div className="h-32 rounded-md border border-dashed border-border bg-card" />
        </div>
      </div>
      {children}
    </div>
  );
}

// ── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Panel> = {
  title: 'Layout/Panel',
  component: Panel,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    placement: {
      control: 'select',
      options: ['inline', 'left', 'right'],
      description: 'Docked side or floating inline',
    },
    variant: {
      control: 'select',
      options: ['outline', 'elevated', 'subtle', 'ghost'],
      description: 'Surface style',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'default', 'lg'],
      description: 'Inner spacing. When sectioned, distributes to sub-parts.',
    },
    resizable: {
      control: 'select',
      options: [false, 'horizontal', 'vertical'],
      description: 'Enables a drag handle at the panel edge.',
    },
    collapsible: {
      control: 'boolean',
      description: 'Shows a chevron toggle to collapse/expand.',
    },
    snapToCollapse: {
      control: 'boolean',
      description: 'When resizable + collapsible: drag from collapsed auto-expands; drag below midpoint auto-collapses.',
    },
    motion: {
      control: 'boolean',
      description: 'Pass false to disable all transitions.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Panel>;

// ── Default ───────────────────────────────────────────────────────────────────
// Args-driven — use the Controls panel below to tweak all props live.

export const Default: Story = {
  args: {
    placement: 'right',
    variant: 'outline',
    padding: 'sm',
    sectioned: true,
    collapsible: true,
    resizable: 'horizontal',
    defaultSize: 300,
    minSize: 200,
    maxSize: 480,
    collapsedSize: 48,
  },
  render: (args) => (
    <AppShell note="Drag the left edge of the panel to resize. Click ❯ to collapse.">
      <Panel {...args}>
        <PanelHeader divider actions={<Badge variant="info" size="sm">v2</Badge>}>
          <PanelTitle>Properties</PanelTitle>
          <PanelDescription>Selected: Layer A</PanelDescription>
        </PanelHeader>
        <PanelBody>
          <div className="space-y-4 text-sm">
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">Transform</p>
              <div className="grid grid-cols-2 gap-2">
                {[['X', '120'], ['Y', '80'], ['W', '240'], ['H', '160']].map(([label, val]) => (
                  <div key={label} className="flex items-center gap-2 rounded border border-border bg-background px-2 py-1.5">
                    <span className="w-3 shrink-0 text-xs text-muted-foreground">{label}</span>
                    <span className="text-xs font-medium text-foreground">{val}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">Fill</p>
              <div className="flex items-center gap-2 rounded border border-border bg-background px-2 py-1.5">
                <div className="h-4 w-4 shrink-0 rounded-sm bg-primary" />
                <span className="text-xs font-medium">#6366F1</span>
                <span className="ml-auto text-xs text-muted-foreground">100%</span>
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">Typography</p>
              <div className="space-y-1.5">
                {[['Font', 'Inter'], ['Size', '14'], ['Weight', '500']].map(([label, val]) => (
                  <div key={label} className="flex items-center justify-between rounded border border-border bg-background px-2 py-1.5">
                    <span className="text-xs text-muted-foreground">{label}</span>
                    <span className="text-xs font-medium">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PanelBody>
        <PanelFooter justify="end">
          <Button variant="ghost" size="sm">Reset</Button>
          <Button variant="primary" size="sm">Apply</Button>
        </PanelFooter>
      </Panel>
    </AppShell>
  ),
};

// ── Inspector ─────────────────────────────────────────────────────────────────
// Figma / VS Code-style properties inspector with grouped fields.

export const Inspector: Story = {
  render: () => (
    <AppShell note="Right-click a layer to open its inspector.">
      <Panel placement="right" variant="subtle" sectioned padding="sm" className="w-64">
        <PanelHeader divider>
          <PanelTitle>Inspector</PanelTitle>
        </PanelHeader>
        <PanelBody overflow="auto">
          <div className="space-y-5 text-sm">
            {/* Position */}
            <section>
              <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Position</p>
              <div className="grid grid-cols-2 gap-1.5">
                {[['X', '0'], ['Y', '0'], ['W', '400'], ['H', '300']].map(([k, v]) => (
                  <div key={k} className="flex items-center gap-1.5 rounded border border-border bg-background px-2 py-1">
                    <span className="text-[10px] text-muted-foreground">{k}</span>
                    <span className="text-xs font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Appearance */}
            <section>
              <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Appearance</p>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between rounded border border-border bg-background px-2 py-1.5">
                  <span className="text-xs text-muted-foreground">Opacity</span>
                  <span className="text-xs font-medium">100%</span>
                </div>
                <div className="flex items-center justify-between rounded border border-border bg-background px-2 py-1.5">
                  <span className="text-xs text-muted-foreground">Blend</span>
                  <span className="text-xs font-medium">Normal</span>
                </div>
              </div>
            </section>

            {/* Fill */}
            <section>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Fill</p>
                <button type="button" className="text-[10px] text-primary hover:underline">+ Add</button>
              </div>
              <div className="flex items-center gap-2 rounded border border-border bg-background px-2 py-1.5">
                <div className="h-4 w-4 shrink-0 rounded-sm bg-primary" />
                <span className="text-xs font-medium">#6366F1</span>
              </div>
            </section>

            {/* Effects */}
            <section>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Effects</p>
                <button type="button" className="text-[10px] text-primary hover:underline">+ Add</button>
              </div>
              <div className="flex items-center justify-between rounded border border-border bg-background px-2 py-1.5">
                <span className="text-xs text-muted-foreground">Drop Shadow</span>
                <span className="text-xs font-medium">0 4px 8px</span>
              </div>
            </section>
          </div>
        </PanelBody>
      </Panel>
    </AppShell>
  ),
};

// ── Resizable ─────────────────────────────────────────────────────────────────
// Drag the LEFT edge of the panel to resize between 200–480 px.

export const Resizable: Story = {
  render: () => (
    <AppShell note="Drag the left border of the panel to resize it.">
      <Panel
        placement="right"
        resizable="horizontal"
        minSize={200}
        maxSize={480}
        defaultSize={280}
        variant="outline"
        sectioned
        padding="sm"
      >
        <PanelHeader divider>
          <PanelTitle>Layers</PanelTitle>
          <PanelDescription>Drag the left edge to resize</PanelDescription>
        </PanelHeader>
        <PanelBody>
          <div className="space-y-1">
            {['Frame 1', 'Button', 'Text layer', 'Background', 'Icon set', 'Group'].map((item, i) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded px-2 py-1.5 text-xs hover:bg-accent cursor-default"
              >
                <div className={`h-3 w-3 shrink-0 rounded-sm ${i === 0 ? 'bg-primary/70' : 'bg-grey-300'}`} />
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </PanelBody>
      </Panel>
    </AppShell>
  ),
};

// ── Collapsible ───────────────────────────────────────────────────────────────
// Click the chevron in the header to collapse/expand.

export const Collapsible: Story = {
  render: () => (
    <AppShell note="Click the ❯ button in the panel header to collapse.">
      <Panel
        placement="right"
        collapsible
        defaultCollapsed={false}
        collapsedSize={48}
        variant="outline"
        sectioned
        padding="sm"
        className="w-64"
      >
        <PanelHeader divider>
          <PanelTitle>Outline</PanelTitle>
        </PanelHeader>
        <PanelBody>
          <nav className="space-y-0.5">
            {['Page 1', 'Frame', '  Button', '  Icon', 'Components', '  NavHeader'].map((item) => (
              <button
                key={item}
                type="button"
                className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-foreground transition-colors text-left"
              >
                <div className="h-2 w-2 shrink-0 rounded-full bg-grey-300" />
                {item}
              </button>
            ))}
          </nav>
        </PanelBody>
      </Panel>
    </AppShell>
  ),
};

// ── FullFeatured ──────────────────────────────────────────────────────────────
// Both resizable AND collapsible — the main right-panel pattern.

export const FullFeatured: Story = {
  render: () => (
    <AppShell note="Resize by dragging the left edge. Collapse with the ❯ button.">
      <Panel
        placement="right"
        resizable="horizontal"
        minSize={160}
        maxSize={440}
        defaultSize={280}
        collapsible
        collapsedSize={48}
        variant="subtle"
        sectioned
        padding="sm"
      >
        <PanelHeader divider actions={<Badge variant="secondary" size="sm">3</Badge>}>
          <PanelTitle>Properties</PanelTitle>
        </PanelHeader>
        <PanelBody>
          <div className="space-y-4 text-sm">
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">Size</p>
              <div className="grid grid-cols-2 gap-1.5">
                {[['W', '320px'], ['H', '48px']].map(([k, v]) => (
                  <div key={k} className="flex items-center gap-1.5 rounded border border-border bg-background px-2 py-1">
                    <span className="text-[10px] text-muted-foreground">{k}</span>
                    <span className="text-xs font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">Tokens</p>
              <div className="space-y-1.5">
                {[['Color', 'primary'], ['Radius', 'sm'], ['Shadow', 'md']].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between rounded border border-border bg-background px-2 py-1">
                    <span className="text-xs text-muted-foreground">{k}</span>
                    <span className="text-xs font-mono font-medium text-foreground">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PanelBody>
        <PanelFooter justify="end">
          <Button variant="primary" size="sm">Copy token</Button>
        </PanelFooter>
      </Panel>
    </AppShell>
  ),
};

// ── SnapInteraction ───────────────────────────────────────────────────────────
// Demonstrates snap-to-collapse and drag-to-expand coordination:
//   • Collapse the panel (❯ button), then drag the handle → auto-expands to minSize.
//   • Drag the panel narrower than ~124px (midpoint between 48 and 200) → auto-collapses.

export const SnapInteraction: Story = {
  render: () => (
    <AppShell note="Try: (1) Collapse → then drag the handle to auto-expand. (2) Drag panel below ~125px to auto-collapse.">
      <Panel
        placement="right"
        resizable="horizontal"
        minSize={200}
        maxSize={480}
        defaultSize={300}
        collapsible
        collapsedSize={48}
        snapToCollapse
        variant="outline"
        sectioned
        padding="sm"
      >
        <PanelHeader divider>
          <PanelTitle>Snap behaviour</PanelTitle>
          <PanelDescription>Drag · Collapse · Expand</PanelDescription>
        </PanelHeader>
        <PanelBody>
          <div className="space-y-3 text-xs text-muted-foreground">
            <div className="rounded border border-dashed border-border p-3">
              <p className="mb-1 font-medium text-foreground">Drag-to-expand</p>
              <p>Collapse the panel first, then grab the handle and drag — it auto-expands to minSize (200px).</p>
            </div>
            <div className="rounded border border-dashed border-border p-3">
              <p className="mb-1 font-medium text-foreground">Snap-to-collapse</p>
              <p>Drag the panel narrower than 124px (halfway between 48 and 200) — it snaps closed.</p>
            </div>
            <div className="rounded border border-dashed border-border p-3">
              <p className="mb-1 font-medium text-foreground">Size memory</p>
              <p>After snapping, click ❮ to expand — the panel returns to the last width you dragged to.</p>
            </div>
          </div>
        </PanelBody>
      </Panel>
    </AppShell>
  ),
};

// ── LeftPanel ─────────────────────────────────────────────────────────────────
// Mirror case: docked to the left edge.

export const LeftPanel: Story = {
  render: () => (
    <div className="flex h-screen overflow-hidden bg-background font-sans">
      <Panel
        placement="left"
        resizable="horizontal"
        minSize={180}
        maxSize={400}
        defaultSize={240}
        collapsible
        collapsedSize={48}
        variant="subtle"
        sectioned
        padding="sm"
      >
        <PanelHeader divider>
          <PanelTitle>Explorer</PanelTitle>
        </PanelHeader>
        <PanelBody>
          <nav className="space-y-0.5">
            {['src/', '  components/', '    Button.tsx', '    Panel.tsx', '  hooks/', '  utils/'].map((item) => (
              <button
                key={item}
                type="button"
                className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-xs text-muted-foreground hover:bg-accent hover:text-foreground transition-colors text-left font-mono"
              >
                {item}
              </button>
            ))}
          </nav>
        </PanelBody>
      </Panel>
      <div className="flex-1 overflow-auto bg-muted/20 p-8">
        <div className="mx-auto max-w-xl">
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <Text className="text-body-2 text-muted-foreground">Main content area — drag the right edge of the left panel to resize.</Text>
          </div>
        </div>
      </div>
    </div>
  ),
};

// ── Inline ────────────────────────────────────────────────────────────────────
// Not docked — floats as a card within content.

export const Inline: Story = {
  render: () => (
    <div className="min-h-screen bg-background p-10 font-sans">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">
          Page content area
        </div>
        <Panel variant="outline" sectioned padding="sm" className="w-80">
          <PanelHeader divider actions={<Badge variant="success" size="sm">Active</Badge>}>
            <PanelTitle>Quick settings</PanelTitle>
            <PanelDescription>Inline panel, no docking</PanelDescription>
          </PanelHeader>
          <PanelBody>
            <div className="space-y-2">
              {['Notifications', 'Dark mode', 'Compact view'].map((item) => (
                <div key={item} className="flex items-center justify-between rounded border border-border px-3 py-2 text-xs">
                  <span className="text-foreground">{item}</span>
                  <div className="h-3 w-6 rounded-full bg-primary/70" />
                </div>
              ))}
            </div>
          </PanelBody>
          <PanelFooter justify="end">
            <Button variant="ghost" size="sm">Close</Button>
          </PanelFooter>
        </Panel>
        <div className="rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">
          More page content
        </div>
      </div>
    </div>
  ),
};

// ── MotionDisabled ────────────────────────────────────────────────────────────
// All transitions suppressed — collapse and resize snap instantly.

export const MotionDisabled: Story = {
  render: () => (
    <AppShell note="Transitions are disabled — collapse is instant.">
      <Panel
        placement="right"
        motion={false}
        collapsible
        defaultCollapsed={false}
        collapsedSize={48}
        variant="outline"
        sectioned
        padding="sm"
        className="w-64"
      >
        <PanelHeader divider>
          <PanelTitle>No animation</PanelTitle>
          <PanelDescription>Snaps instantly</PanelDescription>
        </PanelHeader>
        <PanelBody>
          <Text className="text-body-2 text-muted-foreground">
            Useful for reduced-motion environments or when transitions interfere with testing.
          </Text>
        </PanelBody>
        <PanelFooter justify="end">
          <Button variant="ghost" size="sm">Action</Button>
        </PanelFooter>
      </Panel>
    </AppShell>
  ),
};
