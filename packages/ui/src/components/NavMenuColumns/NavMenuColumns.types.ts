import type * as React from 'react';

export interface NavMenuLink {
  id: string;
  label: React.ReactNode;
  href: string;
}

/** A heading with the links under it. */
export interface NavMenuGroup {
  id: string;
  /** Group heading. A link when `href` is set; plain text otherwise. */
  title: React.ReactNode;
  href?: string;
  links?: NavMenuLink[];
  /** Trailing "see more" link, e.g. when `links` was capped. */
  more?: { label: React.ReactNode; href: string };
}

export interface NavMenuColumnsLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export interface NavMenuColumnsProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /** Groups in reading order; they're packed top-to-bottom into balanced columns. */
  groups: NavMenuGroup[];
  /**
   * Link columns on wide screens. Content is packed into at most this many,
   * and the grid keeps this many tracks so column widths stay steady.
   * Defaults to 3 with an `aside`, 4 without.
   */
  columns?: number;
  /** Content after the link columns, e.g. a `NavMenuPromo` card. Hidden on small screens. */
  aside?: React.ReactNode;
  /**
   * Link to render with (e.g. `next/link`). Defaults to `<a>`. Inside a
   * `NavHeader`, the header's own `linkComponent` is used when this is unset.
   */
  linkComponent?: React.ComponentType<NavMenuColumnsLinkProps>;
  /** The links lead to another zone: always render plain `<a>` (full navigation). */
  crossZone?: boolean;
  /** Accessible name of the navigation landmark. */
  'aria-label'?: string;
}

export interface NavMenuPromoProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Background image (cover). */
  imageSrc: string;
  imageAlt?: string;
  /**
   * Headline. Wrap words in `<em>` to set them in the display (serif) face,
   * e.g. `<>Cherish <em>Moments</em></>`. An array renders one line each.
   */
  title: React.ReactNode | React.ReactNode[];
  subtitle?: React.ReactNode;
  /** Short offer label, e.g. "UP TO 55% OFF". */
  badge?: React.ReactNode;
  /** Makes the whole card a link. */
  href?: string;
  linkComponent?: React.ComponentType<NavMenuColumnsLinkProps>;
  /** Plain `<a>` even with a link component (full navigation). */
  crossZone?: boolean;
}

export interface NavMenuTile {
  id: string;
  label: React.ReactNode;
  href: string;
  /** Square-cropped image (88px); without one the tile shows the label's initial. */
  imageSrc?: string | null;
  imageAlt?: string;
}

export interface NavMenuTilesProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  items: NavMenuTile[];
  /** Tile rows; extra tiles scroll sideways. Defaults to 2. */
  rows?: number;
  /** Link to render with (e.g. `next/link`). Inside a `NavHeader`, defaults to the header's. */
  linkComponent?: React.ComponentType<NavMenuColumnsLinkProps>;
  /** Plain `<a>` even with a link component (full navigation). */
  crossZone?: boolean;
  /** Accessible name of the navigation landmark. */
  'aria-label'?: string;
}

/** Plain data for one header menu: desktop groups, optional mobile tiles and aside. */
export interface NavMenuData {
  id: string;
  label: React.ReactNode;
  groups: NavMenuGroup[];
  /** Mobile tab panel tiles; without them the mobile panel shows the groups. */
  tiles?: NavMenuTile[];
  /** Desktop aside, e.g. a `NavMenuPromo`. */
  aside?: React.ReactNode;
}

export interface ToNavMenuItemsOptions {
  /** The menu links lead to another zone: plain `<a>` (full navigation). */
  crossZone?: boolean;
  /** Link component for same-zone links (e.g. `next/link`). */
  linkComponent?: React.ComponentType<NavMenuColumnsLinkProps>;
  /** Desktop popover width. Defaults to 'container'. */
  popoverWidth?: 'container' | 'full' | 'dropdown' | number;
}
