'use client';

import * as React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { cn } from '@timmbr/utils';
import { useGlobalAnimation } from '../../providers';
import { resolveMotion } from '../../types/motion';
import {
  alertDialogOverlayVariants,
  alertDialogContentVariants,
  alertDialogHeaderVariants,
  alertDialogBodyVariants,
  alertDialogFooterVariants,
  alertDialogTitleVariants,
  alertDialogDescriptionVariants,
  alertDialogMediaVariants,
} from './AlertDialog.styles';
import { buttonVariants } from '../Button/Button.styles';
import type {
  AlertDialogProps,
  AlertDialogContentProps,
  AlertDialogHeaderProps,
  AlertDialogBodyProps,
  AlertDialogFooterProps,
  AlertDialogActionProps,
  AlertDialogCancelProps,
  AlertDialogMediaProps,
} from './AlertDialog.types';

export const AlertDialog: React.FC<AlertDialogProps> = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
export const AlertDialogPortal = AlertDialogPrimitive.Portal;

export const AlertDialogOverlay = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    ref={ref}
    data-slot="alert-dialog-overlay"
    className={cn(alertDialogOverlayVariants(), className)}
    {...props}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

export const AlertDialogContent = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Content>,
  AlertDialogContentProps
>(({ className, children, motion, size, ...props }, ref) => {
  const globalMotion = useGlobalAnimation();
  const { shouldAnimate, motionClass } = resolveMotion(motion, globalMotion);

  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <AlertDialogPrimitive.Content
          ref={ref}
          data-slot="alert-dialog-content"
          role="alertdialog"
          className={cn(
            alertDialogContentVariants({ size }),
            !shouldAnimate && 'transition-none animate-none',
            motionClass,
            className
          )}
          {...props}
        >
          {children}
        </AlertDialogPrimitive.Content>
      </div>
    </AlertDialogPortal>
  );
});
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

export const AlertDialogHeader: React.FC<AlertDialogHeaderProps> = ({ className, ...props }) => (
  <div data-slot="alert-dialog-header" className={cn(alertDialogHeaderVariants(), className)} {...props} />
);
AlertDialogHeader.displayName = 'AlertDialogHeader';

/** Icon circle above the title, e.g. a warning for a destructive confirmation. */
export const AlertDialogMedia: React.FC<AlertDialogMediaProps> = ({ className, tone, ...props }) => (
  <div
    data-slot="alert-dialog-media"
    aria-hidden="true"
    className={cn(alertDialogMediaVariants({ tone }), className)}
    {...props}
  />
);
AlertDialogMedia.displayName = 'AlertDialogMedia';

export const AlertDialogBody: React.FC<AlertDialogBodyProps> = ({ className, ...props }) => (
  <div data-slot="alert-dialog-body" className={cn(alertDialogBodyVariants(), className)} {...props} />
);
AlertDialogBody.displayName = 'AlertDialogBody';

export const AlertDialogFooter: React.FC<AlertDialogFooterProps> = ({ className, ...props }) => (
  <div data-slot="alert-dialog-footer" className={cn(alertDialogFooterVariants(), className)} {...props} />
);
AlertDialogFooter.displayName = 'AlertDialogFooter';

export const AlertDialogTitle = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    data-slot="alert-dialog-title"
    className={cn(alertDialogTitleVariants(), className)}
    {...props}
  />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

export const AlertDialogDescription = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    data-slot="alert-dialog-description"
    className={cn(alertDialogDescriptionVariants(), className)}
    {...props}
  />
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

export const AlertDialogAction = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Action>,
  AlertDialogActionProps
>(({ className, variant = 'primary', size, asChild, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    asChild={asChild}
    data-slot="alert-dialog-action"
    className={cn(!asChild && buttonVariants({ variant, size }), className)}
    {...props}
  />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

export const AlertDialogCancel = React.forwardRef<
  React.ComponentRef<typeof AlertDialogPrimitive.Cancel>,
  AlertDialogCancelProps
>(({ className, variant = 'outline', size, asChild, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    asChild={asChild}
    data-slot="alert-dialog-cancel"
    className={cn(!asChild && buttonVariants({ variant, size }), className)}
    {...props}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;
