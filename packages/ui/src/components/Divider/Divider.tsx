'use client';

import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { cn } from '@timmbr/utils';
import { dividerVariants } from './Divider.styles';
import type { DividerProps } from './Divider.types';

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      className,
      style,
      orientation = 'horizontal',
      variant = 'solid',
      thickness = 'default',
      color = 'default',
      labelPosition = 'center',
      icon,
      decorative = true,
      label,
      children,
      ...props
    },
    ref
  ) => {
    const displayLabel = label ?? children;
    const hasContent = Boolean(displayLabel || icon);

    if (hasContent && orientation === 'horizontal') {
      const lineClass = dividerVariants({ orientation: 'horizontal', variant, thickness, color });
      const leftLineClass = cn(
        lineClass,
        labelPosition === 'start' ? 'w-8 shrink-0' : 'w-auto flex-1'
      );
      const rightLineClass = cn(
        lineClass,
        labelPosition === 'end' ? 'w-8 shrink-0' : 'w-auto flex-1'
      );

      return (
        <div
          ref={ref}
          role={decorative ? 'none' : 'separator'}
          aria-orientation="horizontal"
          data-slot="divider"
          data-testid="timmbr-divider"
          style={style}
          className={cn('flex items-center w-full my-4 gap-3 text-xs font-medium text-grey-500 dark:text-grey-400', className)}
          {...props}
        >
          <div className={leftLineClass} />
          <span className="shrink-0 flex items-center gap-1.5 uppercase tracking-wider select-none">
            {icon && <span className="inline-flex shrink-0 items-center justify-center text-grey-400 dark:text-grey-500">{icon}</span>}
            {displayLabel}
          </span>
          <div className={rightLineClass} />
        </div>
      );
    }

    return (
      <SeparatorPrimitive.Root
        ref={ref as any}
        decorative={decorative}
        orientation={orientation}
        data-slot="divider"
        data-testid="timmbr-divider"
        style={style}
        className={cn(dividerVariants({ orientation, variant, thickness, color, className }))}
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';
