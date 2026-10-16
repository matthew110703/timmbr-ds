import type * as React from 'react';
import type { StackVariants } from './Stack.styles';
import type { GapValue } from '../../utils/gap';

/** Direction per breakpoint (`base` = all sizes). */
export interface ResponsiveDirection {
  base?: 'column' | 'row';
  sm?: 'column' | 'row';
  md?: 'column' | 'row';
  lg?: 'column' | 'row';
}

export interface StackProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'gap'>,
    Omit<StackVariants, 'gap'> {
  /**
   * Gap between items. Translates standard Tailwind tokens, any number (px), or custom string.
   */
  gap?: GapValue;
  /**
   * Stack direction: a column by default; e.g. `{ sm: 'row' }` lays the
   * items out in a row from the `sm` breakpoint.
   */
  direction?: 'column' | 'row' | ResponsiveDirection;
  /**
   * Optional divider element rendered between each child in the stack.
   */
  divider?: React.ReactNode;
  /**
   * Renders as a different HTML element or component while keeping Stack styles.
   * e.g. `as="article"`, `as="section"`, `as="header"`. Ignored when `asChild` is true.
   */
  as?: React.ElementType;
  /**
   * If true, renders child element via Radix Slot.
   */
  asChild?: boolean;
}
