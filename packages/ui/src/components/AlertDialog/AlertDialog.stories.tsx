import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from './AlertDialog';
import { Button } from '../Button';
import { Alert } from '../Alert';
import { Center } from '../Center';
import { Icon } from '../Icon';
import { AlertTriangle, Trash2, Info } from '@timmbr/icons';

interface AlertDialogStoryProps {
  title: string;
  description: string;
  motion?: boolean;
}

const meta: Meta<AlertDialogStoryProps> = {
  title: 'Overlays & Navigation/AlertDialog',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Alert dialog title heading',
    },
    description: {
      control: 'text',
      description: 'Contextual warning or confirmation explanation',
    },
    motion: {
      control: 'boolean',
      description: 'Toggle entrance and exit animations',
    },
  },
  args: {
    title: 'Are you absolutely sure?',
    description:
      'This action cannot be undone. This will permanently delete your category and remove its associations from all catalog listings.',
    motion: true,
  },
};

export default meta;
type Story = StoryObj<AlertDialogStoryProps>;

/**
 * Standard confirmation alert dialog with title, description, and cancel/confirm actions.
 */
export const Default: Story = {
  render: (args) => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Alert Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent motion={args.motion} className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>{args.title}</AlertDialogTitle>
          <AlertDialogDescription>{args.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="primary">Continue</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

/**
 * Destructive confirmation modal with alert warning and destructive button styling.
 */
export const DestructiveConfirmation: Story = {
  args: {
    title: 'Delete Category',
    description:
      'You are about to delete the selected category. This operation is permanent and irreversible.',
  },
  render: (args) => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" leftIcon={<Icon icon={Trash2} size="sm" />}>
          Delete Category
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent motion={args.motion} className="max-w-md">
        <AlertDialogHeader className="space-y-2">
          <div className="flex items-center gap-3">
            <Center className="size-9 rounded-full bg-destructive/10 text-destructive shrink-0">
              <Icon icon={AlertTriangle} size="sm" className="text-destructive" />
            </Center>
            <AlertDialogTitle className="text-lg font-bold font-sans text-foreground">
              {args.title}
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-sm text-muted">
            {args.description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogBody className="space-y-3">
          <div className="bg-grey-50 px-3.5 py-2.5 rounded-lg border border-grey-200/80 space-y-1">
            <span className="text-[10px] font-semibold text-muted uppercase tracking-wider block">
              Category to be deleted
            </span>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground text-sm">
                Living Room Furniture
              </span>
              <span className="font-mono text-xs text-muted bg-white px-2 py-0.5 rounded border border-grey-200">
                /living-room-furniture
              </span>
            </div>
          </div>

          <Alert variant="warning" title="Warning: Nested Subcategories">
            This category contains 3 nested subcategories that will become orphaned.
          </Alert>
        </AlertDialogBody>

        <AlertDialogFooter className="gap-2.5 pt-1 sm:justify-end">
          <AlertDialogCancel asChild>
            <Button variant="outline">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              className="gap-2"
              leftIcon={<Icon icon={Trash2} size="sm" />}
            >
              Delete Category
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

/**
 * Unsaved changes alert dialog preventing accidental data loss during navigation.
 */
export const UnsavedChanges: Story = {
  args: {
    title: 'Unsaved Changes Detected',
    description:
      'You have unsaved changes in this form. If you navigate away now, your edits will be permanently lost.',
  },
  render: (args) => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="secondary">Discard Edits</Button>
      </AlertDialogTrigger>
      <AlertDialogContent motion={args.motion} className="max-w-md">
        <AlertDialogHeader className="space-y-2">
          <div className="flex items-center gap-3">
            <Center className="size-9 rounded-full bg-amber-500/10 text-amber-600 shrink-0">
              <Icon icon={Info} size="sm" className="text-amber-600" />
            </Center>
            <AlertDialogTitle className="text-lg font-bold font-sans text-foreground">
              {args.title}
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-sm text-muted">
            {args.description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="gap-2.5 pt-2 sm:justify-end">
          <AlertDialogCancel asChild>
            <Button variant="outline">Stay and Keep Editing</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive">Discard Changes</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

/**
 * With animations explicitly disabled.
 */
export const WithoutMotion: Story = {
  args: {
    motion: false,
    title: 'Instant Confirmation',
    description: 'This alert dialog renders instantly without motion spring transitions.',
  },
  render: (args) => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Open Instant Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent motion={false} className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>{args.title}</AlertDialogTitle>
          <AlertDialogDescription>{args.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="primary">Confirm</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};
