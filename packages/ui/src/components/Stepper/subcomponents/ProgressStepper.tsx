import * as React from 'react';
import { cn } from '@timmbr/utils';
import { Check, X } from '@timmbr/icons';
import {
  stepProgressBadgeVariants,
  stepProgressConnectorVariants,
  stepProgressIndicatorVariants,
} from '../Stepper.styles';
import type { StepState, StepperProps } from '../Stepper.types';

function stateOf(index: number, current: number, status: StepperProps['status']): StepState {
  if (index < current) return 'complete';
  if (index === current) return status === 'error' ? 'error' : 'current';
  return 'upcoming';
}

const DEFAULT_BADGE_LABELS: Record<StepState, string> = {
  complete: 'Completed',
  current: 'In Progress',
  error: 'Failed',
  upcoming: 'Pending',
};

export interface ProgressStepperProps {
  steps: StepperProps['steps'];
  current: number;
  status?: StepperProps['status'];
  showBadge?: boolean;
  className?: string;
}

export const ProgressStepper = React.forwardRef<HTMLOListElement, ProgressStepperProps>(
  ({ steps, current, status = 'default', showBadge = true, className }, ref) => (
    <ol
      ref={ref}
      data-slot="stepper"
      data-variant="progress"
      className={cn('flex items-start font-sans', className)}
    >
      {steps.map((step, index) => {
        const state = stateOf(index, current, status);
        const isLast = index === steps.length - 1;
        const badgeLabel = step.statusLabel ?? DEFAULT_BADGE_LABELS[state];

        return (
          <li
            key={step.id ?? index}
            data-state={state}
            aria-current={state === 'current' || state === 'error' ? 'step' : undefined}
            className="relative flex flex-1 flex-col items-center text-center"
          >
            {!isLast && (
              <span
                aria-hidden="true"
                className={cn(stepProgressConnectorVariants({ state }), 'top-[42px]')}
              />
            )}
            <span className="mb-1.5 block text-caption-lg font-medium uppercase tracking-wider text-muted-foreground">
              Step {index + 1}
            </span>
            <span className={stepProgressIndicatorVariants({ state })} aria-hidden="true">
              {state === 'complete' ? (
                <Check size={18} strokeWidth={2.5} />
              ) : state === 'error' ? (
                <X size={18} strokeWidth={2.5} />
              ) : step.icon ? (
                step.icon
              ) : (
                <span className="text-body-2 font-semibold tabular-nums">{index + 1}</span>
              )}
            </span>
            <span className="mt-2.5 min-w-0 px-1">
              <span
                className={cn(
                  'block text-body-2 font-semibold',
                  state === 'upcoming' ? 'text-muted-foreground' : 'text-foreground',
                  state === 'error' && 'text-destructive'
                )}
              >
                {step.label}
                <span className="sr-only">
                  {state === 'complete'
                    ? ' (completed)'
                    : state === 'error'
                      ? ' (failed)'
                      : state === 'current'
                        ? ' (in progress)'
                        : ' (pending)'}
                </span>
              </span>
              {step.description && (
                <span className="mt-0.5 block text-caption-lg text-muted-foreground">
                  {step.description}
                </span>
              )}
              {showBadge && (
                <span className={cn('mt-1.5 inline-flex', stepProgressBadgeVariants({ state }))}>
                  {badgeLabel}
                </span>
              )}
            </span>
          </li>
        );
      })}
    </ol>
  )
);
ProgressStepper.displayName = 'ProgressStepper';
