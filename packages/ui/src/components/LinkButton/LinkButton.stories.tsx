import type { Meta, StoryObj } from '@storybook/react';
import { Sparkles, ArrowRight, ExternalLink, Download } from '@timmbr/icons';
import { TimmbrConfigProvider } from '../../providers';
import { LinkButton } from './LinkButton';

const meta: Meta<typeof LinkButton> = {
  title: 'Components & Data/LinkButton',
  component: LinkButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'link', 'primary', 'secondary', 'outline', 'ghost', 'destructive', 'muted', 'subtle'],
      description: 'The visual style variant of the link button. Defaults to link styling.',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'md', 'lg', 'icon'],
      description: 'Size dimension scale',
    },
    loading: {
      control: 'boolean',
      description: 'Shows an animated loading spinner',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables user interaction and navigation',
    },
    crossZone: {
      control: 'boolean',
      description: 'Forces hard navigation across zone boundaries, bypassing next/link',
    },
    zone: {
      control: 'text',
      description: 'Target zone name resolved via TimmbrConfigProvider',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LinkButton>;

export const Default: Story = {
  args: {
    children: 'Explore Documentation (Link Style by Default)',
    href: '/dashboard',
    variant: 'default',
    size: 'default',
  },
};

export const LinkVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <LinkButton href="/default">Default Link Style</LinkButton>
      <LinkButton href="/link" variant="link">Link Variant</LinkButton>
      <LinkButton href="/muted" variant="muted">Muted Link</LinkButton>
      <LinkButton href="/subtle" variant="subtle">Subtle Link</LinkButton>
      <p className="text-sm">
        LinkButton can also be embedded directly in body text: <LinkButton href="/terms">Terms of Service</LinkButton>.
      </p>
    </div>
  ),
};

export const ButtonVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <LinkButton href="#primary" variant="primary">Primary Button</LinkButton>
      <LinkButton href="#secondary" variant="secondary">Secondary Button</LinkButton>
      <LinkButton href="#outline" variant="outline">Outline Button</LinkButton>
      <LinkButton href="#ghost" variant="ghost">Ghost Button</LinkButton>
      <LinkButton href="#destructive" variant="destructive">Destructive Button</LinkButton>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 items-center">
      <LinkButton href="/explore" leftIcon={<Sparkles className="size-4" />}>
        Get Started
      </LinkButton>
      <LinkButton
        href="https://google.com"
        target="_blank"
        rel="noopener noreferrer"
        rightIcon={<ExternalLink className="size-4" />}
      >
        External Docs
      </LinkButton>
      <LinkButton
        href="/assets/report.pdf"
        variant="primary"
        leftIcon={<Download className="size-4" />}
        rightIcon={<ArrowRight className="size-4" />}
      >
        Download Assets
      </LinkButton>
    </div>
  ),
};

export const CrossZoneNavigation: Story = {
  render: () => (
    <TimmbrConfigProvider
      config={{
        zones: {
          currentZone: 'marketing',
          zones: {
            app: 'https://app.timmbr.com',
            docs: 'https://docs.timmbr.com',
          },
        },
      }}
    >
      <div className="flex flex-col gap-4">
        {/* Same-zone internal Next.js link */}
        <LinkButton href="/pricing">
          Internal Route (next/link SPA routing)
        </LinkButton>

        {/* Explicit crossZone flag */}
        <LinkButton
          href="/portal"
          crossZone
          rightIcon={<ExternalLink className="size-4" />}
        >
          Cross-Zone Link (Hard Nav, bypasses next/link)
        </LinkButton>

        {/* Resolved zone URL */}
        <LinkButton
          zone="app"
          href="/overview"
          rightIcon={<ExternalLink className="size-4" />}
        >
          Go to App Zone (Resolves to https://app.timmbr.com/overview)
        </LinkButton>
      </div>
    </TimmbrConfigProvider>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <LinkButton href="#sm" size="sm">Small Link (text-xs)</LinkButton>
        <LinkButton href="#default" size="default">Default Link (text-sm)</LinkButton>
        <LinkButton href="#lg" size="lg">Large Link (text-base)</LinkButton>
      </div>
      <div className="flex gap-4 items-center">
        <LinkButton href="#sm" variant="primary" size="sm">Small Button (36px)</LinkButton>
        <LinkButton href="#default" variant="primary" size="default">Default Button (44px)</LinkButton>
        <LinkButton href="#lg" variant="primary" size="lg">Large Button (52px)</LinkButton>
      </div>
    </div>
  ),
};

export const DisabledAndLoading: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 items-center">
      <LinkButton href="#disabled" disabled>
        Disabled Link
      </LinkButton>
      <LinkButton href="#loading" loading loadingText="Connecting...">
        Loading Link
      </LinkButton>
      <LinkButton href="#disabled-btn" disabled variant="primary">
        Disabled Button
      </LinkButton>
    </div>
  ),
};

export const AsChild: Story = {
  render: () => (
    <LinkButton asChild>
      <a href="#custom-router-link" target="_blank" rel="noreferrer">
        Custom Framework Link (asChild)
      </a>
    </LinkButton>
  ),
};
