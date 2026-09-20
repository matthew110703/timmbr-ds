import type * as React from 'react';
import type { ProgressVariants } from './Progress.styles';
import type { MotionProp } from '../../types/motion';

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ProgressVariants {
  /**
   * Progress value between 0 and max.
   */
  value?: number;
  /**
   * Maximum value. Defaults to 100.
   */
  max?: number;
  /**
   * Whether the progress is indeterminate (ongoing activity with unknown duration).
   */
  indeterminate?: boolean;
  /**
   * Optional visible or accessible label.
   */
  label?: string;
  /**
   * If true, displays the percentage text alongside the bar.
   */
  showValue?: boolean;
  /**
   * Motion transition control.
   */
  motion?: MotionProp;
}
