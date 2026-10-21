'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@timmbr/utils';
import { panelFooterVariants, panelSectionFooterPadding } from '../Panel.styles';
import { usePanelContext } from '../Panel.context';
import type { PanelFooterProps } from '../Panel.types';

export const PanelFooter = React.forwardRef<HTMLDivElement, PanelFooterProps>(
  ({ className, asChild = false, justify, children, ...props }, ref) => {
    const { sectioned, padding, collapsed, collapsible } = usePanelContext();
    const Comp = asChild ? Slot : 'div';

    const footerClasses = cn(
      panelFooterVariants({ sectioned, justify }),
      sectioned && panelSectionFooterPadding[padding],
      className
    );

    if (!collapsible) {
      return (
        <Comp ref={ref} data-slot="panel-footer" className={footerClasses} {...props}>
          {children}
        </Comp>
      );
    }

    // Hide footer content when collapsed.
    if (collapsed) return null;

    return (
      <Comp ref={ref} data-slot="panel-footer" className={footerClasses} {...props}>
        {children}
      </Comp>
    );
  }
);
PanelFooter.displayName = 'PanelFooter';
