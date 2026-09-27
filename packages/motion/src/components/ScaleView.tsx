'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';
import { cn } from '@timmbr/utils';
import { getTransition } from '../transitions';
import { scaleVariants } from '../variants/scale';

export interface ScaleViewProps extends HTMLMotionProps<'div'> {
  duration?: 'fast' | 'normal' | 'slow';
  children?: React.ReactNode;
}

export const ScaleView = React.forwardRef<HTMLDivElement, ScaleViewProps>(
  ({ className, duration = 'normal', children, transition: customTransition, ...props }, ref) => {
    const resolvedTransition =
      customTransition ?? (duration === 'normal' ? getTransition('spring') : getTransition(duration));

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={scaleVariants}
        transition={resolvedTransition}
        className={cn(className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
ScaleView.displayName = 'ScaleView';
