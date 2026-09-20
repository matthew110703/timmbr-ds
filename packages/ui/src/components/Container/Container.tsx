'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@timmbr/utils';
import { containerVariants } from './Container.styles';
import type { ContainerProps } from './Container.types';

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      className,
      style,
      maxWidth = 'lg',
      padded = true,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : 'div';

    return (
      <Component
        ref={ref}
        data-slot="container"
        data-testid="timmbr-container"
        style={style}
        className={cn(containerVariants({ maxWidth, padded, className }))}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = 'Container';
