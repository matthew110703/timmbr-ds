'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';
import { TrendingUp, TrendingDown } from '@timmbr/icons';
import { useGlobalAnimation } from '../../providers';
import { resolveMotion } from '../../types/motion';
import {
  statVariants,
  statLabelVariants,
  statValueVariants,
  statHelpTextVariants,
  statIndicatorVariants,
} from './Stat.styles';
import type {
  StatProps,
  StatLabelProps,
  StatValueProps,
  StatHelpTextProps,
  StatIndicatorProps,
} from './Stat.types';

export const Stat = React.forwardRef<HTMLDivElement, StatProps>(
  ({ className, variant, motion, ...props }, ref) => {
    const globalMotion = useGlobalAnimation();
    const { shouldAnimate, motionClass } = resolveMotion(motion, globalMotion);

    return (
      <div
        ref={ref}
        data-slot="stat"
        className={cn(
          statVariants({ variant }),
          !shouldAnimate && 'transition-none',
          motionClass,
          className
        )}
        {...props}
      />
    );
  }
);
Stat.displayName = 'Stat';

export const StatLabel = React.forwardRef<HTMLDivElement, StatLabelProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="stat-label"
      className={cn(statLabelVariants(), className)}
      {...props}
    />
  )
);
StatLabel.displayName = 'StatLabel';

export const StatValue = React.forwardRef<HTMLDivElement, StatValueProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="stat-value"
      className={cn(statValueVariants(), className)}
      {...props}
    />
  )
);
StatValue.displayName = 'StatValue';

export const StatHelpText = React.forwardRef<HTMLDivElement, StatHelpTextProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="stat-help-text"
      className={cn(statHelpTextVariants(), className)}
      {...props}
    />
  )
);
StatHelpText.displayName = 'StatHelpText';

export const StatIndicator = React.forwardRef<HTMLSpanElement, StatIndicatorProps>(
  ({ className, type = 'increase', children, ...props }, ref) => {
    const Icon = type === 'increase' ? TrendingUp : TrendingDown;

    return (
      <span
        ref={ref}
        data-slot="stat-indicator"
        className={cn(statIndicatorVariants({ type }), className)}
        {...props}
      >
        <Icon className="size-3.5" aria-hidden="true" />
        {children}
      </span>
    );
  }
);
StatIndicator.displayName = 'StatIndicator';
