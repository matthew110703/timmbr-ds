'use client';

import * as React from 'react';
import { useMediaQuery } from '@timmbr/hooks';
import { cn } from '@timmbr/utils';
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../Dialog';
import {
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '../Drawer';
import type {
  ResponsiveDialogContentProps,
  ResponsiveDialogMode,
  ResponsiveDialogProps,
  ResponsiveDialogSectionProps,
  ResponsiveDialogFormProps,
} from './ResponsiveDialog.types';

const DIALOG_SIZE = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl' } as const;

export const RESPONSIVE_DIALOG_BREAKPOINT = '(min-width: 640px)';

const ModeContext = React.createContext<ResponsiveDialogMode>('dialog');

/** Whether the surrounding ResponsiveDialog renders as a `dialog` or a bottom `drawer`. */
export const useResponsiveDialogMode = () => React.useContext(ModeContext);

/**
 * A centred Dialog on larger screens and a bottom sheet (Drawer) on phones,
 * with one API. Use it for forms and pickers; keep short confirmations in
 * AlertDialog. Before hydration it renders as a dialog.
 */
export function ResponsiveDialog({ breakpoint = RESPONSIVE_DIALOG_BREAKPOINT, children, ...props }: ResponsiveDialogProps) {
  // "Below the breakpoint" (false on the server, so the dialog is the fallback).
  const isSmall = useMediaQuery(`not all and ${breakpoint}`);
  const mode: ResponsiveDialogMode = isSmall ? 'drawer' : 'dialog';
  // Dialog and Drawer share the Radix root, so switching modes keeps state.
  return (
    <ModeContext.Provider value={mode}>
      <Dialog {...props}>{children}</Dialog>
    </ModeContext.Provider>
  );
}
ResponsiveDialog.displayName = 'ResponsiveDialog';

export const ResponsiveDialogContent = React.forwardRef<HTMLDivElement, ResponsiveDialogContentProps>(
  ({ className, dialogClassName, drawerClassName, size = 'md', ...props }, ref) => {
    const mode = useResponsiveDialogMode();
    return mode === 'drawer' ? (
      <DrawerContent
        ref={ref}
        side="bottom"
        data-mode="drawer"
        className={cn(className, drawerClassName)}
        {...props}
      />
    ) : (
      <DialogContent
        ref={ref}
        data-mode="dialog"
        className={cn(DIALOG_SIZE[size], className, dialogClassName)}
        {...props}
      />
    );
  }
);
ResponsiveDialogContent.displayName = 'ResponsiveDialogContent';

export const ResponsiveDialogHeader: React.FC<ResponsiveDialogSectionProps> = (props) =>
  useResponsiveDialogMode() === 'drawer' ? <DrawerHeader {...props} /> : <DialogHeader {...props} />;
ResponsiveDialogHeader.displayName = 'ResponsiveDialogHeader';

export const ResponsiveDialogBody: React.FC<ResponsiveDialogSectionProps> = (props) =>
  useResponsiveDialogMode() === 'drawer' ? <DrawerBody {...props} /> : <DialogBody {...props} />;
ResponsiveDialogBody.displayName = 'ResponsiveDialogBody';

/** Actions; pinned to the bottom of the sheet on phones (above the keyboard and home bar). */
export const ResponsiveDialogFooter: React.FC<ResponsiveDialogSectionProps> = ({ className, ...props }) =>
  useResponsiveDialogMode() === 'drawer' ? (
    <DrawerFooter className={cn('-mx-6 border-t border-border px-6', className)} {...props} />
  ) : (
    <DialogFooter className={className} {...props} />
  );
ResponsiveDialogFooter.displayName = 'ResponsiveDialogFooter';

export const ResponsiveDialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<typeof DialogTitle>
>((props, ref) =>
  useResponsiveDialogMode() === 'drawer' ? <DrawerTitle ref={ref} {...props} /> : <DialogTitle ref={ref} {...props} />
);
ResponsiveDialogTitle.displayName = 'ResponsiveDialogTitle';

export const ResponsiveDialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof DialogDescription>
>((props, ref) =>
  useResponsiveDialogMode() === 'drawer' ? (
    <DrawerDescription ref={ref} {...props} />
  ) : (
    <DialogDescription ref={ref} {...props} />
  )
);
ResponsiveDialogDescription.displayName = 'ResponsiveDialogDescription';

/**
 * A form that wraps ResponsiveDialogBody + ResponsiveDialogFooter, so the
 * submit button can live in the (pinned) footer and the fields still scroll.
 */
export const ResponsiveDialogForm = React.forwardRef<HTMLFormElement, ResponsiveDialogFormProps>(
  ({ className, ...props }, ref) => {
    const mode = useResponsiveDialogMode();
    return (
      <form
        ref={ref}
        data-slot="responsive-dialog-form"
        className={cn('flex min-h-0 flex-1 flex-col', mode === 'drawer' && 'gap-4', className)}
        {...props}
      />
    );
  }
);
ResponsiveDialogForm.displayName = 'ResponsiveDialogForm';

/** Same Radix close in both modes. */
export const ResponsiveDialogClose = DialogClose;
