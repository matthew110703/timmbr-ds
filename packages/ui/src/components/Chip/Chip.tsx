'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';
import { X } from '@timmbr/icons';
import { useGlobalAnimation } from '../../providers';
import { resolveMotion } from '../../types/motion';
import { chipVariants } from './Chip.styles';
import type { ChipProps } from './Chip.types';

export const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      className,
      variant,
      color,
      size = 'default',
      selected = false,
      clickable,
      icon,
      onRemove,
      motion,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const isInteractive = clickable || !!onClick;
    const globalMotion = useGlobalAnimation();
    const { shouldAnimate, motionClass } = resolveMotion(motion, globalMotion);

    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation();
      onRemove?.(e);
    };

    return (
      <div
        ref={ref}
        data-slot="chip"
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onClick={onClick}
        className={cn(
          chipVariants({
            variant: selected ? 'filled' : variant,
            color: selected ? undefined : (color as any),
            size,
            clickable: isInteractive,
            selected,
          }),
          !shouldAnimate && 'transition-none active:scale-100',
          motionClass,
          className
        )}
        {...props}
      >
        {icon && (
          <span className="shrink-0 size-3.5 inline-flex items-center justify-center -ml-0.5" data-slot="chip-icon">
            {icon}
          </span>
        )}

        <span className="truncate">{children}</span>

        {onRemove && (
          <button
            type="button"
            tabIndex={-1}
            onClick={handleRemove}
            aria-label="Remove"
            className="shrink-0 -mr-1 size-4 rounded-full inline-flex items-center justify-center opacity-70 hover:opacity-100 hover:bg-black/10 dark:hover:bg-white/20 transition-all cursor-pointer"
          >
            <X className="size-3" />
          </button>
        )}
      </div>
    );
  }
);
Chip.displayName = 'Chip';
