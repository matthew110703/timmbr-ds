'use client';

import * as React from 'react';
import { motion, AnimatePresence } from '@timmbr/motion';
import { Search, X } from '@timmbr/icons';
import { cn } from '@timmbr/utils';
import { navActionVariants, searchPopoverCardVariants } from '../NavHeader.styles';
import type { NavSearchConfig } from '../NavHeader.types';
import { NavSearchPanel, useNavSearchCombobox } from './NavSearchPanel';

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

export const NavSearch: React.FC<NavSearchProps> = ({
  config,
  isOpen,
  onOpenChange,
  value,
  onChange,
  onSubmit,
  shouldAnimate = true,
  motionClass,
  linkComponent,
}) => {
  const searchConfig = typeof config === 'object' ? config : {};
  const {
    placeholder = 'Search for furniture, decor, and more...',
    popoverContent,
    ariaLabel = 'Search store products',
  } = searchConfig;

  const [showPopover, setShowPopover] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const combobox = useNavSearchCombobox({
    config,
    value,
    onChange,
    onSubmit,
    onClose: () => setShowPopover(false),
  });
  const popoverVisible = showPopover && (popoverContent ? true : combobox.hasContent);

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
    if (e.key === 'Escape') {
      e.preventDefault();
      setShowPopover(false);
      onOpenChange(false);
      return;
    }
    // Custom popover content has no rows of ours: Enter just submits the typed text.
    if (popoverContent) {
      if (e.key === 'Enter' && value.trim()) {
        e.preventDefault();
        onSubmit(value.trim());
        setShowPopover(false);
      }
      return;
    }
    // Arrow keys and Enter act on the panel's rows; reopen it first if it was closed.
    if (!showPopover && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) setShowPopover(true);
    combobox.inputProps.onKeyDown(e);
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
          <span className="font-bold text-caption tracking-[0.0926em] uppercase">SEARCH</span>
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
            <div className="relative flex items-center w-full h-10 bg-grey-50 border border-grey-300 rounded-full shadow-sm focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary overflow-hidden">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-grey-500 pointer-events-none shrink-0"
              />
              <input
                ref={inputRef}
                type="search"
                enterKeyHint="search"
                autoComplete="off"
                value={value}
                placeholder={placeholder}
                aria-label={ariaLabel}
                {...combobox.inputProps}
                aria-expanded={popoverVisible && !popoverContent}
                {...(popoverContent && { 'aria-controls': undefined, 'aria-activedescendant': undefined })}
                onChange={(e) => {
                  onChange(e.target.value);
                  setShowPopover(true);
                }}
                onFocus={() => setShowPopover(true)}
                onKeyDown={handleKeyDown}
                className="w-full h-full pl-10 pr-9 bg-transparent text-body-2 text-grey-950 placeholder:text-grey-400 border-none focus:outline-none [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
                data-slot="nav-search-input"
              />
              <button
                type="button"
                onClick={() => {
                  if (value) {
                    onChange('');
                    inputRef.current?.focus();
                  } else {
                    onOpenChange(false);
                  }
                }}
                aria-label={value ? 'Clear search' : 'Close search'}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-grey-400 hover:text-grey-700 rounded-full hover:bg-grey-100 transition-colors shrink-0"
              >
                <X size={15} />
              </button>
            </div>

            {/* Suggestions popover, anchored under the input */}
            <AnimatePresence initial={false}>
              {popoverVisible && (
                <motion.div
                  initial={shouldAnimate ? { opacity: 0, y: 4 } : false}
                  animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
                  exit={shouldAnimate ? { opacity: 0, y: 4 } : undefined}
                  transition={{ duration: 0.18, ease: [0.25, 1, 0.5, 1] }}
                  className={cn(searchPopoverCardVariants(), !shouldAnimate && 'transition-none', motionClass)}
                  data-slot="nav-search-popover"
                >
                  {popoverContent ?? <NavSearchPanel {...combobox.panelProps} linkComponent={linkComponent} />}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
