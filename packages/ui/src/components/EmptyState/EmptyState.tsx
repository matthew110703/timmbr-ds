'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';
import { Sparkles } from '@timmbr/icons';
import { useGlobalAnimation } from '../../providers';
import { resolveMotion } from '../../types/motion';
import { emptyStateVariants, emptyStateIconWrapperVariants } from './EmptyState.styles';
import type { EmptyStateProps } from './EmptyState.types';

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      icon,
      title,
      description,
      action,
      secondaryAction,
      motion,
      children,
      ...props
    },
    ref
  ) => {
    const globalMotion = useGlobalAnimation();
    const { shouldAnimate, motionClass } = resolveMotion(motion, globalMotion);

    return (
      <div
        ref={ref}
        data-slot="empty-state"
        className={cn(
          emptyStateVariants({ variant, size }),
          !shouldAnimate && 'transition-none animate-none',
          motionClass,
          className
        )}
        {...props}
      >
        {icon !== null && (
          <div
            className={emptyStateIconWrapperVariants({ size })}
            data-slot="empty-state-icon"
          >
            {icon ?? <Sparkles className="size-6 text-primary" aria-hidden="true" />}
          </div>
        )}

        {title && (
          <h3
            className="text-base font-display font-semibold text-foreground tracking-tight"
            data-slot="empty-state-title"
          >
            {title}
          </h3>
        )}

        {description && (
          <p
            className="text-xs text-muted-foreground mt-1.5 max-w-sm leading-relaxed"
            data-slot="empty-state-description"
          >
            {description}
          </p>
        )}

        {children && <div className="mt-4 w-full">{children}</div>}

        {(action || secondaryAction) && (
          <div
            className="flex flex-wrap items-center justify-center gap-3 mt-6"
            data-slot="empty-state-actions"
          >
            {action}
            {secondaryAction}
          </div>
        )}
      </div>
    );
  }
);
EmptyState.displayName = 'EmptyState';
