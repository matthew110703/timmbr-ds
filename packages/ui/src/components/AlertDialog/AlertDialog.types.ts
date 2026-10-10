import type * as React from 'react';
import type * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import type { MotionProp } from '../../types/motion';
import type { ButtonVariants } from '../Button/Button.styles';

export type AlertDialogProps = AlertDialogPrimitive.AlertDialogProps;

export interface AlertDialogContentProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> {
  /** Width: sm (28rem), md (32rem, default), lg (42rem). */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Motion transition control.
   */
  motion?: MotionProp;
}

export type AlertDialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;
export type AlertDialogBodyProps = React.HTMLAttributes<HTMLDivElement>;
export type AlertDialogFooterProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Button look of the footer actions. Ignored with `asChild` (the child, e.g.
 * a `Button`, brings its own styles).
 */
export interface AlertDialogButtonStyleProps {
  variant?: ButtonVariants['variant'];
  size?: ButtonVariants['size'];
}

export interface AlertDialogActionProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>,
    AlertDialogButtonStyleProps {}

export interface AlertDialogCancelProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>,
    AlertDialogButtonStyleProps {}

export interface AlertDialogMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tint of the icon circle. */
  tone?: 'default' | 'destructive' | 'warning';
}
