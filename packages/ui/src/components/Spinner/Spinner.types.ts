import type * as React from 'react';
import type { SpinnerVariants } from './Spinner.styles';

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    SpinnerVariants {
  /**
   * Accessible text read by screen readers (defaults to "Loading...").
   */
  label?: string;
  /**
   * Visible companion text rendered next to the spinner.
   */
  children?: React.ReactNode;
}
