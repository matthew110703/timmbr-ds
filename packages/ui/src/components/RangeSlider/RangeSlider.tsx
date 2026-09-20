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
          <div className="flex items-center justify-between text-sm">
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
              aria-label={index === 0 ? 'Minimum value' : 'Maximum value'}
            />
          ))}
        </SliderPrimitive.Root>

        {showActions && (
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleReset}
              disabled={disabled}
              className="text-xs font-medium text-muted hover:text-foreground transition-colors cursor-pointer disabled:opacity-50"
            >
              {resetLabel}
            </button>
            <Button
              size="sm"
              variant="primary"
              onClick={handleApply}
              disabled={disabled}
              className="h-8 px-4 text-xs font-medium"
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
