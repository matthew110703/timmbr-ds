'use client';

import * as React from 'react';
import { motion } from '@timmbr/motion';
import { cn } from '@timmbr/utils';
import { useTimmbrConfig } from '../../../providers';
import { mobileTabSliderVariants, mobileTabItemVariants } from '../NavHeader.styles';
import type { NavHeaderItem } from '../NavHeader.types';
import { resolveNavDestination, isCrossZoneNavigation } from '../NavHeader.helpers';

export interface NavMobileTabSliderProps {
  items: NavHeaderItem[];
  activeItemId: string | null;
  onItemClick: (id: string, item: NavHeaderItem) => void;
  shouldAnimate?: boolean;
  motionClass?: string;
  linkComponent?: React.ComponentType<any>;
}

export const NavMobileTabSlider: React.FC<NavMobileTabSliderProps> = ({
  items,
  activeItemId,
  onItemClick,
  shouldAnimate = true,
  motionClass,
  linkComponent: CustomLink,
}) => {
  const config = useTimmbrConfig();
  const activeTabRef = React.useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);

  // Auto-scroll active tab into view when activeItemId changes
  React.useEffect(() => {
    if (activeTabRef.current && typeof activeTabRef.current.scrollIntoView === 'function') {
      activeTabRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeItemId]);

  return (
    <nav
      aria-label="Category Navigation"
      className={cn(mobileTabSliderVariants(), motionClass)}
      data-slot="nav-mobile-tab-slider"
    >
      {items.map((item) => {
        const isActive = activeItemId === item.id;
        const resolvedHref = resolveNavDestination(item.href, item.zone, config.zones?.zones);
        const requiresCrossZone = isCrossZoneNavigation(item.zone, config.zones?.currentZone, item.crossZone);
        const ariaLabelText = item.ariaLabel ?? (typeof item.label === 'string' ? item.label : undefined);

        const tabIndicator = isActive && shouldAnimate ? (
          <motion.div
            layoutId="active-mobile-tab-indicator"
            className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#C0643A] rounded-full"
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        ) : isActive ? (
          <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#C0643A] rounded-full" />
        ) : null;

        // If item is pure link without expandable content
        if (resolvedHref && !item.content && !item.disabled) {
          if (CustomLink && !requiresCrossZone) {
            return (
              <CustomLink
                key={item.id}
                ref={isActive ? (activeTabRef as any) : undefined}
                href={resolvedHref}
                role="tab"
                aria-selected={isActive}
                aria-label={ariaLabelText}
                className={cn(mobileTabItemVariants({ active: isActive, disabled: item.disabled }), item.className)}
                onClick={() => onItemClick(item.id, item)}
              >
                <span>{item.label}</span>
                {tabIndicator}
              </CustomLink>
            );
          }

          return (
            <a
              key={item.id}
              ref={isActive ? (activeTabRef as any) : undefined}
              href={resolvedHref}
              role="tab"
              aria-selected={isActive}
              aria-label={ariaLabelText}
              data-cross-zone={requiresCrossZone ? 'true' : undefined}
              className={cn(mobileTabItemVariants({ active: isActive, disabled: item.disabled }), item.className)}
              onClick={() => onItemClick(item.id, item)}
            >
              <span>{item.label}</span>
              {tabIndicator}
            </a>
          );
        }

        // Expandable category tab button
        return (
          <button
            key={item.id}
            ref={isActive ? (activeTabRef as any) : undefined}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-expanded={isActive}
            aria-label={ariaLabelText}
            disabled={item.disabled}
            onClick={() => onItemClick(item.id, item)}
            className={cn(mobileTabItemVariants({ active: isActive, disabled: item.disabled }), item.className)}
          >
            <span>{item.label}</span>
            {tabIndicator}
          </button>
        );
      })}
    </nav>
  );
};

export default NavMobileTabSlider;
