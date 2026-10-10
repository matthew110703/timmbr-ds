import '@testing-library/jest-dom/vitest';
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

/*
 * Opening a Radix menu more than once per file is very slow in jsdom, so the
 * Item primitive is stubbed (a Slot when asChild, like Radix). This checks our
 * own icon / destructive handling.
 */
vi.mock('@radix-ui/react-dropdown-menu', async (importOriginal) => {
  const actual = await importOriginal<object>();
  const { Slot } = await import('@radix-ui/react-slot');
  const Item = React.forwardRef<HTMLElement, { asChild?: boolean; children?: React.ReactNode }>(
    ({ asChild, children, ...props }, ref) => {
      const Comp = (asChild ? Slot : 'div') as React.ElementType;
      return (
        <Comp ref={ref} role="menuitem" {...props}>
          {children}
        </Comp>
      );
    }
  );
  Item.displayName = 'Item';
  return { ...actual, Item };
});

const { DropdownMenuItem } = await import('./Dropdown');

describe('DropdownMenuItem', () => {
  it('renders a leading icon and destructive styling', () => {
    render(
      <DropdownMenuItem icon={<svg data-testid="logout-icon" />} destructive>
        Log out
      </DropdownMenuItem>
    );
    const item = screen.getByRole('menuitem', { name: 'Log out' });
    expect(item).toContainElement(screen.getByTestId('logout-icon'));
    expect(item).toHaveAttribute('data-destructive');
    expect(item.className).toContain('text-destructive');
  });

  it('places the icon inside an asChild link', () => {
    render(
      <DropdownMenuItem asChild icon={<svg data-testid="orders-icon" />}>
        <a href="/account/orders">My orders</a>
      </DropdownMenuItem>
    );
    const link = screen.getByRole('menuitem', { name: 'My orders' });
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/account/orders');
    expect(link).toContainElement(screen.getByTestId('orders-icon'));
    expect(link.className).toContain('gap-2');
  });

  it('has no destructive marker by default', () => {
    render(<DropdownMenuItem>Profile</DropdownMenuItem>);
    expect(screen.getByRole('menuitem', { name: 'Profile' })).not.toHaveAttribute('data-destructive');
  });
});
