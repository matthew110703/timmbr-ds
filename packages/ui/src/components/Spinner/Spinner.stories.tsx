import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Feedback/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Spinner dimension',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'white', 'muted'],
      description: 'Color theme of the spinner',
    },
    label: {
      control: 'text',
      description: 'Accessible screen reader text',
    },
    children: {
      control: 'text',
      description: 'Visible companion loading text',
    },
  },
  args: {
    size: 'md',
    variant: 'default',
    label: 'Loading...',
    children: 'Compiling cut schedule...',
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-6 p-4 bg-grey-50 dark:bg-grey-900 rounded-lg">
      <Spinner variant="default" children="Default" />
      <Spinner variant="secondary" children="Secondary" />
      <Spinner variant="muted" children="Muted" />
      <div className="p-3 bg-primary rounded-md">
        <Spinner variant="white" children={<span className="text-white">White</span>} />
      </div>
    </div>
  ),
};
