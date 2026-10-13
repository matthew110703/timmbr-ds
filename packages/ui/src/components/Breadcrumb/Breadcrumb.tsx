import * as React from 'react';
import { ChevronRight } from '@timmbr/icons';
import { cn } from '@timmbr/utils';
import {
  breadcrumbCurrentVariants,
  breadcrumbItemVariants,
  breadcrumbLinkVariants,
  breadcrumbListVariants,
  breadcrumbSeparatorVariants,
} from './Breadcrumb.styles';
import type { BreadcrumbLinkProps, BreadcrumbProps } from './Breadcrumb.types';

const PlainLink = ({ href, className, children }: BreadcrumbLinkProps) => (
  <a href={href} className={className}>
    {children}
  </a>
);

/**
 * Where the current page sits (Home › Living › Sofas). The last item is the current page
 * (`aria-current="page"`, not a link). On small screens a long trail keeps its first and last
 * two items and collapses the middle behind "…". Server-safe: no client JavaScript.
 */
export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  (
    { items, linkComponent: Link = PlainLink, ariaLabel = 'Breadcrumb', collapseAfter = 3, className, ...props },
    ref
  ) => {
    if (items.length === 0) return null;
    // Collapsing keeps the first and last two items, so it only hides something past three.
    const collapse = items.length > Math.max(collapseAfter, 3);
    const lastIndex = items.length - 1;

    return (
      <nav ref={ref} aria-label={ariaLabel} data-slot="breadcrumb" className={className} {...props}>
        <ol className={breadcrumbListVariants()}>
          {items.map((item, index) => {
            const isLast = index === lastIndex;
            const hidden = collapse && index > 0 && index < lastIndex - 1;
            // Client-side links can't leave the zone, so cross-zone items are plain anchors.
            const ItemLink = item.crossZone ? PlainLink : Link;
            return (
              <React.Fragment key={index}>
                {collapse && index === 1 && (
                  <li aria-hidden="true" className="inline-flex items-center gap-1.5 sm:hidden">
                    <span>…</span>
                    <ChevronRight className={breadcrumbSeparatorVariants()} />
                  </li>
                )}
                <li className={cn(breadcrumbItemVariants({ collapsible: hidden }))}>
                  {isLast || !item.href ? (
                    <span className={breadcrumbCurrentVariants()} {...(isLast && { 'aria-current': 'page' as const })}>
                      {item.label}
                    </span>
                  ) : (
                    <ItemLink href={item.href} className={breadcrumbLinkVariants()}>
                      {item.label}
                    </ItemLink>
                  )}
                  {!isLast && <ChevronRight aria-hidden="true" className={breadcrumbSeparatorVariants()} />}
                </li>
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    );
  }
);
Breadcrumb.displayName = 'Breadcrumb';
