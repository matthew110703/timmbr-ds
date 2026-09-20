import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from './Dropdown';
import { Button } from '../Button';
import { Download, Heart, Share2 } from '@timmbr/icons';

interface DropdownStoryProps {
  label: string;
  motion?: boolean;
}

const meta: Meta<DropdownStoryProps> = {
  title: 'Overlays & Navigation/Dropdown',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Dropdown section header title',
    },
    motion: {
      control: 'boolean',
      description: 'Enable or disable scale-in / scale-out animation',
    },
  },
  args: {
    label: 'Timber Project',
    motion: true,
  },
};

export default meta;
type Story = StoryObj<DropdownStoryProps>;

export const Default: Story = {
  render: (args) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Options Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" motion={args.motion}>
        <DropdownMenuLabel>{args.label}</DropdownMenuLabel>
        <DropdownMenuItem>
          <Share2 className="mr-2 h-4 w-4 text-muted" />
          <span>Share Blueprint</span>
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Download className="mr-2 h-4 w-4 text-muted" />
          <span>Export DXF</span>
          <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Heart className="mr-2 h-4 w-4 text-muted" />
          <span>Add to Favorites</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive">
          <span>Delete Workspace</span>
          <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
