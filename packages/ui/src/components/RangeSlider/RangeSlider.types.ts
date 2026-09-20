import type * as React from 'react';
import type * as SliderPrimitive from '@radix-ui/react-slider';
import type { RangeSliderVariants } from './RangeSlider.styles';

export interface RangeSliderProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
      'value' | 'defaultValue' | 'onValueChange' | 'onValueCommit'
    >,
    RangeSliderVariants {
  /**
   * Controlled value tuple [min, max] or single value [val].
   */
  value?: number[];
  /**
   * Default uncontrolled value tuple [min, max].
   */
  defaultValue?: number[];
  /**
   * Minimum allowable value. Defaults to 0.
   */
  min?: number;
  /**
   * Maximum allowable value. Defaults to 100.
   */
  max?: number;
  /**
   * Stepping interval. Defaults to 1.
   */
  step?: number;
  /**
   * Optional field label above the slider (e.g. "Price Range").
   */
  label?: string;
  /**
   * Formatter function for displaying values in the readout header.
   */
  formatValue?: (value: number) => string;
  /**
   * Whether to display value readouts above the slider track.
   * Defaults to true.
   */
  showReadouts?: boolean;
  /**
   * Whether to display the Apply and Reset action buttons below the track.
   * Defaults to false.
   */
  showActions?: boolean;
  /**
   * Label for the apply button. Defaults to 'Apply'.
   */
  applyLabel?: string;
  /**
   * Label for the reset button. Defaults to 'Reset'.
   */
  resetLabel?: string;
  /**
   * Callback fired when value changes during slide.
   */
  onValueChange?: (values: number[]) => void;
  /**
   * Callback fired when user releases slide thumb.
   */
  onValueCommit?: (values: number[]) => void;
  /**
   * Callback fired when the Apply button is clicked.
   */
  onApply?: (values: number[]) => void;
  /**
   * Callback fired when the Reset button is clicked.
   */
  onReset?: () => void;
}
