import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Divider } from '@timmbr/ui';
import {
  Check,
  Copy,
  CreditCard,
  Film,
  LayoutDashboard,
  Lock,
  Package,
  Palette,
  Sparkles,
  Star,
} from '@timmbr/icons';

import * as allHooks from '@timmbr/hooks';
import * as allUtils from '@timmbr/utils';

import authPkg from '../../../../packages/auth/package.json';
import eslintPkg from '../../../../packages/config-eslint/package.json';
import tsconfigPkg from '../../../../packages/config-typescript/package.json';
import hooksPkg from '../../../../packages/hooks/package.json';
import iconsPkg from '../../../../packages/icons/package.json';
import motionPkg from '../../../../packages/motion/package.json';
import paymentsPkg from '../../../../packages/payments/package.json';
import themePkg from '../../../../packages/theme/package.json';
import uiPkg from '../../../../packages/ui/package.json';
import utilsPkg from '../../../../packages/utils/package.json';

const PUBLISHED_PKGS = [uiPkg, hooksPkg, utilsPkg, themePkg, iconsPkg, motionPkg, authPkg, paymentsPkg];
const INTERNAL_PKGS = [tsconfigPkg, eslintPkg];
const TOTAL_PKGS = PUBLISHED_PKGS.length + INTERNAL_PKGS.length;
const PUBLISHED_COUNT = PUBLISHED_PKGS.length;
const HOOK_COUNT = Object.keys(allHooks ?? {}).length;
const UTIL_COUNT = Object.keys(allUtils ?? {}).length;
// Count top-level component directories at build time — no module imports so no 'use client' collision
const componentEntries = import.meta.glob('../../../../packages/ui/src/components/*/index.ts');
const COMPONENT_COUNT = Object.keys(componentEntries ?? {}).length;

const fmt = (n: number) => (Number.isFinite(n) && n > 0 ? String(n) : '–');

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
    version: uiPkg.version,
    description: 'React component library — Radix primitives, Tailwind v4, motion-first.',
    icon: <LayoutDashboard className="size-4" />,
    story: 'overview-packages--ui',
  },
  {
    name: '@timmbr/theme',
    version: themePkg.version,
    description: 'Design tokens, CSS variables, and @theme definitions.',
    icon: <Palette className="size-4" />,
    story: 'overview-packages--theme',
  },
  {
    name: '@timmbr/motion',
    version: motionPkg.version,
    description: 'Shared animation core — springs, physics, CSS fallbacks.',
    icon: <Film className="size-4" />,
    story: 'overview-packages--motion',
  },
  {
    name: '@timmbr/icons',
    version: iconsPkg.version,
    description: 'Lucide icons + custom SVG glyphs, unified wrapper.',
    icon: <Star className="size-4" />,
    story: 'overview-packages--icons',
  },
  {
    name: '@timmbr/hooks',
    version: hooksPkg.version,
    description: '17 pure React hooks — localStorage, events, media queries.',
    icon: <Sparkles className="size-4" />,
    story: 'overview-packages--hooks',
  },
  {
    name: '@timmbr/utils',
    version: utilsPkg.version,
    description: 'Zero-dep TypeScript utils: cn, formatters, API client.',
    icon: <Package className="size-4" />,
    story: 'overview-packages--utils',
  },
  {
    name: '@timmbr/auth',
    version: authPkg.version,
    description: 'Browser-side sign-in — session store, auth modal, BFF bridge.',
    icon: <Lock className="size-4" />,
    story: 'overview-packages--auth',
  },
  {
    name: '@timmbr/payments',
    version: paymentsPkg.version,
    description: 'Razorpay checkout — create-order, pay, verify via BFF.',
    icon: <CreditCard className="size-4" />,
    story: 'overview-packages--payments',
  },
];

const sections = [
  {
    label: 'Foundations',
    items: [
      { name: 'Colors',       story: 'foundations-colors--palettes' },
      { name: 'Typography',   story: 'foundations-typography--specification' },
      { name: 'Spacing',      story: 'foundations-spacing--spacingscale' },
      { name: 'Radius',       story: 'foundations-radius--radiusscale' },
      { name: 'Shadows',      story: 'foundations-shadows--elevationshadows' },
    ],
  },
  {
    label: 'Actions',
    items: [
      { name: 'Button',     story: 'actions-button--default' },
      { name: 'LinkButton', story: 'actions-linkbutton--default' },
    ],
  },
  {
    label: 'Forms',
    items: [
      { name: 'Input',       story: 'forms-input--default' },
      { name: 'Checkbox',    story: 'forms-checkbox--default' },
      { name: 'Switch',      story: 'forms-switch--default' },
      { name: 'Select',      story: 'forms-select--default' },
      { name: 'Radio',       story: 'forms-radio--default' },
      { name: 'OtpInput',    story: 'forms-otpinput--default' },
      { name: 'RangeSlider', story: 'forms-rangeslider--default' },
      { name: 'Textarea',    story: 'forms-textarea--default' },
      { name: '…' },
    ],
  },
  {
    label: 'Data Display',
    items: [
      { name: 'Accordion', story: 'data-display-accordion--default' },
      { name: 'Avatar',    story: 'data-display-avatar--default' },
      { name: 'Badge',     story: 'data-display-badge--default' },
      { name: 'Card',      story: 'data-display-card--default' },
      { name: 'Chip',      story: 'data-display-chip--default' },
      { name: 'Table',     story: 'data-display-table--default' },
      { name: 'Rating',    story: 'data-display-rating--default' },
      { name: 'Swatch',    story: 'data-display-swatch--default' },
      { name: '…' },
    ],
  },
  {
    label: 'Feedback',
    items: [
      { name: 'Alert',        story: 'feedback-alert--default' },
      { name: 'Progress',     story: 'feedback-progress--default' },
      { name: 'PageProgress', story: 'feedback-pageprogress--default' },
      { name: 'Snackbar',     story: 'feedback-snackbar--playground' },
      { name: 'Toast',        story: 'feedback-toast--default' },
      { name: 'Skeleton',     story: 'feedback-skeleton--default' },
      { name: 'Spinner',      story: 'feedback-spinner--default' },
    ],
  },
  {
    label: 'Overlays',
    items: [
      { name: 'Dialog',    story: 'overlays-dialog--default' },
      { name: 'Drawer',    story: 'overlays-drawer--default' },
      { name: 'Tooltip',   story: 'overlays-tooltip--default' },
      { name: 'Popover',   story: 'overlays-popover--default' },
      { name: 'AuthModal', story: 'overlays-authmodal--default' },
      { name: '…' },
    ],
  },
  {
    label: 'Navigation',
    items: [
      { name: 'NavHeader',   story: 'navigation-navheader--default' },
      { name: 'NavFooter',   story: 'navigation-navfooter--default' },
      { name: 'Tabs',        story: 'navigation-tabs--default' },
      { name: 'Breadcrumb',  story: 'navigation-breadcrumb--default' },
      { name: 'FilterPanel', story: 'navigation-filterpanel--default' },
      { name: '…' },
    ],
  },
];

// ─── Architecture diagram ─────────────────────────────────────────────────────

function ArchNode({
  name,
  type,
  story,
}: {
  name: string;
  type: 'consumer' | 'npm' | 'internal';
  story?: string;
}) {
  const base =
    'font-mono text-xs font-semibold px-3 py-1.5 rounded border transition-colors whitespace-nowrap';
  const styles: Record<string, string> = {
    consumer: 'border-[#DDD3C3] bg-white text-[#3C3C3C]',
    npm:      'border-[#C47A4A]/60 bg-[#F7F1E6] text-[#C47A4A]',
    internal: 'border-dashed border-[#DDD3C3] bg-[#FDFAF6] text-[#7A6B5A]',
  };
  const node = (
    <span className={`${base} ${styles[type]}`}>{name}</span>
  );
  if (story) {
    return (
      <a href={`/?path=/story/${story}`} target="_parent" className="no-underline hover:opacity-80">
        {node}
      </a>
    );
  }
  return node;
}

function ArchitectureDiagram() {
  return (
    <div className="rounded-lg border border-[#DDD3C3] bg-white p-6 space-y-5 overflow-x-auto">
      {/* Row 1 — apps */}
      <div className="flex flex-wrap justify-center gap-2">
        <ArchNode name="apps/*" type="consumer" />
      </div>

      {/* Arrow */}
      <div className="flex justify-center">
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-px h-4 bg-[#DDD3C3]" />
          <span className="text-[10px] text-[#7A6B5A] font-medium leading-none">↓ depends on</span>
          <div className="w-px h-4 bg-[#DDD3C3]" />
        </div>
      </div>

      {/* Row 2 — UI + application packages */}
      <div className="flex flex-wrap justify-center gap-2">
        <ArchNode name="@timmbr/ui" type="npm" story="overview-packages--ui" />
        <ArchNode name="@timmbr/auth" type="npm" story="overview-packages--auth" />
        <ArchNode name="@timmbr/payments" type="npm" story="overview-packages--payments" />
      </div>

      {/* Arrow */}
      <div className="flex justify-center">
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-px h-4 bg-[#DDD3C3]" />
          <span className="text-[10px] text-[#7A6B5A] font-medium leading-none">↓ depends on</span>
          <div className="w-px h-4 bg-[#DDD3C3]" />
        </div>
      </div>

      {/* Row 3 — primitives */}
      <div className="flex flex-wrap justify-center gap-2">
        <ArchNode name="@timmbr/theme" type="npm" story="overview-packages--theme" />
        <ArchNode name="@timmbr/icons" type="npm" story="overview-packages--icons" />
        <ArchNode name="@timmbr/motion" type="npm" story="overview-packages--motion" />
        <ArchNode name="@timmbr/hooks" type="npm" story="overview-packages--hooks" />
        <ArchNode name="@timmbr/utils" type="npm" story="overview-packages--utils" />
      </div>

      {/* Internal tooling */}
      <div className="border-t border-dashed border-[#DDD3C3] pt-4">
        <p className="text-center text-[10px] font-medium text-[#7A6B5A] uppercase tracking-widest mb-3">
          workspace dev tooling (not published)
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <ArchNode name="@timmbr/tsconfig" type="internal" />
          <ArchNode name="@timmbr/eslint-config" type="internal" />
        </div>
      </div>
    </div>
  );
}

export const Overview: Story = {
  render: () => (
    <div className="min-h-screen bg-[#FDFAF6] font-sans text-[#3C3C3C]">
      {/* Hero */}
      <div className="bg-[#F7F1E6] border-b border-[#DDD3C3] px-8 py-12">
        <div className="max-w-5xl mx-auto space-y-4">
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

          {/* Framework compat badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            {['Next.js App Router', 'React 18+', 'Tailwind v4', 'RSC'].map((f) => (
              <span
                key={f}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#DDD3C3] text-xs text-[#5C4E3D]"
              >
                <Check className="size-3 text-emerald-500" />
                {f}
              </span>
            ))}
          </div>

          {/* Install */}
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-[#3C3C3C] text-white font-mono text-xs mt-2">
            <span className="text-[#9CA3AF]">$</span>
            <span className="text-emerald-400">pnpm add @timmbr/ui @timmbr/theme @timmbr/motion</span>
            <CopyButton text="pnpm add @timmbr/ui @timmbr/theme @timmbr/motion" />
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="bg-white border-b border-[#DDD3C3] px-8 py-3">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-[#5C4E3D]">
          {[
            { value: fmt(TOTAL_PKGS),      label: 'packages'   },
            { value: fmt(PUBLISHED_COUNT), label: 'published'  },
            { value: fmt(COMPONENT_COUNT), label: 'components' },
            { value: fmt(HOOK_COUNT),      label: 'hooks'      },
            { value: fmt(UTIL_COUNT),      label: 'utilities'  },
          ].map((stat, i, arr) => (
            <React.Fragment key={stat.label}>
              <span>
                <strong className="font-semibold text-[#3C3C3C]">{stat.value}</strong>
                {' '}{stat.label}
              </span>
              {i < arr.length - 1 && (
                <span className="text-[#DDD3C3] select-none">·</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-10 space-y-12">
        {/* Packages */}
        <section className="space-y-5">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-[#7A6B5A]">Packages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {packages.map((pkg) => (
              <a
                key={pkg.name}
                href={`/?path=/story/${pkg.story}`}
                target="_parent"
                className="no-underline block"
                aria-label={`View ${pkg.name} docs`}
              >
                <div className="group p-4 rounded-lg border border-[#DDD3C3] bg-white hover:border-[#C47A4A]/60 transition-colors h-full cursor-pointer">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 text-[#C47A4A]">
                      {pkg.icon}
                      <span className="font-mono text-xs font-semibold text-[#3C3C3C] truncate">{pkg.name}</span>
                    </div>
                    <div className="flex items-center gap-0.5 shrink-0 font-mono text-xs text-[#7A6B5A] bg-[#F0E8DA] px-2 py-0.5 rounded">
                      v{pkg.version || '–'}
                      <CopyButton text={pkg.version || ''} />
                    </div>
                  </div>
                  <p className="text-xs text-[#5C4E3D] leading-relaxed">{pkg.description}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <Divider />

        {/* Architecture */}
        <section className="space-y-5">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-[#7A6B5A]">Architecture</h2>
          <p className="text-xs text-[#5C4E3D]">
            Package dependency layers — click any box to open its documentation.
          </p>
          <ArchitectureDiagram />
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
                  {s.items.map((item) =>
                    item.story ? (
                      <a
                        key={item.name}
                        href={`/?path=/story/${item.story}`}
                        target="_parent"
                        className="no-underline"
                      >
                        <span className="inline-block text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#F0E8DA] text-[#5C4E3D] hover:bg-[#C47A4A]/20 hover:text-[#C47A4A] transition-colors cursor-pointer">
                          {item.name}
                        </span>
                      </a>
                    ) : (
                      <span
                        key={item.name}
                        className="inline-block text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#F0E8DA] text-[#5C4E3D] opacity-50"
                      >
                        {item.name}
                      </span>
                    )
                  )}
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
