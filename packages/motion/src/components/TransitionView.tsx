'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';
import { cn } from '@timmbr/utils';
import { transitions } from '../transitions';

export interface TransitionViewProps extends HTMLMotionProps<'div'> {
  preset?: 'fade' | 'slide-up' | 'slide-down' | 'scale' | 'pop';
  duration?: 'fast' | 'normal' | 'slow';
  transition?: any;
  children?: React.ReactNode;
}

const PRESET_ANIMATIONS = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  'slide-up': {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 24 },
  },
  'slide-down': {
    initial: { opacity: 0, y: -24 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -24 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.94 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.94 },
  },
  pop: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
};

export const TransitionView = React.forwardRef<HTMLDivElement, TransitionViewProps>(
  (
    {
      className,
      preset = 'fade',
      duration = 'normal',
      transition: customTransition,
      children,
      ...props
    },
    ref
  ) => {
    const anim = PRESET_ANIMATIONS[preset] || PRESET_ANIMATIONS.fade;
    const resolvedTransition =
      customTransition ??
      (duration === 'fast'
        ? transitions.fast
        : duration === 'slow'
        ? transitions.slow
        : transitions.spring);

    return (
      <motion.div
        ref={ref}
        initial={anim.initial}
        animate={anim.animate}
        exit={anim.exit}
        transition={resolvedTransition}
        className={cn(className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

TransitionView.displayName = 'TransitionView';
