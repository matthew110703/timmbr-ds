import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { EmptyState } from './EmptyState';
import { Button } from '../Button';
import { Download } from '@timmbr/icons';

const meta: Meta<typeof EmptyState> = {
  title: 'Feedback/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'subtle'],
      description: 'Border and background styling',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Container scale and padding',
    },
    title: {
      control: 'text',
      description: 'Main heading text',
    },
    description: {
      control: 'text',
      description: 'Contextual explanatory copy',
    },
  },
  args: {
    title: 'No Timber Cut Lists Found',
    description: 'You have not uploaded any CAD timber schedules yet. Create your first specification to start optimization.',
    variant: 'bordered',
    size: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  render: (args) => (
    <EmptyState
      {...args}
      action={<Button variant="primary">Create Cut List</Button>}
      secondaryAction={<Button variant="outline">Import DXF</Button>}
    />
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-full max-w-lg">
      <EmptyState
        variant="bordered"
        title="Bordered Style"
        description="Dashed border style with elevated icon."
        action={<Button variant="primary" size="sm">Action</Button>}
      />
      <EmptyState
        variant="subtle"
        title="Subtle Style"
        description="Light background panel with subtle borders."
        action={<Button variant="outline" size="sm">Action</Button>}
      />
    </div>
  ),
};

export const CustomIcon: Story = {
  render: () => (
    <EmptyState
      variant="bordered"
      icon={<Download className="size-6 text-primary" />}
      title="No Downloaded Blueprints"
      description="Downloaded fabrication schematics will be archived here for offline viewing."
      action={<Button variant="primary">Browse Library</Button>}
    />
  ),
};
