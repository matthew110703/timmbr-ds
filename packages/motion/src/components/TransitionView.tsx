'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps, type Variants } from 'motion/react';
import { cn } from '@timmbr/utils';
import { getTransition } from '../transitions';
import { fadeVariants } from '../variants/fade';
import { slideUpVariants, slideDownVariants } from '../variants/slide';
import { scaleVariants, popVariants } from '../variants/scale';

export interface TransitionViewProps extends HTMLMotionProps<'div'> {
  preset?: 'fade' | 'slide-up' | 'slide-down' | 'scale' | 'pop';
  duration?: 'fast' | 'normal' | 'slow';
  transition?: any;
  children?: React.ReactNode;
}

const PRESET_VARIANTS: Record<NonNullable<TransitionViewProps['preset']>, Variants> = {
  fade: fadeVariants,
  'slide-up': slideUpVariants,
  'slide-down': slideDownVariants,
  scale: scaleVariants,
  pop: popVariants,
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
    const variants = PRESET_VARIANTS[preset] ?? PRESET_VARIANTS.fade;
    const resolvedTransition =
      customTransition ?? (duration === 'normal' ? getTransition('spring') : getTransition(duration));

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

TransitionView.displayName = 'TransitionView';
