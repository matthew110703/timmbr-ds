'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';
import { useGlobalAnimation } from '../../providers';
import { resolveMotion } from '../../types/motion';
import { skeletonVariants } from './Skeleton.styles';
import type { SkeletonProps } from './Skeleton.types';

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      style,
      variant = 'text',
      animation = 'pulse',
      width,
      height,
      lines = 1,
      motion,
      ...props
    },
    ref
  ) => {
    const globalMotion = useGlobalAnimation();
    const { shouldAnimate, motionClass } = resolveMotion(motion, globalMotion);

    const inlineStyles: React.CSSProperties = {
      ...(width !== undefined ? { width: typeof width === 'number' ? `${width}px` : width } : {}),
      ...(height !== undefined ? { height: typeof height === 'number' ? `${height}px` : height } : {}),
      ...style,
    };

    const resolvedAnimation = shouldAnimate ? animation : 'none';

    if (variant === 'text' && lines > 1) {
      return (
        <div className="flex flex-col gap-2 w-full" data-slot="skeleton-group">
          {Array.from({ length: lines }).map((_, idx) => (
            <div
              key={idx}
              className={cn(
                skeletonVariants({ variant: 'text', animation: resolvedAnimation }),
                idx === lines - 1 && 'w-4/5',
                motionClass,
                className
              )}
              style={idx === 0 ? inlineStyles : undefined}
            />
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        data-slot="skeleton"
        style={inlineStyles}
        className={cn(
          skeletonVariants({ variant, animation: resolvedAnimation }),
          motionClass,
          className
        )}
        {...props}
      />
    );
  }
);
Skeleton.displayName = 'Skeleton';
