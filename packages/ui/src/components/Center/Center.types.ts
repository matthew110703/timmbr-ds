import type * as React from 'react';
import type { CenterVariants } from './Center.styles';

export interface CenterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    CenterVariants {
  /**
   * If true, delegates rendering to child element via Radix Slot.
   */
  asChild?: boolean;
}
