import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Progress } from './Progress';

const meta: Meta<typeof Progress> = {
  title: 'Feedback/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Completion percentage value (0 to 100)',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'destructive'],
      description: 'Progress bar color theme',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Bar thickness',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Renders an active pulsing indeterminate state',
    },
    showValue: {
      control: 'boolean',
      description: 'Displays the percentage text in the header',
    },
    label: {
      control: 'text',
      description: 'Progress bar label text',
    },
  },
  args: {
    value: 65,
    variant: 'default',
    size: 'default',
    label: 'Kiln Moisture Evaporation',
    showValue: true,
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <Progress label="Default / Primary" value={72} variant="default" showValue />
      <Progress label="Success / Stable" value={100} variant="success" showValue />
      <Progress label="Warning / Approaching Threshold" value={88} variant="warning" showValue />
      <Progress label="Destructive / Tolerance Failure" value={34} variant="destructive" showValue />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <Progress size="sm" label="Small (6px)" value={45} showValue />
      <Progress size="default" label="Default (10px)" value={65} showValue />
      <Progress size="lg" label="Large (16px)" value={85} showValue />
    </div>
  ),
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    label: 'Analyzing CAD Toolpath geometry...',
  },
};
