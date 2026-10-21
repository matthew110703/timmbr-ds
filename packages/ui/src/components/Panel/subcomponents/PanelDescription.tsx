'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@timmbr/utils';
import { panelDescriptionVariants } from '../Panel.styles';
import type { PanelDescriptionProps } from '../Panel.types';

export const PanelDescription = React.forwardRef<HTMLParagraphElement, PanelDescriptionProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'p';
    return (
      <Comp
        ref={ref}
        data-slot="panel-description"
        className={cn(panelDescriptionVariants(), className)}
        {...props}
      />
    );
  }
);
PanelDescription.displayName = 'PanelDescription';
