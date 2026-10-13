'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@timmbr/utils';
import { Button } from '../Button';
import {
  rangeSliderRootVariants,
  rangeSliderTrackVariants,
  rangeSliderRangeVariants,
  rangeSliderThumbVariants,
} from './RangeSlider.styles';
import type { RangeSliderProps } from './RangeSlider.types';

export const RangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  RangeSliderProps
>(
  (
    {
      className,
      style,
      min = 0,
      max = 100,
      step = 1,
      value,
      defaultValue,
      label,
      formatValue = (v) => v.toLocaleString(),
      showReadouts = true,
      showActions = false,
      applyLabel = 'Apply',
      resetLabel = 'Reset',
      onValueChange,
      onValueCommit,
      onApply,
      onReset,
      thumbLabels = ['Minimum value', 'Maximum value'],
      resetDisabled = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const initialDefault = defaultValue ?? [min, max];
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState<number[]>(
      initialDefault
    );

    const currentValues = isControlled ? value! : internalValue;

    const handleValueChange = (newValues: number[]) => {
      if (!isControlled) {
        setInternalValue(newValues);
      }
      onValueChange?.(newValues);
    };

    const handleReset = () => {
      const resetVals = defaultValue ?? [min, max];
      if (!isControlled) {
        setInternalValue(resetVals);
      }
      onValueChange?.(resetVals);
      onReset?.();
    };

    const handleApply = () => {
      onApply?.(currentValues);
    };

    return (
      <div
        className={cn('flex flex-col gap-2 w-full font-sans select-none', className)}
        style={style}
      >
        {(label || showReadouts) && (
          <div className="flex items-center justify-between text-body-2">
            {label && (
              <span className="font-semibold text-foreground">{label}</span>
            )}
            {showReadouts && (
              <div
                className={cn(
                  'flex items-center gap-2 font-medium text-foreground',
                  !label && 'w-full justify-between'
                )}
              >
                <span>{formatValue(currentValues[0] ?? min)}</span>
                {currentValues.length > 1 && (
                  <>
                    <span className="text-muted">–</span>
                    <span>{formatValue(currentValues[1] ?? max)}</span>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        <SliderPrimitive.Root
          ref={ref}
          min={min}
          max={max}
          step={step}
          value={currentValues}
          onValueChange={handleValueChange}
          onValueCommit={onValueCommit}
          disabled={disabled}
          className={cn(
            rangeSliderRootVariants(),
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          {...props}
        >
          <SliderPrimitive.Track className={rangeSliderTrackVariants()}>
            <SliderPrimitive.Range className={rangeSliderRangeVariants()} />
          </SliderPrimitive.Track>

          {currentValues.map((_, index) => (
            <SliderPrimitive.Thumb
              key={index}
              className={rangeSliderThumbVariants()}
              aria-label={thumbLabels[index === 0 ? 0 : 1]}
            />
          ))}
        </SliderPrimitive.Root>

        {showActions && (
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleReset}
              disabled={disabled || resetDisabled}
              className="rounded-sm text-body-3 font-semibold text-foreground underline decoration-border underline-offset-4 transition-colors cursor-pointer hover:text-primary hover:decoration-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:no-underline disabled:opacity-40 disabled:hover:text-foreground"
            >
              {resetLabel}
            </button>
            <Button
              size="sm"
              variant="primary"
              onClick={handleApply}
              disabled={disabled}
              className="h-8 px-4 text-body-3 font-medium"
            >
              {applyLabel}
            </Button>
          </div>
        )}
      </div>
    );
  }
);

RangeSlider.displayName = 'RangeSlider';
