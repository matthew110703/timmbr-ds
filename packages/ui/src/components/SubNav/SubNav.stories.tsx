import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Heart, LogOut, MapPin, Package, ShieldCheck } from '@timmbr/icons';
import { SubNav, SubNavAction } from './SubNav';

const items = [
  { id: 'orders', label: 'My orders', href: '/account/orders', icon: <Package size={18} /> },
  { id: 'saved', label: 'Wishlist', href: '/account/wishlist', icon: <Heart size={18} />, badge: 4 },
  { id: 'addresses', label: 'Addresses', href: '/account/addresses', icon: <MapPin size={18} /> },
  { id: 'security', label: 'Login & security', href: '/account/security', icon: <ShieldCheck size={18} /> },
];

const meta: Meta<typeof SubNav> = {
  title: 'Navigation/SubNav',
  component: SubNav,
  tags: ['autodocs'],
  args: {
    items,
    activeHref: '/account/orders/8f2a',
    'aria-label': 'Account',
    footer: (
      <SubNavAction icon={<LogOut size={18} />} tone="destructive">
        Log out
      </SubNavAction>
    ),
  },
  decorators: [
    (Story) => (
      <div className="max-w-xs">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SubNav>;

export const Default: Story = {};

export const WithoutFooter: Story = { args: { footer: undefined, activeHref: '/account/security' } };

/** Below `lg` the list becomes a horizontally scrolling row. */
export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
};
