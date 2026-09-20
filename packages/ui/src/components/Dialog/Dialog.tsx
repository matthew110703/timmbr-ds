'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@timmbr/utils';
import { X } from '@timmbr/icons';
import { useGlobalAnimation } from '../../providers';
import { resolveMotion } from '../../types/motion';
import {
  dialogOverlayVariants,
  dialogContentVariants,
  dialogHeaderVariants,
  dialogFooterVariants,
  dialogTitleVariants,
  dialogDescriptionVariants,
} from './Dialog.styles';
import type {
  DialogProps,
  DialogContentProps,
  DialogHeaderProps,
  DialogFooterProps,
} from './Dialog.types';

export const Dialog: React.FC<DialogProps> = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogClose = DialogPrimitive.Close;

export const DialogOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    data-slot="dialog-overlay"
    className={cn(dialogOverlayVariants(), className)}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

export const DialogContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, motion, ...props }, ref) => {
  const globalMotion = useGlobalAnimation();
  const { shouldAnimate, motionClass } = resolveMotion(motion, globalMotion);

  return (
    <DialogPortal>
      <DialogOverlay />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <DialogPrimitive.Content
          ref={ref}
          data-slot="dialog-content"
          className={cn(
            dialogContentVariants(),
            !shouldAnimate && 'transition-none animate-none',
            motionClass,
            className
          )}
          {...props}
        >
          {children}
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="absolute right-4 top-4 rounded-sm p-1 text-muted hover:text-foreground opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </div>
    </DialogPortal>
  );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

export const DialogHeader: React.FC<DialogHeaderProps> = ({ className, ...props }) => (
  <div className={cn(dialogHeaderVariants(), className)} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

export const DialogFooter: React.FC<DialogFooterProps> = ({ className, ...props }) => (
  <div className={cn(dialogFooterVariants(), className)} {...props} />
);
DialogFooter.displayName = 'DialogFooter';

export const DialogTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    data-slot="dialog-title"
    className={cn(dialogTitleVariants(), className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

export const DialogDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    data-slot="dialog-description"
    className={cn(dialogDescriptionVariants(), className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
