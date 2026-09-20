import type * as React from 'react';
import type { SkeletonVariants } from './Skeleton.styles';
import type { MotionProp } from '../../types/motion';

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    SkeletonVariants {
  /**
   * Explicit width (e.g. '100%', '200px', 150).
   */
  width?: string | number;
  /**
   * Explicit height (e.g. '20px', 40).
   */
  height?: string | number;
  /**
   * Number of lines to render when variant="text". Defaults to 1.
   */
  lines?: number;
  /**
   * Motion transition control.
   */
  motion?: MotionProp;
}
