'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';
import { useGlobalAnimation } from '../../providers';
import { resolveMotion } from '../../types/motion';
import { progressRootVariants, progressIndicatorVariants } from './Progress.styles';
import type { ProgressProps } from './Progress.types';

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value = 0,
      max = 100,
      variant = 'default',
      size = 'default',
      indeterminate = false,
      label,
      showValue = false,
      motion,
      ...props
    },
    ref
  ) => {
    const globalMotion = useGlobalAnimation();
    const { shouldAnimate, motionClass } = resolveMotion(motion, globalMotion);

    const safeValue = Math.min(Math.max(value ?? 0, 0), max);
    const percentage = Math.round((safeValue / max) * 100);

    return (
      <div className={cn('flex flex-col gap-1.5 w-full font-sans', className)}>
        {(label || showValue) && (
          <div className="flex items-center justify-between text-xs text-foreground font-medium select-none">
            {label && <span>{label}</span>}
            {showValue && !indeterminate && (
              <span className="text-muted-foreground font-mono ml-auto">{percentage}%</span>
            )}
          </div>
        )}

        <div
          ref={ref}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={indeterminate ? undefined : safeValue}
          aria-label={label}
          data-slot="progress"
          className={progressRootVariants({ size })}
          {...props}
        >
          <div
            data-slot="progress-indicator"
            className={cn(
              progressIndicatorVariants({ variant }),
              indeterminate
                ? 'absolute top-0 bottom-0 animate-indeterminate-bar rounded-full'
                : 'h-full transition-all duration-500 ease-out',
              !shouldAnimate && 'transition-none',
              motionClass
            )}
            style={
              indeterminate
                ? undefined
                : { width: `${percentage}%` }
            }
          />
        </div>
      </div>
    );
  }
);
Progress.displayName = 'Progress';
