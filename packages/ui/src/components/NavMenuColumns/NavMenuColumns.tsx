'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';
import { NavHeaderContext } from '../NavHeader/NavHeader.context';
import { Badge } from '../Badge';
import { Divider } from '../Divider';
import {
  navMenuAsideVariants,
  navMenuColumnVariants,
  navMenuColumnsGridVariants,
  navMenuLinkVariants,
  navMenuMoreVariants,
  navMenuPromoTitleVariants,
  navMenuPromoVariants,
  navMenuTileImageVariants,
  navMenuTileLabelVariants,
  navMenuTileVariants,
  navMenuTilesVariants,
  navMenuTitleVariants,
} from './NavMenuColumns.styles';
import type {
  NavMenuColumnsLinkProps,
  NavMenuColumnsProps,
  NavMenuGroup,
  NavMenuPromoProps,
  NavMenuTilesProps,
} from './NavMenuColumns.types';

const DefaultLink = ({ href, className, children, ...rest }: NavMenuColumnsLinkProps) => (
  <a href={href} className={className} {...rest}>
    {children}
  </a>
);

/** The link to render with: plain `<a>` across zones, else the given or the header's. */
function useMenuLink(linkComponent: NavMenuColumnsProps['linkComponent'], crossZone: boolean) {
  // Optional: these templates also work outside a NavHeader.
  const header = React.useContext(NavHeaderContext);
  const Link: React.ComponentType<NavMenuColumnsLinkProps> = crossZone
    ? DefaultLink
    : linkComponent ?? header?.linkComponent ?? DefaultLink;
  // Close the desktop popover and the mobile tab panel (same-zone links don't reload).
  const close = React.useCallback(
    () => (header?.closeMenus ? header.closeMenus() : header?.setActiveItemId(null)),
    [header]
  );
  return { Link, close };
}

/** A whole number of at least 1 (bad input such as 0, -2 or NaN becomes `fallback`). */
const atLeastOne = (value: number | undefined, fallback: number) =>
  Number.isFinite(value) && value! >= 1 ? Math.floor(value!) : fallback;

/** Rows a group takes: its heading, links, "more" link, plus the gap after it. */
const groupRows = (group: NavMenuGroup) => 2 + (group.links?.length ?? 0) + (group.more ? 1 : 0);

/**
 * Splits groups, in order, into at most `maxColumns` stacks so the tallest
 * stack is as short as possible (groups never split). Uses up to
 * `min(maxColumns, groups)` columns; an exact search, fine for menu sizes.
 */
export function packNavMenuGroups(groups: NavMenuGroup[], maxColumns: number): NavMenuGroup[][] {
  const n = groups.length;
  if (!n) return [];
  const k = Math.min(atLeastOne(maxColumns, 1), n);
  const prefix = [0];
  for (const group of groups) prefix.push(prefix[prefix.length - 1]! + groupRows(group));
  const height = (from: number, to: number) => prefix[to]! - prefix[from]!;

  // best[c][i]: smallest tallest-stack for the first i groups in c columns.
  const best = Array.from({ length: k + 1 }, () => new Array<number>(n + 1).fill(Infinity));
  const cut = Array.from({ length: k + 1 }, () => new Array<number>(n + 1).fill(0));
  best[0]![0] = 0;
  for (let c = 1; c <= k; c++) {
    for (let i = c; i <= n; i++) {
      for (let j = c - 1; j < i; j++) {
        const value = Math.max(best[c - 1]![j]!, height(j, i));
        if (value < best[c]![i]!) {
          best[c]![i] = value;
          cut[c]![i] = j;
        }
      }
    }
  }

  const columns: NavMenuGroup[][] = [];
  for (let c = k, i = n; c > 0; c--) {
    const j = cut[c]![i]!;
    columns.unshift(groups.slice(j, i));
    i = j;
  }
  return columns;
}

/**
 * A mega-menu panel: bold group headings with their links, packed into
 * balanced columns split by thin dividers, with an optional aside (e.g. a
 * `NavMenuPromo`). For a `NavHeader` item's popover (`content`) or any menu
 * panel. Clicking a link closes the header's popover.
 */
export const NavMenuColumns = React.forwardRef<HTMLElement, NavMenuColumnsProps>(
  (
    { groups, columns, aside, linkComponent, crossZone = false, className, style, 'aria-label': ariaLabel, ...props },
    ref
  ) => {
    const { Link, close } = useMenuLink(linkComponent, crossZone);
    const maxColumns = atLeastOne(columns, aside ? 3 : 4);
    const stacks = React.useMemo(() => packNavMenuGroups(groups, maxColumns), [groups, maxColumns]);

    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        data-slot="nav-menu-columns"
        className={cn(navMenuColumnsGridVariants({ aside: Boolean(aside) }), className)}
        style={{ '--nav-menu-cols': Math.max(stacks.length, maxColumns), ...style } as React.CSSProperties}
        {...props}
      >
        {stacks.map((stack, index) => (
          <div key={stack[0]?.id ?? index} className={navMenuColumnVariants()} data-slot="nav-menu-column">
            {stack.map((group) => (
              <div key={group.id} className="flex min-w-0 flex-col gap-2.5" data-slot="nav-menu-group">
                {group.href ? (
                  <Link href={group.href} className={navMenuTitleVariants({ link: true })} onClick={close}>
                    {group.title}
                  </Link>
                ) : (
                  <span className={navMenuTitleVariants()}>{group.title}</span>
                )}
                {(Boolean(group.links?.length) || group.more) && (
                  <ul className="flex flex-col gap-2.5" role="list">
                    {group.links?.map((link) => (
                      <li key={link.id}>
                        <Link href={link.href} className={navMenuLinkVariants()} onClick={close}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                    {group.more && (
                      <li>
                        <Link href={group.more.href} className={navMenuMoreVariants()} onClick={close}>
                          {group.more.label}
                        </Link>
                      </li>
                    )}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ))}
        {/* Keep the aside in the last track even when the content needs fewer columns. */}
        {aside && (
          <div
            className={navMenuAsideVariants()}
            style={{ gridColumnStart: Math.max(stacks.length, maxColumns) + 1 }}
            data-slot="nav-menu-aside"
          >
            {aside}
          </div>
        )}
      </nav>
    );
  }
);
NavMenuColumns.displayName = 'NavMenuColumns';

/**
 * Image promo card for a menu's `aside`: a headline (words in `<em>` use the
 * display face), an optional subtitle and an offer badge over a cover image.
 */
export const NavMenuPromo = React.forwardRef<HTMLElement, NavMenuPromoProps>(
  (
    { imageSrc, imageAlt = '', title, subtitle, badge, href, linkComponent, crossZone = false, className, ...props },
    ref
  ) => {
    const { Link, close } = useMenuLink(linkComponent, crossZone);
    const lines = Array.isArray(title) ? title : [title];

    const content = (
      <>
        <img src={imageSrc} alt={imageAlt} className="absolute inset-0 -z-10 size-full object-cover" />
        <span aria-hidden="true" className="absolute inset-0 -z-10 bg-grey-1000/15" />
        <span className="flex w-full flex-col gap-1">
          {lines.map((line, index) => (
            <span key={index} className={navMenuPromoTitleVariants()}>
              {line}
            </span>
          ))}
          {subtitle && <span className="text-caption font-medium opacity-90">{subtitle}</span>}
        </span>
        <Divider className="w-6 border-grey-50 bg-grey-50" />
        {badge && (
          <Badge variant="brand" size="sm" className="mt-auto rounded-[3px] px-2.5 py-1 text-caption font-bold">
            {badge}
          </Badge>
        )}
      </>
    );

    // The wrapper always carries ref, props and slot; the card inside is a link when `href` is set.
    return (
      <div ref={ref as React.Ref<HTMLDivElement>} data-slot="nav-menu-promo" className={className} {...props}>
        {href ? (
          <Link href={href} className={navMenuPromoVariants()} onClick={close}>
            {content}
          </Link>
        ) : (
          <div className={navMenuPromoVariants()}>{content}</div>
        )}
      </div>
    );
  }
);
NavMenuPromo.displayName = 'NavMenuPromo';

/** Tile width in px; matches `size-[88px]` in navMenuTileImageVariants. */
export const NAV_MENU_TILE_PX = 88;

/**
 * Image tiles for a mobile menu panel (a `NavHeader` item's `mobileContent`):
 * a horizontally scrolling grid, `rows` tiles tall, each a rounded square
 * image with its label below. Tiles without an image show the label's
 * initial on a muted square.
 */
export const NavMenuTiles = React.forwardRef<HTMLElement, NavMenuTilesProps>(
  ({ items, rows = 2, linkComponent, crossZone = false, className, style, 'aria-label': ariaLabel, ...props }, ref) => {
    const { Link, close } = useMenuLink(linkComponent, crossZone);
    // Fill row by row (the top row reads left to right), scrolling sideways.
    const columnCount = Math.max(1, Math.ceil(items.length / atLeastOne(rows, 2)));
    if (!items.length) return null;

    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        data-slot="nav-menu-tiles"
        className={cn(navMenuTilesVariants(), className)}
        style={{ gridTemplateColumns: `repeat(${columnCount}, ${NAV_MENU_TILE_PX}px)`, ...style }}
        {...props}
      >
        {items.map((item) => (
          <Link key={item.id} href={item.href} className={navMenuTileVariants()} onClick={close}>
            <span className={navMenuTileImageVariants()}>
              {item.imageSrc ? (
                <img src={item.imageSrc} alt={item.imageAlt ?? ''} loading="lazy" className="size-full object-cover" />
              ) : (
                <span aria-hidden="true" className="font-display text-h5 text-muted-foreground">
                  {typeof item.label === 'string' ? item.label.charAt(0) : null}
                </span>
              )}
            </span>
            {/* One line; long names are truncated, with the full name as a tooltip. */}
            <span
              className={navMenuTileLabelVariants()}
              title={typeof item.label === 'string' ? item.label : undefined}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
    );
  }
);
NavMenuTiles.displayName = 'NavMenuTiles';
