import type * as React from 'react';

export type StepState = 'complete' | 'current' | 'error' | 'upcoming';

export interface StepItem {
  id?: string;
  /** Primary step name — rendered as bold title in the progress variant. */
  label: React.ReactNode;
  /** Secondary line below the title — e.g. a date, hint, or sub-step name. */
  description?: React.ReactNode;
  /** Icon rendered inside the step circle (progress variant).
   *  Completed steps always show <Check> regardless of this prop. */
  icon?: React.ReactNode;
  /** Override the auto-derived status badge text.
   *  Defaults: complete → 'Completed', current → 'In Progress', error → 'Failed', upcoming → 'Pending'. */
  statusLabel?: string;
}

/** Step item for the `progress` variant — `label` and `icon` are required. */
export interface ProgressStepItem extends Omit<StepItem, 'icon'> {
  icon: React.ReactNode;
}

export interface StepperProps extends React.OlHTMLAttributes<HTMLOListElement> {
  steps: StepItem[];
  /** Index of the current step. Steps before it are complete. */
  current: number;
  /** `error` marks the current step as failed. */
  status?: 'default' | 'error';
  orientation?: 'horizontal' | 'vertical';
  /** 'default' = numbered circles (existing). 'progress' = icon circles + status badges. */
  variant?: 'default' | 'progress';
  /** Hide the status badge below each step label in the `progress` variant. Defaults to `true`. */
  showBadge?: boolean;
}
