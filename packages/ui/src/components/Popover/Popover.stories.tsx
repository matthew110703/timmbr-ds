import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Popover, PopoverTrigger, PopoverContent } from './Popover';
import { Button } from '../Button';
import { Input } from '../Input';

interface PopoverStoryProps {
  title: string;
  description: string;
  motion?: boolean;
}

const meta: Meta<PopoverStoryProps> = {
  title: 'Overlays & Navigation/Popover',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Popover heading title',
    },
    description: {
      control: 'text',
      description: 'Popover explanatory text',
    },
    motion: {
      control: 'boolean',
      description: 'Enable or disable popover transition animation',
    },
  },
  args: {
    title: 'Alignment Settings',
    description: 'Configure radial cutting angles for CNC tooling.',
    motion: true,
  },
};

export default meta;
type Story = StoryObj<PopoverStoryProps>;

export const Default: Story = {
  render: (args) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Adjust Grain Alignment</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" motion={args.motion}>
        <div className="grid gap-4">
          <div className="space-y-1">
            <h4 className="font-semibold text-sm text-foreground">{args.title}</h4>
            <p className="text-xs text-muted-foreground">{args.description}</p>
          </div>
          <div className="grid gap-2">
            <Input label="Angle (deg)" defaultValue="45°" size="sm" />
            <Input label="Offset (mm)" defaultValue="2.5mm" size="sm" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
