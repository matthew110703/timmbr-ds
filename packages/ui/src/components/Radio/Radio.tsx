'use client';

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '@timmbr/utils';
import { AlertCircle, Info } from '@timmbr/icons';
import { useGlobalAnimation } from '../../providers';
import { resolveMotion } from '../../types/motion';
import { radioItemVariants, radioIndicatorVariants } from './Radio.styles';
import type { RadioGroupProps, RadioItemProps, RadioItemOption } from './Radio.types';

export const RadioItem = React.forwardRef<HTMLButtonElement, RadioItemProps>(
  ({ className, size, label, description, disabled, id: customId, motion, ...props }, ref) => {
    const generatedId = React.useId();
    const id = customId || generatedId;

    const globalMotion = useGlobalAnimation();
    const { shouldAnimate, motionClass } = resolveMotion(motion, globalMotion);

    const control = (
      <RadioGroupPrimitive.Item
        ref={ref}
        id={id}
        disabled={disabled}
        data-slot="radio-item"
        className={cn(
          radioItemVariants({ size }),
          !shouldAnimate && 'transition-none active:scale-100',
          motionClass,
          className
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator
          className={cn(
            radioIndicatorVariants({ size }),
            !shouldAnimate && 'transition-none'
          )}
        />
      </RadioGroupPrimitive.Item>
    );

    if (!label && !description) {
      return control;
    }

    return (
      <div className="flex items-start gap-2.5 font-sans">
        <div className="pt-0.5">{control}</div>
        <div className="flex flex-col select-none">
          {label && (
            <label
              htmlFor={id}
              className={cn(
                'text-sm font-medium text-foreground cursor-pointer leading-tight',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <span className="text-xs text-muted-foreground mt-0.5 leading-normal">
              {description}
            </span>
          )}
        </div>
      </div>
    );
  }
);

RadioItem.displayName = 'RadioItem';

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      className,
      style,
      size,
      label,
      helperText,
      error,
      orientation = 'vertical',
      options,
      motion,
      children,
      ...props
    },
    ref
  ) => {
    const isError = Boolean(error);
    const errorMessage = typeof error === 'string' ? error : undefined;

    return (
      <div className="flex flex-col gap-2 font-sans w-full" style={style}>
        {label && (
          <span className="text-xs font-semibold text-foreground tracking-wide select-none">
            {label}
          </span>
        )}

        <RadioGroupPrimitive.Root
          ref={ref}
          orientation={orientation}
          data-slot="radio-group"
          className={cn(
            'flex gap-3',
            orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap gap-4',
            className
          )}
          {...props}
        >
          {options
            ? options.map((opt: RadioItemOption) => (
                <RadioItem
                  key={opt.value}
                  value={opt.value}
                  label={opt.label}
                  description={opt.description}
                  disabled={opt.disabled}
                  size={size}
                  motion={motion}
                />
              ))
            : children}
        </RadioGroupPrimitive.Root>

        {(errorMessage || helperText) && (
          <p
            className={cn(
              'text-xs mt-0.5 flex items-center gap-1.5',
              isError ? 'text-destructive font-medium' : 'text-muted'
            )}
          >
            {isError ? (
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            ) : (
              <Info className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            )}
            <span>{errorMessage || helperText}</span>
          </p>
        )}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

export const Radio = RadioItem;
