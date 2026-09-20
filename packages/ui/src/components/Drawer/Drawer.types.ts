import type * as React from 'react';
import type * as DialogPrimitive from '@radix-ui/react-dialog';
import type { DrawerContentVariants } from './Drawer.styles';
import type { MotionProp } from '../../types/motion';

export interface DrawerProps extends DialogPrimitive.DialogProps {}

export interface DrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    DrawerContentVariants {
  /**
   * Motion transition control.
   */
  motion?: MotionProp;
}

export interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface DrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
