'use client';

import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { cn } from '@timmbr/utils';
import { ChevronDown, Check, AlertCircle, Info } from '@timmbr/icons';
import { useGlobalAnimation } from '../../providers';
import { resolveMotion } from '../../types/motion';
import {
  selectTriggerVariants,
  selectContentVariants,
  selectItemVariants,
} from './Select.styles';
import type { SelectProps, SelectOption } from './Select.types';

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      className,
      containerClassName,
      style,
      variant,
      size,
      label,
      placeholder = 'Select an option',
      options,
      helperText,
      error,
      motion,
      value,
      defaultValue,
      onValueChange,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isError = Boolean(error);
    const errorMessage = typeof error === 'string' ? error : undefined;

    const globalMotion = useGlobalAnimation();
    const { shouldAnimate, motionClass } = resolveMotion(motion, globalMotion);

    return (
      <div
        className={cn('flex flex-col gap-1.5 w-full font-sans', containerClassName)}
        style={style}
      >
        {label && (
          <label className="text-xs font-semibold text-foreground tracking-wide select-none">
            {label}
          </label>
        )}

        <SelectPrimitive.Root
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          disabled={disabled}
          {...props}
        >
          <SelectPrimitive.Trigger
            ref={ref}
            data-slot="select-trigger"
            aria-invalid={isError ? 'true' : undefined}
            className={cn(
              selectTriggerVariants({
                variant,
                size,
                isError,
              }),
              !shouldAnimate && 'transition-none',
              motionClass,
              className
            )}
          >
            <SelectPrimitive.Value placeholder={placeholder} />
            <SelectPrimitive.Icon asChild>
              <ChevronDown className="h-4 w-4 shrink-0 text-muted opacity-60 transition-transform duration-200" />
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>

          <SelectPrimitive.Portal>
            <SelectPrimitive.Content
              className={cn(
                selectContentVariants(),
                !shouldAnimate && 'transition-none animate-none'
              )}
              position="popper"
              sideOffset={4}
            >
              <SelectPrimitive.Viewport className="p-1">
                {options ? (
                  options.map((opt: SelectOption) => (
                    <SelectPrimitive.Item
                      key={opt.value}
                      value={opt.value}
                      disabled={opt.disabled}
                      className={cn(selectItemVariants())}
                    >
                      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                        <SelectPrimitive.ItemIndicator>
                          <Check className="h-3.5 w-3.5 text-primary" />
                        </SelectPrimitive.ItemIndicator>
                      </span>
                      <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
                    </SelectPrimitive.Item>
                  ))
                ) : (
                  children
                )}
              </SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>

        {(errorMessage || helperText) && (
          <p
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

Select.displayName = 'Select';

// Subcomponents for compound composition
export const SelectRoot = SelectPrimitive.Root;
export const SelectTrigger = SelectPrimitive.Trigger;
export const SelectValue = SelectPrimitive.Value;
export const SelectContent = SelectPrimitive.Content;
export const SelectItem = SelectPrimitive.Item;
export const SelectGroup = SelectPrimitive.Group;
export const SelectLabel = SelectPrimitive.Label;
export const SelectSeparator = SelectPrimitive.Separator;
