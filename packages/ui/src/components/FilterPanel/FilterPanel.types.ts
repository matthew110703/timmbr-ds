import type * as React from 'react';

/** How a group's options are shown. */
export type FilterGroupDisplay = 'checkbox' | 'swatch' | 'toggle';

export interface FilterOption {
  /** Value sent back in `onToggle` (e.g. a URL slug). */
  value: string;
  label: string;
  /** Matching results if this option were picked; shown as "(12)". */
  count?: number;
  selected?: boolean;
  /** Defaults to true when `count` is 0 and the option isn't selected. */
  disabled?: boolean;
  /** Colour for swatch groups. */
  swatch?: string | null;
}

export interface FilterGroup {
  key: string;
  label: string;
  display: FilterGroupDisplay;
  options: FilterOption[];
}

export interface FilterPriceConfig {
  /** Slider bounds and step. */
  min: number;
  max: number;
  step: number;
  /** The applied range (the slider starts here). */
  value?: [number, number];
  /** Shown on the readouts, e.g. (v) => `₹${v}`. */
  format?: (value: number) => string;
  onApply: (min: number, max: number) => void;
  onReset: () => void;
  /**
   * Changes whenever the slider should drop an un-applied drag and show `value` again, e.g.
   * the URL of the applied listing (so "Clear all" also resets the slider).
   */
  resetKey?: string;
}

export interface FilterPanelLabels {
  title: string;
  price: string;
  apply: string;
  reset: string;
  clear: string;
  showLess: string;
  showMore: (hidden: number) => string;
  searchPlaceholder: (groupLabel: string) => string;
  noMatches: string;
  thumbMin: string;
  thumbMax: string;
}

export interface FilterOptionListProps {
  group: FilterGroup;
  onToggle: (key: string, value: string) => void;
  /** Options shown before "Show more" (selected ones always show). @default 5 */
  limit?: number;
  /** Groups with more options than this get a search box. @default 15 */
  searchThreshold?: number;
  labels?: Partial<FilterPanelLabels>;
  className?: string;
}

export interface FilterPanelProps {
  groups: FilterGroup[];
  onToggle: (key: string, value: string) => void;
  /** Clears one group; adds a "Clear" link to groups with a selection. */
  onClearGroup?: (key: string) => void;
  /** Price slider, shown first when the range is wider than one step. */
  price?: FilterPriceConfig;
  /** Groups open at first ("price" is the slider). Default: price and the first three groups. */
  defaultOpen?: string[];
  optionLimit?: number;
  searchThreshold?: number;
  labels?: Partial<FilterPanelLabels>;
  /** Right side of the header, e.g. a "Clear all" button. */
  headerAction?: React.ReactNode;
  className?: string;
}

/** Group key used by the panel and drawer for the price slider. */
export const PRICE_GROUP_KEY = 'price';
