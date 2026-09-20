'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';
import { cn } from '@timmbr/utils';
import { transitions } from '../transitions';

export interface FadeViewProps extends HTMLMotionProps<'div'> {
  children?: React.ReactNode;
  duration?: 'fast' | 'normal' | 'slow';
}

export const FadeView = React.forwardRef<HTMLDivElement, FadeViewProps>(
  ({ className, duration = 'normal', children, ...props }, ref) => {
    const transition =
      duration === 'fast'
        ? transitions.fast
        : duration === 'slow'
        ? transitions.slow
        : transitions.normal;

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={transition}
        className={cn(className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
FadeView.displayName = 'FadeView';
