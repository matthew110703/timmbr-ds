import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from './Dialog';

describe('Dialog Component', () => {
  it('renders trigger button', () => {
    render(
      <Dialog>
        <DialogTrigger>Open Modal</DialogTrigger>
        <DialogContent>
          <DialogTitle>Modal Title</DialogTitle>
          <DialogDescription>Modal description content</DialogDescription>
        </DialogContent>
      </Dialog>
    );
    expect(screen.getByRole('button', { name: 'Open Modal' })).toBeInTheDocument();
  });

  it('opens dialog content on trigger click', async () => {
    render(
      <Dialog>
        <DialogTrigger>Open Modal</DialogTrigger>
        <DialogContent>
          <DialogTitle>Modal Title</DialogTitle>
          <DialogDescription>Modal description content</DialogDescription>
        </DialogContent>
      </Dialog>
    );
    await userEvent.click(screen.getByRole('button', { name: 'Open Modal' }));
    expect(screen.getByText('Modal Title')).toBeInTheDocument();
    expect(screen.getByText('Modal description content')).toBeInTheDocument();
  });
});
