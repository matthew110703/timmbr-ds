import type * as React from 'react';
import type * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import type { MotionProp } from '../../types/motion';

export type AlertDialogProps = AlertDialogPrimitive.AlertDialogProps;

export interface AlertDialogContentProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> {
  /**
   * Motion transition control.
   */
  motion?: MotionProp;
}

export type AlertDialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;
export type AlertDialogBodyProps = React.HTMLAttributes<HTMLDivElement>;
export type AlertDialogFooterProps = React.HTMLAttributes<HTMLDivElement>;

export type AlertDialogActionProps =
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>;

export type AlertDialogCancelProps =
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>;
