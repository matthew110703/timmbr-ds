import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Info } from '@timmbr/icons';

const meta: Meta<typeof Tooltip> = {
  title: 'Overlays & Navigation/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    content: {
      control: 'text',
      description: 'The contextual tooltip content text or React node',
    },
    side: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Preferred placement relative to trigger',
    },
    delayDuration: {
      control: 'number',
      description: 'Hover delay in milliseconds before showing tooltip',
    },
    motion: {
      control: 'boolean',
      description: 'Enable or disable transition animations',
    },
  },
  args: {
    content: 'Kiln dried to 8% target moisture',
    side: 'top',
    delayDuration: 150,
    motion: true,
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="outline">Hover for Timber Spec</Button>
    </Tooltip>
  ),
};

export const AlwaysVisible: Story = {
  render: () => (
    <Tooltip content="Kiln dried to 8% target moisture" open>
      <Button variant="outline">Always Visible Tooltip</Button>
    </Tooltip>
  ),
};

export const OnIcon: Story = {
  render: () => (
    <div className="flex items-center gap-2 font-sans text-sm">
      <span>Timber Density Grade</span>
      <Tooltip content="Janka hardness rating: 1,820 lbf (Hickory)" side="right">
        <Icon icon={Info} size="sm" clickable foreground="muted" aria-label="More info" />
      </Tooltip>
    </div>
  ),
};

export const Placements: Story = {
  render: () => (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-8">
      <Tooltip content="Tooltip on top" side="top">
        <Button variant="outline" size="sm">Top</Button>
      </Tooltip>
      <Tooltip content="Tooltip on bottom" side="bottom">
        <Button variant="outline" size="sm">Bottom</Button>
      </Tooltip>
      <Tooltip content="Tooltip on left" side="left">
        <Button variant="outline" size="sm">Left</Button>
      </Tooltip>
      <Tooltip content="Tooltip on right" side="right">
        <Button variant="outline" size="sm">Right</Button>
      </Tooltip>
    </div>
  ),
};
