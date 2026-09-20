import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular', 'card'],
      description: 'Skeleton geometry',
    },
    animation: {
      control: 'select',
      options: ['pulse', 'wave', 'none'],
      description: 'Animation effect',
    },
    lines: {
      control: 'number',
      description: 'Number of lines for text variant',
    },
  },
  args: {
    variant: 'text',
    animation: 'pulse',
    lines: 3,
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-full max-w-sm">
      {/* Avatar + Text */}
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" width={48} height={48} animation="wave" />
        <div className="flex-1">
          <Skeleton variant="text" lines={2} animation="wave" />
        </div>
      </div>

      {/* Card Preview */}
      <div className="p-4 border border-grey-200 dark:border-grey-800 rounded-xl space-y-3">
        <Skeleton variant="rectangular" height={140} animation="wave" />
        <Skeleton variant="text" lines={3} animation="wave" />
      </div>
    </div>
  ),
};

export const ShimmerWave: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-full max-w-md">
      <Skeleton variant="rectangular" height={200} animation="wave" />
      <Skeleton variant="text" lines={4} animation="wave" />
    </div>
  ),
};
