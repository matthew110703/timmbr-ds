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
  /**
   * Extra classes for the icon itself (the wrapper gets `className`).
   */
  iconClassName?: string;
  /**
   * Purely visual: no status role or label. Use inside a control that already
   * communicates its busy state (e.g. a button with `aria-busy`).
   */
  decorative?: boolean;
}
