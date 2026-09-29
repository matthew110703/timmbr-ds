import type * as React from 'react';
import type * as PopoverPrimitive from '@radix-ui/react-popover';
import type { MotionProp } from '../../types/motion';

export type PopoverProps = PopoverPrimitive.PopoverProps;

export interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  /**
   * Motion transition control.
   */
  motion?: MotionProp;
}
