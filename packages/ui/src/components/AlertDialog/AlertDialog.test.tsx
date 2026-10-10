import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogMedia,
} from './AlertDialog';

describe('AlertDialog Component', () => {
  it('renders trigger button correctly', () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger>Open Alert</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Alert Title</AlertDialogTitle>
            <AlertDialogDescription>Alert description content</AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    );
    expect(screen.getByRole('button', { name: 'Open Alert' })).toBeInTheDocument();
  });

  it('opens alert dialog on trigger click and exposes role="alertdialog"', async () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger>Open Alert</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Alert Title</AlertDialogTitle>
            <AlertDialogDescription>Alert description content</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

    await userEvent.click(screen.getByRole('button', { name: 'Open Alert' }));

    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    expect(screen.getByText('Alert Title')).toBeInTheDocument();
    expect(screen.getByText('Alert description content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
  });

  it('styles Action / Cancel as Buttons, with a destructive variant', () => {
    render(
      <AlertDialog open>
        <AlertDialogContent>
          <AlertDialogMedia tone="destructive" data-testid="media" />
          <AlertDialogTitle>Delete?</AlertDialogTitle>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

    expect(screen.getByRole('button', { name: 'Cancel' }).className).toContain('border-grey-300');
    expect(screen.getByRole('button', { name: 'Delete' }).className).toContain('bg-destructive');
    expect(screen.getByTestId('media').className).toContain('text-destructive');
  });

  it('leaves styling to the child with asChild', () => {
    render(
      <AlertDialog open>
        <AlertDialogContent>
          <AlertDialogTitle>Sure?</AlertDialogTitle>
          <AlertDialogAction asChild>
            <button className="custom">Go</button>
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    );

    const button = screen.getByRole('button', { name: 'Go' });
    expect(button.className).toContain('custom');
    expect(button.className).not.toContain('bg-primary');
  });
});
