'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';
import { AlertCircle, Info } from '@timmbr/icons';
import { Label } from '../Label';
import { formFieldVariants } from './FormField.styles';
import type { FormFieldProps } from './FormField.types';

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      className,
      style,
      label,
      required = false,
      helperText,
      error,
      id: customId,
      disabled = false,
      children,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const id = customId || generatedId;
    const isError = Boolean(error);
    const errorMessage = typeof error === 'string' ? error : undefined;

    return (
      <div
        ref={ref}
        data-slot="form-field"
        style={style}
        className={cn(formFieldVariants(), className)}
        {...props}
      >
        {label && (
          <Label htmlFor={id} required={required} disabled={disabled}>
            {label}
          </Label>
        )}

        <div className="w-full">{children}</div>

        {(errorMessage || helperText) && (
          <p
            id={`${id}-desc`}
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

FormField.displayName = 'FormField';
