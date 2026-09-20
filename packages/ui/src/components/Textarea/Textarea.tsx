'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';
import { AlertCircle, Info } from '@timmbr/icons';
import { useGlobalAnimation } from '../../providers';
import { resolveMotion } from '../../types/motion';
import { textareaVariants } from './Textarea.styles';
import type { TextareaProps } from './Textarea.types';

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      containerClassName,
      style,
      variant,
      size,
      resize = 'vertical',
      label,
      floating = false,
      helperText,
      error,
      maxLength,
      showCount = false,
      autoResize = false,
      rows = 4,
      disabled,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      placeholder,
      motion,
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
    const [internalValue, setInternalValue] = React.useState(
      defaultValue !== undefined ? String(defaultValue) : ''
    );
    const isControlled = value !== undefined;
    const currentValue = isControlled ? String(value ?? '') : internalValue;

    const isFloatingActive = isFocused || currentValue.length > 0;
    const internalRef = React.useRef<HTMLTextAreaElement | null>(null);

    const handleResize = React.useCallback(() => {
      if (autoResize && internalRef.current) {
        internalRef.current.style.height = 'auto';
        internalRef.current.style.height = `${internalRef.current.scrollHeight}px`;
      }
    }, [autoResize]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      handleResize();
      onChange?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    React.useEffect(() => {
      if (autoResize) {
        handleResize();
      }
    }, [autoResize, currentValue, handleResize]);

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

        <div className="relative w-full">
          {label && floating && (
            <label
              htmlFor={id}
              className={cn(
                'absolute pointer-events-none transition-all duration-200 select-none z-10 truncate max-w-[calc(100%-24px)]',
                isFloatingActive
                  ? '-top-2.5 left-2.5 px-1 bg-white dark:bg-grey-900 text-[11px] font-semibold leading-none rounded-xs'
                  : 'top-3 left-3 text-sm text-muted-foreground leading-none'
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

          <textarea
            ref={(node) => {
              internalRef.current = node;
              if (typeof ref === 'function') ref(node);
              else if (ref) ref.current = node;
            }}
            id={id}
            rows={rows}
            maxLength={maxLength}
            value={value}
            defaultValue={defaultValue}
            disabled={disabled}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={floating && !isFloatingActive ? undefined : placeholder}
            aria-invalid={isError ? 'true' : undefined}
            aria-describedby={
              errorMessage || helperText ? `${id}-desc` : undefined
            }
            className={cn(
              textareaVariants({
                variant,
                size,
                resize: autoResize ? 'none' : resize,
                isError,
              }),
              floating && 'pt-3 pb-2',
              !shouldAnimate && 'transition-none',
              motionClass,
              className
            )}
            {...props}
          />
        </div>

        <div className="flex items-center justify-between gap-2">
          {(errorMessage || helperText) ? (
            <p
              id={`${id}-desc`}
              className={cn(
                'text-xs mt-0.5 flex items-center gap-1.5 flex-1',
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
          ) : (
            <span />
          )}

          {showCount && maxLength && (
            <span className="text-[11px] font-mono text-muted shrink-0 select-none">
              {currentValue.length}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
