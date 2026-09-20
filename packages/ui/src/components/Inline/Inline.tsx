'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@timmbr/utils';
import { formatGap } from '../../utils/gap';
import { inlineVariants } from './Inline.styles';
import type { InlineProps } from './Inline.types';

export const Inline = React.forwardRef<HTMLDivElement, InlineProps>(
  (
    {
      className,
      style,
      gap = 3,
      align = 'center',
      justify = 'start',
      wrap = true,
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
        data-slot="inline"
        data-testid="timmbr-inline"
        style={style}
        className={cn(inlineVariants({ align, justify, wrap }), gapClass, className)}
        {...props}
      >
        {renderChildren()}
      </Component>
    );
  }
);

Inline.displayName = 'Inline';
