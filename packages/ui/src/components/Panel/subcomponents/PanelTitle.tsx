'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@timmbr/utils';
import { panelTitleVariants } from '../Panel.styles';
import type { PanelTitleProps } from '../Panel.types';

export const PanelTitle = React.forwardRef<HTMLHeadingElement, PanelTitleProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'h3';
    return (
      <Comp
        ref={ref}
        data-slot="panel-title"
        className={cn(panelTitleVariants(), className)}
        {...props}
      />
    );
  }
);
PanelTitle.displayName = 'PanelTitle';
