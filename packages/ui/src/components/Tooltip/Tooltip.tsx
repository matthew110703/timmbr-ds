'use client';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '@timmbr/utils';
import { useGlobalAnimation } from '../../providers';
import { resolveMotion } from '../../types/motion';
import { tooltipContentVariants } from './Tooltip.styles';
import type { TooltipProps, TooltipContentProps } from './Tooltip.types';

export const TooltipProvider = TooltipPrimitive.Provider;
export const TooltipRoot = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;
export const TooltipPortal = TooltipPrimitive.Portal;
export const TooltipArrow = TooltipPrimitive.Arrow;

export const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, sideOffset = 4, motion, ...props }, ref) => {
  const globalMotion = useGlobalAnimation();
  const { shouldAnimate, motionClass } = resolveMotion(motion, globalMotion);

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        data-slot="tooltip-content"
        className={cn(
          tooltipContentVariants(),
          !shouldAnimate && 'transition-none animate-none',
          motionClass,
          className
        )}
        {...props}
      />
    </TooltipPrimitive.Portal>
  );
});
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

/**
 * Convenient wrapper for instant tooltip application around any element.
 */
export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  side = 'top',
  contentClassName,
  motion,
  delayDuration = 150,
  ...props
}) => {
  if (!content) {
    return <>{children}</>;
  }

  return (
    <TooltipProvider delayDuration={delayDuration}>
      <TooltipPrimitive.Root {...props}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipContent side={side} motion={motion} className={contentClassName}>
          {content}
          <TooltipPrimitive.Arrow className="fill-grey-900 dark:fill-grey-100" />
        </TooltipContent>
      </TooltipPrimitive.Root>
    </TooltipProvider>
  );
};
