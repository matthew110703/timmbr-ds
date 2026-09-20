'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@timmbr/utils';
import { formatGap } from '../../utils/gap';
import { stackVariants } from './Stack.styles';
import type { StackProps } from './Stack.types';

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      style,
      gap = 4,
      align = 'stretch',
      justify = 'start',
      divider,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : 'div';
    const gapClass = formatGap(gap);

    const renderChildren = () => {
      if (!divider) return children;

      const array = React.Children.toArray(children).filter(Boolean);
      return array.map((child, index) => (
        <React.Fragment key={index}>
          {child}
          {index < array.length - 1 && divider}
        </React.Fragment>
      ));
    };

    return (
      <Component
        ref={ref}
        data-slot="stack"
        data-testid="timmbr-stack"
        style={style}
        className={cn(stackVariants({ align, justify }), gapClass, className)}
        {...props}
      >
        {renderChildren()}
      </Component>
    );
  }
);

Stack.displayName = 'Stack';
