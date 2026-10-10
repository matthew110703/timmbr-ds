import type * as React from 'react';

export interface SubNavItem {
  id: string;
  label: React.ReactNode;
  href: string;
  /** Leading icon (decorative; hidden from screen readers). */
  icon?: React.ReactNode;
  /** Trailing count or tag, e.g. a number of items. */
  badge?: React.ReactNode;
}

export interface SubNavLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  'aria-current'?: 'page';
}

export interface SubNavProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  items: SubNavItem[];
  /**
   * Current path. An item is active when it equals its `href` or is nested
   * under it (`/account/orders/123` activates `/account/orders`).
   */
  activeHref?: string;
  /** Link to render items with (e.g. `next/link`). Defaults to `<a>`. */
  linkComponent?: React.ComponentType<SubNavLinkProps>;
  /**
   * Small screens: `scroll` keeps one horizontally scrolling row (good for many
   * short items); `wrap` wraps the items onto several lines so every one stays
   * visible (good for a handful of longer labels).
   */
  mobileLayout?: 'scroll' | 'wrap';
  /** Extra content after the items, e.g. a "Log out" button. */
  footer?: React.ReactNode;
  /** Accessible name of the navigation landmark. */
  'aria-label'?: string;
}

export interface SubNavActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Leading icon, aligned with the item icons. */
  icon?: React.ReactNode;
  /** `destructive` for actions such as Log out. */
  tone?: 'default' | 'destructive';
  /** Shows a spinner in place of the icon and disables the button. */
  loading?: boolean;
}
