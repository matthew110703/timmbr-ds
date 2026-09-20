import type * as React from 'react';
import type { DividerVariants } from './Divider.styles';

export interface DividerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    DividerVariants {
  /**
   * Orientation of the divider.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Line border pattern.
   * @default 'solid'
   */
  variant?: 'solid' | 'dashed' | 'dotted';
  /**
   * Line thickness.
   * @default 'default'
   */
  thickness?: 'thin' | 'default' | 'thick';
  /**
   * Semantic color theme.
   * @default 'default'
   */
  color?: 'default' | 'primary' | 'muted' | 'brand';
  /**
   * Positioning of label text relative to divider line.
   * @default 'center'
   */
  labelPosition?: 'start' | 'center' | 'end';
  /**
   * Optional custom decorative icon node.
   */
  icon?: React.ReactNode;
  /**
   * If true, screen readers will ignore the element as purely decorative.
   * @default true
   */
  decorative?: boolean;
  /**
   * Optional centered label content (e.g. "OR" or category).
   */
  label?: React.ReactNode;
  /**
   * If true, renders child element via Radix Slot.
   */
  asChild?: boolean;
}
