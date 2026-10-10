import type * as React from 'react';
import type { RatingVariants } from './Rating.styles';

export interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>, RatingVariants {
  /** Average rating, e.g. 4.5. */
  value: number;
  /** Highest possible rating (default 5). */
  max?: number;
  /** Number of ratings or reviews, shown as "(817)". */
  count?: number;
  /** BCP 47 locale for the numbers (default `en-IN`). */
  locale?: string;
  /**
   * Accessible description; the visible "4.5 ★ (817)" is hidden from screen
   * readers. Default: "Rated 4.5 out of 5 from 817 ratings".
   */
  label?: string;
}
