'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@timmbr/utils';
import { textVariants } from './Text.styles';
import type { TextProps } from './Text.types';

export const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      className,
      style,
      as = 'p',
      variant = 'body-1',
      foreground = 'default',
      weight,
      italic,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : as;

    return (
      <Component
        ref={ref as any}
        data-slot="text"
        data-testid="timmbr-text"
        style={style}
        className={cn(
          textVariants({
            variant,
            foreground,
            weight,
            italic,
            className,
          })
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';
