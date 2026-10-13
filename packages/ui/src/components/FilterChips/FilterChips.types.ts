import type * as React from 'react';

export interface FilterChip {
  /** Unique per chip, e.g. "material:teak" or "price". */
  id: string;
  label: React.ReactNode;
}

export interface FilterChipsProps<T extends FilterChip = FilterChip> {
  chips: T[];
  onRemove: (chip: T) => void;
  /** Shown when more than one chip is applied. */
  onClearAll?: () => void;
  clearAllLabel?: string;
  /** Accessible name of a chip's remove button. */
  removeLabel?: (label: string) => string;
  className?: string;
}
