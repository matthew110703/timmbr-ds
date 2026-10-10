'use client';

import * as React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogBody,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from '../AlertDialog';
import { Button } from '../Button';

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Extra content between the description and the buttons (e.g. what will be deleted). */
  children?: React.ReactNode;
  /** `destructive` for deletes / sign-outs: red confirm button and icon. */
  tone?: 'default' | 'destructive';
  /** Icon in the circle above the title. */
  icon?: React.ReactNode;
  confirmLabel: React.ReactNode;
  cancelLabel: React.ReactNode;
  /** Icon on the confirm button. */
  confirmIcon?: React.ReactNode;
  /**
   * Runs on confirm. The dialog stays open with a spinner until it settles,
   * then closes; if it throws, it stays open (show the error yourself).
   */
  onConfirm: () => void | Promise<void>;
  /** @default 'sm' */
  size?: 'sm' | 'md' | 'lg';
}

/** A confirmation with Cancel / Confirm that waits for the action to finish. */
export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  tone = 'default',
  icon,
  confirmLabel,
  cancelLabel,
  confirmIcon,
  onConfirm,
  size = 'sm',
}: ConfirmDialogProps) {
  const [busy, setBusy] = React.useState(false);

  const confirm = async (event: React.MouseEvent) => {
    // Keep the dialog open until the action is done.
    event.preventDefault();
    setBusy(true);
    try {
      await onConfirm();
      onOpenChange(false);
    } catch {
      // The caller reports the error; stay open so the user can retry.
    } finally {
      setBusy(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={(next) => !busy && onOpenChange(next)}>
      <AlertDialogContent size={size}>
        <AlertDialogHeader>
          {icon && <AlertDialogMedia tone={tone === 'destructive' ? 'destructive' : 'default'}>{icon}</AlertDialogMedia>}
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
        </AlertDialogHeader>
        {children && <AlertDialogBody>{children}</AlertDialogBody>}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={busy}>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant={tone === 'destructive' ? 'destructive' : 'primary'}
              leftIcon={confirmIcon}
              loading={busy}
              onClick={confirm}
            >
              {confirmLabel}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
ConfirmDialog.displayName = 'ConfirmDialog';
