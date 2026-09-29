import type * as React from 'react';
import type * as DialogPrimitive from '@radix-ui/react-dialog';
import type { MotionProp } from '../../types/motion';

export type DialogProps = DialogPrimitive.DialogProps;

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  /**
   * Motion transition control.
   */
  motion?: MotionProp;
}

export type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;
export type DialogBodyProps = React.HTMLAttributes<HTMLDivElement>;
export type DialogFooterProps = React.HTMLAttributes<HTMLDivElement>;
