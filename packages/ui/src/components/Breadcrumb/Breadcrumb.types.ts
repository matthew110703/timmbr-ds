import type * as React from 'react';

export interface BreadcrumbItem {
  label: React.ReactNode;
  /** Omit for the current page (the last item). */
  href?: string;
  /** Link into another zone (e.g. Home in the shell): a plain anchor, not `linkComponent`. */
  crossZone?: boolean;
}

export interface BreadcrumbLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export interface BreadcrumbProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /** Root first; the last item is the current page. */
  items: BreadcrumbItem[];
  /** Client-side link (e.g. Next.js Link). Defaults to a plain anchor. */
  linkComponent?: React.ComponentType<BreadcrumbLinkProps>;
  /** Accessible name of the navigation landmark. */
  ariaLabel?: string;
  /**
   * On small screens, collapse the middle items behind "…" when there are more than this many.
   * @default 3
   */
  collapseAfter?: number;
}
