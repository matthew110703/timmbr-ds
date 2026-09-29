import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogClose,
} from './Dialog';
import { Button } from '../Button';
import { Input } from '../Input';
import { Textarea } from '../Textarea';

interface DialogStoryProps {
  title: string;
  description: string;
  motion?: boolean;
}

const meta: Meta<DialogStoryProps> = {
  title: 'Overlays & Navigation/Dialog',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Modal title text heading',
    },
    description: {
      control: 'text',
      description: 'Contextual explanatory copy',
    },
    motion: {
      control: 'boolean',
      description: 'Toggle entrance and exit animations',
    },
  },
  args: {
    title: 'Configure Hardwood Spec',
    description: 'Specify moisture content tolerance and grain sorting parameters for this batch.',
    motion: true,
  },
};

export default meta;
type Story = StoryObj<DialogStoryProps>;

export const Default: Story = {
  render: (args) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">Open Project Dialog</Button>
      </DialogTrigger>
      <DialogContent motion={args.motion}>
        <DialogHeader>
          <DialogTitle>{args.title}</DialogTitle>
          <DialogDescription>{args.description}</DialogDescription>
        </DialogHeader>

        <DialogBody className="flex flex-col gap-4">
          <Input label="Moisture Target (%)" defaultValue="8.5%" />
          <Input label="Batch Code" defaultValue="OAK-2026-NEXUS" />
        </DialogBody>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="primary">Save Configuration</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const ScrollableWithFixedHeaderFooter: Story = {
  args: {
    title: 'New Material Specification',
    description: 'Complete all mandatory engineering specs and sustainability metrics.',
  },
  render: (args) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Open Long Form Dialog</Button>
      </DialogTrigger>
      <DialogContent motion={args.motion} className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{args.title}</DialogTitle>
          <DialogDescription>{args.description}</DialogDescription>
        </DialogHeader>

        <DialogBody className="flex flex-col gap-4">
          <Input label="Spec ID" defaultValue="SPEC-2026-09" />
          <Input label="Lumber Species" defaultValue="Kiln-Dried White Oak" />
          <Input label="Grade" defaultValue="FAS Select" />
          <Input label="Thickness (Inches)" defaultValue="1.50" />
          <Input label="Width Range (Inches)" defaultValue="6.00 - 10.00" />
          <Input label="Harvest Origin" defaultValue="Pacific Northwest FSC Certified" />
          <Textarea
            label="Conditioning Notes"
            defaultValue="Acclimatize in humidity controlled storage at 45% RH for minimum 14 days prior to CNC machining."
            rows={3}
          />
          <Input label="Responsible Engineer" defaultValue="Nexus Architect" />
        </DialogBody>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Discard</Button>
          </DialogClose>
          <Button variant="primary">Submit Specification</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const DestructiveConfirmation: Story = {
  args: {
    title: 'Are you absolutely sure?',
    description:
      'This action cannot be undone. This will permanently delete the Timber Craft workspace and purge all associated CAD specifications.',
  },
  render: (args) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Project</Button>
      </DialogTrigger>
      <DialogContent motion={args.motion}>
        <DialogHeader>
          <DialogTitle>{args.title}</DialogTitle>
          <DialogDescription>{args.description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Abort</Button>
          </DialogClose>
          <Button variant="destructive">Confirm Deletion</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
