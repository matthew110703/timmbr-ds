import type * as React from 'react';
import type * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import type { MotionProp } from '../../types/motion';

export interface DropdownMenuProps extends DropdownMenuPrimitive.DropdownMenuProps {}

export interface DropdownMenuContentProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> {
  /**
   * Motion transition control.
   */
  motion?: MotionProp;
}

export interface DropdownMenuItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> {
  inset?: boolean;
}
