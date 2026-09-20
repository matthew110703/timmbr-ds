'use client';

import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '@timmbr/utils';
import { switchVariants, switchThumbVariants } from './Switch.styles';
import type { SwitchProps } from './Switch.types';

export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(
  (
    {
      className,
      containerClassName,
      style,
      size,
      label,
      description,
      id: customId,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const id = customId || generatedId;

    const switchElement = (
      <SwitchPrimitive.Root
        ref={ref}
        id={id}
        disabled={disabled}
        className={cn(switchVariants({ size }), !label && className)}
        style={!label ? style : undefined}
        {...props}
      >
        <SwitchPrimitive.Thumb className={cn(switchThumbVariants({ size }))} />
      </SwitchPrimitive.Root>
    );

    if (!label && !description) {
      return switchElement;
    }

    return (
      <div
        className={cn(
          'flex items-start justify-between gap-4 font-sans',
          disabled && 'opacity-60 cursor-not-allowed',
          containerClassName,
          label && className
        )}
        style={label ? style : undefined}
      >
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
        <div className="shrink-0 pt-0.5">{switchElement}</div>
      </div>
    );
  }
);

Switch.displayName = 'Switch';
