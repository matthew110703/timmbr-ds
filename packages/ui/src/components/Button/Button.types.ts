import type * as React from 'react';
import type { ButtonVariants } from './Button.styles';
import type { MotionProp } from '../../types/motion';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants {
  /**
   * If true, the button will render its child element (e.g. Next.js <Link>) instead of a <button>.
   */
  asChild?: boolean;
  /**
   * Local toggle to enable/disable button motion transitions, or configure motion primitives.
   */
  motion?: MotionProp;
  /**
   * Leading icon element rendered before button children.
   */
  leftIcon?: React.ReactNode;
  /**
   * Trailing icon element rendered after button children.
   */
  rightIcon?: React.ReactNode;
  /**
   * Displays an animated loading spinner and disables interactive states.
   */
  loading?: boolean;
  /**
   * Optional loading text displayed alongside spinner.
   */
  loadingText?: string;
}
