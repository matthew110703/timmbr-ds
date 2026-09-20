import type * as React from 'react';
import type * as TooltipPrimitive from '@radix-ui/react-tooltip';
import type { MotionProp } from '../../types/motion';

export interface TooltipProps extends TooltipPrimitive.TooltipProps {
  /**
   * Tooltip content text or JSX.
   */
  content?: React.ReactNode;
  /**
   * Placement side.
   */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /**
   * Motion transition control.
   */
  motion?: MotionProp;
  /**
   * Tooltip content container className.
   */
  contentClassName?: string;
  /**
   * Child trigger element.
   */
  children?: React.ReactNode;
}

export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
  /**
   * Motion transition control.
   */
  motion?: MotionProp;
}
