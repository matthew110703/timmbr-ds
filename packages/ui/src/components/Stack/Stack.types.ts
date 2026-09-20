import type * as React from 'react';
import type { StackVariants } from './Stack.styles';

export interface StackProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'gap'>,
    Omit<StackVariants, 'gap'> {
  /**
   * Gap between items. Translates standard Tailwind tokens, any number (px), or custom string.
   */
  gap?: number | string;
  /**
   * Optional divider element rendered between each child in the stack.
   */
  divider?: React.ReactNode;
  /**
   * If true, renders child element via Radix Slot.
   */
  asChild?: boolean;
}
