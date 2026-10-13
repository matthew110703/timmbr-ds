'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from '@timmbr/motion';
import { ArrowLeft, Search, X } from '@timmbr/icons';
import { cn } from '@timmbr/utils';
import { mobileSearchDrawerVariants } from '../NavHeader.styles';
import type { NavSearchConfig } from '../NavHeader.types';
import { NavSearchPanel, useNavSearchCombobox } from './NavSearchPanel';

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
  linkComponent,
}) => {
  const [mounted, setMounted] = React.useState(false);
  const searchConfig = typeof config === 'object' ? config : {};
  const inputRef = React.useRef<HTMLInputElement>(null);
  const combobox = useNavSearchCombobox({ config, value, onChange, onSubmit, onClose });

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

  // Enter is handled by the combobox (pick the active row or submit); this covers the
  // on-screen keyboard's search button when it submits the form without a keydown.
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value.trim());
      onClose();
    }
  };

  const drawerContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Search drawer"
          initial={shouldAnimate ? { opacity: 0, y: '100%' } : false}
          animate={shouldAnimate ? { opacity: 1, y: '0%' } : undefined}
          exit={shouldAnimate ? { opacity: 0, y: '100%' } : undefined}
          transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
          className={cn(mobileSearchDrawerVariants(), motionClass)}
          data-slot="nav-mobile-search-drawer"
        >
          {/* Top Search Bar with Back Button */}
          <div className="w-full bg-bg-2 border-b border-border-warm px-3 py-3 flex items-center gap-3 shrink-0 shadow-xs">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search and go back"
              className="w-10 h-10 rounded-full flex items-center justify-center text-grey-800 hover:text-primary hover:bg-grey-1000/5 transition-colors cursor-pointer shrink-0"
              data-slot="nav-mobile-search-back-btn"
            >
              <ArrowLeft size={22} className="stroke-[2]" />
            </button>

            {/* Search Input Form */}
            <form onSubmit={handleFormSubmit} className="flex-1 relative flex items-center">
              <div className="relative w-full flex items-center">
                <Search size={18} className="absolute left-3.5 text-grey-500 pointer-events-none stroke-[2]" />
                <input
                  ref={inputRef}
                  type="search"
                  enterKeyHint="search"
                  autoComplete="off"
                  aria-label={searchConfig.ariaLabel ?? 'Search store products'}
                  {...combobox.inputProps}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder={searchConfig.placeholder ?? 'Search for furniture, decor, and more...'}
                  className="w-full h-11 pl-10 pr-9 rounded-full [&::-webkit-search-cancel-button]:hidden bg-grey-50 border border-border-warm text-body-2 text-grey-900 placeholder:text-grey-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-xs"
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

          {/* Drawer content: recent searches, popular chips or suggestions */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-6 bg-bg-2">
            {combobox.hasContent && <NavSearchPanel {...combobox.panelProps} linkComponent={linkComponent} />}

            {/* Custom Suggestions Content if supplied */}
            {searchConfig.suggestions && <div className="pt-2">{searchConfig.suggestions}</div>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;
  return createPortal(drawerContent, document.body);
};

export default NavMobileSearchDrawer;
