import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Label } from './Label';

const meta: Meta<typeof Label> = {
  title: 'Forms/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: 'Full Legal Name',
  },
};

export const Required: Story = {
  args: {
    children: 'Work Email Address',
    required: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Label size="sm">Small Label (12px)</Label>
      <Label size="default">Default Label (14px)</Label>
      <Label size="lg">Large Label (16px)</Label>
    </div>
  ),
};
