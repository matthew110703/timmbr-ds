'use client';

import * as React from 'react';
import { Minus, Plus } from '@timmbr/icons';
import { cn } from '@timmbr/utils';
import {
  quantityStepperButtonVariants,
  quantityStepperValueVariants,
  quantityStepperVariants,
} from './QuantityStepper.styles';
import type { QuantityStepperProps } from './QuantityStepper.types';

/**
 * − value + for a quantity. The buttons stop at `min` and `max` (e.g. the units in stock), and
 * the value is announced when it changes. Arrow up/down on either button steps too.
 */
export const QuantityStepper = React.forwardRef<HTMLDivElement, QuantityStepperProps>(
  ({ value, onChange, min = 1, max = 99, size, disabled = false, labels, className, ...props }, ref) => {
    const clamp = (next: number) => Math.min(Math.max(next, min), Math.max(min, max));
    const step = (delta: number) => {
      const next = clamp(value + delta);
      if (next !== value) onChange(next);
    };
    const onKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === 'ArrowUp' || event.key === 'ArrowRight') {
        event.preventDefault();
        step(1);
      } else if (event.key === 'ArrowDown' || event.key === 'ArrowLeft') {
        event.preventDefault();
        step(-1);
      }
    };

    return (
      <div
        ref={ref}
        role="group"
        aria-label={labels?.group ?? 'Quantity'}
        data-slot="quantity-stepper"
        className={cn(quantityStepperVariants({ size, disabled }), className)}
        onKeyDown={disabled ? undefined : onKeyDown}
        {...props}
      >
        <button
          type="button"
          aria-label={labels?.decrease ?? 'Decrease quantity'}
          disabled={disabled || value <= min}
          onClick={() => step(-1)}
          className={quantityStepperButtonVariants()}
        >
          <Minus aria-hidden="true" className="size-4" />
        </button>
        <output aria-live="polite" className={quantityStepperValueVariants()} data-slot="quantity-stepper-value">
          {value}
        </output>
        <button
          type="button"
          aria-label={labels?.increase ?? 'Increase quantity'}
          disabled={disabled || value >= max}
          onClick={() => step(1)}
          className={quantityStepperButtonVariants()}
        >
          <Plus aria-hidden="true" className="size-4" />
        </button>
      </div>
    );
  }
);
QuantityStepper.displayName = 'QuantityStepper';
