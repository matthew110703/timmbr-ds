'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from '@timmbr/motion';
import { ArrowLeft, Search, X } from '@timmbr/icons';
import { cn } from '@timmbr/utils';
import { mobileSearchDrawerVariants } from '../NavHeader.styles';
import type { NavSearchConfig } from '../NavHeader.types';

export interface NavMobileSearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  config?: NavSearchConfig | boolean;
  shouldAnimate?: boolean;
  motionClass?: string;
  linkComponent?: React.ComponentType<any>;
}

export const NavMobileSearchDrawer: React.FC<NavMobileSearchDrawerProps> = ({
  isOpen,
  onClose,
  value,
  onChange,
  onSubmit,
  config = {},
  shouldAnimate = true,
  motionClass,
}) => {
  const [mounted, setMounted] = React.useState(false);
  const searchConfig = typeof config === 'object' ? config : {};
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when drawer is open
  React.useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Auto focus input when drawer opens
  React.useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle escape key
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value);
      onClose();
    }
  };

  const handlePopularSearchClick = (tagLabel: string) => {
    onChange(tagLabel);
    onSubmit(tagLabel);
    onClose();
  };

  const drawerContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Search drawer"
          initial={shouldAnimate ? { opacity: 0, y: '-8px' } : false}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
          exit={shouldAnimate ? { opacity: 0, y: '-8px' } : undefined}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={cn(mobileSearchDrawerVariants(), motionClass)}
          data-slot="nav-mobile-search-drawer"
        >
          {/* Top Search Bar with Back Button */}
          <div className="w-full bg-[var(--color-bg-2,#F7F1E6)] border-b border-[#E7DFD3] px-3 py-3 flex items-center gap-3 shrink-0 shadow-xs">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search and go back"
              className="w-10 h-10 rounded-full flex items-center justify-center text-grey-800 hover:text-[#C0643A] hover:bg-black/5 transition-colors cursor-pointer shrink-0"
              data-slot="nav-mobile-search-back-btn"
            >
              <ArrowLeft size={22} className="stroke-[2]" />
            </button>

            {/* Search Input Form */}
            <form onSubmit={handleFormSubmit} className="flex-1 relative flex items-center">
              <div className="relative w-full flex items-center">
                <Search
                  size={18}
                  className="absolute left-3.5 text-grey-500 pointer-events-none stroke-[2]"
                />
                <input
                  ref={inputRef}
                  type="text"
                  role="searchbox"
                  aria-label="Search store products"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder={searchConfig.placeholder ?? 'Search for furniture, decor, and more...'}
                  className="w-full h-11 pl-10 pr-9 rounded-full bg-white border border-[#E7DFD3] text-sm text-grey-900 placeholder:text-grey-400 focus:outline-none focus:border-[#C0643A] focus:ring-2 focus:ring-[#C0643A]/20 transition-all shadow-xs"
                />
                {value.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClear}
                    aria-label="Clear search input"
                    className="absolute right-3 w-6 h-6 rounded-full bg-grey-200 hover:bg-grey-300 text-grey-600 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X size={14} className="stroke-[2.5]" />
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Drawer Content: Popular Searches & Suggestions */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-[var(--color-bg-2,#F7F1E6)]">
            {searchConfig.popularSearches && searchConfig.popularSearches.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-title text-xs font-semibold text-grey-500 uppercase tracking-wider">
                  POPULAR SEARCHES
                </h4>
                <div className="flex flex-wrap gap-2">
                  {searchConfig.popularSearches.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handlePopularSearchClick(item.label)}
                      className="px-3.5 py-1.5 rounded-full bg-white border border-[#E7DFD3] text-xs font-semibold text-grey-700 hover:border-[#C0643A] hover:text-[#C0643A] hover:bg-white transition-colors cursor-pointer shadow-xs"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Suggestions Content if supplied */}
            {searchConfig.suggestions && (
              <div className="pt-2">{searchConfig.suggestions}</div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;
  return createPortal(drawerContent, document.body);
};

export default NavMobileSearchDrawer;
