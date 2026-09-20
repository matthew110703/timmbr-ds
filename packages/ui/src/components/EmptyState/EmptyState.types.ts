import type * as React from 'react';
import type { EmptyStateVariants } from './EmptyState.styles';
import type { MotionProp } from '../../types/motion';

export interface EmptyStateProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    EmptyStateVariants {
  /**
   * Main illustration, icon, or SVG node.
   */
  icon?: React.ReactNode;
  /**
   * Primary title or heading.
   */
  title?: React.ReactNode;
  /**
   * Explanatory description copy.
   */
  description?: React.ReactNode;
  /**
   * Primary call to action button or element.
   */
  action?: React.ReactNode;
  /**
   * Secondary action button or link.
   */
  secondaryAction?: React.ReactNode;
  /**
   * Motion transition control.
   */
  motion?: MotionProp;
}
