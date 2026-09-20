'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@timmbr/utils';
import { badgeVariants } from './Badge.styles';
import type { BadgeProps } from './Badge.types';

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      className,
      style,
      variant = 'primary',
      size = 'md',
      dot = false,
      leftIcon,
      rightIcon,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : 'div';

    return (
      <Component
        ref={ref as any}
        data-slot="badge"
        data-testid="timmbr-badge"
        style={style}
        className={cn(badgeVariants({ variant, size, className }))}
        {...props}
      >
        {dot && (
          <span
            className="size-1.5 rounded-full bg-current shrink-0"
            data-slot="badge-dot"
            aria-hidden="true"
          />
        )}
        {leftIcon && (
          <span className="shrink-0 inline-flex items-center" data-slot="badge-left-icon">
            {leftIcon}
          </span>
        )}
        <span>{children}</span>
        {rightIcon && (
          <span className="shrink-0 inline-flex items-center" data-slot="badge-right-icon">
            {rightIcon}
          </span>
        )}
      </Component>
    );
  }
);

Badge.displayName = 'Badge';
