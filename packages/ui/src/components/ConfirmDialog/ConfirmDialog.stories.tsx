import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Trash2 } from '@timmbr/icons';
import { ConfirmDialog } from './ConfirmDialog';
import { Button } from '../Button';
import { Card } from '../Card';
import { Text } from '../Text';

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Overlays/ConfirmDialog',
  component: ConfirmDialog,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A confirmation built on AlertDialog. `onConfirm` may return a promise: the dialog stays open with a spinner until it settles, closes on success and stays open on failure.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

function DeleteExample() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button variant="destructive-outline" leftIcon={<Trash2 />} onClick={() => setOpen(true)}>
        Delete address
      </Button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        tone="destructive"
        icon={<Trash2 />}
        title="Delete this address?"
        description="It will be removed from your saved addresses. This can't be undone."
        confirmLabel="Delete address"
        confirmIcon={<Trash2 />}
        cancelLabel="Cancel"
        onConfirm={() => new Promise((resolve) => setTimeout(resolve, 1200))}
      >
        <Card variant="inset" padding="sm">
          <Text variant="body-2-semibold">Arul Raj</Text>
          <Text variant="body-2">12 Temple Street, Chennai 600001</Text>
        </Card>
      </ConfirmDialog>
    </>
  );
}

export const Destructive: Story = { render: () => <DeleteExample /> };
