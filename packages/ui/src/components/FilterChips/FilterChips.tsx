'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';
import { Button } from '../Button';
import { Chip } from '../Chip';
import type { FilterChip, FilterChipsProps } from './FilterChips.types';

/**
 * The applied filters as removable chips, plus "Clear all". Wraps on large screens and scrolls
 * sideways on phones so it never takes more than one row there. Renders nothing when empty.
 */
export function FilterChips<T extends FilterChip = FilterChip>({
  chips,
  onRemove,
  onClearAll,
  clearAllLabel = 'Clear all',
  removeLabel = (label) => `Remove ${label}`,
  className,
}: FilterChipsProps<T>) {
  if (chips.length === 0) return null;
  return (
    <div
      data-slot="filter-chips"
      className={cn(
        'flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] sm:flex-wrap sm:overflow-visible',
        className
      )}
    >
      <ul className="flex shrink-0 items-center gap-2 sm:flex-wrap">
        {chips.map((chip) => (
          <li key={chip.id} className="shrink-0">
            <Chip color="primary" onRemove={() => onRemove(chip)} removeLabel={removeLabel(String(chip.label))}>
              {chip.label}
            </Chip>
          </li>
        ))}
      </ul>
      {onClearAll && chips.length > 1 && (
        <Button variant="link" size="sm" className="shrink-0" onClick={onClearAll}>
          {clearAllLabel}
        </Button>
      )}
    </div>
  );
}
