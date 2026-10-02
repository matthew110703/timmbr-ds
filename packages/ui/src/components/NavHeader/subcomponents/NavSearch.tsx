'use client';

import * as React from 'react';
import { motion, AnimatePresence } from '@timmbr/motion';
import { Search, X, TrendingUp } from '@timmbr/icons';
import { cn } from '@timmbr/utils';
import { useTimmbrConfig } from '../../../providers';
import { navActionVariants, searchPopoverCardVariants } from '../NavHeader.styles';
import type { NavSearchConfig, PopularSearchTag } from '../NavHeader.types';
import { resolveNavDestination, isCrossZoneNavigation } from '../NavHeader.helpers';

export interface NavSearchProps {
  config?: NavSearchConfig | boolean;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  value: string;
  onChange: (value: string) => void;
  onSubmit: (query: string) => void;
  shouldAnimate?: boolean;
  motionClass?: string;
  linkComponent?: React.ComponentType<any>;
}

const defaultPopularSearches: PopularSearchTag[] = [
  { id: '1', label: 'Centre Tables' },
  { id: '2', label: 'TV Units' },
  { id: '3', label: 'bed' },
  { id: '4', label: 'bedsheet' },
  { id: '5', label: 'mirror' },
  { id: '6', label: 'office chair' },
  { id: '7', label: 'shoe rack' },
  { id: '8', label: 'sofa cum bed' },
];

export const NavSearch: React.FC<NavSearchProps> = ({
  config,
  isOpen,
  onOpenChange,
  value,
  onChange,
  onSubmit,
  shouldAnimate = true,
  motionClass,
  linkComponent: CustomLink,
}) => {
  const globalConfig = useTimmbrConfig();
  const searchConfig = typeof config === 'object' ? config : {};
  const {
    placeholder = 'Search for furniture, decor, and more...',
    popoverContent,
    popularSearches = defaultPopularSearches,
    popularSearchesTitle = 'Popular Searches',
    onPopularSearchClick,
    ariaLabel = 'Search store products',
  } = searchConfig;

  const [showPopover, setShowPopover] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Focus input when opened
  React.useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setShowPopover(true);
    } else {
      setShowPopover(false);
    }
  }, [isOpen]);

  // Click outside listener
  React.useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowPopover(false);
        if (!value.trim()) {
          onOpenChange(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, value, onOpenChange]);

  const handleToggle = () => {
    const nextState = !isOpen;
    onOpenChange(nextState);
    if (nextState) {
      setShowPopover(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit(value);
      setShowPopover(false);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setShowPopover(false);
      onOpenChange(false);
    }
  };

  const handleTagClick = (tag: PopularSearchTag) => {
    onChange(tag.label);
    onPopularSearchClick?.(tag);
    tag.onClick?.(tag);
    onSubmit(tag.label);
    setShowPopover(false);
  };

  return (
    <div ref={containerRef} className="relative flex items-center" data-slot="nav-search-container">
      {/* Collapsed Search Trigger Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={handleToggle}
          aria-label="Open search bar"
          aria-expanded={isOpen}
          className={navActionVariants({ active: isOpen })}
          data-slot="nav-search-trigger"
        >
          <Search size={22} className="shrink-0 stroke-[1.8]" />
          <span className="font-sans font-bold text-[10px] tracking-[0.0926em] uppercase">SEARCH</span>
        </button>
      )}

      {/* Expanded Search Bar */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={shouldAnimate ? { width: 0, opacity: 0 } : false}
            animate={shouldAnimate ? { width: 350, opacity: 1 } : undefined}
            exit={shouldAnimate ? { width: 0, opacity: 0 } : undefined}
            transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
            className={cn('relative flex flex-col', !shouldAnimate && 'transition-none', motionClass)}
          >
            {/* Input pill with clean overflow clipping during width transition */}
            <div className="relative flex items-center w-full h-10 bg-white border border-grey-300 rounded-full shadow-sm focus-within:ring-2 focus-within:ring-[#C0643A]/30 focus-within:border-[#C0643A] overflow-hidden">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-grey-500 pointer-events-none shrink-0"
              />
              <input
                ref={inputRef}
                type="text"
                role="searchbox"
                autoComplete="off"
                value={value}
                placeholder={placeholder}
                aria-label={ariaLabel}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setShowPopover(true)}
                onKeyDown={handleKeyDown}
                className="w-full h-full pl-10 pr-9 bg-transparent text-sm text-[#1A1A1A] placeholder:text-grey-400 border-none focus:outline-none [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
                data-slot="nav-search-input"
              />
              <button
                type="button"
                onClick={() => {
                  if (value) {
                    onChange('');
                  } else {
                    onOpenChange(false);
                  }
                }}
                aria-label="Close search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-grey-400 hover:text-grey-700 rounded-full hover:bg-grey-100 transition-colors shrink-0"
              >
                <X size={15} />
              </button>
            </div>

            {/* Anchored Search Suggestions Popover - exactly matching search input width */}
            <AnimatePresence initial={false}>
              {showPopover && (
                <motion.div
                  initial={shouldAnimate ? { opacity: 0, y: 4 } : false}
                  animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
                  exit={shouldAnimate ? { opacity: 0, y: 4 } : undefined}
                  transition={{ duration: 0.18, ease: [0.25, 1, 0.5, 1] }}
                  className={cn(searchPopoverCardVariants(), !shouldAnimate && 'transition-none', motionClass)}
                  data-slot="nav-search-popover"
                >
                  {popoverContent ? (
                    popoverContent
                  ) : (
                    <div>
                      {popularSearchesTitle && (
                        <h4 className="font-sans font-bold text-sm tracking-wide text-[#E11D48] mb-3 uppercase flex items-center gap-1.5">
                          <span>{popularSearchesTitle}</span>
                        </h4>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {popularSearches.map((tag, idx) => {
                          const resolvedTagHref = resolveNavDestination(tag.href, tag.zone, globalConfig.zones?.zones);
                          const requiresCrossZone = isCrossZoneNavigation(tag.zone, globalConfig.zones?.currentZone);

                          const tagContent = (
                            <>
                              <TrendingUp size={13} className="text-grey-500 shrink-0" />
                              <span>{tag.label}</span>
                            </>
                          );

                          const tagClass =
                            'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-grey-200 bg-white hover:border-grey-400 hover:bg-grey-50 text-xs font-medium text-grey-800 transition-all cursor-pointer';

                          if (resolvedTagHref) {
                            if (CustomLink && !requiresCrossZone) {
                              return (
                                <CustomLink
                                  key={tag.id ?? idx}
                                  href={resolvedTagHref}
                                  className={tagClass}
                                  onClick={() => handleTagClick(tag)}
                                >
                                  {tagContent}
                                </CustomLink>
                              );
                            }
                            return (
                              <a
                                key={tag.id ?? idx}
                                href={resolvedTagHref}
                                data-cross-zone={requiresCrossZone ? 'true' : undefined}
                                className={tagClass}
                                onClick={() => handleTagClick(tag)}
                              >
                                {tagContent}
                              </a>
                            );
                          }

                          return (
                            <button
                              key={tag.id ?? idx}
                              type="button"
                              onClick={() => handleTagClick(tag)}
                              className={tagClass}
                            >
                              {tagContent}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
