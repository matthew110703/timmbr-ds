'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';
import { cn } from '@timmbr/utils';
import { getTransition } from '../transitions';
import { fadeVariants } from '../variants/fade';

export interface FadeViewProps extends HTMLMotionProps<'div'> {
  children?: React.ReactNode;
  duration?: 'fast' | 'normal' | 'slow';
}

export const FadeView = React.forwardRef<HTMLDivElement, FadeViewProps>(
  ({ className, duration = 'normal', children, transition: customTransition, ...props }, ref) => {
    const resolvedTransition = customTransition ?? getTransition(duration);

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={fadeVariants}
        transition={resolvedTransition}
        className={cn(className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
FadeView.displayName = 'FadeView';
