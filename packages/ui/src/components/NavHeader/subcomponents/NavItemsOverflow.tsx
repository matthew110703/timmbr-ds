'use client';

import * as React from 'react';
import { motion, AnimatePresence } from '@timmbr/motion';
import { MoreHorizontal } from '@timmbr/icons';
import { cn } from '@timmbr/utils';
import { useTimmbrConfig } from '../../../providers';
import { navHeaderItemVariants } from '../NavHeader.styles';
import type { NavHeaderItem } from '../NavHeader.types';
import { resolveNavDestination, isCrossZoneNavigation } from '../NavHeader.helpers';

export interface NavItemsOverflowProps {
  items: NavHeaderItem[];
  activeItemId: string | null;
  onItemClick: (id: string, item: NavHeaderItem) => void;
  shouldAnimate?: boolean;
  motionClass?: string;
  linkComponent?: React.ComponentType<any>;
}

export const NavItemsOverflow: React.FC<NavItemsOverflowProps> = ({
  items,
  activeItemId,
  onItemClick,
  shouldAnimate = true,
  motionClass,
  linkComponent: CustomLink,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const config = useTimmbrConfig();

  const isChildActive = items.some((item) => item.id === activeItemId);

  // Outside click & escape listeners
  React.useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="relative flex items-center h-full"
      data-slot="nav-items-overflow"
    >
      {/* Three-dot Trigger Button */}
      <button
        type="button"
        aria-label="More navigation categories"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          navHeaderItemVariants({ active: isOpen || isChildActive }),
          'px-2 py-2 flex items-center justify-center rounded-lg hover:bg-black/5 transition-colors',
          !shouldAnimate && 'transition-none',
          motionClass
        )}
        data-slot="nav-items-overflow-trigger"
      >
        <MoreHorizontal size={20} className="stroke-[2]" />
        {(isOpen || isChildActive) && (
          <div className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-[#C0643A] rounded-full" />
        )}
      </button>

      {/* Overflow Dropdown Popover */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={shouldAnimate ? { opacity: 0, y: 6, scale: 0.97 } : false}
            animate={shouldAnimate ? { opacity: 1, y: 0, scale: 1 } : undefined}
            exit={shouldAnimate ? { opacity: 0, y: 6, scale: 0.97 } : undefined}
            transition={{ duration: 0.18, ease: [0.25, 1, 0.5, 1] }}
            className={cn(
              'absolute top-full left-0 mt-2 w-56 bg-white border border-[#E7DFD3] shadow-2xl rounded-2xl p-2 z-50 text-left overflow-hidden divide-y divide-grey-100',
              !shouldAnimate && 'transition-none',
              motionClass
            )}
            role="menu"
            aria-orientation="vertical"
            data-slot="nav-items-overflow-popover"
          >
            <div className="py-1 flex flex-col gap-0.5">
              {items.map((item) => {
                const isActive = activeItemId === item.id;
                const resolvedHref = resolveNavDestination(
                  item.href,
                  item.zone,
                  config.zones?.zones
                );
                const requiresCrossZone = isCrossZoneNavigation(
                  item.zone,
                  config.zones?.currentZone,
                  item.crossZone
                );

                const itemRowContent = (
                  <>
                    <span className={cn('truncate', isActive && 'text-[#C0643A] font-bold')}>
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="shrink-0 px-1.5 py-0.5 rounded-full bg-primary-100 text-primary-800 text-[10px] font-bold">
                        {item.badge}
                      </span>
                    )}
                  </>
                );

                const itemClass = cn(
                  'w-full flex items-center justify-between gap-3 px-3 py-2 text-xs font-semibold text-[#3C3C3C] hover:text-[#C0643A] hover:bg-[#F7F1E6]/60 rounded-xl transition-colors cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0643A]',
                  item.disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
                  isActive && 'bg-[#F7F1E6]/80 text-[#C0643A]',
                  item.className
                );

                const handleClick = (e: React.MouseEvent) => {
                  if (item.disabled) {
                    e.preventDefault();
                    return;
                  }
                  onItemClick(item.id, item);
                  setIsOpen(false);
                };

                if (resolvedHref && !item.disabled) {
                  if (CustomLink && !requiresCrossZone) {
                    return (
                      <CustomLink
                        key={item.id}
                        href={resolvedHref}
                        role="menuitem"
                        className={itemClass}
                        onClick={handleClick}
                      >
                        {itemRowContent}
                      </CustomLink>
                    );
                  }

                  return (
                    <a
                      key={item.id}
                      href={resolvedHref}
                      data-cross-zone={requiresCrossZone ? 'true' : undefined}
                      role="menuitem"
                      className={itemClass}
                      onClick={handleClick}
                    >
                      {itemRowContent}
                    </a>
                  );
                }

                return (
                  <button
                    key={item.id}
                    type="button"
                    role="menuitem"
                    disabled={item.disabled}
                    onClick={handleClick}
                    className={itemClass}
                  >
                    {itemRowContent}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavItemsOverflow;
