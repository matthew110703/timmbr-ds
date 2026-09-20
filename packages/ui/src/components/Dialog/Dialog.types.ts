import type * as React from 'react';
import type * as DialogPrimitive from '@radix-ui/react-dialog';
import type { MotionProp } from '../../types/motion';

export interface DialogProps extends DialogPrimitive.DialogProps {}

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  /**
   * Motion transition control.
   */
  motion?: MotionProp;
}

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
