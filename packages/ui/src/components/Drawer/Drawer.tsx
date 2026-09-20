'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@timmbr/utils';
import { X } from '@timmbr/icons';
import { useGlobalAnimation } from '../../providers';
import { resolveMotion } from '../../types/motion';
import {
  drawerOverlayVariants,
  drawerContentVariants,
  drawerHeaderVariants,
  drawerFooterVariants,
} from './Drawer.styles';
import type {
  DrawerProps,
  DrawerContentProps,
  DrawerHeaderProps,
  DrawerFooterProps,
} from './Drawer.types';

export const Drawer: React.FC<DrawerProps> = DialogPrimitive.Root;
export const DrawerTrigger = DialogPrimitive.Trigger;
export const DrawerPortal = DialogPrimitive.Portal;
export const DrawerClose = DialogPrimitive.Close;

export const DrawerOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    data-slot="drawer-overlay"
    className={cn(drawerOverlayVariants(), className)}
    {...props}
  />
));
DrawerOverlay.displayName = DialogPrimitive.Overlay.displayName;

export const DrawerContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  DrawerContentProps
>(({ className, children, side = 'right', motion, ...props }, ref) => {
  const globalMotion = useGlobalAnimation();
  const { shouldAnimate, motionClass } = resolveMotion(motion, globalMotion);

  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DialogPrimitive.Content
        ref={ref}
        data-slot="drawer-content"
        className={cn(
          drawerContentVariants({ side }),
          !shouldAnimate && 'transition-none animate-none',
          motionClass,
          className
        )}
        {...props}
      >
        {side === 'bottom' && (
          <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-grey-300 dark:bg-grey-700" />
        )}
        {children}
        <DialogPrimitive.Close
          data-slot="drawer-close"
          className="absolute right-4 top-4 rounded-sm p-1 text-muted hover:text-foreground opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DrawerPortal>
  );
});
DrawerContent.displayName = 'DrawerContent';

export const DrawerHeader: React.FC<DrawerHeaderProps> = ({ className, ...props }) => (
  <div className={cn(drawerHeaderVariants(), className)} {...props} />
);
DrawerHeader.displayName = 'DrawerHeader';

export const DrawerFooter: React.FC<DrawerFooterProps> = ({ className, ...props }) => (
  <div className={cn(drawerFooterVariants(), className)} {...props} />
);
DrawerFooter.displayName = 'DrawerFooter';

export const DrawerTitle = DialogPrimitive.Title;
export const DrawerDescription = DialogPrimitive.Description;
