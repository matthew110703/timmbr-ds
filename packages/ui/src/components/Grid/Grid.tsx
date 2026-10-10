'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@timmbr/utils';
import { formatAxisGap, formatGap } from '../../utils/gap';
import {
  gridVariants,
  colsMap,
  smColsMap,
  mdColsMap,
  lgColsMap,
  xlColsMap,
  templateClassMap,
  spanClassMap,
} from './Grid.styles';
import type { GridItemProps, GridProps } from './Grid.types';

const BREAKPOINTS = ['base', 'sm', 'md', 'lg', 'xl'] as const;

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
      template,
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
      if (cols.base) responsiveClasses.push(colsMap[cols.base] || '');
      if (cols.sm) responsiveClasses.push(smColsMap[cols.sm] || '');
      if (cols.md) responsiveClasses.push(mdColsMap[cols.md] || '');
      if (cols.lg) responsiveClasses.push(lgColsMap[cols.lg] || '');
      if (cols.xl) responsiveClasses.push(xlColsMap[cols.xl] || '');
    }

    const gapClass = formatGap(gap);
    const rowGapClass = formatAxisGap('y', rowGap);
    const colGapClass = formatAxisGap('x', colGap);

    // Custom templates: a literal class per breakpoint reads a CSS variable.
    const templateVars: Record<string, string> = {};
    if (template) {
      const byBreakpoint = typeof template === 'string' ? { base: template } : template;
      for (const bp of BREAKPOINTS) {
        const value = byBreakpoint[bp];
        if (!value) continue;
        templateVars[bp === 'base' ? '--grid-template' : `--grid-template-${bp}`] = value;
        responsiveClasses.push(templateClassMap[bp]);
      }
    }

    const gridStyles: React.CSSProperties = {
      ...templateVars,
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

/** A grid cell that spans several columns (optionally per breakpoint). */
export const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  ({ className, span, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot : 'div';
    const bySize = span === undefined ? {} : typeof span === 'object' ? span : { base: span };
    const spanClasses = BREAKPOINTS.map((bp) => {
      const value = bySize[bp];
      return value === undefined ? undefined : (spanClassMap[bp] as Record<string, string>)[String(value)];
    });
    return <Component ref={ref} data-slot="grid-item" className={cn(spanClasses, className)} {...props} />;
  }
);
GridItem.displayName = 'GridItem';
