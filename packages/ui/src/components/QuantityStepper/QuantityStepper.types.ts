import type * as React from 'react';

export interface QuantityStepperLabels {
  /** Accessible name of the whole control. */
  group?: string;
  decrease?: string;
  increase?: string;
}

export interface QuantityStepperProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: number;
  onChange: (value: number) => void;
  /** Defaults to 1. */
  min?: number;
  /** The + button disables here (e.g. units in stock). Defaults to 99. */
  max?: number;
  /** `md` matches the default button height (44px); `lg` matches a 52px buy button. */
  size?: 'md' | 'lg';
  disabled?: boolean;
  labels?: QuantityStepperLabels;
}
