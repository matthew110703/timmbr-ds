'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@timmbr/utils';
import { SpinnerIcon } from '@timmbr/icons';
import { useTimmbrConfig, useGlobalAnimation } from '../../providers';
import { resolveMotion } from '../../types/motion';
import { buttonVariants } from './Button.styles';
import type { ButtonProps } from './Button.types';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      style,
      variant,
      size,
      asChild = false,
      motion,
      leftIcon,
      rightIcon,
      loading = false,
      loadingText,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const config = useTimmbrConfig();
    const globalMotion = useGlobalAnimation();

    const resolvedVariant =
      variant ?? config.components?.button?.defaultVariant ?? 'default';
    const resolvedSize =
      size ?? config.components?.button?.defaultSize ?? 'default';

    const { shouldAnimate, motionClass } = resolveMotion(motion, globalMotion);
    const isDisabled = disabled || loading;

    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={cn(
            buttonVariants({
              variant: resolvedVariant,
              size: resolvedSize,
              className,
            }),
            !shouldAnimate && 'transition-none active:scale-100',
            motionClass
          )}
          style={style}
          data-slot="button"
          aria-disabled={isDisabled || undefined}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        disabled={isDisabled}
        data-slot="button"
        data-testid="timmbr-button"
        style={style}
        className={cn(
          buttonVariants({
            variant: resolvedVariant,
            size: resolvedSize,
            className,
          }),
          !shouldAnimate && 'transition-none active:scale-100',
          motionClass
        )}
        {...props}
      >
        {loading ? (
          <>
            <SpinnerIcon size={resolvedSize === 'sm' ? 14 : 18} />
            {loadingText ? <span>{loadingText}</span> : children}
          </>
        ) : (
          <>
            {leftIcon && (
              <span className="inline-flex shrink-0 items-center justify-center pointer-events-none" data-slot="button-left-icon">
                {leftIcon}
              </span>
            )}
            {children && <span>{children}</span>}
            {rightIcon && (
              <span className="inline-flex shrink-0 items-center justify-center pointer-events-none" data-slot="button-right-icon">
                {rightIcon}
              </span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
