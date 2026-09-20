import type { Meta, StoryObj } from '@storybook/react';
import { Sparkles, Check, AlertCircle } from '@timmbr/icons';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components & Data/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'brand', 'secondary', 'outline', 'subtle', 'success', 'destructive'],
      description: 'The visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Badge size',
    },
    dot: {
      control: 'boolean',
      description: 'Shows a leading dot indicator',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'primary',
    size: 'md',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Badge variant="primary">Primary (Terra-cotta 300)</Badge>
      <Badge variant="brand">Brand (Base 500)</Badge>
      <Badge variant="secondary">Secondary (Warm Sand)</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="subtle">Subtle</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-3 items-center">
      <Badge size="sm">Small (12px)</Badge>
      <Badge size="md">Medium (14px)</Badge>
      <Badge size="lg">Large (16px)</Badge>
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div className="flex gap-3 items-center">
      <Badge variant="primary" dot>
        Active Release
      </Badge>
      <Badge variant="success" dot>
        Operational
      </Badge>
      <Badge variant="outline" dot>
        Draft
      </Badge>
    </div>
  ),
};

export const WithAdornments: Story = {
  render: () => (
    <div className="flex gap-3 items-center">
      <Badge variant="brand" leftIcon={<Sparkles className="size-3.5" />}>
        New Feature
      </Badge>
      <Badge variant="success" leftIcon={<Check className="size-3.5" />}>
        Completed
      </Badge>
      <Badge variant="destructive" rightIcon={<AlertCircle className="size-3.5" />}>
        Requires Action
      </Badge>
    </div>
  ),
};
