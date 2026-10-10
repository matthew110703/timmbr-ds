'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';
import {
  subNavFooterVariants,
  subNavIconVariants,
  subNavItemVariants,
  subNavListVariants,
} from './SubNav.styles';
import { Spinner } from '../Spinner';
import type { SubNavActionProps, SubNavLinkProps, SubNavProps } from './SubNav.types';

const DefaultLink = ({ href, className, children, ...rest }: SubNavLinkProps) => (
  <a href={href} className={className} {...rest}>
    {children}
  </a>
);

const trimSlash = (path: string) => (path.length > 1 ? path.replace(/\/+$/, '') : path);

/** Exact match, or nested under the item (`/orders/1` → `/orders`). */
export function isSubNavItemActive(href: string, activeHref?: string): boolean {
  if (!activeHref) return false;
  const item = trimSlash(href);
  const current = trimSlash(activeHref.split(/[?#]/)[0] ?? '');
  return current === item || current.startsWith(`${item}/`);
}

/**
 * In-page section navigation (account, settings, help centre…): a vertical
 * list on desktop and a horizontally scrolling row on small screens.
 * Unlike `SideBarNavigation` it's not an app shell: no branding, collapse or
 * full-height frame.
 */
export const SubNav = React.forwardRef<HTMLElement, SubNavProps>(
  (
    {
      items,
      activeHref,
      linkComponent: Link = DefaultLink,
      footer,
      mobileLayout = 'scroll',
      className,
      'aria-label': ariaLabel = 'Section navigation',
      ...props
    },
    ref
  ) => {
    // The most specific matching item wins (`/a/b` over `/a`).
    const activeId = React.useMemo(() => {
      const matches = items.filter((item) => isSubNavItemActive(item.href, activeHref));
      return matches.sort((a, b) => b.href.length - a.href.length)[0]?.id;
    }, [items, activeHref]);

    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        data-slot="sub-nav"
        className={cn(
          'flex gap-2 lg:flex-col lg:items-stretch lg:gap-0',
          mobileLayout === 'wrap' ? 'flex-col items-stretch' : 'items-center',
          className
        )}
        {...props}
      >
        <ul className={cn(subNavListVariants({ mobileLayout }), 'min-w-0 flex-1')} role="list">
          {items.map((item) => {
            const active = item.id === activeId;
            return (
              <li key={item.id} className="shrink-0">
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={subNavItemVariants({ active })}
                >
                  {item.icon && (
                    <span className={subNavIconVariants()} aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                  <span className="flex-1">{item.label}</span>
                  {item.badge !== undefined && item.badge !== null && (
                    <span className="text-caption-lg text-muted-foreground">{item.badge}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
        {footer && (
          <div className={subNavFooterVariants()} data-slot="sub-nav-footer">
            {footer}
          </div>
        )}
      </nav>
    );
  }
);
SubNav.displayName = 'SubNav';

/**
 * A button for the `footer` slot (e.g. Log out), shaped like the items so
 * its icon and label line up with them.
 */
export const SubNavAction = React.forwardRef<HTMLButtonElement, SubNavActionProps>(
  ({ icon, tone = 'default', loading = false, disabled, className, children, type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      data-slot="sub-nav-action"
      className={cn(subNavItemVariants({ tone }), className)}
      {...props}
    >
      {(icon || loading) && (
        <span className={subNavIconVariants()} aria-hidden="true">
          {loading ? <Spinner size="sm" /> : icon}
        </span>
      )}
      <span className="flex-1">{children}</span>
    </button>
  )
);
SubNavAction.displayName = 'SubNavAction';
