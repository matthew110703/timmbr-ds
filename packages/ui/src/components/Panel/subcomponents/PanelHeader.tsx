'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@timmbr/utils';
import { motion, transitions } from '@timmbr/motion';
import { ChevronRight } from '@timmbr/icons';
import { panelHeaderVariants, panelSectionPadding } from '../Panel.styles';
import { usePanelContext } from '../Panel.context';
import type { PanelHeaderProps } from '../Panel.types';

export const PanelHeader = React.forwardRef<HTMLDivElement, PanelHeaderProps>(
  ({ className, asChild = false, divider = false, actions, children, ...props }, ref) => {
    const {
      sectioned,
      padding,
      collapsed,
      collapsible,
      shouldAnimate,
      panelId,
      placement,
      onToggleCollapse,
    } = usePanelContext();
    const Comp = asChild ? Slot : 'div';

    // Use a single icon and drive direction via rotation only —
    // swapping icons AND animating rotation would cancel each other out.
    // Right panel:  expanded → 0° (→, collapse toward edge)  | collapsed → 180° (←, expand inward)
    // Left/inline:  expanded → 180° (←, collapse toward edge) | collapsed → 0° (→, expand inward)
    const rotationDeg = placement === 'right' ? (collapsed ? 180 : 0) : collapsed ? 0 : 180;

    const collapseButton = collapsible && (
      <button
        type="button"
        aria-expanded={!collapsed}
        aria-controls={`panel-body-${panelId}`}
        onClick={onToggleCollapse}
        className="flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        data-slot="panel-collapse-toggle"
      >
        {shouldAnimate ? (
          <motion.span
            animate={{ rotate: rotationDeg }}
            transition={transitions.fast}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </motion.span>
        ) : (
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `rotate(${rotationDeg}deg)`,
            }}
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </span>
        )}
        <span className="sr-only">{collapsed ? 'Expand panel' : 'Collapse panel'}</span>
      </button>
    );

    const headerClasses = cn(
      panelHeaderVariants({ sectioned, divider }),
      sectioned && panelSectionPadding[padding],
      sectioned && !divider && 'pb-0',
      className
    );

    // Collapsed icon-strip: only show the toggle button, centered in the narrow panel.
    if (collapsible && collapsed) {
      return (
        <Comp
          ref={ref}
          data-slot="panel-header"
          className={cn('flex items-center justify-center py-2', className)}
          {...props}
        >
          {collapseButton}
        </Comp>
      );
    }

    const hasTrailingContent = actions !== undefined || collapsible;

    if (!hasTrailingContent) {
      return (
        <Comp ref={ref} data-slot="panel-header" className={headerClasses} {...props}>
          {children}
        </Comp>
      );
    }

    return (
      <Comp
        ref={ref}
        data-slot="panel-header"
        className={cn(headerClasses, 'flex-row items-start justify-between gap-2')}
        {...props}
      >
        <div className="flex min-w-0 flex-col gap-1" data-slot="panel-header-text">
          {children}
        </div>
        <div className="flex shrink-0 items-center gap-1 -mt-0.5" data-slot="panel-header-actions">
          {actions}
          {collapseButton}
        </div>
      </Comp>
    );
  }
);
PanelHeader.displayName = 'PanelHeader';
