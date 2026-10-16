'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@timmbr/utils';
import { formatGap } from '../../utils/gap';
import { stackVariants } from './Stack.styles';
import type { StackProps } from './Stack.types';

const DIRECTION = {
  base: { column: 'flex-col', row: 'flex-row' },
  sm: { column: 'sm:flex-col', row: 'sm:flex-row' },
  md: { column: 'md:flex-col', row: 'md:flex-row' },
  lg: { column: 'lg:flex-col', row: 'lg:flex-row' },
} as const;

function directionClasses(direction: StackProps['direction']): string | undefined {
  if (!direction) return undefined;
  if (typeof direction === 'string') return DIRECTION.base[direction];
  return (Object.keys(DIRECTION) as (keyof typeof DIRECTION)[])
    .map((bp) => {
      const value = direction[bp];
      return value ? DIRECTION[bp][value] : undefined;
    })
    .filter(Boolean)
    .join(' ');
}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      style,
      gap = 4,
      direction,
      align = 'stretch',
      justify = 'start',
      divider,
      as,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : (as ?? 'div');
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
        className={cn(stackVariants({ align, justify }), directionClasses(direction), gapClass, className)}
        {...props}
      >
        {renderChildren()}
      </Component>
    );
  }
);

Stack.displayName = 'Stack';
