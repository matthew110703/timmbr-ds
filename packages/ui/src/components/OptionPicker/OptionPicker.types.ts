import type * as React from 'react';

/**
 * - `available`: can be picked and bought;
 * - `out-of-stock`: exists but sold out — still selectable (shown struck through), so the shopper
 *   sees its price and can pick another option;
 * - `unavailable`: this combination doesn't exist — disabled.
 */
export type OptionPickerState = 'available' | 'out-of-stock' | 'unavailable';

export interface OptionPickerOption {
  value: string;
  label: string;
  /** Swatch colour (display `swatch`); options without one fall back to a pill. */
  swatchHex?: string | null;
  /** Photo of the option (display `image`), e.g. the product in that fabric. */
  imageUrl?: string | null;
  state?: OptionPickerState;
}

export interface OptionPickerLabels {
  /** Suffix after the selected label when it's sold out. Defaults to "Out of stock". */
  outOfStock?: string;
  /** Shown in the dropdown for combinations that don't exist. Defaults to "Unavailable". */
  unavailable?: string;
}

export interface OptionPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Group name, shown as "Finish: Walnut". */
  label: string;
  options: OptionPickerOption[];
  value?: string;
  onChange: (value: string) => void;
  /**
   * `swatch`: colour dots; `image`: photo tiles; `pill`: text chips (a colour dot inside when the
   * option has one). Options missing their swatch colour or image fall back to a pill.
   */
  display?: 'swatch' | 'image' | 'pill';
  /** More options than this render as a dropdown. Defaults to 8. */
  maxVisible?: number;
  labels?: OptionPickerLabels;
}
