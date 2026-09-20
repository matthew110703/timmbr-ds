import type * as React from 'react';
import type * as ToastPrimitive from '@radix-ui/react-toast';
import type { ToastVariants } from './Toast.styles';
import type { MotionProp } from '../../types/motion';

export interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>,
    ToastVariants {
  /**
   * Motion transition control.
   */
  motion?: MotionProp;
  /**
   * 0-based index in a toast stack (0 = newest / front-most).
   */
  index?: number;
  /**
   * Total number of active toasts in the stack.
   */
  total?: number;
}

export interface ToastViewportProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport> {
  /**
   * Whether the viewport operates in stacked card-deck mode.
   */
  stacked?: boolean;
}

export interface ToastActionElement
  extends React.ReactElement<React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>> {}
