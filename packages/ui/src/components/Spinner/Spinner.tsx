'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';
import { Loader2 } from '@timmbr/icons';
import { spinnerIconVariants, spinnerVariants } from './Spinner.styles';
import type { SpinnerProps } from './Spinner.types';

export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  (
    {
      className,
      iconClassName,
      size = 'md',
      variant = 'default',
      label = 'Loading...',
      decorative = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        role={decorative ? undefined : 'status'}
        aria-hidden={decorative || undefined}
        data-slot="spinner-container"
        className={cn(spinnerVariants({ variant }), className)}
        {...props}
      >
        <Loader2
          className={cn(spinnerIconVariants({ size }), iconClassName)}
          aria-hidden="true"
          data-slot="spinner"
        />
        {children && (
          <span className="text-body-3 font-medium select-none" data-slot="spinner-label">
            {children}
          </span>
        )}
        {!decorative && <span className="sr-only">{label}</span>}
      </span>
    );
  }
);
Spinner.displayName = 'Spinner';
