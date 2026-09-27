'use client';

import * as React from 'react';
import { motion, AnimatePresence, type HTMLMotionProps } from 'motion/react';
import { cn } from '@timmbr/utils';
import { collapseVariants } from '../variants/collapse';
import { getTransition } from '../transitions';

export interface CollapseViewProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  open: boolean;
  duration?: 'fast' | 'normal' | 'slow';
  children?: React.ReactNode;
}

export const CollapseView = React.forwardRef<HTMLDivElement, CollapseViewProps>(
  (
    {
      className,
      open,
      duration = 'normal',
      children,
      transition: customTransition,
      ...props
    },
    ref
  ) => {
    const resolvedTransition = customTransition ?? getTransition(duration);

    return (
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            ref={ref}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={collapseVariants}
            transition={resolvedTransition}
            className={cn('overflow-hidden', className)}
            {...props}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);
CollapseView.displayName = 'CollapseView';
