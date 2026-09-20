'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';
import { cn } from '@timmbr/utils';
import { transitions } from '../transitions';

export interface ScaleViewProps extends HTMLMotionProps<'div'> {
  duration?: 'fast' | 'normal' | 'slow';
  children?: React.ReactNode;
}

export const ScaleView = React.forwardRef<HTMLDivElement, ScaleViewProps>(
  ({ className, duration = 'normal', children, ...props }, ref) => {
    const transition =
      duration === 'fast'
        ? transitions.fast
        : duration === 'slow'
        ? transitions.slow
        : transitions.spring;

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={transition}
        className={cn(className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
ScaleView.displayName = 'ScaleView';
