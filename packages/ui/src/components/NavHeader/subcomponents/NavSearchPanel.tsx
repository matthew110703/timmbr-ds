'use client';

import * as React from 'react';
import { ArrowRight, History, Search, TrendingUp, X } from '@timmbr/icons';
import { cn } from '@timmbr/utils';
import { useTimmbrConfig } from '../../../providers';
import { resolveNavDestination, isCrossZoneNavigation } from '../NavHeader.helpers';
import {
  searchPanelOptionVariants,
  searchPanelSectionTitleVariants,
  searchPanelTextButtonVariants,
} from '../NavHeader.styles';
import type { NavSearchConfig, NavSearchResult, PopularSearchTag } from '../NavHeader.types';

const DEFAULT_MIN_QUERY_LENGTH = 2;

type SearchOption =
  | { kind: 'recent'; id: string; query: string }
  | { kind: 'result'; id: string; result: NavSearchResult }
  | { kind: 'viewAll'; id: string };

export interface UseNavSearchComboboxOptions {
  config?: NavSearchConfig | boolean;
  value: string;
  onChange: (value: string) => void;
  onSubmit: (query: string) => void;
  /** Close the panel (and whatever hosts it) after a pick. */
  onClose: () => void;
}

export interface NavSearchCombobox {
  /** The panel has something to show. */
  hasContent: boolean;
  /** Props for the search <input>: combobox role, ARIA wiring and keyboard handling. */
  inputProps: {
    role: 'combobox';
    'aria-expanded': boolean;
    'aria-controls': string;
    'aria-autocomplete': 'list';
    'aria-activedescendant': string | undefined;
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  };
  /** Props for <NavSearchPanel>. */
  panelProps: NavSearchPanelProps;
}

/**
 * Shared search behaviour for the desktop popover and the mobile drawer: which rows show
 * (recent searches while the input is empty, suggestions once the query is long enough), the
 * active row, and the keyboard (arrows move, Enter picks or submits, Delete removes a recent
 * search). Focus stays in the input; the active row is announced via aria-activedescendant.
 */
export function useNavSearchCombobox({
  config,
  value,
  onChange,
  onSubmit,
  onClose,
}: UseNavSearchComboboxOptions): NavSearchCombobox {
  const searchConfig = typeof config === 'object' ? config : {};
  const { recentSearches = [], results, popularSearches = [], onRecentSearchRemove } = searchConfig;
  const listId = React.useId();

  const typed = value.trim();
  const minLength = results?.minQueryLength ?? DEFAULT_MIN_QUERY_LENGTH;
  const mode: 'idle' | 'results' | 'none' = typed.length < minLength ? 'idle' : results ? 'results' : 'none';

  const options = React.useMemo<SearchOption[]>(() => {
    if (mode === 'idle') {
      return recentSearches.map((query, i) => ({ kind: 'recent', id: `${listId}-recent-${i}`, query }));
    }
    if (mode === 'results' && results) {
      return [
        ...results.items.map((result, i): SearchOption => ({ kind: 'result', id: `${listId}-result-${i}`, result })),
        { kind: 'viewAll', id: `${listId}-all` },
      ];
    }
    return [];
  }, [mode, recentSearches, results, listId]);

  // The active row resets whenever the text changes.
  const [active, setActive] = React.useState<{ value: string; index: number }>({ value, index: -1 });
  const activeIndex = active.value === value && active.index < options.length ? active.index : -1;
  const setActiveIndex = (index: number) => setActive({ value, index });
  const activeOption = activeIndex >= 0 ? options[activeIndex] : undefined;

  const hasContent =
    mode === 'results' || (mode === 'idle' && (recentSearches.length > 0 || popularSearches.length > 0));

  const pickRecent = (query: string) => {
    onChange(query);
    onSubmit(query);
    onClose();
  };
  const submitTyped = () => {
    if (!typed) return;
    onSubmit(typed);
    onClose();
  };
  const pickResult = (result: NavSearchResult) => {
    searchConfig.onResultSelect?.(result);
    onClose();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const count = options.length;
    switch (event.key) {
      case 'ArrowDown':
        if (!count) return;
        event.preventDefault();
        setActiveIndex((activeIndex + 1) % count);
        return;
      case 'ArrowUp':
        if (!count) return;
        event.preventDefault();
        setActiveIndex(activeIndex <= 0 ? count - 1 : activeIndex - 1);
        return;
      case 'Enter':
        event.preventDefault();
        if (!activeOption) return submitTyped();
        if (activeOption.kind === 'recent') return pickRecent(activeOption.query);
        if (activeOption.kind === 'viewAll') return submitTyped();
        // A result is a link: click it so the router (or the browser) navigates.
        document.getElementById(activeOption.id)?.click();
        return;
      case 'Delete':
        if (activeOption?.kind === 'recent' && onRecentSearchRemove) {
          event.preventDefault();
          onRecentSearchRemove(activeOption.query);
        }
        return;
    }
  };

  return {
    hasContent,
    inputProps: {
      role: 'combobox',
      'aria-expanded': hasContent,
      'aria-controls': listId,
      'aria-autocomplete': 'list',
      'aria-activedescendant': activeOption?.id,
      onKeyDown,
    },
    panelProps: {
      config,
      listId,
      mode,
      query: typed,
      options,
      activeId: activeOption?.id,
      onHover: (id) => setActiveIndex(options.findIndex((option) => option.id === id)),
      onPickRecent: pickRecent,
      onPickResult: pickResult,
      onViewAll: submitTyped,
      onPopularPick: (tag) => {
        onChange(tag.label);
        searchConfig.onPopularSearchClick?.(tag);
        tag.onClick?.(tag);
        onSubmit(tag.label);
        onClose();
      },
    },
  };
}

export interface NavSearchPanelProps {
  config?: NavSearchConfig | boolean;
  listId: string;
  mode: 'idle' | 'results' | 'none';
  query: string;
  options: SearchOption[];
  activeId?: string;
  onHover: (id: string) => void;
  onPickRecent: (query: string) => void;
  onPickResult: (result: NavSearchResult) => void;
  onViewAll: () => void;
  onPopularPick: (tag: PopularSearchTag) => void;
  linkComponent?: React.ComponentType<any>;
  className?: string;
}

/** The rows under the search input: recent searches, popular chips, or suggestions. */
export const NavSearchPanel: React.FC<NavSearchPanelProps> = ({
  config,
  listId,
  mode,
  query,
  options,
  activeId,
  onHover,
  onPickRecent,
  onPickResult,
  onViewAll,
  onPopularPick,
  linkComponent: CustomLink,
  className,
}) => {
  const globalConfig = useTimmbrConfig();
  const searchConfig = typeof config === 'object' ? config : {};
  const {
    recentSearchesTitle = 'Recent searches',
    clearRecentSearchesLabel = 'Clear',
    removeRecentSearchLabel = (q: string) => `Remove "${q}" from recent searches`,
    onRecentSearchRemove,
    onClearRecentSearches,
    popularSearches = [],
    popularSearchesTitle = 'Popular Searches',
    results,
  } = searchConfig;

  const recentOptions = options.filter((o): o is Extract<SearchOption, { kind: 'recent' }> => o.kind === 'recent');
  const resultOptions = options.filter((o): o is Extract<SearchOption, { kind: 'result' }> => o.kind === 'result');
  const viewAll = options.find((o) => o.kind === 'viewAll');
  const recentTitleId = `${listId}-recent-title`;
  const resultsTitleId = `${listId}-results-title`;

  const renderResultLink = (option: Extract<SearchOption, { kind: 'result' }>) => {
    const { result } = option;
    const props = {
      id: option.id,
      href: result.href,
      role: 'option',
      'aria-selected': activeId === option.id,
      tabIndex: -1,
      onMouseEnter: () => onHover(option.id),
      onClick: () => onPickResult(result),
      className: searchPanelOptionVariants({ active: activeId === option.id }),
      'data-slot': 'nav-search-result',
    } as const;
    const content = (
      <>
        <span className="size-12 shrink-0 overflow-hidden rounded-md bg-grey-100">
          {result.imageUrl ? (
            <img
              src={result.imageUrl}
              alt={result.imageAlt ?? ''}
              width={48}
              height={48}
              loading="lazy"
              decoding="async"
              className="size-full object-cover"
            />
          ) : null}
        </span>
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-body-2 font-medium text-grey-950">{result.title}</span>
          {result.subtitle ? <span className="truncate text-body-3 text-grey-500">{result.subtitle}</span> : null}
        </span>
        {result.price ? <span className="shrink-0 text-body-2 font-semibold text-grey-950">{result.price}</span> : null}
      </>
    );
    if (CustomLink && !result.crossZone) {
      return (
        <CustomLink key={option.id} {...props}>
          {content}
        </CustomLink>
      );
    }
    return (
      <a key={option.id} {...props} data-cross-zone={result.crossZone ? 'true' : undefined}>
        {content}
      </a>
    );
  };

  // Only options live inside the listbox (the input's aria-controls target); titles, buttons,
  // chips and status text sit beside it. One listbox shows at a time (recent or results).
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {mode === 'idle' && recentOptions.length > 0 && (
        <div data-slot="nav-search-recent">
          <div className="mb-1 flex items-center justify-between gap-2">
            <span id={recentTitleId} className={searchPanelSectionTitleVariants()}>
              {recentSearchesTitle}
            </span>
            {onClearRecentSearches && (
              <button type="button" onClick={onClearRecentSearches} className={searchPanelTextButtonVariants()}>
                {clearRecentSearchesLabel}
              </button>
            )}
          </div>
          <div id={listId} role="listbox" aria-labelledby={recentTitleId}>
            {recentOptions.map((option) => (
              <div key={option.id} role="presentation" className="group/recent relative flex items-center">
                <div
                  id={option.id}
                  role="option"
                  aria-selected={activeId === option.id}
                  onMouseEnter={() => onHover(option.id)}
                  onClick={() => onPickRecent(option.query)}
                  className={cn(searchPanelOptionVariants({ active: activeId === option.id }), 'pr-10')}
                  data-slot="nav-search-recent-item"
                >
                  <History size={16} className="shrink-0 text-grey-500" aria-hidden />
                  <span className="truncate text-body-2 text-grey-800">{option.query}</span>
                </div>
                {onRecentSearchRemove && (
                  // Pointer shortcut only: keyboard and screen-reader users remove with Delete on
                  // the active row, so it stays out of the listbox's accessibility tree.
                  <button
                    type="button"
                    tabIndex={-1}
                    aria-hidden="true"
                    title={removeRecentSearchLabel(option.query)}
                    aria-label={removeRecentSearchLabel(option.query)}
                    onClick={() => onRecentSearchRemove(option.query)}
                    className="absolute right-1.5 rounded-full p-1.5 text-grey-400 transition-colors hover:bg-grey-100 hover:text-grey-700"
                  >
                    <X size={14} aria-hidden />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {mode === 'idle' && popularSearches.length > 0 && (
        <div role="group" aria-label={popularSearchesTitle} data-slot="nav-search-popular">
          <span className={cn(searchPanelSectionTitleVariants(), 'mb-2 block')}>{popularSearchesTitle}</span>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((tag, idx) => {
              const href = resolveNavDestination(tag.href, tag.zone, globalConfig.zones?.zones);
              const crossZone = isCrossZoneNavigation(tag.zone, globalConfig.zones?.currentZone);
              const tagClass =
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-grey-200 bg-grey-50 hover:border-grey-400 text-body-3 font-medium text-grey-800 transition-all cursor-pointer';
              const content = (
                <>
                  <TrendingUp size={13} className="text-grey-500 shrink-0" aria-hidden />
                  <span>{tag.label}</span>
                </>
              );
              if (href && CustomLink && !crossZone) {
                return (
                  <CustomLink key={tag.id ?? idx} href={href} className={tagClass} onClick={() => onPopularPick(tag)}>
                    {content}
                  </CustomLink>
                );
              }
              if (href) {
                return (
                  <a
                    key={tag.id ?? idx}
                    href={href}
                    data-cross-zone={crossZone ? 'true' : undefined}
                    className={tagClass}
                    onClick={() => onPopularPick(tag)}
                  >
                    {content}
                  </a>
                );
              }
              return (
                <button key={tag.id ?? idx} type="button" className={tagClass} onClick={() => onPopularPick(tag)}>
                  {content}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {mode === 'results' && results && (
        <div data-slot="nav-search-results">
          <span id={resultsTitleId} className={cn(searchPanelSectionTitleVariants(), 'mb-1 block')}>
            {results.title ?? 'Products'}
          </span>
          {results.loading && resultOptions.length === 0 && (
            <div aria-hidden className="flex flex-col" data-slot="nav-search-results-loading">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-center gap-3 px-2 py-2">
                  <span className="size-12 shrink-0 animate-pulse rounded-md bg-grey-100" />
                  <span className="flex flex-1 flex-col gap-1.5">
                    <span className="h-3 w-3/4 animate-pulse rounded bg-grey-100" />
                    <span className="h-3 w-1/3 animate-pulse rounded bg-grey-100" />
                  </span>
                </div>
              ))}
            </div>
          )}
          {!results.loading && resultOptions.length === 0 && (
            <p className="px-2 py-2 text-body-2 text-grey-500" role="status">
              {results.emptyLabel ?? 'No products match'}
            </p>
          )}
          <div id={listId} role="listbox" aria-labelledby={resultsTitleId} aria-busy={results.loading || undefined}>
            {resultOptions.map(renderResultLink)}
            {viewAll && (
              <div
                id={viewAll.id}
                role="option"
                aria-selected={activeId === viewAll.id}
                onMouseEnter={() => onHover(viewAll.id)}
                onClick={onViewAll}
                className={cn(
                  searchPanelOptionVariants({ active: activeId === viewAll.id }),
                  'mt-1 border-t border-grey-100 pt-3 text-body-2 font-semibold text-primary'
                )}
                data-slot="nav-search-view-all"
              >
                <Search size={16} className="shrink-0" aria-hidden />
                <span className="min-w-0 flex-1 truncate">
                  {results.viewAllLabel ? results.viewAllLabel(query) : `See all results for "${query}"`}
                </span>
                <ArrowRight size={16} className="shrink-0" aria-hidden />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
