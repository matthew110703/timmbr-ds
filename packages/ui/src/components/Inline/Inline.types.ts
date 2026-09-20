import type * as React from 'react';
import type { InlineVariants } from './Inline.styles';

export interface InlineProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'gap'>,
    Omit<InlineVariants, 'gap'> {
  /**
   * Gap between items. Translates standard Tailwind tokens, any number (px), or custom string.
   */
  gap?: number | string;
  /**
   * Optional divider element rendered between each inline child.
   */
  divider?: React.ReactNode;
  /**
   * If true, renders child element via Radix Slot.
   */
  asChild?: boolean;
}
