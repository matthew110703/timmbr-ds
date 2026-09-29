import type * as React from 'react';
import type * as ToastPrimitive from '@radix-ui/react-toast';
import type { ToastVariants } from './Toast.styles';
import type { MotionProp } from '../../types/motion';

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface ToastActionConfig {
  label: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  altText?: string;
}

export interface ToastOptions {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info';
  duration?: number;
  position?: ToastPosition;
  dismissible?: boolean;
  action?: ToastActionConfig | React.ReactNode;
  motion?: MotionProp;
  onDismiss?: () => void;
  onOpenChange?: (open: boolean) => void;
}

export interface ToastItem extends ToastOptions {
  id: string;
  open: boolean;
}

export interface ToastGlobalConfig {
  position?: ToastPosition;
  duration?: number;
  maxVisible?: number;
  swipeDirection?: 'up' | 'down' | 'left' | 'right';
  stacked?: boolean;
}

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
  /**
   * Viewport position on screen.
   */
  position?: ToastPosition;
}

export type ToastActionElement =
  React.ReactElement<React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>>;

