'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@timmbr/utils';
import { centerVariants } from './Center.styles';
import type { CenterProps } from './Center.types';

export const Center = React.forwardRef<HTMLDivElement, CenterProps>(
  ({ className, style, inline = false, asChild = false, children, ...props }, ref) => {
    const Component = asChild ? Slot : 'div';

    return (
      <Component
        ref={ref}
        data-slot="center"
        style={style}
        className={cn(centerVariants({ inline }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Center.displayName = 'Center';
