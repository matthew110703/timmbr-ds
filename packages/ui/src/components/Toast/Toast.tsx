'use client';

import * as React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { cn } from '@timmbr/utils';
import { X } from '@timmbr/icons';
import { useGlobalAnimation } from '../../providers';
import { resolveMotion } from '../../types/motion';
import { toastVariants } from './Toast.styles';
import type { ToastProps, ToastViewportProps } from './Toast.types';

export const ToastProvider = ToastPrimitive.Provider;

export const ToastViewport = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Viewport>,
  ToastViewportProps
>(({ className, stacked, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    data-slot="toast-viewport"
    className={cn(
      'fixed bottom-4 right-4 z-[100] group/toast-viewport flex flex-col-reverse gap-2 p-0 w-full sm:w-[420px] max-w-[420px]',
      stacked && 'relative h-[80px]',
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitive.Viewport.displayName;

export const Toast = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Root>,
  ToastProps
>(({ className, variant, motion, index, total, style, ...props }, ref) => {
  const globalMotion = useGlobalAnimation();
  const { shouldAnimate, motionClass } = resolveMotion(motion, globalMotion);

  const isStacked = index !== undefined;

  const stackStyle: React.CSSProperties = isStacked
    ? ({
        '--stack-idx': index,
        zIndex: 50 - index,
        ...style,
      } as React.CSSProperties)
    : { ...style };

  return (
    <ToastPrimitive.Root
      ref={ref}
      data-slot="toast"
      style={stackStyle}
      className={cn(
        toastVariants({ variant }),
        !shouldAnimate && 'transition-none animate-none',
        isStacked && [
          'absolute bottom-0 right-0 w-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
          'translate-y-[calc(var(--stack-idx)*-12px)] scale-[calc(1-var(--stack-idx)*0.05)]',
          'group-hover/toast-viewport:translate-y-[calc(var(--stack-idx)*-76px)] group-hover/toast-viewport:scale-100 group-hover/toast-viewport:opacity-100',
          index > 2
            ? 'opacity-0 pointer-events-none group-hover/toast-viewport:opacity-100 group-hover/toast-viewport:pointer-events-auto'
            : 'opacity-[calc(1-var(--stack-idx)*0.15)]',
        ],
        motionClass,
        className
      )}
      {...props}
    />
  );
});
Toast.displayName = ToastPrimitive.Root.displayName;

export const ToastAction = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Action
    ref={ref}
    data-slot="toast-action"
    className={cn(
      'inline-flex h-8 shrink-0 items-center justify-center rounded-[2px] border bg-transparent px-3 text-xs font-semibold ring-offset-background transition-colors hover:bg-grey-100 dark:hover:bg-grey-800 focus:outline-none focus:ring-2 focus:ring-primary disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
      className
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitive.Action.displayName;

export const ToastClose = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    data-slot="toast-close"
    className={cn(
      'absolute right-2 top-2 rounded-sm p-1 text-muted hover:text-foreground opacity-70 hover:opacity-100 transition-opacity focus:outline-none cursor-pointer',
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-3.5 w-3.5" />
  </ToastPrimitive.Close>
));
ToastClose.displayName = ToastPrimitive.Close.displayName;

export const ToastTitle = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title
    ref={ref}
    data-slot="toast-title"
    className={cn('text-sm font-semibold leading-none', className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitive.Title.displayName;

export const ToastDescription = React.forwardRef<
  React.ComponentRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    data-slot="toast-description"
    className={cn('text-xs text-muted-foreground mt-1 leading-relaxed', className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitive.Description.displayName;
