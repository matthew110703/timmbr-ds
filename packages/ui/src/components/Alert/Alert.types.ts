import type * as React from 'react';
import type { AlertVariants } from './Alert.styles';
import type { MotionProp } from '../../types/motion';

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    AlertVariants {
  /**
   * Title text or heading node.
   */
  title?: React.ReactNode;
  /**
   * Custom leading icon. If omitted, an appropriate icon is rendered based on variant.
   */
  icon?: React.ReactNode;
  /**
   * If true, renders an accessible dismiss button.
   */
  dismissible?: boolean;
  /**
   * Callback fired when the dismiss button is clicked.
   */
  onClose?: () => void;
  /**
   * Motion transition control.
   */
  motion?: MotionProp;
}

export interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export interface AlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}
