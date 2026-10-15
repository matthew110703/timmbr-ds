import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Divider } from '@timmbr/ui';
import { Check, Copy, Package, LayoutDashboard, Sparkles, Palette, Film, Star } from '@timmbr/icons';

const meta: Meta = {
  title: 'Overview/Home',
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { page: null },
    options: { showPanel: false },
  },
};

export default meta;
type Story = StoryObj;

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }}
      title={copied ? 'Copied!' : 'Copy'}
      aria-label="Copy"
      className="inline-flex items-center justify-center size-5 rounded transition-all hover:bg-white/20 active:scale-90"
    >
      {copied
        ? <Check className="size-3 text-emerald-400" />
        : <Copy className="size-3 opacity-70 group-hover:opacity-100" />}
    </button>
  );
}

const packages = [
  {
    name: '@timmbr/ui',
    version: '1.11.0',
    description: 'React component library — Radix primitives, Tailwind v4, motion-first.',
    icon: <LayoutDashboard className="size-4" />,
  },
  {
    name: '@timmbr/theme',
    version: '1.3.0',
    description: 'Design tokens, CSS variables, and @theme definitions.',
    icon: <Palette className="size-4" />,
  },
  {
    name: '@timmbr/motion',
    version: '1.2.4',
    description: 'Shared animation core — springs, physics, CSS fallbacks.',
    icon: <Film className="size-4" />,
  },
  {
    name: '@timmbr/icons',
    version: '1.6.0',
    description: 'Lucide icons + custom SVG glyphs, unified wrapper.',
    icon: <Star className="size-4" />,
  },
  {
    name: '@timmbr/hooks',
    version: '1.1.0',
    description: 'Pure React hooks for layout, focus, media queries.',
    icon: <Sparkles className="size-4" />,
  },
  {
    name: '@timmbr/utils',
    version: '1.6.0',
    description: 'Zero-dep TypeScript utils: cn, formatters, helpers.',
    icon: <Package className="size-4" />,
  },
];

const sections = [
  { label: 'Foundations', items: ['Colors', 'Typography', 'Spacing', 'Radius', 'Shadows'] },
  { label: 'Actions', items: ['Button', 'LinkButton'] },
  { label: 'Forms', items: ['Input', 'Checkbox', 'Switch', 'Select', 'Radio', 'OtpInput', 'RangeSlider', 'Textarea', '…'] },
  { label: 'Data Display', items: ['Accordion', 'Avatar', 'Badge', 'Card', 'Chip', 'Table', 'Rating', 'Swatch', '…'] },
  { label: 'Feedback', items: ['Alert', 'Progress', 'PageProgress', 'Snackbar', 'Toast', 'Skeleton', 'Spinner'] },
  { label: 'Overlays', items: ['Dialog', 'Drawer', 'Tooltip', 'Popover', 'AuthModal', '…'] },
  { label: 'Navigation', items: ['NavHeader', 'NavFooter', 'Tabs', 'Breadcrumb', 'FilterPanel', '…'] },
];

export const Overview: Story = {
  render: () => (
    <div className="min-h-screen bg-[#FDFAF6] font-sans text-[#3C3C3C]">
      {/* Hero */}
      <div className="bg-[#F7F1E6] border-b border-[#DDD3C3] px-8 py-12">
        <div className="max-w-5xl mx-auto space-y-4">
          {/* Wordmark */}
          <div className="flex items-baseline gap-3">
            <span
              className="text-4xl font-bold tracking-tight"
              style={{ fontFamily: '"DM Serif Display", Georgia, serif', color: '#C47A4A' }}
            >
              timmbr
            </span>
            <span className="text-sm font-semibold text-[#7A6B5A] font-mono tracking-widest uppercase">
              Design System
            </span>
          </div>
          <p className="text-base text-[#5C4E3D] max-w-xl leading-relaxed">
            A composable UI library built with Radix primitives, Tailwind CSS v4, and a motion-first animation system. One source of truth for every timmbr surface.
          </p>
          {/* Install */}
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-[#3C3C3C] text-white font-mono text-xs mt-2">
            <span className="text-[#9CA3AF]">$</span>
            <span className="text-emerald-400">pnpm add @timmbr/ui @timmbr/theme @timmbr/motion</span>
            <CopyButton text="pnpm add @timmbr/ui @timmbr/theme @timmbr/motion" />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-10 space-y-12">
        {/* Packages */}
        <section className="space-y-5">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-[#7A6B5A]">Packages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className="group p-4 rounded-lg border border-[#DDD3C3] bg-white hover:border-[#C47A4A]/60 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 text-[#C47A4A]">
                    {pkg.icon}
                    <span className="font-mono text-sm font-semibold text-[#3C3C3C]">{pkg.name}</span>
                  </div>
                  <div className="flex items-center gap-0.5 shrink-0 font-mono text-xs text-[#7A6B5A] bg-[#F0E8DA] px-2 py-0.5 rounded">
                    v{pkg.version}
                    <CopyButton text={pkg.version} />
                  </div>
                </div>
                <p className="text-xs text-[#5C4E3D] leading-relaxed">{pkg.description}</p>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* Component map */}
        <section className="space-y-5">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-[#7A6B5A]">Component Map</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {sections.map((s) => (
              <div key={s.label} className="p-4 rounded-lg border border-[#DDD3C3] bg-white">
                <p className="text-xs font-semibold text-[#C47A4A] mb-2">{s.label}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.items.map((item) => (
                    <span
                      key={item}
                      className="inline-block text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#F0E8DA] text-[#5C4E3D]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* Setup */}
        <section className="space-y-4">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-[#7A6B5A]">Setup</h2>
          <div className="rounded-lg border border-[#DDD3C3] bg-[#3C3C3C] text-white overflow-hidden">
            {[
              { comment: '1. Import theme in your global CSS', code: '@import "@timmbr/theme/theme.css";', color: 'text-amber-300' },
              { comment: '2. Scan UI components (Tailwind v4)', code: '@source "../node_modules/@timmbr/ui/dist";', color: 'text-sky-300' },
              { comment: '3. Wrap your app', code: '<TimmbrConfigProvider>\n  <App />\n</TimmbrConfigProvider>', color: 'text-emerald-400' },
            ].map(({ comment, code, color }) => (
              <div key={comment} className="px-5 py-4 border-b border-white/10 last:border-0">
                <p className="font-mono text-xs text-[#9CA3AF] mb-1">{comment}</p>
                <pre className={`font-mono text-xs ${color} leading-relaxed whitespace-pre`}>{code}</pre>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  ),
};
