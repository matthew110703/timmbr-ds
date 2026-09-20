'use client';

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cn } from '@timmbr/utils';
import { labelVariants } from './Label.styles';
import type { LabelProps } from './Label.types';

export const Label = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, size, required = false, disabled = false, children, ...props }, ref) => {
  return (
    <LabelPrimitive.Root
      ref={ref}
      data-slot="label"
      className={cn(
        labelVariants({ size }),
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      {...props}
    >
      {children}
      {required && (
        <span className="ml-0.5 text-destructive font-bold" aria-hidden="true">
          *
        </span>
      )}
    </LabelPrimitive.Root>
  );
});

Label.displayName = 'Label';
