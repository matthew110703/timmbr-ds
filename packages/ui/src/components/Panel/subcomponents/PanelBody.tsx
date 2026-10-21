'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@timmbr/utils';
import { AnimatePresence, motion, panelContentFadeVariants } from '@timmbr/motion';
import { panelBodyVariants, panelSectionPadding } from '../Panel.styles';
import { usePanelContext } from '../Panel.context';
import type { PanelBodyProps } from '../Panel.types';

export const PanelBody = React.forwardRef<HTMLDivElement, PanelBodyProps>(
  ({ className, asChild = false, overflow = 'auto', children, ...props }, ref) => {
    const { sectioned, padding, collapsed, collapsible, shouldAnimate, panelId } = usePanelContext();
    const Comp = asChild ? Slot : 'div';

    const bodyClasses = cn(
      panelBodyVariants({ overflow, sectioned }),
      sectioned && panelSectionPadding[padding],
      className
    );

    if (!collapsible) {
      return (
        <Comp
          ref={ref}
          id={`panel-body-${panelId}`}
          data-slot="panel-body"
          className={bodyClasses}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    // Wrap body content in AnimatePresence so it fades out before the panel shrinks.
    return (
      <Comp
        ref={ref}
        id={`panel-body-${panelId}`}
        data-slot="panel-body"
        className={cn(bodyClasses, 'overflow-hidden')}
        {...props}
      >
        {shouldAnimate ? (
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.div
                key="panel-body-content"
                variants={panelContentFadeVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="h-full"
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        ) : (
          !collapsed && children
        )}
      </Comp>
    );
  }
);
PanelBody.displayName = 'PanelBody';
