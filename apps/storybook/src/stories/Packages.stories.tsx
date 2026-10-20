import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import {
  Check,
  Copy,
  CreditCard,
  Film,
  LayoutDashboard,
  Lock,
  Package,
  Palette,
  Settings,
  Sparkles,
  Star,
} from '@timmbr/icons';

import authPkg from '../../../../packages/auth/package.json';
import hooksPkg from '../../../../packages/hooks/package.json';
import iconsPkg from '../../../../packages/icons/package.json';
import motionPkg from '../../../../packages/motion/package.json';
import paymentsPkg from '../../../../packages/payments/package.json';
import themePkg from '../../../../packages/theme/package.json';
import uiPkg from '../../../../packages/ui/package.json';
import utilsPkg from '../../../../packages/utils/package.json';

const meta: Meta = {
  title: 'Overview/Packages',
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { page: null },
    options: { showPanel: false },
  },
};

export default meta;
type Story = StoryObj;

// ─── Shared components ────────────────────────────────────────────────────────

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
        : <Copy className="size-3 opacity-70" />}
    </button>
  );
}

function NpmBadge() {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#CB3837] text-white tracking-wide">
      npm
    </span>
  );
}

function InternalBadge() {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#DDD3C3] text-[#7A6B5A] tracking-wide">
      internal
    </span>
  );
}

function VersionTag({ version }: { version: string }) {
  return (
    <span className="font-mono text-xs text-[#7A6B5A] bg-[#F0E8DA] px-2 py-0.5 rounded">
      v{version}
    </span>
  );
}

function InstallBlock({ name }: { name: string }) {
  const cmd = `pnpm add ${name}`;
  return (
    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-[#3C3C3C] text-white font-mono text-xs">
      <span className="text-[#9CA3AF]">$</span>
      <span className="text-emerald-400">{cmd}</span>
      <CopyButton text={cmd} />
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <div className="rounded-lg border border-[#DDD3C3] bg-[#3C3C3C] overflow-hidden">
      <pre className="font-mono text-xs text-emerald-400 leading-relaxed p-4 whitespace-pre overflow-x-auto">
        {children}
      </pre>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-semibold tracking-widest uppercase text-[#7A6B5A]">
      {children}
    </h2>
  );
}

function DocTable({ rows }: { rows: { name: string; description: string }[] }) {
  return (
    <div className="rounded-lg border border-[#DDD3C3] overflow-hidden">
      <table className="w-full text-sm">
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-b border-[#DDD3C3] last:border-0 bg-white even:bg-[#FDFAF6]">
              <td className="py-2.5 px-4 align-top w-56">
                <code className="font-mono text-xs text-[#C47A4A]">{row.name}</code>
              </td>
              <td className="py-2.5 px-4 text-xs text-[#5C4E3D] leading-relaxed">
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PackagePage({
  name,
  version,
  description,
  badge,
  icon,
  children,
}: {
  name: string;
  version?: string;
  description: string;
  badge: 'npm' | 'internal';
  icon: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FDFAF6] font-sans text-[#3C3C3C]">
      <div className="bg-[#F7F1E6] border-b border-[#DDD3C3] px-8 py-10">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-[#C47A4A]">{icon}</span>
            <h1 className="font-mono text-xl font-bold text-[#3C3C3C]">{name}</h1>
            {version && <VersionTag version={version} />}
            {badge === 'npm' ? <NpmBadge /> : <InternalBadge />}
          </div>
          <p className="text-sm text-[#5C4E3D] leading-relaxed max-w-2xl">{description}</p>
          {badge === 'npm' && (
            <InstallBlock name={name} />
          )}
        </div>
      </div>
      {children && (
        <div className="max-w-4xl mx-auto px-8 py-8 space-y-8">
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const HOOKS_DATA = [
  { name: 'useControllableState', description: 'Controlled/uncontrolled state bridge with onChange callback' },
  { name: 'useDebounce', description: 'Debounces a value — emits the new value after N ms of silence' },
  { name: 'useDebouncedCallback', description: 'Debounces a function with flush(), cancel(), and isPending' },
  { name: 'useEventListener', description: 'Typed DOM event listener for window, element, or document refs' },
  { name: 'useIsomorphicLayoutEffect', description: 'useLayoutEffect on client, useEffect on server (SSR-safe)' },
  { name: 'useLocalStorage', description: 'Reactive JSON key/value with cross-tab sync via useSyncExternalStore' },
  { name: 'useMediaQuery', description: 'Reactive CSS media query boolean — SSR returns false' },
  { name: 'useMounted', description: 'True after first client render — SSR hydration guard' },
  { name: 'useOnClickOutside', description: 'Fires when a click or touch lands outside the given ref' },
  { name: 'usePrefersReducedMotion', description: 'True when the OS prefers-reduced-motion flag is active' },
  { name: 'usePrevious', description: 'Returns the value from the previous render' },
  { name: 'useRecentSearches', description: 'localStorage-backed recent search history with deduplication and max cap' },
  { name: 'useSearchSuggestions', description: 'Debounced typeahead with automatic abort control and in-memory result cache' },
  { name: 'useStoredList', description: 'Generic localStorage list (e.g. recently viewed) with cross-tab sync' },
  { name: 'useToggle', description: '[value, toggle, setTrue, setFalse] convenience for boolean state' },
  { name: 'useWindowSize', description: 'Reactive { width, height } — SSR-safe, initialises to { 0, 0 } on server' },
  { name: 'useAuthModal', description: 'Open/close the auth modal from anywhere in the tree via a shared store' },
];

const UTILS_DATA = [
  { name: 'cn', description: 'Merge Tailwind class names with clsx + tailwind-merge conflict resolution' },
  { name: 'formatNumber(value, locale?)', description: 'Locale-aware number formatter with comma separators' },
  { name: 'formatCurrency(amount, currency?, locale?)', description: 'INR/locale currency — smart decimal handling (drops .00 for whole amounts)' },
  { name: 'formatDate(date, format?, locale?)', description: 'Intl.DateTimeFormat wrapper with preset formats: date, dateTime, time, relativeDate' },
  { name: 'DATE_FORMATS', description: 'Preset format config objects: date, dateTime, time, relativeDate' },
  { name: 'truncate(str, length)', description: 'Truncates a string to N characters and appends "…"' },
  { name: 'capitalize(str)', description: 'Uppercases the first character of a string' },
  { name: 'parseJwt(token)', description: 'Safely decodes a JWT — returns null on invalid/empty input' },
  { name: 'isJwtExpired(token, skewSeconds?)', description: 'Checks JWT expiry with configurable clock-skew tolerance' },
  { name: 'ACCESS_TOKEN_COOKIE', description: 'Shared cookie name constant: "timmbr_access_token"' },
  { name: 'mapTree(nodes, fn)', description: 'Bottom-up tree transform — maps categories, menus, comment threads' },
  { name: 'ApiClient', description: 'Typed fetch client: baseUrl, apiPrefix, token refresh, Next.js cache options' },
  { name: 'ApiError', description: 'Typed error class with statusCode, code, details, and retryAfter' },
  { name: 'RequestOptions', description: 'Extended fetch options: params, body, token, next (revalidate/tags), cache' },
  { name: 'parseListingSearchParams(params)', description: 'URL search params → normalised listing state object' },
  { name: 'serializeListingSearchParams(state)', description: 'Listing state → canonical URL search string' },
  { name: 'listingReducer(state, action)', description: 'Framework-free reducer for listing page state' },
  { name: 'encodeFilters / decodeFilters', description: 'Filter map ↔ compact URL-safe string' },
  { name: 'countActiveFilters(state)', description: 'Count of non-default active filters' },
  { name: 'niceRange(min, max)', description: 'Human-readable price range string (e.g. "₹500 – ₹2,000")' },
];

const UI_SECTIONS = [
  { label: 'Foundations', items: ['Colors', 'Typography', 'Spacing', 'Radius', 'Shadows'] },
  { label: 'Actions', items: ['Button', 'LinkButton'] },
  { label: 'Forms', items: ['Input', 'Checkbox', 'Switch', 'Select', 'Radio', 'OtpInput', 'RangeSlider', 'Textarea', '…'] },
  { label: 'Data Display', items: ['Accordion', 'Avatar', 'Badge', 'Card', 'Chip', 'Table', 'Rating', 'Swatch', '…'] },
  { label: 'Feedback', items: ['Alert', 'Progress', 'Snackbar', 'Toast', 'Skeleton', 'Spinner'] },
  { label: 'Overlays', items: ['Dialog', 'Drawer', 'Tooltip', 'Popover', 'AuthModal', '…'] },
  { label: 'Navigation', items: ['NavHeader', 'NavFooter', 'Tabs', 'Breadcrumb', 'FilterPanel', '…'] },
];

// ─── Overview data ─────────────────────────────────────────────────────────────

const DS_PKGS = [
  { name: '@timmbr/ui',       version: uiPkg.version,       description: 'React component library — Radix primitives, Tailwind v4, motion-first.', icon: <LayoutDashboard className="size-4" />, story: 'overview-packages--ui' },
  { name: '@timmbr/theme',    version: themePkg.version,    description: 'Design tokens, CSS variables, and @theme definitions for Tailwind v4.',  icon: <Palette className="size-4" />,        story: 'overview-packages--theme' },
  { name: '@timmbr/motion',   version: motionPkg.version,   description: 'Shared animation core — springs, physics, layout engine, CSS fallbacks.', icon: <Film className="size-4" />,           story: 'overview-packages--motion' },
  { name: '@timmbr/icons',    version: iconsPkg.version,    description: 'Lucide icons + custom SVG glyphs, unified wrapper component.',            icon: <Star className="size-4" />,           story: 'overview-packages--icons' },
  { name: '@timmbr/hooks',    version: hooksPkg.version,    description: '17 pure React hooks — localStorage, event listeners, media queries, …',   icon: <Sparkles className="size-4" />,       story: 'overview-packages--hooks' },
  { name: '@timmbr/utils',    version: utilsPkg.version,    description: 'Zero-dep TypeScript utils: cn, formatters, API client, listing state.',   icon: <Package className="size-4" />,        story: 'overview-packages--utils' },
];

const APP_PKGS = [
  { name: '@timmbr/auth',     version: authPkg.version,     description: 'Browser-side sign-in: session store, auth modal, /api/auth BFF bridge.',  icon: <Lock className="size-4" />,           story: 'overview-packages--auth' },
  { name: '@timmbr/payments', version: paymentsPkg.version, description: 'Razorpay checkout — create-order, pay, verify via /api/core BFF.',         icon: <CreditCard className="size-4" />,     story: 'overview-packages--payments' },
];

const INTERNAL_PKGS = [
  { name: '@timmbr/tsconfig',     description: 'Shared tsconfig bases: base.json, react-library.json. Extended by all packages.' },
  { name: '@timmbr/eslint-config', description: 'Shared ESLint flat config. Extended by all packages and apps.' },
];

// ─── Stories ──────────────────────────────────────────────────────────────────

function PkgCard({
  name,
  version,
  description,
  icon,
  story,
  npm = true,
}: {
  name: string;
  version?: string;
  description: string;
  icon: React.ReactNode;
  story?: string;
  npm?: boolean;
}) {
  const inner = (
    <div className="group p-4 rounded-lg border border-[#DDD3C3] bg-white hover:border-[#C47A4A]/60 transition-colors h-full">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 text-[#C47A4A]">
          {icon}
          <span className="font-mono text-sm font-semibold text-[#3C3C3C]">{name}</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {version && (
            <span className="font-mono text-xs text-[#7A6B5A] bg-[#F0E8DA] px-2 py-0.5 rounded">
              v{version}
            </span>
          )}
          {npm ? <NpmBadge /> : <InternalBadge />}
        </div>
      </div>
      <p className="text-xs text-[#5C4E3D] leading-relaxed">{description}</p>
    </div>
  );

  if (story) {
    return (
      <a
        href={`/?path=/story/${story}`}
        target="_parent"
        className="block no-underline"
        aria-label={`View ${name} package docs`}
      >
        {inner}
      </a>
    );
  }
  return inner;
}

export const Overview: Story = {
  name: 'Overview',
  render: () => (
    <div className="min-h-screen bg-[#FDFAF6] font-sans text-[#3C3C3C]">
      <div className="bg-[#F7F1E6] border-b border-[#DDD3C3] px-8 py-10">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#7A6B5A] mb-2">Timmbr DS</p>
          <h1 className="text-3xl font-bold text-[#3C3C3C] mb-2">Packages</h1>
          <p className="text-sm text-[#5C4E3D] leading-relaxed max-w-xl">
            8 published packages · 2 internal workspace packages. Click any card to open its dedicated documentation page.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-10 space-y-10">
        {/* Design System */}
        <section className="space-y-4">
          <SectionTitle>Design System</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {DS_PKGS.map((p) => (
              <PkgCard key={p.name} {...p} />
            ))}
          </div>
        </section>

        {/* Application packages */}
        <section className="space-y-4">
          <SectionTitle>Application</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {APP_PKGS.map((p) => (
              <PkgCard key={p.name} {...p} />
            ))}
          </div>
        </section>

        {/* Internal */}
        <section className="space-y-4">
          <SectionTitle>Internal workspace tooling</SectionTitle>
          <p className="text-xs text-[#7A6B5A]">
            These packages are used inside the monorepo only — not published for consumers.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {INTERNAL_PKGS.map((p) => (
              <PkgCard
                key={p.name}
                name={p.name}
                description={p.description}
                icon={<Settings className="size-4" />}
                npm={false}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  ),
};

export const UI: Story = {
  name: 'UI',
  render: () => (
    <PackagePage
      name="@timmbr/ui"
      version={uiPkg.version}
      description="The primary React component library. Built on Radix UI primitives, Tailwind CSS v4, and a motion-first animation system. Fully compatible with Next.js App Router and React Server Components."
      badge="npm"
      icon={<LayoutDashboard className="size-5" />}
    >
      <section className="space-y-4">
        <SectionTitle>Component categories</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {UI_SECTIONS.map((s) => (
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

      <section className="space-y-4">
        <SectionTitle>Peer dependencies</SectionTitle>
        <CodeBlock>{`react >=18.0.0
react-dom >=18.0.0
@timmbr/theme    (workspace)
@timmbr/icons    (workspace)
@timmbr/motion   (workspace)
@timmbr/hooks    (workspace)
@timmbr/utils    (workspace)`}</CodeBlock>
      </section>
    </PackagePage>
  ),
};

export const Hooks: Story = {
  name: 'Hooks',
  render: () => (
    <PackagePage
      name="@timmbr/hooks"
      version={hooksPkg.version}
      description="17 pure React hooks. Zero runtime dependencies. SSR-safe. ESM-only. Covers localStorage, event listeners, media queries, debounce, window size, and more."
      badge="npm"
      icon={<Sparkles className="size-5" />}
    >
      <section className="space-y-4">
        <SectionTitle>All hooks</SectionTitle>
        <DocTable rows={HOOKS_DATA} />
      </section>
    </PackagePage>
  ),
};

export const Utils: Story = {
  name: 'Utils',
  render: () => (
    <PackagePage
      name="@timmbr/utils"
      version={utilsPkg.version}
      description="Zero-dependency TypeScript utilities. Covers class merging, formatters, JWT helpers, a typed API client, tree operations, and URL-serialisable listing state."
      badge="npm"
      icon={<Package className="size-5" />}
    >
      <section className="space-y-4">
        <SectionTitle>Exports</SectionTitle>
        <DocTable rows={UTILS_DATA} />
      </section>
    </PackagePage>
  ),
};

export const Theme: Story = {
  name: 'Theme',
  render: () => (
    <PackagePage
      name="@timmbr/theme"
      version={themePkg.version}
      description="Design tokens, CSS custom properties, and Tailwind CSS v4 @theme definitions. Import once and all tokens are available across the app."
      badge="npm"
      icon={<Palette className="size-5" />}
    >
      <section className="space-y-4">
        <SectionTitle>Global CSS setup</SectionTitle>
        <CodeBlock>{`/* In your global CSS file */
@import "@timmbr/theme/theme.css";

/* Point Tailwind v4 at the UI component source */
@source "../node_modules/@timmbr/ui/dist";`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <SectionTitle>App wrapper</SectionTitle>
        <CodeBlock>{`import { TimmbrConfigProvider } from '@timmbr/ui';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <TimmbrConfigProvider>
          {children}
        </TimmbrConfigProvider>
      </body>
    </html>
  );
}`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <SectionTitle>What it provides</SectionTitle>
        <DocTable rows={[
          { name: 'CSS custom properties', description: 'Color, spacing, radius, shadow, and typography tokens as --timmbr-* variables' },
          { name: '@theme block', description: 'Tailwind v4 theme block wiring all tokens into utility classes' },
          { name: 'Dark mode', description: 'All tokens remap under .dark — toggle via withThemeByClassName in Storybook or class="dark" on html' },
          { name: 'Typography scale', description: '--text-display-1 through --text-caption with matching line-height tokens' },
          { name: 'Brand palette', description: 'Terracotta, sand, and neutral stops: --color-brand-*, --color-surface-*, --color-text-*' },
        ]} />
      </section>
    </PackagePage>
  ),
};

export const Icons: Story = {
  name: 'Icons',
  render: () => (
    <PackagePage
      name="@timmbr/icons"
      version={iconsPkg.version}
      description="Unified icon wrapper for Lucide icons and custom SVG glyphs. Consistent size, strokeWidth, and className props across every icon."
      badge="npm"
      icon={<Star className="size-5" />}
    >
      <section className="space-y-4">
        <SectionTitle>Usage</SectionTitle>
        <CodeBlock>{`import { ArrowRight, Check, Star } from '@timmbr/icons';

// All icons accept the same props
<Star className="size-5 text-amber-500" />
<ArrowRight size={16} strokeWidth={1.5} />`}</CodeBlock>
      </section>

      <section className="space-y-4">
        <SectionTitle>Props</SectionTitle>
        <DocTable rows={[
          { name: 'size', description: 'Icon size in px (number) — defaults to 24' },
          { name: 'strokeWidth', description: 'Stroke width — defaults to 2' },
          { name: 'className', description: 'Tailwind or custom CSS classes passed to the SVG root' },
          { name: 'color', description: 'SVG stroke/fill colour — defaults to "currentColor"' },
          { name: 'absoluteStrokeWidth', description: 'Scale stroke inversely with size for consistent weight at all sizes' },
        ]} />
      </section>

      <section className="space-y-4">
        <SectionTitle>Browse icons</SectionTitle>
        <p className="text-xs text-[#5C4E3D]">
          View the full icon library in the{' '}
          <a href="/?path=/story/foundations-icons--all-icons" target="_parent" className="text-[#C47A4A] underline">
            Foundations › Icons
          </a>{' '}
          story.
        </p>
      </section>
    </PackagePage>
  ),
};

export const Motion: Story = {
  name: 'Motion',
  render: () => (
    <PackagePage
      name="@timmbr/motion"
      version={motionPkg.version}
      description="Shared animation infrastructure for the DS. Wraps motion/react with opinionated spring tokens, layout animations, and a CSS fallback layer for reduced-motion contexts."
      badge="npm"
      icon={<Film className="size-5" />}
    >
      <section className="space-y-4">
        <SectionTitle>Core exports</SectionTitle>
        <DocTable rows={[
          { name: 'motion', description: 'Re-exported from motion/react — use for all animated elements' },
          { name: 'AnimatePresence', description: 'Animate components as they enter and exit the React tree' },
          { name: 'resolveMotion(prop)', description: 'Resolve a MotionProp (true | false | config object) to final motion config' },
          { name: 'useGlobalAnimation()', description: 'Read the global animation preference from TimmbrConfigProvider' },
          { name: 'spring tokens', description: 'Opinionated spring presets: springSnappy, springSmooth, springBouncy' },
          { name: 'LayoutAnimator', description: 'Wraps children in a layout group for coordinated layout animations' },
        ]} />
      </section>

      <section className="space-y-4">
        <SectionTitle>Usage in a component</SectionTitle>
        <CodeBlock>{`import { motion, resolveMotion, useGlobalAnimation } from '@timmbr/motion';

function MyComponent({ motion: motionProp }) {
  const globalAnim = useGlobalAnimation();
  const resolved = resolveMotion(motionProp ?? globalAnim);

  return (
    <motion.div
      animate={resolved ? { opacity: 1, y: 0 } : undefined}
      initial={resolved ? { opacity: 0, y: 8 } : undefined}
      transition={resolved?.transition}
    >
      content
    </motion.div>
  );
}`}</CodeBlock>
      </section>
    </PackagePage>
  ),
};

export const Auth: Story = {
  name: 'Auth',
  render: () => (
    <PackagePage
      name="@timmbr/auth"
      version={authPkg.version}
      description="Browser-side authentication for the Timmbr storefront. Manages session state, drives the auth modal, and communicates with the shell's /api/auth BFF — never talks to the identity provider directly."
      badge="npm"
      icon={<Lock className="size-5" />}
    >
      <section className="space-y-4">
        <SectionTitle>Core exports</SectionTitle>
        <DocTable rows={[
          { name: 'useSession()', description: 'Current auth session: user, isAuthenticated, isLoading' },
          { name: 'useAuthModal()', description: 'Open/close the auth modal; read isOpen and current modalOptions' },
          { name: 'openAuthModal(options?)', description: 'Imperative helper — open the auth modal from outside React' },
          { name: 'closeAuthModal()', description: 'Imperative helper — close the auth modal' },
          { name: 'AuthModalHost', description: 'Mount once in the app root to render the auth modal' },
          { name: 'useCartCount / useCartQuantity', description: 'Cart badge counts synced across tabs via the cart store' },
          { name: 'setCartLines / bumpCartCount', description: 'Update cart state from checkout or server actions' },
        ]} />
      </section>

      <section className="space-y-4">
        <SectionTitle>Dependencies</SectionTitle>
        <CodeBlock>{`dependencies:
  @timmbr/hooks   (workspace)
  @timmbr/icons   (workspace)
  @timmbr/utils   (workspace)

peerDependencies:
  react >=18.0.0
  @timmbr/ui (optional — for modal UI)`}</CodeBlock>
      </section>
    </PackagePage>
  ),
};

export const Payments: Story = {
  name: 'Payments',
  render: () => (
    <PackagePage
      name="@timmbr/payments"
      version={paymentsPkg.version}
      description="Razorpay checkout for the Timmbr storefront. Loads the Razorpay SDK, runs the create-order → pay → verify flow through the shell's /api/core BFF, and exposes it as a single hook."
      badge="npm"
      icon={<CreditCard className="size-5" />}
    >
      <section className="space-y-4">
        <SectionTitle>Core exports</SectionTitle>
        <DocTable rows={[
          { name: 'usePayment()', description: 'Main hook: initiate(options) → handles SDK load, order creation, payment, and server-side verification' },
          { name: 'PaymentStatus', description: 'Enum: IDLE | LOADING | SUCCESS | FAILED' },
          { name: 'PaymentOptions', description: 'Options passed to initiate(): amount, currency, orderId, name, description, prefill, …' },
          { name: 'PaymentResult', description: 'Result shape: { status, razorpayOrderId, razorpayPaymentId, signature?, error? }' },
        ]} />
      </section>

      <section className="space-y-4">
        <SectionTitle>Usage</SectionTitle>
        <CodeBlock>{`import { usePayment } from '@timmbr/payments';

function CheckoutButton() {
  const { initiate, status } = usePayment();

  return (
    <button
      onClick={() => initiate({ amount: 9999, currency: 'INR' })}
      disabled={status === 'LOADING'}
    >
      Pay ₹99.99
    </button>
  );
}`}</CodeBlock>
      </section>
    </PackagePage>
  ),
};

export const Config: Story = {
  name: 'Config',
  render: () => (
    <div className="min-h-screen bg-[#FDFAF6] font-sans text-[#3C3C3C]">
      <div className="bg-[#F7F1E6] border-b border-[#DDD3C3] px-8 py-10">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="text-[#C47A4A]"><Settings className="size-5" /></span>
            <h1 className="text-xl font-bold text-[#3C3C3C]">Internal tooling</h1>
            <InternalBadge />
          </div>
          <p className="text-sm text-[#5C4E3D] leading-relaxed max-w-2xl">
            Two internal workspace-only packages provide shared TypeScript and ESLint configuration.
            These are <strong>not published to npm</strong> — consumers should not install them.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-8 space-y-10">
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="font-mono text-base font-bold text-[#3C3C3C]">@timmbr/tsconfig</h2>
            <InternalBadge />
          </div>
          <p className="text-sm text-[#5C4E3D]">Shared tsconfig bases extended by all packages and apps.</p>

          <SectionTitle>Configs</SectionTitle>
          <DocTable rows={[
            { name: 'base.json', description: 'ESNext target, strict mode, resolveJsonModule, isolatedModules, sourceMaps' },
            { name: 'react-library.json', description: 'Extends base.json + jsx: react-jsx, module: ESNext, moduleResolution: Bundler' },
          ]} />

          <SectionTitle>Usage</SectionTitle>
          <CodeBlock>{`// tsconfig.json in any package
{
  "extends": "@timmbr/tsconfig/react-library.json",
  "compilerOptions": { "noEmit": true },
  "include": ["src"]
}`}</CodeBlock>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="font-mono text-base font-bold text-[#3C3C3C]">@timmbr/eslint-config</h2>
            <InternalBadge />
          </div>
          <p className="text-sm text-[#5C4E3D]">Shared ESLint flat config extended by all packages and apps.</p>

          <SectionTitle>Usage</SectionTitle>
          <CodeBlock>{`// eslint.config.mjs in any package or app
import timmbrConfig from '@timmbr/eslint-config';

export default [...timmbrConfig];`}</CodeBlock>
        </section>
      </div>
    </div>
  ),
};
