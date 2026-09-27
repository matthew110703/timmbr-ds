import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { SideBarNavigation } from './SideBarNavigation';
import type { NavItem, SidebarProfileConfig } from './SideBarNavigation.types';
import { cn } from '@timmbr/utils';

import {
  LayoutDashboard,
  ShoppingCart,
  Tag,
  Users,
  User,
  Settings,
  LogOut,
  FileText,
  LifeBuoy,
} from '@timmbr/icons';

const sampleNavItems: NavItem[] = [
  {
    label: 'Overview',
    href: '/overview',
    icon: <LayoutDashboard className="size-5" />,
  },

  {
    label: 'Orders',
    href: '/orders',
    icon: <ShoppingCart className="size-5" />,
    badge: 10,
    badgeVariant: 'destructive',
  },
  {
    label: 'Products',
    icon: <Tag className="size-5" />,
    items: [
      { label: 'All Products', href: '/products' },
      { label: 'Categories', href: '/products/categories' },
      { label: 'Inventory', href: '/products/inventory' },
    ],
  },
  {
    label: 'Customers',
    href: '/customers',
    icon: <Users className="size-5" />,
  },
];

const sampleProfile: SidebarProfileConfig = {
  name: 'Admin User',
  email: 'admin@timmbr.com',
  fallback: 'AU',
  items: [
    {
      label: 'View Profile',
      href: '/profile',
      icon: <User className="size-4" />,
    },
    {
      label: 'Account Settings',
      href: '/settings',
      icon: <Settings className="size-4" />,
    },
    {
      label: 'Sign out',
      onClick: () => alert('Signed out!'),
      destructive: true,
      icon: <LogOut className="size-4" />,
    },
  ],
};

const sampleFooter = ({ collapsed }: { collapsed: boolean }) => (
  <div className={cn('flex flex-col space-y-0.5', collapsed && 'items-center')}>
    <a
      href="/docs"
      className={cn(
        'flex items-center rounded-md text-xs text-grey-600 hover:bg-grey-100 hover:text-grey-900 transition-colors',
        collapsed ? 'size-8 justify-center' : 'gap-2.5 px-2.5 py-1.5'
      )}
      title="Documentation"
    >
      <FileText className="size-4 shrink-0" />
      {!collapsed && <span className="truncate">Documentation</span>}
    </a>
    <a
      href="/support"
      className={cn(
        'flex items-center rounded-md text-xs text-grey-600 hover:bg-grey-100 hover:text-grey-900 transition-colors',
        collapsed ? 'size-8 justify-center' : 'gap-2.5 px-2.5 py-1.5'
      )}
      title="Help & Support"
    >
      <LifeBuoy className="size-4 shrink-0" />
      {!collapsed && <span className="truncate">Help & Support</span>}
    </a>
  </div>
);

const meta: Meta<typeof SideBarNavigation> = {
  title: 'Overlays & Navigation/SideBarNavigation',
  component: SideBarNavigation,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    collapsed: { control: 'boolean' },
    showProfile: { control: 'boolean' },
    activePath: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof SideBarNavigation>;

export const Default: Story = {
  args: {
    items: sampleNavItems,
    activePath: '/overview',
    branding: {
      title: 'Saledash',
      subtitle: 'Commerce Control Plane',
      href: '/overview',
    },

    footer: sampleFooter,
    profile: sampleProfile,
    showProfile: true,
  },
  render: (args) => (
    <div className="h-screen bg-grey-50 flex">
      <SideBarNavigation {...args} storageKey={false} />
      <div className="flex-1 p-8 text-grey-600 font-sans">
        <h2 className="text-xl font-bold text-grey-900 mb-2">Main Content Area</h2>
        <p className="text-sm">
          Active route: <code className="bg-grey-200 px-1.5 py-0.5 rounded text-grey-800">{args.activePath}</code>
        </p>
      </div>
    </div>
  ),
};


export const Collapsed: Story = {
  args: {
    ...Default.args,
    defaultCollapsed: true,
  },
  render: Default.render,
};

export const WithFooterAndProfile: Story = {
  args: {
    ...Default.args,
    footer: sampleFooter,
    profile: sampleProfile,
    showProfile: true,
  },
  render: Default.render,
};

export const ProfileHidden: Story = {
  args: {
    ...Default.args,
    showProfile: false,
  },
  render: Default.render,
};

export const ActiveSubItem: Story = {
  args: {
    ...Default.args,
    activePath: '/products/categories',
  },
  render: Default.render,
};
