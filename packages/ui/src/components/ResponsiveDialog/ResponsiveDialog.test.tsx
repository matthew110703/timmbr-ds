import '@testing-library/jest-dom/vitest';
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  ResponsiveDialog,
  ResponsiveDialogBody,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from './ResponsiveDialog';

/** Pretends the viewport is `width` px wide for min-width queries. */
function mockViewport(width: number) {
  vi.stubGlobal('matchMedia', (query: string) => {
    const min = Number(/min-width:\s*(\d+)px/.exec(query)?.[1] ?? 0);
    const wide = width >= min;
    return {
      matches: query.startsWith('not all and') ? !wide : wide,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    };
  });
}

function Example() {
  return (
    <ResponsiveDialog open>
      <ResponsiveDialogContent dialogClassName="max-w-2xl" drawerClassName="sheet-only">
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Add a new address</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>Where your orders are delivered.</ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <ResponsiveDialogBody>Fields</ResponsiveDialogBody>
        <ResponsiveDialogFooter>
          <button type="button">Save</button>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}

afterEach(() => vi.unstubAllGlobals());

describe('ResponsiveDialog', () => {
  it('is a centred dialog from the breakpoint up', () => {
    mockViewport(1024);
    render(<Example />);
    const dialog = screen.getByRole('dialog', { name: 'Add a new address' });
    expect(dialog).toHaveAttribute('data-mode', 'dialog');
    expect(dialog.className).toContain('max-w-2xl');
    expect(dialog.querySelector('[data-slot=drawer-handle]')).toBeNull();
  });

  it('is a bottom sheet with a handle, scrolling body and pinned footer on phones', () => {
    mockViewport(390);
    render(<Example />);
    const sheet = screen.getByRole('dialog', { name: 'Add a new address' });
    expect(sheet).toHaveAttribute('data-mode', 'drawer');
    expect(sheet.className).toContain('bottom-0');
    expect(sheet.className).toContain('sheet-only');
    expect(sheet.className).not.toContain('max-w-2xl');
    expect(sheet.querySelector('[data-slot=drawer-handle]')).not.toBeNull();
    expect(screen.getByText('Fields')).toHaveAttribute('data-slot', 'drawer-body');
    expect(screen.getByText('Where your orders are delivered.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' }).parentElement?.className).toContain('border-t');
  });
});
