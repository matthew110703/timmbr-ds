'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';
import { cn } from '@timmbr/utils';
import { getTransition } from '../transitions';
import { slideVariants } from '../variants/slide';

export interface SlideViewProps extends HTMLMotionProps<'div'> {
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: 'fast' | 'normal' | 'slow';
  children?: React.ReactNode;
}

export const SlideView = React.forwardRef<HTMLDivElement, SlideViewProps>(
  (
    {
      className,
      direction = 'up',
      duration = 'normal',
      transition: customTransition,
      children,
      ...props
    },
    ref
  ) => {
    const resolvedTransition = customTransition ?? getTransition(duration);
    const variants = slideVariants[direction] ?? slideVariants.up;

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variants}
        transition={resolvedTransition}
        className={cn(className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
SlideView.displayName = 'SlideView';
