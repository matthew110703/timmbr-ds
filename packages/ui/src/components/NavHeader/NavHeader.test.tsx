import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import * as React from 'react';
import { NavHeader } from './NavHeader';
import type { NavHeaderItem } from './NavHeader.types';

const mockItems: NavHeaderItem[] = [
  {
    id: 'sofas',
    label: 'Sofas',
    content: (
      <div data-testid="megamenu-sofas">
        <h3>Sofas & Seating Mega Menu</h3>
        <ul>
          <li>3 Seater Sofas</li>
          <li>2 Seater Sofas</li>
          <li>Sectional Sofas</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'living',
    label: 'Living',
    href: '/category/living',
  },
  {
    id: 'bedroom',
    label: 'Bedroom',
    href: '/category/bedroom',
    zone: 'store',
    crossZone: true,
  },
];

describe('NavHeader Component', () => {
  it('renders branding logo, offer banner, navigation items, and actions', () => {
    render(
      <NavHeader
        branding={{
          logo: <span data-testid="brand-full-logo">TIMMBR</span>,
          miniLogo: <span data-testid="brand-mini-logo">T</span>,
        }}
        offerBanner={{
          content: 'EXTRA 15% OFF ALL ORDERS',
        }}
        items={mockItems}
        wishlistAction={{ id: 'wishlist', label: 'WISH LIST', icon: <span>♥</span>, count: 2 }}
        cartAction={{ id: 'cart', label: 'CART', icon: <span>🛒</span>, count: 1 }}
        motion={false}
      />
    );

    // Offer banner
    expect(screen.getByText('EXTRA 15% OFF ALL ORDERS')).toBeInTheDocument();

    // Brand logo
    expect(screen.getAllByTestId('brand-full-logo').length).toBeGreaterThan(0);

    // Nav items
    expect(screen.getAllByText('Sofas').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Living').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Bedroom').length).toBeGreaterThan(0);

    // Cross-zone link attribute
    const bedroomLink = screen.getAllByText('Bedroom')[0].closest('a');
    expect(bedroomLink).toHaveAttribute('data-cross-zone', 'true');

    // Actions (clean text without count, badge contains the number)
    expect(screen.getAllByText('WISH LIST').length).toBeGreaterThan(0);
    expect(screen.getAllByText('CART').length).toBeGreaterThan(0);
    expect(screen.getAllByText('2').length).toBeGreaterThan(0);
    expect(screen.getAllByText('1').length).toBeGreaterThan(0);
  });

  it('hides offer banner when showOfferBanner is false', () => {
    render(
      <NavHeader
        branding={{ logo: <span>LOGO</span> }}
        offerBanner={{ content: 'SEASON SALE' }}
        showOfferBanner={false}
        motion={false}
      />
    );

    expect(screen.queryByText('SEASON SALE')).not.toBeInTheDocument();
  });

  it('allows dismissing offer banner when dismissible is true', () => {
    const onDismiss = vi.fn();
    render(
      <NavHeader
        branding={{ logo: <span>LOGO</span> }}
        offerBanner={{
          content: 'DISMISS ME',
          dismissible: true,
          onDismiss,
        }}
        motion={false}
      />
    );

    expect(screen.getByText('DISMISS ME')).toBeInTheDocument();
    const dismissBtn = screen.getByLabelText('Dismiss offer banner');
    fireEvent.click(dismissBtn);

    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('DISMISS ME')).not.toBeInTheDocument();
  });

  it('opens and displays mega-menu popover when nav item is clicked or hovered', () => {
    render(
      <NavHeader
        branding={{ logo: <span>LOGO</span> }}
        items={mockItems}
        motion={false}
      />
    );

    // Popover content should initially not be visible
    expect(screen.queryByTestId('megamenu-sofas')).not.toBeInTheDocument();

    // Click on desktop item with content
    const desktopNav = screen.getByRole('navigation', { name: 'Main Navigation' });
    const sofasTrigger = desktopNav.querySelector('button')!;
    fireEvent.click(sofasTrigger);

    // Popover content now visible
    expect(screen.getByTestId('megamenu-sofas')).toBeInTheDocument();
    expect(screen.getByText('3 Seater Sofas')).toBeInTheDocument();

    // Clicking again closes it
    fireEvent.click(sofasTrigger);
    expect(screen.queryByTestId('megamenu-sofas')).not.toBeInTheDocument();
  });

  it('expands search input and switches to mini logo when search is clicked', () => {
    const onOpenChange = vi.fn();
    render(
      <NavHeader
        branding={{
          logo: <span data-testid="brand-full-logo">TIMMBR HOME</span>,
          miniLogo: <span data-testid="brand-mini-logo">T</span>,
        }}
        search={{
          defaultOpen: false,
          onOpenChange,
          placeholder: 'Search our catalogue...',
        }}
        motion={false}
      />
    );

    // Initial state: full logo visible, input not present
    expect(screen.getAllByTestId('brand-full-logo').length).toBeGreaterThan(0);
    expect(screen.queryByTestId('brand-mini-logo')).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Search our catalogue...')).not.toBeInTheDocument();

    // Click search trigger in desktop header
    const searchTrigger = screen.getByRole('button', { name: /open search bar/i });
    fireEvent.click(searchTrigger);

    expect(onOpenChange).toHaveBeenCalledWith(true);

    // After expanding: mini logo is shown, search input is in document
    expect(screen.getByTestId('brand-mini-logo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search our catalogue...')).toBeInTheDocument();
  });

  it('renders search suggestions popover with popular search tags', () => {
    const onSubmit = vi.fn();
    render(
      <NavHeader
        branding={{ logo: <span>LOGO</span> }}
        search={{
          defaultOpen: true,
          popularSearches: [
            { id: '1', label: 'Centre Tables' },
            { id: '2', label: 'TV Units' },
          ],
          onSubmit,
        }}
        motion={false}
      />
    );

    // Check popular search chips
    expect(screen.getByText('Popular Searches')).toBeInTheDocument();
    expect(screen.getByText('Centre Tables')).toBeInTheDocument();
    expect(screen.getByText('TV Units')).toBeInTheDocument();

    // Clicking a chip updates input and triggers submit
    fireEvent.click(screen.getByText('Centre Tables'));
    expect(onSubmit).toHaveBeenCalledWith('Centre Tables');
  });

  it('closes mega menu on Escape key press', () => {
    render(
      <NavHeader
        branding={{ logo: <span>LOGO</span> }}
        items={mockItems}
        defaultActiveItemId="sofas"
        motion={false}
      />
    );

    expect(screen.getByTestId('megamenu-sofas')).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(screen.queryByTestId('megamenu-sofas')).not.toBeInTheDocument();
  });

  it('renders arbitrary dynamic action items', () => {
    const onProfile = vi.fn();
    const onNotifications = vi.fn();

    render(
      <NavHeader
        branding={{ logo: <span>LOGO</span> }}
        actions={[
          { id: 'profile', label: 'PROFILE', icon: <span>P</span>, onClick: onProfile },
          { id: 'notifs', label: 'ALERTS', icon: <span>A</span>, badge: 3, onClick: onNotifications },
          { id: 'cart', label: 'BAG', icon: <span>B</span> },
        ]}
        motion={false}
      />
    );

    expect(screen.getAllByText('PROFILE').length).toBeGreaterThan(0);
    expect(screen.getAllByText('ALERTS').length).toBeGreaterThan(0);
    expect(screen.getAllByText('3').length).toBeGreaterThan(0);
    expect(screen.getAllByText('BAG').length).toBeGreaterThan(0);

    fireEvent.click(screen.getAllByText('PROFILE')[0]);
    expect(onProfile).toHaveBeenCalledTimes(1);
  });

  it('collapses excess action items into overflow menu when maxVisibleActions is exceeded', () => {
    const onSettings = vi.fn();
    const actions = [
      { id: 'profile', label: 'PROFILE', icon: <span>P</span> },
      { id: 'wishlist', label: 'WISHLIST', icon: <span>W</span> },
      { id: 'cart', label: 'CART', icon: <span>C</span> },
      { id: 'settings', label: 'SETTINGS', icon: <span>S</span>, onClick: onSettings },
      { id: 'help', label: 'HELP', icon: <span>H</span> },
    ];

    render(
      <NavHeader
        branding={{ logo: <span>LOGO</span> }}
        actions={actions}
        maxVisibleActions={3}
        motion={false}
      />
    );

    // With maxVisibleActions=3, 2 items are visible, and the 3rd slot is MORE
    expect(screen.getAllByText('PROFILE').length).toBeGreaterThan(0);
    expect(screen.getAllByText('WISHLIST').length).toBeGreaterThan(0);
    expect(screen.getAllByText('MORE').length).toBeGreaterThan(0);

    // Remaining items should NOT be visible initially
    expect(screen.queryByText('SETTINGS')).not.toBeInTheDocument();
    expect(screen.queryByText('HELP')).not.toBeInTheDocument();

    // Click MORE trigger
    const moreBtn = screen.getAllByText('MORE')[0].closest('button')!;
    fireEvent.click(moreBtn);

    // Overflow popover is now open and contains remaining items
    expect(screen.getAllByRole('menu', { hidden: true }).length).toBeGreaterThan(0);
    expect(screen.getAllByText('CART').length).toBeGreaterThan(0);
    expect(screen.getAllByText('SETTINGS').length).toBeGreaterThan(0);
    expect(screen.getAllByText('HELP').length).toBeGreaterThan(0);

    // Click an item inside overflow popover
    fireEvent.click(screen.getAllByText('SETTINGS')[0]);
    expect(onSettings).toHaveBeenCalledTimes(1);

    // Popover closes after selecting an item
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('preserves high priority action items in visible slots', () => {
    const actions = [
      { id: 'profile', label: 'PROFILE', icon: <span>P</span>, priority: 'low' as const },
      { id: 'wishlist', label: 'WISHLIST', icon: <span>W</span>, priority: 'normal' as const },
      { id: 'cart', label: 'CART', icon: <span>C</span>, priority: 'high' as const },
      { id: 'alerts', label: 'ALERTS', icon: <span>A</span>, priority: 'low' as const },
    ];

    render(
      <NavHeader
        branding={{ logo: <span>LOGO</span> }}
        actions={actions}
        maxVisibleActions={3}
        motion={false}
      />
    );

    // CART (high priority) and WISHLIST (normal priority) should remain visible
    // while PROFILE and ALERTS (low priority) are collapsed into MORE
    expect(screen.getAllByText('CART').length).toBeGreaterThan(0);
    expect(screen.getAllByText('WISHLIST').length).toBeGreaterThan(0);
    expect(screen.getAllByText('MORE').length).toBeGreaterThan(0);
    expect(screen.queryByText('PROFILE')).not.toBeInTheDocument();
  });

  it('renders mobile tab slider and toggles mobile tab content', () => {
    render(
      <NavHeader
        branding={{ logo: <span>LOGO</span> }}
        items={mockItems}
        motion={false}
      />
    );

    // Mobile tab slider should be in document
    const mobileSlider = screen.getByRole('navigation', { name: 'Category Navigation' });
    expect(mobileSlider).toBeInTheDocument();

    // Popover content should initially not be visible in mobile content panel
    expect(screen.queryByTestId('megamenu-sofas')).not.toBeInTheDocument();

    // Click on mobile Sofas tab trigger
    const mobileSofasTab = screen.getAllByText('Sofas').find((el) => el.closest('button[role="tab"]'))!;
    fireEvent.click(mobileSofasTab);

    // Expandable content should now be visible
    expect(screen.getByTestId('megamenu-sofas')).toBeInTheDocument();

    // Clicking again collapses the tab content
    fireEvent.click(mobileSofasTab);
    expect(screen.queryByTestId('megamenu-sofas')).not.toBeInTheDocument();
  });

  it('opens and interacts with full-screen mobile search drawer', () => {
    const onSubmit = vi.fn();
    render(
      <NavHeader
        branding={{ logo: <span>LOGO</span> }}
        search={{
          placeholder: 'Search furniture...',
          popularSearches: [{ id: '1', label: 'Coffee Tables' }],
          onSubmit,
        }}
        mobileSearchMode="bar"
        motion={false}
      />
    );

    // Mobile search pill should be present
    const searchPill = screen.getByRole('button', { name: 'Open search drawer' });
    expect(searchPill).toBeInTheDocument();
    expect(screen.getByText('Search furniture...')).toBeInTheDocument();

    // Drawer should not be open initially
    expect(screen.queryByRole('dialog', { name: 'Search drawer' })).not.toBeInTheDocument();

    // Click search pill to open full-screen drawer
    fireEvent.click(searchPill);

    // Drawer opens
    const drawer = screen.getByRole('dialog', { name: 'Search drawer' });
    expect(drawer).toBeInTheDocument();

    // Search input inside drawer
    const drawerInput = screen.getByRole('searchbox', { name: 'Search store products' });
    expect(drawerInput).toBeInTheDocument();

    // Type query
    fireEvent.change(drawerInput, { target: { value: 'Wooden Sofa' } });
    expect(drawerInput).toHaveValue('Wooden Sofa');

    // Popular search tag click
    const tagBtn = screen.getByText('Coffee Tables');
    fireEvent.click(tagBtn);
    expect(onSubmit).toHaveBeenCalledWith('Coffee Tables');

    // Drawer closes after selecting search tag
    expect(screen.queryByRole('dialog', { name: 'Search drawer' })).not.toBeInTheDocument();
  });

  it('closes mobile search drawer via back button and Escape key', () => {
    render(
      <NavHeader
        branding={{ logo: <span>LOGO</span> }}
        search={{ placeholder: 'Search...' }}
        defaultMobileSearchOpen={true}
        motion={false}
      />
    );

    // Drawer is open
    expect(screen.getByRole('dialog', { name: 'Search drawer' })).toBeInTheDocument();

    // Click back button
    const backBtn = screen.getByRole('button', { name: 'Close search and go back' });
    fireEvent.click(backBtn);

    // Drawer is closed
    expect(screen.queryByRole('dialog', { name: 'Search drawer' })).not.toBeInTheDocument();
  });

  it('disables nav items, search, and actions when toggle props are set to false', () => {
    render(
      <NavHeader
        branding={{ logo: <span>LOGO</span> }}
        items={mockItems}
        showNavItems={false}
        showSearch={false}
        showActions={false}
        actions={[
          { id: 'cart', label: 'CART', icon: <span>C</span> },
        ]}
        motion={false}
      />
    );

    // Nav items disabled
    expect(screen.queryByText('Sofas')).not.toBeInTheDocument();
    expect(screen.queryByText('Living')).not.toBeInTheDocument();

    // Search disabled
    expect(screen.queryByRole('button', { name: /search/i })).not.toBeInTheDocument();

    // Actions disabled
    expect(screen.queryByText('CART')).not.toBeInTheDocument();
    expect(screen.queryByText('PROFILE')).not.toBeInTheDocument();
  });

  it('correctly accepts and renders modular configuration objects (navigation, actions, mobile)', () => {
    const onActiveItemChange = vi.fn();
    render(
      <NavHeader
        branding={{ logo: <span>MODULAR LOGO</span> }}
        navigation={{
          items: mockItems,
          defaultActiveItemId: 'sofas',
          onActiveItemChange,
        }}
        search={{
          placeholder: 'Search modular...',
        }}
        actions={{
          items: [
            { id: 'custom-action', label: 'HELP', icon: <span>?</span> },
          ],
          cart: { count: 5 },
          wishlist: { count: 3 },
        }}
        mobile={{
          tabSlider: true,
          search: { mode: 'bar' },
        }}
        motion={false}
      />
    );

    // Brand logo
    expect(screen.getAllByText('MODULAR LOGO').length).toBeGreaterThan(0);

    // Navigation items
    expect(screen.getAllByText('Sofas').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Living').length).toBeGreaterThan(0);

    // Mega menu open from defaultActiveItemId
    expect(screen.getByTestId('megamenu-sofas')).toBeInTheDocument();

    // Modular actions
    expect(screen.getAllByText('HELP').length).toBeGreaterThan(0);
    expect(screen.getAllByText('5').length).toBeGreaterThan(0);
    expect(screen.getAllByText('3').length).toBeGreaterThan(0);
  });
});

