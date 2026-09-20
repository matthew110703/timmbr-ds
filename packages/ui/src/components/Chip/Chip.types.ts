import type * as React from 'react';
import type { ChipVariants } from './Chip.styles';
import type { MotionProp } from '../../types/motion';

export interface ChipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    ChipVariants {
  /**
   * Leading icon, avatar, or visual graphic.
   */
  icon?: React.ReactNode;
  /**
   * If true, styles the chip as actively selected (e.g. In filter groups).
   */
  selected?: boolean;
  /**
   * If true, enables interactive click styles.
   */
  clickable?: boolean;
  /**
   * Callback fired when the remove button is clicked. If provided, renders an X button.
   */
  onRemove?: (e: React.MouseEvent) => void;
  /**
   * Motion transition control.
   */
  motion?: MotionProp;
}
