'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@timmbr/utils';
import { formatGap } from '../../utils/gap';
import {
  gridVariants,
  colsMap,
  smColsMap,
  mdColsMap,
  lgColsMap,
  xlColsMap,
} from './Grid.styles';
import type { GridProps } from './Grid.types';

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      className,
      style,
      cols = 1,
      gap = 4,
      rowGap,
      colGap,
      autoFit = false,
      minChildWidth = '240px',
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : 'div';

    const responsiveClasses: string[] = [];
    let customGridTemplate: string | undefined;

    if (autoFit) {
      customGridTemplate = `repeat(auto-fit, minmax(${minChildWidth}, 1fr))`;
    } else if (typeof cols === 'number') {
      responsiveClasses.push(colsMap[cols] || 'grid-cols-1');
    } else if (typeof cols === 'object') {
      if (cols.sm) responsiveClasses.push(smColsMap[cols.sm] || '');
      if (cols.md) responsiveClasses.push(mdColsMap[cols.md] || '');
      if (cols.lg) responsiveClasses.push(lgColsMap[cols.lg] || '');
      if (cols.xl) responsiveClasses.push(xlColsMap[cols.xl] || '');
    }

    const gapClass = formatGap(gap);
    const rowGapClass = rowGap !== undefined ? (typeof rowGap === 'number' ? `gap-y-${rowGap}` : `gap-y-[${rowGap}]`) : '';
    const colGapClass = colGap !== undefined ? (typeof colGap === 'number' ? `gap-x-${colGap}` : `gap-x-[${colGap}]`) : '';

    const gridStyles: React.CSSProperties = {
      ...style,
      ...(customGridTemplate ? { gridTemplateColumns: customGridTemplate } : {}),
    };

    return (
      <Component
        ref={ref}
        data-slot="grid"
        style={gridStyles}
        className={cn(gridVariants(), responsiveClasses, gapClass, rowGapClass, colGapClass, className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Grid.displayName = 'Grid';
