import type * as React from 'react';

export interface ResponsiveCols {
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
  gap?: number | string;
  /**
   * Specific row gap.
   */
  rowGap?: number | string;
  /**
   * Specific column gap.
   */
  colGap?: number | string;
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
