import * as React from 'react';
import { cn } from '@timmbr/utils';
import { Check, X } from '@timmbr/icons';
import {
  stepConnectorVariants,
  stepIndicatorVariants,
  stepperVariants,
} from './Stepper.styles';
import type { ProgressStepItem, StepState, StepperProps } from './Stepper.types';
import { ProgressStepper } from './subcomponents/ProgressStepper';

function stateOf(index: number, current: number, status: StepperProps['status']): StepState {
  if (index < current) return 'complete';
  if (index === current) return status === 'error' ? 'error' : 'current';
  return 'upcoming';
}

/**
 * Progress through a sequence of steps (order tracking, checkout, onboarding).
 * Steps before `current` are complete; `status="error"` marks the current
 * step as failed (e.g. a cancelled order).
 *
 * Use `variant="progress"` for checkout/KYC flows with icons and status badges.
 */
export const Stepper = React.forwardRef<HTMLOListElement, StepperProps>(
  (
    { steps, current, status = 'default', orientation = 'horizontal', variant = 'default', className, ...props },
    ref
  ) => {
    if (variant === 'progress') {
      return (
        <ProgressStepper
          steps={steps as ProgressStepItem[]}
          current={current}
          status={status}
          className={className}
        />
      );
    }
    return (
    <ol
      ref={ref}
      data-slot="stepper"
      data-orientation={orientation}
      className={cn(stepperVariants({ orientation }), className)}
      {...props}
    >
      {steps.map((step, index) => {
        const state = stateOf(index, current, status);
        const isLast = index === steps.length - 1;
        return (
          <li
            key={step.id ?? index}
            data-state={state}
            aria-current={state === 'current' || state === 'error' ? 'step' : undefined}
            className={cn(
              'relative flex min-w-0',
              orientation === 'horizontal'
                ? 'flex-1 flex-col items-center text-center'
                : 'gap-3 pb-6 last:pb-0'
            )}
          >
            {!isLast && (
              <span
                aria-hidden="true"
                className={stepConnectorVariants({
                  orientation,
                  complete: state === 'complete',
                })}
              />
            )}
            <span className={stepIndicatorVariants({ state })} aria-hidden="true">
              {state === 'complete' ? (
                <Check size={14} strokeWidth={3} />
              ) : state === 'error' ? (
                <X size={14} strokeWidth={3} />
              ) : (
                index + 1
              )}
            </span>
            <span
              className={cn(
                'min-w-0',
                orientation === 'horizontal' ? 'mt-2 px-1' : 'pt-0.5'
              )}
            >
              <span
                className={cn(
                  'block text-body-2 font-medium',
                  state === 'upcoming' ? 'text-muted-foreground' : 'text-foreground',
                  state === 'error' && 'text-destructive'
                )}
              >
                {step.label}
                <span className="sr-only">
                  {state === 'complete' ? ' (completed)' : state === 'error' ? ' (failed)' : ''}
                </span>
              </span>
              {step.description && (
                <span className="mt-0.5 block text-caption-lg text-muted-foreground">
                  {step.description}
                </span>
              )}
            </span>
          </li>
        );
      })}
    </ol>
    );
  }
);
Stepper.displayName = 'Stepper';
