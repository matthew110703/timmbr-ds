'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';
import { X, AlertCircle, Info, Eye, EyeOff } from '@timmbr/icons';
import { useGlobalAnimation } from '../../providers';
import { resolveMotion } from '../../types/motion';
import { inputWrapperVariants, inputFieldVariants } from './Input.styles';
import type { InputProps } from './Input.types';

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      style,
      variant,
      size,
      type = 'text',
      showPasswordToggle = true,
      label,
      floating = false,
      motion,
      helperText,
      error,
      leftAdornment,
      rightAdornment,
      clearable = false,
      onClear,
      disabled,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      placeholder,
      id: customId,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const id = customId || generatedId;
    const isError = Boolean(error);
    const errorMessage = typeof error === 'string' ? error : undefined;

    const globalMotion = useGlobalAnimation();
    const { shouldAnimate, motionClass } = resolveMotion(motion, globalMotion);

    const [isFocused, setIsFocused] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(
      defaultValue !== undefined ? String(defaultValue) : ''
    );
    const isControlled = value !== undefined;
    const currentValue = isControlled ? String(value ?? '') : internalValue;

    const isFloatingActive = isFocused || currentValue.length > 0;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isControlled) {
        setInternalValue('');
      }
      onClear?.();
    };

    const showClearButton =
      clearable && !disabled && currentValue.length > 0;
    const isPasswordField = type === 'password' && showPasswordToggle;
    const resolvedType = isPasswordField && showPassword ? 'text' : type;

    return (
      <div
        className={cn('flex flex-col gap-1.5 w-full font-sans', containerClassName)}
        style={style}
      >
        {label && !floating && (
          <label
            htmlFor={id}
            className="text-xs font-semibold text-foreground tracking-wide select-none text-left"
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            inputWrapperVariants({
              variant,
              size,
              isError,
              isDisabled: disabled,
            }),
            'group relative',
            floating && 'h-11',
            !shouldAnimate && 'transition-none',
            motionClass,
            className
          )}
        >
          {leftAdornment && (
            <div className="flex items-center justify-center mr-2 text-muted-foreground shrink-0">
              {leftAdornment}
            </div>
          )}

          <div className="relative flex-1 h-full flex items-center">
            {label && floating && (
              <label
                htmlFor={id}
                className={cn(
                  'absolute pointer-events-none transition-all duration-200 select-none truncate max-w-full z-10',
                  isFloatingActive
                    ? '-top-2.5 left-0 px-1 bg-white dark:bg-grey-900 text-[11px] font-semibold leading-none rounded-xs'
                    : 'top-1/2 -translate-y-1/2 left-0 text-sm text-muted-foreground leading-none'
                )}
                style={{
                  color: isFloatingActive
                    ? (isError ? 'var(--color-destructive)' : 'var(--color-primary)')
                    : undefined,
                }}
              >
                {label}
              </label>
            )}

            <input
              ref={ref}
              id={id}
              type={resolvedType}
              value={value}
              defaultValue={defaultValue}
              disabled={disabled}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={floating && !isFloatingActive ? undefined : placeholder}
              className={cn(
                inputFieldVariants(),
                'text-sm leading-normal'
              )}
              aria-invalid={isError ? 'true' : undefined}
              aria-describedby={
                errorMessage || helperText ? `${id}-desc` : undefined
              }
              {...props}
            />
          </div>

          {showClearButton && (
            <button
              type="button"
              tabIndex={-1}
              onClick={handleClear}
              className="flex items-center justify-center ml-1.5 p-1 rounded-sm text-muted hover:text-foreground hover:bg-grey-100 dark:hover:bg-grey-800 transition-colors cursor-pointer active:scale-95"
              aria-label="Clear input"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {isPasswordField && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((prev) => !prev)}
              className="flex items-center justify-center ml-1.5 p-1 rounded-sm text-muted hover:text-foreground hover:bg-grey-100 dark:hover:bg-grey-800 transition-colors cursor-pointer active:scale-95"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          )}

          {rightAdornment && (
            <div className="flex items-center justify-center ml-2 text-muted shrink-0">
              {rightAdornment}
            </div>
          )}
        </div>

        {(errorMessage || helperText) && (
          <p
            id={`${id}-desc`}
            className={cn(
              'text-xs mt-0.5 flex items-center gap-1.5 text-left',
              isError ? 'text-destructive font-medium' : 'text-muted-foreground'
            )}
          >
            {isError ? (
              <AlertCircle className="w-3.5 h-3.5 shrink-0 text-destructive" aria-hidden="true" />
            ) : (
              <Info className="w-3.5 h-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
            )}
            <span>{errorMessage || helperText}</span>
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
