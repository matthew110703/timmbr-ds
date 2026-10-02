'use client';

import * as React from 'react';
import { motion, AnimatePresence } from '@timmbr/motion';
import { MoreHorizontal } from '@timmbr/icons';
import { cn } from '@timmbr/utils';
import { useTimmbrConfig } from '../../../providers';
import {
  navActionVariants,
  actionOverflowPopoverVariants,
  actionOverflowItemVariants,
} from '../NavHeader.styles';
import type { NavActionItem } from '../NavHeader.types';
import { resolveNavDestination, isCrossZoneNavigation } from '../NavHeader.helpers';

export interface NavActionOverflowProps {
  items: NavActionItem[];
  label?: React.ReactNode;
  icon?: React.ReactNode;
  shouldAnimate?: boolean;
  motionClass?: string;
  linkComponent?: React.ComponentType<any>;
}

export const NavActionOverflow: React.FC<NavActionOverflowProps> = ({
  items,
  label = 'MORE',
  icon,
  shouldAnimate = true,
  motionClass,
  linkComponent: CustomLink,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const config = useTimmbrConfig();

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

  // Calculate aggregated badge count if items contain badges
  const totalBadges = items.reduce((acc, curr) => {
    if (typeof curr.badge === 'number') return acc + curr.badge;
    if (typeof curr.badge === 'string') {
      const parsed = parseInt(curr.badge, 10);
      return acc + (isNaN(parsed) ? 1 : parsed);
    }
    if (curr.badge) return acc + 1;
    return acc;
  }, 0);

  return (
    <div ref={containerRef} className="relative inline-flex items-center" data-slot="nav-action-overflow">
      {/* Trigger Button - identical look & feel to other NavAction buttons */}
      <button
        type="button"
        aria-label="More navigation actions"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          navActionVariants({ active: isOpen }),
          !shouldAnimate && 'transition-none',
          motionClass
        )}
        data-slot="nav-action-overflow-trigger"
      >
        <div className="relative flex items-center justify-center">
          {icon ?? <MoreHorizontal size={22} className="shrink-0 stroke-[1.8]" />}
          {totalBadges > 0 && (
            <span
              className="absolute -top-1 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-[#C0643A] text-white text-[10px] font-bold flex items-center justify-center"
              aria-label={`${totalBadges} items in overflow menu`}
            >
              {totalBadges}
            </span>
          )}
        </div>
        <span className="hidden lg:inline font-sans font-bold text-[10px] tracking-[0.0926em] uppercase whitespace-nowrap">
          {label}
        </span>
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
              actionOverflowPopoverVariants(),
              !shouldAnimate && 'transition-none',
              motionClass
            )}
            role="menu"
            aria-orientation="vertical"
            data-slot="nav-action-overflow-popover"
          >
            <div className="py-1 flex flex-col gap-0.5">
              {items.map((item) => {
                if (item.render) {
                  return (
                    <div key={item.id} role="menuitem">
                      {item.render({ item, isOverflow: true })}
                    </div>
                  );
                }

                const resolvedHref = resolveNavDestination(item.href, item.zone, config.zones?.zones);
                const requiresCrossZone = isCrossZoneNavigation(item.zone, config.zones?.currentZone, item.crossZone);

                const itemRowContent = (
                  <>
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="shrink-0 text-grey-500 group-hover:text-[#C0643A] transition-colors">
                        {item.icon}
                      </span>
                      <span className="truncate">{item.label}</span>
                    </div>

                    {typeof item.badge !== 'undefined' && item.badge !== null && (
                      <span className="shrink-0 px-1.5 py-0.5 rounded-full bg-[#C0643A] text-white text-[10px] font-bold">
                        {item.badge}
                      </span>
                    )}
                  </>
                );

                const itemClass = cn(
                  actionOverflowItemVariants({ disabled: item.disabled }),
                  'group',
                  item.className
                );

                const handleClick = (e: React.MouseEvent) => {
                  item.onClick?.(e);
                  setIsOpen(false);
                };

                if (resolvedHref && !item.disabled) {
                  if (CustomLink && !requiresCrossZone) {
                    return (
                      <CustomLink
                        key={item.id}
                        href={resolvedHref}
                        aria-label={item.ariaLabel}
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
                      aria-label={item.ariaLabel}
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
                    aria-label={item.ariaLabel}
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

export default NavActionOverflow;
