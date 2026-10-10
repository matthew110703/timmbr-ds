import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import {
  ResponsiveDialog,
  ResponsiveDialogBody,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from './ResponsiveDialog';
import { Button } from '../Button';
import { Input } from '../Input';

const meta: Meta<typeof ResponsiveDialog> = {
  title: 'Overlays/ResponsiveDialog',
  component: ResponsiveDialog,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A centred Dialog from `breakpoint` up and a bottom sheet below it, with one API. Use it for forms; keep confirmations in AlertDialog.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ResponsiveDialog>;

function AddressForm() {
  const [open, setOpen] = React.useState(false);
  return (
    <ResponsiveDialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)}>Add address</Button>
      <ResponsiveDialogContent dialogClassName="max-w-xl">
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Add a new address</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>Where your orders are delivered.</ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <ResponsiveDialogBody>
          <div className="flex flex-col gap-4">
            {['First name', 'Last name', 'Mobile number', 'Address line 1', 'Address line 2', 'City', 'PIN code'].map(
              (label) => (
                <Input key={label} label={label} />
              )
            )}
          </div>
        </ResponsiveDialogBody>
        <ResponsiveDialogFooter>
          <ResponsiveDialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </ResponsiveDialogClose>
          <Button variant="primary">Save address</Button>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}

export const Default: Story = { render: () => <AddressForm /> };

/** Below 640px the same content opens as a bottom sheet with a pinned footer. */
export const Mobile: Story = {
  render: () => <AddressForm />,
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};
