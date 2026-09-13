import type * as React from 'react';
import type { ButtonVariants } from './Button.styles';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants {
  /**
   * If true, the button will render its child element (e.g. Next.js <Link>) instead of a <button>.
   */
  asChild?: boolean;
  /**
   * Local toggle to enable/disable button motion transitions.
   */
  motion?: boolean;
}
