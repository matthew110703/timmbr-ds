import type * as React from 'react';
import type { GapValue } from '../../utils/gap';

export interface ResponsiveCols {
  /** Columns at every size (below the first breakpoint given). */
  base?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  '2xl'?: number;
}

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of columns, or an object with responsive column counts.
   * @default 1
   */
  cols?: number | ResponsiveCols;
  /**
   * Gap between rows and columns (e.g. 2, 4, 6, 8 or CSS string '1rem').
   * @default 4
   */
  gap?: GapValue;
  /**
   * Specific row gap.
   */
  rowGap?: GapValue;
  /**
   * Specific column gap.
   */
  colGap?: GapValue;
  /**
   * Custom column template (CSS `grid-template-columns`), e.g.
   * `{ lg: '15rem minmax(0,1fr)' }` for a fixed side column from `lg` up.
   * Takes precedence over `cols` at the breakpoints it sets.
   */
  template?: string | ResponsiveTemplate;
  /**
   * If true, generates an auto-fit/auto-fill responsive grid using minChildWidth.
   */
  autoFit?: boolean;
  /**
   * Minimum width for auto-fit columns (e.g. '280px', '20rem').
   */
  minChildWidth?: string;
  /**
   * If true, delegates rendering to child component via Radix Slot.
   */
  asChild?: boolean;
}

export interface ResponsiveTemplate {
  base?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}

export type GridSpan = number | 'full';

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Columns the item spans: a number or `full`, or one per breakpoint. */
  span?: GridSpan | { base?: GridSpan; sm?: GridSpan; md?: GridSpan; lg?: GridSpan; xl?: GridSpan };
  asChild?: boolean;
}
