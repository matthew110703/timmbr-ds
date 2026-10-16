import type * as React from 'react';
import type { ScrollRailVariants } from './ScrollRail.styles';

export interface ScrollRailProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ScrollRailVariants {
  gap?: 'sm' | 'md' | 'lg';
  /** Override px amount scrolled per chevron click. Default: 80% of track clientWidth. */
  scrollAmount?: number;
  /** Suppress chevrons entirely (touch-only contexts). */
  hideChevrons?: boolean;
  /** Accessible label for the left button. @default 'Scroll left' */
  labelPrev?: string;
  /** Accessible label for the right button. @default 'Scroll right' */
  labelNext?: string;
  children?: React.ReactNode;
  className?: string;
}
