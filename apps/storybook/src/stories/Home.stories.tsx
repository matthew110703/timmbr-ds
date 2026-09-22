import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Badge } from '@timmbr/ui';
import { Chip } from '@timmbr/ui';
import { Divider } from '@timmbr/ui';

import rootPkg from '../../../../package.json';
import uiPkg from '../../../../packages/ui/package.json';
import themePkg from '../../../../packages/theme/package.json';
import motionPkg from '../../../../packages/motion/package.json';
import iconsPkg from '../../../../packages/icons/package.json';
import hooksPkg from '../../../../packages/hooks/package.json';
import utilsPkg from '../../../../packages/utils/package.json';

const meta: Meta = {
  title: 'Overview/Home',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Informational overview of the Timmbr Design System workspace packages and topology.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const packages = [
  {
    name: uiPkg.name,
    version: uiPkg.version,
    type: 'React Library',
    status: 'Stable',
    description: 'Production-ready component library featuring Radix UI primitives and Tailwind v4.',
    role: 'Primary UI Consumer',
  },
  {
    name: themePkg.name,
    version: themePkg.version,
    type: 'Design Tokens',
    status: 'Active',
    description: 'Centralized design tokens, CSS variables, and Tailwind CSS v4 @theme directives.',
    role: 'Foundation Token Layer',
  },
  {
    name: motionPkg.name,
    version: motionPkg.version,
    type: 'Animation Core',
    status: 'Active',
    description: 'Shared motion infrastructure, springs, physics transitions, and silent CSS fallbacks.',
    role: 'Animation Engine',
  },
  {
    name: iconsPkg.name,
    version: iconsPkg.version,
    type: 'Icon System',
    status: 'Stable',
    description: 'Curated Lucide icon integrations and custom industrial woodcraft SVG glyphs.',
    role: 'Visual Assets',
  },
  {
    name: hooksPkg.name,
    version: hooksPkg.version,
    type: 'Utilities',
    status: 'Stable',
    description: 'Pure headless React hooks for layout observation, focus trapping, and motion telemetry.',
    role: 'Behavioral Utilities',
  },
  {
    name: utilsPkg.name,
    version: utilsPkg.version,
    type: 'Utilities',
    status: 'Stable',
    description: 'Zero-dependency TypeScript utilities: className merger (cn), gap parsers, formatters.',
    role: 'Shared Helpers',
  },
];

import { Check, Copy } from '@timmbr/icons';

function CopyButton({
  text,
  title = 'Copy',
  light = false,
}: {
  text: string;
  title?: string;
  light?: boolean;
}) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={copied ? 'Copied!' : title}
      aria-label={title}
      className={`inline-flex items-center justify-center p-0.5 rounded transition-all active:scale-95 ${
        light
          ? 'text-white/80 hover:text-white hover:bg-white/20'
          : 'text-grey-400 hover:text-grey-700 dark:hover:text-grey-200 hover:bg-grey-200 dark:hover:bg-grey-700'
      }`}
    >
      {copied ? (
        <Check className={`w-3 h-3 ${light ? 'text-emerald-300' : 'text-emerald-500'}`} />
      ) : (
        <Copy className="w-3 h-3" />
      )}
    </button>
  );
}

export const Overview: Story = {
  render: () => {
    return (
      <div className="max-w-5xl mx-auto space-y-10 py-6">
        {/* Hero Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-semibold rounded bg-primary text-white tracking-wide">
              <span>v{rootPkg.version}</span>
              <CopyButton text={rootPkg.version} title="Copy version" light />
            </div>
            <Badge variant="default">Turborepo + PNPM Workspace</Badge>
            <Badge variant="outline">Tailwind CSS v4</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Timmbr Design System
          </h1>
          <p className="text-base text-grey-600 dark:text-grey-400 max-w-3xl leading-relaxed">
            A high-performance design system and component architecture engineered for precision
            woodcraft ERPs, CNC machinery dashboards, and next-generation industrial web applications.
          </p>
        </div>

        <Divider />

        {/* Workspace Packages Matrix */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-foreground">Workspace Packages</h2>
            <span className="text-xs font-medium text-grey-500">6 internal packages</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className="p-5 rounded-lg border border-grey-200 dark:border-grey-800 bg-white dark:bg-grey-900/50 shadow-sm flex flex-col justify-between hover:border-grey-400 dark:hover:border-grey-600 transition-colors"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-semibold text-primary dark:text-primary-400">
                      {pkg.name}
                    </span>
                    <div className="inline-flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded bg-grey-100 dark:bg-grey-800 text-grey-700 dark:text-grey-300 font-medium">
                      <span>v{pkg.version}</span>
                      <CopyButton text={pkg.version} title={`Copy ${pkg.name} version`} />
                    </div>
                  </div>
                  <p className="text-xs text-grey-600 dark:text-grey-400 leading-normal">
                    {pkg.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-grey-100 dark:border-grey-800 flex items-center justify-between text-xs text-grey-500">
                  <span>{pkg.role}</span>
                  <Chip size="sm" variant="outlined">
                    {pkg.status}
                  </Chip>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* Architecture Topology */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-foreground">Architecture Topology</h2>
          <div className="p-6 rounded-lg border border-grey-200 dark:border-grey-800 bg-grey-50 dark:bg-grey-900/30">
            <pre className="font-mono text-xs text-grey-700 dark:text-grey-300 leading-relaxed overflow-x-auto">
{`                    ┌────────────────────────┐
                    │     @timmbr/motion     │  (Shared Animation Core)
                    │  transitions, physics  │
                    └───────────┬────────────┘
                                │
                 ┌──────────────┴──────────────┐
                 ▼                             ▼
        ┌──────────────────┐          ┌──────────────────┐
        │   @timmbr/ui     │          │    Timmbr App    │
        │  Dialog, Drawer, │          │   Page & route   │
        │  Tabs, Overlays  │          │   transitions    │
        └────────┬─────────┘          └──────────────────┘
                 │
                 ▼
        ┌────────────────────────────────────────────────┐
        │ Fallback: Silent CSS transitions if no motion  │
        └────────────────────────────────────────────────┘`}
            </pre>
          </div>
        </div>

        {/* Quickstart Instructions */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-foreground">Quickstart</h2>
          <div className="p-4 rounded-lg border border-grey-200 dark:border-grey-800 bg-grey-900 text-grey-100 font-mono text-xs space-y-3">
            <div>
              <span className="text-grey-500"># 1. Install UI package and theme</span>
              <div className="text-emerald-400 mt-1">pnpm add @timmbr/ui @timmbr/theme @timmbr/motion</div>
            </div>
            <div>
              <span className="text-grey-500"># 2. Import theme in your global css</span>
              <div className="text-amber-300 mt-1">@import "@timmbr/theme/theme.css";</div>
            </div>
            <div>
              <span className="text-grey-500"># 3. Use components</span>
              <div className="text-blue-300 mt-1">
                import {'{ Button, Input, Table, DataList }'} from &apos;@timmbr/ui&apos;;
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
