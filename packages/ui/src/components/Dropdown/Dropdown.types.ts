import type * as React from 'react';
import type * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import type { MotionProp } from '../../types/motion';

export type DropdownMenuProps = DropdownMenuPrimitive.DropdownMenuProps;

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
  /** Leading icon (also placed inside an `asChild` link). */
  icon?: React.ReactNode;
  /** Destructive action (e.g. Log out, Delete): red text and highlight. */
  destructive?: boolean;
}
