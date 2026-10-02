'use client';

import * as React from 'react';
import { motion } from '@timmbr/motion';
import { cn } from '@timmbr/utils';
import { useTimmbrConfig } from '../../../providers';
import { navHeaderItemVariants } from '../NavHeader.styles';
import type { NavHeaderItem } from '../NavHeader.types';
import { resolveNavDestination, isCrossZoneNavigation } from '../NavHeader.helpers';
import { NavItemsOverflow } from './NavItemsOverflow';

export interface NavItemsProps {
  items: NavHeaderItem[];
  activeItemId: string | null;
  onItemMouseEnter: (id: string) => void;
  onItemMouseLeave: () => void;
  onItemClick: (id: string, item: NavHeaderItem) => void;
  maxVisibleItems?: number;
  shouldAnimate?: boolean;
  motionClass?: string;
  linkComponent?: React.ComponentType<any>;
}

export const NavItems: React.FC<NavItemsProps> = ({
  items,
  activeItemId,
  onItemMouseEnter,
  onItemMouseLeave,
  onItemClick,
  maxVisibleItems,
  shouldAnimate = true,
  motionClass,
  linkComponent: CustomLink,
}) => {
  const config = useTimmbrConfig();

  const { visibleItems, overflowItems } = React.useMemo(() => {
    if (typeof maxVisibleItems !== 'number' || items.length <= maxVisibleItems) {
      return { visibleItems: items, overflowItems: [] };
    }
    const visibleCount = Math.max(1, maxVisibleItems);
    return {
      visibleItems: items.slice(0, visibleCount),
      overflowItems: items.slice(visibleCount),
    };
  }, [items, maxVisibleItems]);

  return (
    <nav
      aria-label="Main Navigation"
      className="flex items-center gap-2.5 xl:gap-4 2xl:gap-6 h-full"
      data-slot="nav-items-container"
      onMouseLeave={onItemMouseLeave}
    >
      {visibleItems.map((item) => {
        const isActive = activeItemId === item.id;
        const hasContent = Boolean(item.content);
        const resolvedHref = resolveNavDestination(item.href, item.zone, config.zones?.zones);
        const requiresCrossZone = isCrossZoneNavigation(item.zone, config.zones?.currentZone, item.crossZone);

        const handleClick = (e: React.MouseEvent) => {
          if (item.disabled) {
            e.preventDefault();
            return;
          }
          onItemClick(item.id, item);
        };

        const handleKeyDown = (e: React.KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            if (hasContent && !item.href) {
              e.preventDefault();
              onItemClick(item.id, item);
            }
          }
        };

        const itemContent = (
          <>
            <span>{item.label}</span>
            {item.badge && (
              <span className="inline-flex items-center justify-center text-xs font-semibold px-1.5 py-0.5 rounded-full bg-primary-100 text-primary-800">
                {item.badge}
              </span>
            )}
            {isActive && shouldAnimate && (
              <motion.div
                layoutId="nav-header-active-indicator"
                className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#C0643A] rounded-full"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
            {isActive && !shouldAnimate && (
              <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#C0643A] rounded-full" />
            )}
          </>
        );

        const className = cn(
          navHeaderItemVariants({ active: isActive, disabled: item.disabled }),
          !shouldAnimate && 'transition-none',
          motionClass,
          item.className
        );

        // If it has no popover content, it's a direct navigation link
        if (!hasContent && resolvedHref) {
          if (CustomLink && !requiresCrossZone) {
            return (
              <CustomLink
                key={item.id}
                href={resolvedHref}
                className={className}
                onClick={handleClick}
                data-slot="nav-item-link"
              >
                {itemContent}
              </CustomLink>
            );
          }

          return (
            <a
              key={item.id}
              href={resolvedHref}
              data-cross-zone={requiresCrossZone ? 'true' : undefined}
              className={className}
              onClick={handleClick}
              data-slot="nav-item-link"
            >
              {itemContent}
            </a>
          );
        }

        // If it has popover content (or is a trigger button)
        return (
          <button
            key={item.id}
            type="button"
            className={className}
            aria-haspopup="dialog"
            aria-expanded={isActive}
            disabled={item.disabled}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            onMouseEnter={() => onItemMouseEnter(item.id)}
            data-slot="nav-item-trigger"
            data-active={isActive ? 'true' : undefined}
          >
            {itemContent}
          </button>
        );
      })}

      {/* Overflow Three-dot Popover */}
      {overflowItems.length > 0 && (
        <NavItemsOverflow
          items={overflowItems}
          activeItemId={activeItemId}
          onItemClick={onItemClick}
          shouldAnimate={shouldAnimate}
          motionClass={motionClass}
          linkComponent={CustomLink}
        />
      )}
    </nav>
  );
};
