'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@timmbr/utils';
import { headingVariants } from './Heading.styles';
import type { HeadingProps, HeadingTag } from './Heading.types';

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      className,
      style,
      level = 1,
      as,
      font = 'display',
      foreground = 'default',
      weight,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const Tag = (as ?? (`h${level}` as HeadingTag)) as React.ElementType;
    const Component = asChild ? Slot : Tag;

    return (
      <Component
        ref={ref}
        data-slot="heading"
        data-testid="timmbr-heading"
        style={style}
        className={cn(
          headingVariants({
            level,
            font,
            foreground,
            weight,
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

Heading.displayName = 'Heading';
