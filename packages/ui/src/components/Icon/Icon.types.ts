import type * as React from 'react';
import type { IconVariants } from './Icon.styles';
import type { MotionProp } from '../../types/motion';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;

export interface IconProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onClick'>,
    IconVariants {
  /**
   * Component reference (e.g. Lucide icon component or custom SVG component).
   */
  icon?: React.ComponentType<any>;
  /**
   * External image or SVG asset URL.
   */
  src?: string;
  /**
   * Raw inline SVG content.
   */
  svg?: React.ReactNode;
  /**
   * Accessible text description for screen readers (mandatory if clickable without child text).
   */
  'aria-label'?: string;
  /**
   * If true, renders with interactive button semantics, hover states, and focus rings.
   */
  clickable?: boolean;
  /**
   * Motion transition control.
   */
  motion?: MotionProp;
  /**
   * Click handler for interactive icons.
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /**
   * If true, renders child element via Radix Slot.
   */
  asChild?: boolean;
}
