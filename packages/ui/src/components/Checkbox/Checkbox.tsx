'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from '@timmbr/icons';
import { cn } from '@timmbr/utils';
import { checkboxVariants, checkboxIndicatorVariants } from './Checkbox.styles';
import type { CheckboxProps } from './Checkbox.types';

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(
  (
    {
      className,
      containerClassName,
      style,
      size,
      label,
      description,
      error,
      checked,
      id: customId,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const id = customId || generatedId;
    const isError = Boolean(error);
    const errorMessage = typeof error === 'string' ? error : undefined;

    const checkboxElement = (
      <CheckboxPrimitive.Root
        ref={ref}
        id={id}
        disabled={disabled}
        {...(checked !== undefined ? { checked } : {})}
        className={cn(checkboxVariants({ size, isError }), !label && className)}
        style={!label ? style : undefined}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          className={cn(checkboxIndicatorVariants({ size }))}
        >
          <span className="hidden [[data-state=indeterminate]_&]:block w-2.5 h-0.5 bg-white rounded-full" />
          <Check className="[[data-state=indeterminate]_&]:hidden w-full h-full stroke-[3]" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );

    if (!label && !description && !errorMessage) {
      return checkboxElement;
    }

    return (
      <div
        className={cn(
          'flex flex-col gap-1 font-sans',
          disabled && 'opacity-60 cursor-not-allowed',
          containerClassName,
          label && className
        )}
        style={label ? style : undefined}
      >
        <div className="flex items-start gap-2.5">
          <div className="pt-0.5 shrink-0">{checkboxElement}</div>
          <div className="flex flex-col">
            {label && (
              <label
                htmlFor={id}
                className={cn(
                  'text-sm font-medium text-foreground cursor-pointer select-none leading-snug',
                  disabled && 'cursor-not-allowed'
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-xs text-muted leading-normal mt-0.5">
                {description}
              </p>
            )}
          </div>
        </div>

        {errorMessage && (
          <p className="text-xs text-destructive font-medium pl-7">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
