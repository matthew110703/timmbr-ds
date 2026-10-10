import type * as React from 'react';
import type { MediaCardMediaVariants, MediaCardVariants } from './MediaCard.styles';

/**
 * Layout template: media + text + optional aside and footer. It holds no
 * domain knowledge; build feature cards (products, line items, articles…)
 * on top of it by passing nodes into the slots.
 */
/** Props the `linkComponent` receives (e.g. next/link). */
export interface MediaCardLinkProps {
  href: string;
  className?: string;
  /** Native hover text (the card's `fullTitle`). */
  title?: string;
  children: React.ReactNode;
}

export interface MediaCardProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'title'>,
    MediaCardVariants,
    Omit<MediaCardMediaVariants, 'ratio'> {
  /**
   * Media aspect ratio: a preset, or any CSS ratio such as `"171/147"`.
   * @default 'square'
   */
  ratio?: 'square' | 'portrait' | 'landscape' | (string & {});
  /**
   * Makes the whole card a link: the title becomes a link stretched over the
   * card. Overlays and `footer` stay clickable above it.
   */
  href?: string;
  /**
   * Link to render `href` with (e.g. next/link for same-app pages).
   * Defaults to a plain `<a>` (full navigation, safe across apps).
   */
  linkComponent?: React.ComponentType<MediaCardLinkProps>;
  /** Shown centred in the media box when there is no `media` (e.g. an icon). */
  mediaFallback?: React.ReactNode;
  /**
   * Title text size; defaults to the card `size` (sm → body-2, otherwise body-1).
   */
  titleSize?: 'sm' | 'md';
  /**
   * `relaxed`: more room between title, meta and aside (product grids).
   * @default 'compact'
   */
  spacing?: 'compact' | 'relaxed';
  /** Image (or any node) shown in the media slot; fills it with object-cover. */
  media?: React.ReactNode;
  /**
   * Overlays on the media corners (badges, a wishlist toggle…). They sit above
   * a stretched title link, so interactive content stays clickable.
   */
  mediaTopStart?: React.ReactNode;
  mediaTopEnd?: React.ReactNode;
  /** Gently zooms the media on hover (for clickable cards). */
  mediaZoom?: boolean;
  /** Extra classes for the media box (e.g. a custom `aspect-*`). */
  mediaClassName?: string;
  /** Small line above the title (category, options, brand…). */
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  /**
   * Full title shown by the browser on hover (the HTML `title` attribute), so a
   * clamped title can still be read. Defaults to `title` when it is a string.
   * Set on the title link when there is an `href` (it covers the whole card),
   * otherwise on the title element.
   */
  fullTitle?: string;
  subtitle?: React.ReactNode;
  /** Small details under the title (attributes, quantity, dates…). */
  meta?: React.ReactNode;
  /**
   * Trailing content: to the right in `horizontal` (e.g. a price), under the
   * meta in `vertical`.
   */
  aside?: React.ReactNode;
  /** Actions row at the bottom (buttons). Keep it outside any title link. */
  footer?: React.ReactNode;
  /** Extra classes for the title (e.g. a different text size). */
  titleClassName?: string;
  /** Heading element for the title (default `h3`). */
  titleAs?: 'h2' | 'h3' | 'h4' | 'p';
  /** Root element (e.g. `li` inside a list). */
  as?: 'article' | 'div' | 'li';
}
