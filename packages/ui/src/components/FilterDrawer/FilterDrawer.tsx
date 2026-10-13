'use client';

import * as React from 'react';
import { X } from '@timmbr/icons';
import { cn } from '@timmbr/utils';
import { Button } from '../Button';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerTitle } from '../Drawer';
import {
  DEFAULT_FILTER_LABELS,
  FilterOptionList,
  FilterPriceSlider,
  FilterToggleRow,
} from '../FilterPanel/FilterPanel';
import { PRICE_GROUP_KEY } from '../FilterPanel/FilterPanel.types';
import { Spinner } from '../Spinner';
import {
  filterDrawerBadgeVariants,
  filterDrawerContentVariants,
  filterDrawerFooterVariants,
  filterDrawerHeaderVariants,
  filterDrawerNavItemVariants,
  filterDrawerNavVariants,
  filterDrawerPanesVariants,
} from './FilterDrawer.styles';
import type { FilterDrawerLabels, FilterDrawerProps } from './FilterDrawer.types';

const QUICK_GROUP_KEY = '__quick';

export const DEFAULT_FILTER_DRAWER_LABELS: FilterDrawerLabels = {
  ...DEFAULT_FILTER_LABELS,
  quickFilters: 'Quick filters',
  clearAll: 'Clear all',
  close: 'Close filters',
  showResults: (total) => (total === null ? 'Show results' : `Show ${total} result${total === 1 ? '' : 's'}`),
};

/**
 * Full-screen filter panel for phones: groups on the left (with how many options are picked),
 * the active group's options on the right, and a sticky footer with "Clear all" and
 * "Show N results". It edits a staged selection — nothing applies until the shopper taps Show,
 * so the page behind doesn't reload on every tap; the page refreshes `total` as the draft
 * changes and applies everything at once.
 */
export function FilterDrawer({
  open,
  onOpenChange,
  groups,
  onToggle,
  price,
  onPriceChange,
  onClearAll,
  onApply,
  total,
  loading = false,
  labels: labelOverrides,
  searchThreshold,
}: FilterDrawerProps) {
  const labels = { ...DEFAULT_FILTER_DRAWER_LABELS, ...labelOverrides };
  const toggles = groups.filter((g) => g.display === 'toggle');
  const sections = groups.filter((g) => g.display !== 'toggle');
  const showPrice = !!price && price.step > 0 && price.max - price.min >= price.step;
  // The price counts as picked only when it narrows the bounds.
  const priceNarrowed = !!price?.value && (price.value[0] > price.min || price.value[1] < price.max);

  const nav = [
    ...(toggles.length
      ? [
          {
            key: QUICK_GROUP_KEY,
            label: labels.quickFilters,
            picked: toggles.filter((g) => g.options[0]?.selected).length,
          },
        ]
      : []),
    ...(showPrice ? [{ key: PRICE_GROUP_KEY, label: labels.price, picked: priceNarrowed ? 1 : 0 }] : []),
    ...sections.map((g) => ({
      key: g.key,
      label: g.label,
      picked: g.options.filter((o) => o.selected).length,
    })),
  ];

  const [active, setActive] = React.useState<string | undefined>(nav[0]?.key);
  // Keep a valid tab when groups appear or disappear as the draft changes.
  const activeKey = nav.some((n) => n.key === active) ? active : nav[0]?.key;
  const activeGroup = sections.find((g) => g.key === activeKey);
  const anyPicked = nav.some((n) => n.picked > 0);

  const baseId = React.useId();
  const tabId = (key: string) => `${baseId}-tab-${key}`;
  const panelId = `${baseId}-panel`;
  const tabRefs = React.useRef(new Map<string, HTMLButtonElement>());

  // Vertical tabs: one tab stop; Up/Down (wrapping), Home/End move and select.
  const onTabKeyDown = (event: React.KeyboardEvent) => {
    const current = nav.findIndex((n) => n.key === activeKey);
    let next: number | null = null;
    if (event.key === 'ArrowDown') next = (current + 1) % nav.length;
    else if (event.key === 'ArrowUp') next = (current - 1 + nav.length) % nav.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = nav.length - 1;
    if (next === null || !nav[next]) return;
    event.preventDefault();
    setActive(nav[next].key);
    tabRefs.current.get(nav[next].key)?.focus();
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent side="bottom" size="full" showClose={false}>
        <div className={filterDrawerHeaderVariants()}>
          <DrawerTitle className="text-h6">{labels.title}</DrawerTitle>
          <DrawerDescription className="sr-only">{labels.showResults(total)}</DrawerDescription>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon-sm" aria-label={labels.close}>
              <X className="size-5" />
            </Button>
          </DrawerClose>
        </div>

        <div className={filterDrawerPanesVariants()}>
          <nav className={filterDrawerNavVariants()} aria-label={labels.title}>
            <ul role="tablist" aria-orientation="vertical">
              {nav.map((item) => (
                <li key={item.key} role="presentation">
                  <button
                    ref={(node) => {
                      if (node) tabRefs.current.set(item.key, node);
                      else tabRefs.current.delete(item.key);
                    }}
                    type="button"
                    role="tab"
                    id={tabId(item.key)}
                    aria-selected={item.key === activeKey}
                    aria-controls={panelId}
                    tabIndex={item.key === activeKey ? 0 : -1}
                    className={filterDrawerNavItemVariants({ active: item.key === activeKey })}
                    onClick={() => setActive(item.key)}
                    onKeyDown={onTabKeyDown}
                  >
                    <span className="min-w-0 break-words">{item.label}</span>
                    {item.picked > 0 && <span className={filterDrawerBadgeVariants()}>{item.picked}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div
            id={panelId}
            role="tabpanel"
            aria-labelledby={activeKey ? tabId(activeKey) : undefined}
            className={filterDrawerContentVariants()}
          >
            {activeKey === QUICK_GROUP_KEY && (
              <div className="flex flex-col gap-5">
                {toggles.map((group) => (
                  <FilterToggleRow key={group.key} group={group} onToggle={onToggle} />
                ))}
              </div>
            )}
            {activeKey === PRICE_GROUP_KEY && price && (
              <div className="pt-2">
                <FilterPriceSlider
                  price={{ ...price, onApply: () => undefined, onReset: () => undefined }}
                  labels={labels}
                  showActions={false}
                  onValueChange={(min, max) => onPriceChange?.(min, max)}
                />
              </div>
            )}
            {activeGroup && (
              <FilterOptionList
                key={activeGroup.key}
                group={activeGroup}
                onToggle={onToggle}
                limit={Number.POSITIVE_INFINITY}
                searchThreshold={searchThreshold}
                labels={labels}
              />
            )}
          </div>
        </div>

        <div className={filterDrawerFooterVariants()}>
          <Button variant="outline" className="flex-1" onClick={onClearAll} disabled={!anyPicked}>
            {labels.clearAll}
          </Button>
          <Button
            variant="primary"
            className={cn('flex-[2]')}
            onClick={onApply}
            disabled={total === 0}
            aria-live="polite"
          >
            {loading && <Spinner size="sm" className="mr-2" aria-hidden="true" />}
            {labels.showResults(total)}
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
