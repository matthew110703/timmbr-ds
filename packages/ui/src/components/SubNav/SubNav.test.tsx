import '@testing-library/jest-dom/vitest';
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { isSubNavItemActive, SubNav, SubNavAction } from './SubNav';

const items = [
  { id: 'account', label: 'Overview', href: '/account' },
  { id: 'orders', label: 'My orders', href: '/account/orders', badge: 3 },
  { id: 'addresses', label: 'Addresses', href: '/account/addresses' },
];

describe('SubNav', () => {
  it('renders a labelled navigation landmark with links', () => {
    render(<SubNav items={items} aria-label="Account" />);
    expect(screen.getByRole('navigation', { name: 'Account' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /My orders/ })).toHaveAttribute('href', '/account/orders');
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('marks the most specific matching item as the current page', () => {
    render(<SubNav items={items} activeHref="/account/orders/abc?tab=1" />);
    expect(screen.getByRole('link', { name: /My orders/ })).toHaveAttribute('aria-current', 'page');
    // "/account" also matches as a prefix, but the deeper item wins
    expect(screen.getByRole('link', { name: 'Overview' })).not.toHaveAttribute('aria-current');
  });

  it('renders through a custom link component', () => {
    const Link = ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
      <a href={href} data-custom="yes" {...rest}>
        {children}
      </a>
    );
    render(<SubNav items={items} linkComponent={Link} />);
    expect(screen.getByRole('link', { name: 'Addresses' })).toHaveAttribute('data-custom', 'yes');
  });

  it('wraps items on small screens with mobileLayout="wrap"', () => {
    render(<SubNav items={items} mobileLayout="wrap" />);
    expect(screen.getByRole('list').className).toContain('flex-wrap');
    expect(screen.getByRole('list').className).not.toContain('overflow-x-auto');
  });

  it('renders the footer once', () => {
    render(<SubNav items={items} footer={<button type="button">Log out</button>} />);
    expect(screen.getAllByRole('button', { name: 'Log out' })).toHaveLength(1);
  });

  it('gives the active item readable text and an edge indicator', () => {
    render(<SubNav items={items} activeHref="/account/addresses" />);
    const active = screen.getByRole('link', { name: 'Addresses' });
    expect(active.className).toContain('text-secondary-foreground');
    expect(active.className).toContain('lg:before:bg-primary');
  });
});

describe('SubNavAction', () => {
  it('matches the item shape and supports a destructive tone', () => {
    render(
      <SubNavAction icon={<svg data-testid="icon" />} tone="destructive">
        Log out
      </SubNavAction>
    );
    const button = screen.getByRole('button', { name: 'Log out' });
    expect(button).toHaveAttribute('type', 'button');
    expect(button.className).toContain('px-3');
    expect(button.className).toContain('text-destructive');
    expect(button.className).not.toContain('text-grey-700');
    expect(button).toContainElement(screen.getByTestId('icon'));
  });

  it('is disabled and busy while loading', () => {
    render(<SubNavAction loading>Log out</SubNavAction>);
    const button = screen.getByRole('button', { name: 'Log out' });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
  });
});

describe('isSubNavItemActive', () => {
  it.each([
    ['/account/orders', '/account/orders', true],
    ['/account/orders', '/account/orders/', true],
    ['/account/orders', '/account/orders/1', true],
    ['/account/orders', '/account/ordersX', false],
    ['/account/orders', undefined, false],
  ])('%s vs %s → %s', (href, current, expected) => {
    expect(isSubNavItemActive(href, current)).toBe(expected);
  });
});
