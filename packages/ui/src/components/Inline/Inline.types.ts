import type * as React from 'react';
import type { InlineVariants } from './Inline.styles';
import type { GapValue } from '../../utils/gap';

export interface InlineProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'gap'>,
    Omit<InlineVariants, 'gap'> {
  /**
   * Gap between items. Translates standard Tailwind tokens, any number (px), or custom string.
   */
  gap?: GapValue;
  /** Gap between wrapped lines (overrides `gap` vertically). */
  rowGap?: GapValue;
  /** Gap between items on a line (overrides `gap` horizontally). */
  colGap?: GapValue;
  /**
   * Optional divider element rendered between each inline child.
   */
  divider?: React.ReactNode;
  /**
   * If true, renders child element via Radix Slot.
   */
  asChild?: boolean;
}
