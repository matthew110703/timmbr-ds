import type * as React from 'react';
import type { BadgeVariants } from './Badge.styles';

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BadgeVariants {
  /**
   * Optional leading dot indicator.
   */
  dot?: boolean;
  /**
   * Leading icon element before badge label.
   */
  leftIcon?: React.ReactNode;
  /**
   * Trailing icon element after badge label.
   */
  rightIcon?: React.ReactNode;
  /**
   * If true, renders child element via Radix Slot.
   */
  asChild?: boolean;
}
