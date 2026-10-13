import type { FilterGroup, FilterPanelLabels, FilterPriceConfig } from '../FilterPanel/FilterPanel.types';

export interface FilterDrawerLabels extends FilterPanelLabels {
  /** Left-pane entry holding the yes/no toggles. */
  quickFilters: string;
  clearAll: string;
  close: string;
  /** Apply button, e.g. (n) => `Show ${n} results`; `null` while the count is unknown. */
  showResults: (total: number | null) => string;
}

export interface FilterDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** The staged (not yet applied) selection: the drawer edits a draft, the page applies it. */
  groups: FilterGroup[];
  onToggle: (key: string, value: string) => void;
  /** Staged price; changes arrive through `onPriceChange`, not Apply/Reset. */
  price?: Omit<FilterPriceConfig, 'onApply' | 'onReset'>;
  onPriceChange?: (min: number, max: number) => void;
  onClearAll: () => void;
  onApply: () => void;
  /** Results the staged selection would show (null while counting). */
  total: number | null;
  /** True while counts are being fetched for the staged selection. */
  loading?: boolean;
  labels?: Partial<FilterDrawerLabels>;
  searchThreshold?: number;
}
