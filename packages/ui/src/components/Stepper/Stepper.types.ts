import type * as React from 'react';

export type StepState = 'complete' | 'current' | 'error' | 'upcoming';

export interface StepItem {
  id?: string;
  label: React.ReactNode;
  /** Secondary line, e.g. a date. */
  description?: React.ReactNode;
}

export interface StepperProps extends React.OlHTMLAttributes<HTMLOListElement> {
  steps: StepItem[];
  /** Index of the current step. Steps before it are complete. */
  current: number;
  /** `error` marks the current step as failed. */
  status?: 'default' | 'error';
  orientation?: 'horizontal' | 'vertical';
}
