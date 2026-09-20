import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from './Drawer';
import { Button } from '../Button';
import { Input } from '../Input';

interface DrawerStoryProps {
  side: 'top' | 'bottom' | 'left' | 'right';
  title: string;
  description: string;
  motion?: boolean;
}

const meta: Meta<DrawerStoryProps> = {
  title: 'Overlays & Navigation/Drawer',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    side: {
      control: 'select',
      options: ['right', 'left', 'top', 'bottom'],
      description: 'Slide-in anchor edge',
    },
    title: {
      control: 'text',
      description: 'Drawer header title',
    },
    description: {
      control: 'text',
      description: 'Drawer description copy',
    },
    motion: {
      control: 'boolean',
      description: 'Enable or disable transition animations',
    },
  },
  args: {
    side: 'right',
    title: 'Timber Catalog Filters',
    description: 'Filter through our curated selection of raw and processed timber stock.',
    motion: true,
  },
};

export default meta;
type Story = StoryObj<DrawerStoryProps>;

export const Default: Story = {
  render: (args) => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="primary">Open {args.side} Drawer</Button>
      </DrawerTrigger>
      <DrawerContent side={args.side} motion={args.motion}>
        <DrawerHeader>
          <DrawerTitle>{args.title}</DrawerTitle>
          <DrawerDescription>{args.description}</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 py-4 flex-1">
          <Input label="Search species" placeholder="e.g. Cedar, Ash..." />
          <Input label="Max moisture (%)" defaultValue="12%" />
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
          <Button variant="primary">Apply Filters</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const BottomSheet: Story = {
  args: {
    side: 'bottom',
    title: 'Quick Actions',
    description: 'Select an operation for this lumber lot.',
  },
  render: (args) => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Bottom Sheet</Button>
      </DrawerTrigger>
      <DrawerContent side={args.side} motion={args.motion}>
        <DrawerHeader>
          <DrawerTitle>{args.title}</DrawerTitle>
          <DrawerDescription>{args.description}</DrawerDescription>
        </DrawerHeader>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4">
          <Button variant="outline">Export CAD</Button>
          <Button variant="outline">Print Barcode</Button>
          <Button variant="outline">Certify FSC</Button>
          <Button variant="destructive">Archive Lot</Button>
        </div>
      </DrawerContent>
    </Drawer>
  ),
};
