import type * as React from 'react';
import type { ContainerVariants } from './Container.styles';

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ContainerVariants {
  /**
   * If true, renders child element via Radix Slot while applying container constraints.
   */
  asChild?: boolean;
}
