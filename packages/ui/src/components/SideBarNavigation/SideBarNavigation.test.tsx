import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import * as React from 'react';

import { SideBarNavigation } from './SideBarNavigation';
import type { NavItem } from './SideBarNavigation.types';

const testItems: NavItem[] = [
  {
    label: 'Overview',
    href: '/dashboard',
    icon: <span data-testid="icon-overview">O</span>,
  },
  {
    label: 'Orders',
    href: '/orders',
    icon: <span data-testid="icon-orders">Ord</span>,
    badge: 5,
  },
  {
    label: 'Products',
    icon: <span data-testid="icon-products">P</span>,
    items: [
      { label: 'All Products', href: '/products' },
      { label: 'Categories', href: '/products/categories' },
    ],
  },
];

describe('SideBarNavigation', () => {
  it('renders branding title and navigation items in expanded mode', () => {
    render(
      <SideBarNavigation
        items={testItems}
        branding={{ title: 'My Admin' }}
        activePath="/dashboard"
        storageKey={false}
      />
    );

    expect(screen.getByText('My Admin')).toBeInTheDocument();
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Orders')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('toggles collapse state on toggle button click', () => {
    const onCollapsedChange = vi.fn();

    render(
      <SideBarNavigation
        items={testItems}
        branding={{ title: 'My Admin' }}
        onCollapsedChange={onCollapsedChange}
        storageKey={false}
      />
    );

    const toggleBtn = screen.getByTestId('sidebar-toggle-btn');
    expect(toggleBtn).toBeInTheDocument();

    fireEvent.click(toggleBtn);
    expect(onCollapsedChange).toHaveBeenCalledWith(true);
  });

  it('expands sub-items accordion on click in expanded mode', () => {
    render(
      <SideBarNavigation
        items={testItems}
        branding={{ title: 'My Admin' }}
        activePath="/dashboard"
        storageKey={false}
      />
    );

    // Categories is not visible initially
    expect(screen.queryByText('Categories')).not.toBeInTheDocument();

    // Click parent Products item
    fireEvent.click(screen.getByText('Products'));

    // Sub-items should now be visible
    expect(screen.getByText('All Products')).toBeInTheDocument();
    expect(screen.getByText('Categories')).toBeInTheDocument();
  });

  it('renders footer when provided', () => {
    render(
      <SideBarNavigation
        items={testItems}
        branding={{ title: 'My Admin' }}
        footer={<div data-testid="custom-footer">Footer Content</div>}
        storageKey={false}
      />
    );

    expect(screen.getByTestId('custom-footer')).toBeInTheDocument();
    expect(screen.getByText('Footer Content')).toBeInTheDocument();
  });

  it('renders profile button below footer in expanded mode', () => {
    render(
      <SideBarNavigation
        items={testItems}
        branding={{ title: 'My Admin' }}
        profile={{
          name: 'Jane Doe',
          email: 'jane@example.com',
          fallback: 'JD',
        }}
        storageKey={false}
      />
    );

    expect(screen.getByTestId('sidebar-profile-btn')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders only avatar for profile in collapsed mode without text', () => {
    render(
      <SideBarNavigation
        items={testItems}
        branding={{ title: 'My Admin' }}
        defaultCollapsed={true}
        profile={{
          name: 'Jane Doe',
          email: 'jane@example.com',
          fallback: 'JD',
        }}
        storageKey={false}
      />
    );

    expect(screen.getByTestId('sidebar-profile-btn')).toBeInTheDocument();
    expect(screen.getByText('JD')).toBeInTheDocument();
    expect(screen.queryByText('Jane Doe')).not.toBeInTheDocument();
    expect(screen.queryByText('jane@example.com')).not.toBeInTheDocument();
  });

  it('hides profile button when showProfile is false', () => {
    render(
      <SideBarNavigation
        items={testItems}
        branding={{ title: 'My Admin' }}
        showProfile={false}
        profile={{
          name: 'Jane Doe',
          email: 'jane@example.com',
        }}
        storageKey={false}
      />
    );

    expect(screen.queryByTestId('sidebar-profile-btn')).not.toBeInTheDocument();
  });

  it('respects motion={false} and disables transitions with fallback classes', () => {
    const { container } = render(
      <SideBarNavigation
        items={testItems}
        branding={{ title: 'My Admin' }}
        motion={false}
        storageKey={false}
      />
    );

    const aside = container.querySelector('[data-slot="sidebar-navigation"]');
    expect(aside).toBeInTheDocument();
    expect(aside?.className).toContain('transition-none');
  });

  it('supports motion preset configuration with telemetry attribute', () => {
    const { container } = render(
      <SideBarNavigation
        items={testItems}
        branding={{ title: 'My Admin' }}
        motion="fade"
        storageKey={false}
      />
    );

    const aside = container.querySelector('[data-slot="sidebar-navigation"]');
    expect(aside).toHaveAttribute('data-motion-preset', 'fade');
  });
});

