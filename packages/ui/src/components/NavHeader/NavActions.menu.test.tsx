import '@testing-library/jest-dom/vitest';
import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

/*
 * Radix's positioned popups (DropdownMenu, Popover) don't open in jsdom, so
 * the Dropdown is replaced with an always-open stand-in here. This checks our
 * wiring (which entries, links vs actions, separators); real opening and
 * keyboard behaviour is covered by Radix and the storefront's browser tests.
 */
vi.mock('../Dropdown', () => ({
  DropdownMenu: ({ children }: { children: React.ReactNode }) => <div data-testid="menu-root">{children}</div>,
  DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  DropdownMenuContent: ({ children }: { children: React.ReactNode }) => <div role="menu">{children}</div>,
  DropdownMenuSeparator: () => <hr data-testid="separator" />,
  DropdownMenuItem: ({
    children,
    asChild,
    onSelect,
  }: {
    children: React.ReactElement;
    asChild?: boolean;
    onSelect?: () => void;
  }) =>
    asChild ? (
      React.cloneElement(children, { role: 'menuitem' } as never)
    ) : (
      <div role="menuitem" onClick={onSelect}>
        {children}
      </div>
    ),
}));

import { NavActions } from './subcomponents/NavActions';

const onLogout = vi.fn();
const profileAction = {
  label: 'Arul',
  href: '/account',
  ariaLabel: 'My account',
  menu: [
    { id: 'orders', label: 'My orders', href: '/account/orders' },
    { id: 'account', label: 'Your account', href: '/account' },
    { id: 'logout', label: 'Log out', onSelect: onLogout, destructive: true, separatorBefore: true },
  ],
};

describe('NavActions menu', () => {
  it('renders links as plain anchors (cross-zone safe) and actions as callbacks', () => {
    render(<NavActions profileAction={profileAction} enableMenus />);

    expect(screen.getByRole('menuitem', { name: 'My orders' })).toHaveAttribute('href', '/account/orders');
    expect(screen.getByRole('menuitem', { name: 'Your account' })).toHaveAttribute('href', '/account');
    expect(screen.getAllByTestId('separator')).toHaveLength(1);

    fireEvent.click(screen.getByRole('menuitem', { name: 'Log out' }));
    expect(onLogout).toHaveBeenCalledTimes(1);
  });

  it('ignores the menu unless enabled (mobile bar, overflow): plain link to href', () => {
    render(<NavActions profileAction={profileAction} />);

    expect(screen.queryByRole('menu')).toBeNull();
    expect(screen.getByRole('link', { name: 'My account' })).toHaveAttribute('href', '/account');
  });
});
