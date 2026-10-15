'use client';

import * as React from 'react';
import { Search } from '@timmbr/icons';
import { cn } from '@timmbr/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../Accordion';
import { Checkbox } from '../Checkbox';
import { Input } from '../Input';
import { Button } from '../Button';
import { RangeSlider } from '../RangeSlider';
import { Swatch } from '../Swatch';
import { Switch } from '../Switch';
import {
  filterOptionCountVariants,
  filterOptionLabelVariants,
  filterOptionRowVariants,
  filterPanelBodyVariants,
  filterPanelHeaderVariants,
  filterPanelTitleVariants,
  filterPanelVariants,
  filterSectionContentVariants,
  filterSectionTriggerVariants,
  filterToggleListVariants,
} from './FilterPanel.styles';
import {
  PRICE_GROUP_KEY,
  type FilterGroup,
  type FilterOption,
  type FilterOptionListProps,
  type FilterPanelLabels,
  type FilterPanelProps,
  type FilterPriceConfig,
} from './FilterPanel.types';

export const DEFAULT_FILTER_LABELS: FilterPanelLabels = {
  title: 'Filters',
  price: 'Price range',
  apply: 'Apply',
  reset: 'Reset',
  clear: 'Clear',
  showLess: 'Show less',
  showMore: (hidden) => `Show more (${hidden})`,
  searchPlaceholder: (group) => `Search ${group.toLowerCase()}`,
  noMatches: 'No matches',
  thumbMin: 'Minimum price',
  thumbMax: 'Maximum price',
};

/** An option is unavailable when picking it would show nothing (and it isn't picked already). */
export const isOptionDisabled = (option: FilterOption) => option.disabled ?? (option.count === 0 && !option.selected);

const selectedCount = (group: FilterGroup) => group.options.filter((o) => o.selected).length;

function OptionLabel({ option, display }: { option: FilterOption; display: FilterGroup['display'] }) {
  return (
    <span className={filterOptionLabelVariants()}>
      {display === 'swatch' && option.swatch && <Swatch color={option.swatch} size="sm" />}
      <span className="truncate">{option.label}</span>
      {option.count !== undefined && <span className={filterOptionCountVariants()}>({option.count})</span>}
    </span>
  );
}

/**
 * The options of one group as checkboxes (with a colour dot for swatch groups) and counts.
 * Long groups show the first `limit` options plus every selected one behind "Show more", and
 * very long groups get a search box. Options that would show nothing are disabled, not hidden,
 * so the list doesn't jump as filters change.
 */
export function FilterOptionList({
  group,
  onToggle,
  limit = 5,
  searchThreshold = 15,
  labels: labelOverrides,
  className,
}: FilterOptionListProps) {
  const labels = { ...DEFAULT_FILTER_LABELS, ...labelOverrides };
  const [expanded, setExpanded] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const searchable = group.options.length > searchThreshold;
  const needle = query.trim().toLowerCase();

  // Unavailable options (nothing would match) go last, so the ones worth picking come first;
  // selected options keep their place even when their count drops to zero.
  const ordered = [
    ...group.options.filter((o) => !isOptionDisabled(o)),
    ...group.options.filter((o) => isOptionDisabled(o)),
  ];
  const matching = needle ? ordered.filter((o) => o.label.toLowerCase().includes(needle)) : ordered;
  const visible = expanded || needle ? matching : matching.filter((o, i) => i < limit || o.selected);
  const hidden = matching.length - visible.length;

  return (
    <div className={cn('flex flex-col gap-3 pb-4', className)} data-slot="filter-option-list">
      {searchable && (
        <Input
          size="sm"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={labels.searchPlaceholder(group.label)}
          aria-label={labels.searchPlaceholder(group.label)}
          leftAdornment={<Search className="size-4" />}
        />
      )}
      <ul className="flex flex-col gap-3">
        {visible.map((option) => {
          const disabled = isOptionDisabled(option);
          return (
            <li key={option.value} className={filterOptionRowVariants({ disabled })}>
              <Checkbox
                size="sm"
                checked={!!option.selected}
                disabled={disabled}
                onCheckedChange={() => onToggle(group.key, option.value)}
                label={<OptionLabel option={option} display={group.display} />}
              />
            </li>
          );
        })}
        {visible.length === 0 && <li className="text-body-3 text-grey-500">{labels.noMatches}</li>}
      </ul>
      {!needle && (hidden > 0 || expanded) && matching.length > limit && (
        <Button
          variant="link"
          size="sm"
          aria-expanded={expanded}
          onClick={() => setExpanded((e) => !e)}
        >
          {expanded ? labels.showLess : labels.showMore(hidden)}
        </Button>
      )}
    </div>
  );
}

/** Yes/no groups as switches: "Fast Delivery (12)". */
export function FilterToggleRow({
  group,
  onToggle,
}: {
  group: FilterGroup;
  onToggle: (key: string, value: string) => void;
}) {
  const option = group.options[0];
  if (!option) return null;
  const disabled = isOptionDisabled(option);
  return (
    <Switch
      size="sm"
      checked={!!option.selected}
      disabled={disabled}
      onCheckedChange={() => onToggle(group.key, option.value)}
      containerClassName={cn(disabled && 'opacity-50')}
      label={
        <span className={filterOptionLabelVariants()}>
          {group.label}
          {option.count !== undefined && <span className={filterOptionCountVariants()}>({option.count})</span>}
        </span>
      }
    />
  );
}

/** The price slider with Apply/Reset; the slider value is local until Apply. */
export function FilterPriceSlider({
  price,
  labels: labelOverrides,
  onValueChange,
  showActions = true,
}: {
  price: FilterPriceConfig;
  labels?: Partial<FilterPanelLabels>;
  /** Called while dragging (the drawer stages the value instead of using Apply). */
  onValueChange?: (min: number, max: number) => void;
  showActions?: boolean;
}) {
  const labels = { ...DEFAULT_FILTER_LABELS, ...labelOverrides };
  const applied: [number, number] = price.value ?? [price.min, price.max];
  const atBounds = (v: number[]) => v[0] <= price.min && v[1] >= price.max;
  // The dragged value belongs to the applied range it started from: when the range changes from
  // outside (URL, chips, clear all) the slider shows it again, with no effect needed.
  const appliedKey = `${applied[0]}-${applied[1]}-${price.min}-${price.max}-${price.resetKey ?? ''}`;
  const [local, setLocal] = React.useState({
    key: appliedKey,
    value: applied as number[],
  });
  const draft = local.key === appliedKey ? local.value : applied;
  const setDraft = (value: number[]) => setLocal({ key: appliedKey, value });

  return (
    <RangeSlider
      min={price.min}
      max={price.max}
      step={price.step}
      value={draft}
      formatValue={price.format}
      showActions={showActions}
      applyLabel={labels.apply}
      resetLabel={labels.reset}
      thumbLabels={[labels.thumbMin, labels.thumbMax]}
      resetDisabled={atBounds(applied) && atBounds(draft)}
      onValueChange={(values) => {
        setDraft(values);
        onValueChange?.(values[0], values[1]);
      }}
      onApply={(values) => price.onApply(values[0], values[1])}
      onReset={() => price.onReset()}
    />
  );
}

/**
 * Filter sidebar for a listing (Figma PLP): yes/no toggles first, then a price slider and
 * collapsible groups of checkbox or swatch options with result counts. Purely presentational:
 * selections come in through `groups`, changes go out through `onToggle` — the page decides
 * when to apply them (see the listing-state helpers in @timmbr/utils).
 */
export const FilterPanel = React.forwardRef<HTMLDivElement, FilterPanelProps>(
  (
    {
      groups,
      onToggle,
      onClearGroup,
      price,
      defaultOpen,
      optionLimit,
      searchThreshold,
      labels: labelOverrides,
      headerAction,
      className,
    },
    ref
  ) => {
    const labels = { ...DEFAULT_FILTER_LABELS, ...labelOverrides };
    const toggles = groups.filter((g) => g.display === 'toggle');
    const sections = groups.filter((g) => g.display !== 'toggle');
    const showPrice = !!price && price.max - price.min >= price.step && price.step > 0;
    // Only the first render decides what starts open; after that the shopper does.
    const [initialOpen] = React.useState(
      () => defaultOpen ?? [PRICE_GROUP_KEY, ...sections.slice(0, 3).map((g) => g.key)]
    );

    return (
      <div ref={ref} data-slot="filter-panel" className={cn(filterPanelVariants(), className)}>
        <div className={filterPanelHeaderVariants()}>
          <h2 className={filterPanelTitleVariants()}>{labels.title}</h2>
          {headerAction}
        </div>

        {/* Scrolls on its own (header pinned) when the panel is height-limited, e.g. a sticky
            sidebar capped to the viewport. No overscroll containment: at the end the page scrolls on,
            and an uncapped panel never traps the wheel. */}
        <div data-slot="filter-panel-body" className={filterPanelBodyVariants()}>
          {toggles.length > 0 && (
            <div className={filterToggleListVariants()}>
              {toggles.map((group) => (
                <FilterToggleRow key={group.key} group={group} onToggle={onToggle} />
              ))}
            </div>
          )}

          <Accordion type="multiple" defaultValue={initialOpen} className="border-t border-grey-200">
            {showPrice && price && (
              <AccordionItem value={PRICE_GROUP_KEY} className="border-grey-200">
                <AccordionTrigger className={filterSectionTriggerVariants()}>{labels.price}</AccordionTrigger>
                <AccordionContent className={filterSectionContentVariants()}>
                  <div className="pb-4">
                    <FilterPriceSlider price={price} labels={labels} />
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
            {sections.map((group) => {
              const count = selectedCount(group);
              return (
                <AccordionItem key={group.key} value={group.key} className="border-grey-200">
                  <AccordionTrigger className={filterSectionTriggerVariants()}>
                    <span className="flex items-center gap-2">
                      {group.label}
                      {count > 0 && <span className="text-primary">({count})</span>}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className={filterSectionContentVariants()}>
                    {count > 0 && onClearGroup && (
                      <Button
                        variant="link"
                        size="sm"
                        className="mb-3"
                        onClick={() => onClearGroup(group.key)}
                      >
                        {labels.clear}
                      </Button>
                    )}
                    <FilterOptionList
                      group={group}
                      onToggle={onToggle}
                      limit={optionLimit}
                      searchThreshold={searchThreshold}
                      labels={labels}
                    />
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    );
  }
);
FilterPanel.displayName = 'FilterPanel';
