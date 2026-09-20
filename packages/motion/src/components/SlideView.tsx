'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';
import { cn } from '@timmbr/utils';
import { transitions } from '../transitions';

export interface SlideViewProps extends HTMLMotionProps<'div'> {
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: 'fast' | 'normal' | 'slow';
  children?: React.ReactNode;
}

const OFFSETS = {
  up: { y: 24, x: 0 },
  down: { y: -24, x: 0 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
};

export const SlideView = React.forwardRef<HTMLDivElement, SlideViewProps>(
  ({ className, direction = 'up', duration = 'normal', children, ...props }, ref) => {
    const transition =
      duration === 'fast'
        ? transitions.fast
        : duration === 'slow'
        ? transitions.slow
        : transitions.normal;

    const offset = OFFSETS[direction] || OFFSETS.up;

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: offset.x, y: offset.y }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        exit={{ opacity: 0, x: offset.x, y: offset.y }}
        transition={transition}
        className={cn(className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
SlideView.displayName = 'SlideView';
