'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';
import { Loader2 } from '@timmbr/icons';
import { spinnerVariants } from './Spinner.styles';
import type { SpinnerProps } from './Spinner.types';

export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  (
    {
      className,
      size = 'md',
      variant = 'default',
      label = 'Loading...',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        role="status"
        aria-label={label}
        data-slot="spinner-container"
        className={cn('inline-flex items-center gap-2 font-sans', className)}
        {...props}
      >
        <Loader2
          className={spinnerVariants({ size, variant })}
          aria-hidden="true"
          data-slot="spinner"
        />
        {children && (
          <span className="text-xs text-foreground font-medium select-none" data-slot="spinner-label">
            {children}
          </span>
        )}
        <span className="sr-only">{label}</span>
      </span>
    );
  }
);
Spinner.displayName = 'Spinner';
