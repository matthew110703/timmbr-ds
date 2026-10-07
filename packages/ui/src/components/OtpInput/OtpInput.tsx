'use client';

import * as React from 'react';
import { OTPInput, type SlotProps } from 'input-otp';
import { cn } from '@timmbr/utils';
import { otpContainerVariants, otpSlotVariants } from './OtpInput.styles';
import type { OtpInputProps, OtpSlotProps } from './OtpInput.types';

function OtpSlot({
  char,
  isActive,
  hasFakeCaret,
  variant = 'default',
  size = 'md',
  error = false,
  disabled = false,
  className,
}: OtpSlotProps) {
  return (
    <div
      data-slot="otp-slot"
      className={cn(
        otpSlotVariants({
          variant,
          size,
          isActive,
          hasError: error,
        }),
        className
      )}
    >
      {char}
      {hasFakeCaret && !disabled && (
        <div
          data-slot="otp-caret"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div className="h-4 w-0.5 animate-caret-blink bg-primary duration-1000" />
        </div>
      )}
    </div>
  );
}

export const OtpInput = React.forwardRef<HTMLInputElement, OtpInputProps>(
  (
    {
      length = 6,
      value,
      defaultValue,
      onChange,
      onComplete,
      variant = 'default',
      size = 'md',
      error = false,
      disabled = false,
      autoFocus = false,
      containerClassName,
      className,
      ...props
    },
    ref
  ) => {
    const hasError = Boolean(error);
    const errorId = React.useId();
    const errorText = typeof error === 'string' && error.length > 0 ? error : null;

    return (
      <div data-slot="otp-input-root" className="w-full flex flex-col items-center">
        <OTPInput
          ref={ref}
          maxLength={length}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onComplete={onComplete}
          disabled={disabled}
          autoFocus={autoFocus}
          aria-invalid={hasError || undefined}
          aria-describedby={errorText ? errorId : undefined}
          containerClassName={cn(
            otpContainerVariants({ disabled }),
            containerClassName
          )}
          className={cn('disabled:cursor-not-allowed', className)}
          render={({ slots }: { slots: SlotProps[] }) => (
            <>
              {slots.map((slot: SlotProps, idx: number) => (
                <OtpSlot
                  key={idx}
                  char={slot.char}
                  isActive={slot.isActive}
                  hasFakeCaret={slot.hasFakeCaret}
                  variant={variant}
                  size={size}
                  error={hasError}
                  disabled={disabled}
                />
              ))}
            </>
          )}
          {...props}
        />
        {errorText && (
          <p
            id={errorId}
            role="alert"
            data-slot="otp-error"
            className="mt-2 text-body-3 text-destructive text-center font-medium"
          >
            {errorText}
          </p>
        )}
      </div>
    );
  }
);

OtpInput.displayName = 'OtpInput';
