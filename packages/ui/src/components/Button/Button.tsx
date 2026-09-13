'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@timmbr/utils';
import { useTimmbrConfig, useGlobalAnimation } from '../../providers';
import { buttonVariants } from './Button.styles';
import type { ButtonProps } from './Button.types';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      motion,
      ...props
    },
    ref
  ) => {
    const config = useTimmbrConfig();
    const globalMotion = useGlobalAnimation();

    // Resolve variants with fallback to global config, then default
    const resolvedVariant =
      variant ?? config.components?.button?.defaultVariant ?? 'default';
    const resolvedSize =
      size ?? config.components?.button?.defaultSize ?? 'default';

    // Local motion override takes precedence over global motion
    const shouldAnimate = motion !== undefined ? motion : globalMotion;

    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        className={cn(
          buttonVariants({
            variant: resolvedVariant,
            size: resolvedSize,
            className,
          }),
          !shouldAnimate && 'transition-none active:scale-100'
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
