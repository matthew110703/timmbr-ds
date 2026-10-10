import '@testing-library/jest-dom/vitest';
import * as React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ConfirmDialog } from './ConfirmDialog';

function setup(onConfirm: () => Promise<void>) {
  const onOpenChange = vi.fn();
  render(
    <ConfirmDialog
      open
      onOpenChange={onOpenChange}
      tone="destructive"
      icon={<svg data-testid="icon" />}
      title="Delete this address?"
      description="This can't be undone."
      confirmLabel="Delete address"
      cancelLabel="Cancel"
      onConfirm={onConfirm}
    >
      <p>12 Temple Street</p>
    </ConfirmDialog>
  );
  return { onOpenChange };
}

describe('ConfirmDialog', () => {
  it('shows a destructive confirmation and closes once the action finishes', async () => {
    let finish!: () => void;
    const onConfirm = vi.fn(() => new Promise<void>((resolve) => (finish = resolve)));
    const { onOpenChange } = setup(onConfirm);

    expect(screen.getByRole('alertdialog')).toHaveTextContent('12 Temple Street');
    const confirm = screen.getByRole('button', { name: 'Delete address' });
    expect(confirm.className).toContain('bg-destructive');

    fireEvent.click(confirm);
    expect(onConfirm).toHaveBeenCalledTimes(1);
    // Still open (and busy) while the action runs.
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled();

    finish();
    await waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(false));
  });

  it('stays open when the action fails', async () => {
    const { onOpenChange } = setup(() => Promise.reject(new Error('nope')));
    fireEvent.click(screen.getByRole('button', { name: 'Delete address' }));
    await waitFor(() => expect(screen.getByRole('button', { name: 'Cancel' })).not.toBeDisabled());
    expect(onOpenChange).not.toHaveBeenCalledWith(false);
  });
});
