import type { Meta, StoryObj } from '@storybook/react';
import { Sparkles, ArrowRight, ChevronRight, Download } from '@timmbr/icons';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components & Data/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'outline', 'ghost', 'destructive', 'link'],
      description: 'The visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'md', 'lg', 'icon'],
      description: 'The size dimension of the button',
    },
    loading: {
      control: 'boolean',
      description: 'Shows an animated loading spinner',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables user interaction',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Shop the collection',
    variant: 'default',
    size: 'lg',
  },
};

export const WithAdornmentIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button leftIcon={<Sparkles className="size-4" />}>
        Generate with AI
      </Button>
      <Button variant="secondary" rightIcon={<ArrowRight className="size-4" />}>
        Continue
      </Button>
      <Button
        variant="outline"
        leftIcon={<Download className="size-4" />}
        rightIcon={<ChevronRight className="size-4" />}
      >
        Export Asset
      </Button>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link Button</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button size="sm">Small (36px)</Button>
      <Button size="default">Default / Medium (44px)</Button>
      <Button size="lg">Large (52px)</Button>
      <Button size="icon" aria-label="Action icon">
        <ArrowRight className="size-5" />
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button loading>Submitting</Button>
      <Button loading loadingText="Processing..." variant="secondary">
        Save Changes
      </Button>
      <Button loading variant="outline" size="sm">
        Small
      </Button>
    </div>
  ),
};

export const AsChild: Story = {
  render: () => (
    <Button asChild>
      <a href="#link-destination" target="_blank" rel="noreferrer">
        Rendered as Anchor Link
      </a>
    </Button>
  ),
};

export const MotionAndInteractions: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Button variant="primary">Default Micro-Animation (Click & Hover)</Button>
        <Button variant="secondary" motion={false}>
          Motion Disabled (motion=false)
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          motion={{
            hover: { scale: 1.05 },
            tap: { scale: 0.92 },
            className: 'shadow-md hover:shadow-lg',
          }}
        >
          Custom Motion Config
        </Button>
        <Button variant="default" motion="fade">
          Preset: Fade
        </Button>
      </div>
    </div>
  ),
};
