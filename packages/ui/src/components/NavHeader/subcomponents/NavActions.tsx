'use client';

import * as React from 'react';
import { openAuthModal } from '@timmbr/hooks';
import { User, Heart, ShoppingCart } from '@timmbr/icons';
import { cn } from '@timmbr/utils';
import { useTimmbrConfig } from '../../../providers';
import { navActionVariants } from '../NavHeader.styles';
import { NavActionLabelSkeleton } from './NavActionLabelSkeleton';
import type { NavActionItem } from '../NavHeader.types';
import { resolveNavDestination, isCrossZoneNavigation } from '../NavHeader.helpers';
import { NavActionOverflow } from './NavActionOverflow';

/**
 * Profile label slot: sized to its text, so gaps stay even, but
 * - at least as wide as "LOGIN" (34.6px): the loading skeleton and LOGIN are
 *   the same width, so signed-out visitors see no shift at all;
 * - at most 64px: longer names are cut with "…" (full name in `title`).
 */
export const PROFILE_LABEL_CLASS = 'min-w-[35px] max-w-16 truncate text-center';

export interface NavActionsProps {
  actions?: NavActionItem[];
  profileAction?: Partial<NavActionItem>;
  wishlistAction?: Partial<NavActionItem> & { count?: number };
  cartAction?: Partial<NavActionItem> & { count?: number };
  authMode?: 'modal' | 'redirect';
  onAuthTrigger?: () => void;
  maxVisibleActions?: number | 'auto';
  overflowActionLabel?: React.ReactNode;
  overflowActionIcon?: React.ReactNode;
  rightContent?: React.ReactNode;
  shouldAnimate?: boolean;
  motionClass?: string;
  linkComponent?: React.ComponentType<any>;
}

export const NavActions: React.FC<NavActionsProps> = ({
  actions,
  profileAction,
  wishlistAction,
  cartAction,
  authMode = 'modal',
  onAuthTrigger,
  maxVisibleActions = 'auto',
  overflowActionLabel,
  overflowActionIcon,
  rightContent,
  shouldAnimate = true,
  motionClass,
  linkComponent: CustomLink,
}) => {
  const config = useTimmbrConfig();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [measuredMaxVisible, setMeasuredMaxVisible] = React.useState<number | null>(null);

  // Construct items list: dynamic `actions` and/or default profile/wishlist/cart
  const items: NavActionItem[] = React.useMemo(() => {
    if (actions && actions.length > 0 && !profileAction && !wishlistAction && !cartAction) {
      return actions;
    }

    const defaultItems: NavActionItem[] = [];
    const customItems = actions ?? [];

    // Profile
    const isExplicitAccountLink =
      Boolean(profileAction?.href) && profileAction?.href !== '/auth' && profileAction?.href !== '/login';

    const profileHref =
      authMode === 'modal' && !isExplicitAccountLink
        ? undefined
        : (profileAction?.href ?? '/auth');

    const handleProfileClick = (e: React.MouseEvent) => {
      if (profileAction?.onClick) {
        profileAction.onClick(e);
      }
      if (authMode === 'modal' && !isExplicitAccountLink) {
        e.preventDefault();
        if (onAuthTrigger) {
          onAuthTrigger();
        } else {
          openAuthModal();
        }
      }
    };

    // Order: Wishlist, Cart, Profile (account last, at the far edge).

    // Wishlist
    const wishCount = wishlistAction?.count;
    defaultItems.push({
      id: 'wishlist',
      label: wishlistAction?.label ?? 'WISH LIST',
      icon: wishlistAction?.icon ?? <Heart size={22} className="stroke-[1.8]" />,
      href: wishlistAction?.href ?? '/wishlist',
      zone: wishlistAction?.zone,
      crossZone: wishlistAction?.crossZone,
      badge: wishlistAction?.badge ?? (wishCount && wishCount > 0 ? wishCount : undefined),
      onClick: wishlistAction?.onClick,
      ariaLabel: wishlistAction?.ariaLabel ?? (wishCount ? `Wishlist with ${wishCount} items` : 'Wishlist'),
    });

    // Cart
    const cartCount = cartAction?.count;
    defaultItems.push({
      id: 'cart',
      label: cartAction?.label ?? 'CART',
      icon: cartAction?.icon ?? <ShoppingCart size={22} className="stroke-[1.8]" />,
      href: cartAction?.href ?? '/cart',
      zone: cartAction?.zone,
      crossZone: cartAction?.crossZone,
      badge: cartAction?.badge ?? (cartCount && cartCount > 0 ? cartCount : undefined),
      onClick: cartAction?.onClick,
      ariaLabel: cartAction?.ariaLabel ?? (cartCount ? `Shopping cart with ${cartCount} items` : 'Shopping cart'),
      priority: 'high',
    });

    // Profile: high priority so sign-in / account stays visible when space is tight
    defaultItems.push({
      id: 'profile',
      label: profileAction?.label ?? 'LOGIN',
      icon: profileAction?.icon ?? <User size={22} className="stroke-[1.8]" />,
      href: profileHref,
      zone: profileAction?.zone,
      crossZone: profileAction?.crossZone,
      onClick: handleProfileClick,
      ariaLabel: profileAction?.ariaLabel ?? 'User Account',
      priority: 'high',
      isLoading: profileAction?.isLoading,
      // LOGIN / skeleton / first name share one fixed-width slot: no layout shift
      labelClassName: profileAction?.labelClassName ?? PROFILE_LABEL_CLASS,
    });

    return [...customItems, ...defaultItems];
  }, [actions, profileAction, wishlistAction, cartAction, authMode, onAuthTrigger]);


  // Space-aware container measurement when maxVisibleActions is 'auto'
  React.useEffect(() => {
    if (maxVisibleActions !== 'auto') {
      setMeasuredMaxVisible(null);
      return;
    }

    const container = containerRef.current;
    if (!container || typeof ResizeObserver === 'undefined') return;

    const calculateFit = () => {
      const parent = container.parentElement;
      if (!parent) return;

      const parentWidth = parent.clientWidth;
      if (parentWidth <= 0) return;

      // Calculate sibling elements width in parent
      let siblingsWidth = 0;
      Array.from(parent.children).forEach((child) => {
        if (child !== container) {
          siblingsWidth += (child as HTMLElement).offsetWidth || 0;
        }
      });

      const availableWidth = Math.max(0, parentWidth - siblingsWidth);
      // Average footprint of an action button with gap is ~68px
      const itemWidth = 68;
      const moreWidth = 68;

      if (availableWidth <= moreWidth) {
        setMeasuredMaxVisible(1);
        return;
      }

      // Max items that can fit, reserving one slot for MORE if we have overflow
      const maxSlots = Math.floor(availableWidth / itemWidth);
      setMeasuredMaxVisible(Math.max(1, maxSlots));
    };

    calculateFit();

    const observer = new ResizeObserver(() => {
      calculateFit();
    });

    if (container.parentElement) {
      observer.observe(container.parentElement);
    }

    return () => {
      observer.disconnect();
    };
  }, [maxVisibleActions, items.length]);

  // Split actions into visible and overflow subsets
  const { visibleActions, overflowActions } = React.useMemo(() => {
    const limit =
      typeof maxVisibleActions === 'number'
        ? maxVisibleActions
        : (measuredMaxVisible ?? items.length);

    if (items.length <= limit) {
      return { visibleActions: items, overflowActions: [] };
    }

    // Reserve 1 slot for MORE button when items exceed limit
    const countToKeep = Math.max(1, limit - 1);

    // Check if explicit priorities are specified
    const hasPriorities = items.some((i) => i.priority);
    if (!hasPriorities) {
      return {
        visibleActions: items.slice(0, countToKeep),
        overflowActions: items.slice(countToKeep),
      };
    }

    // Priority ranking: high (3) > normal (2) > low (1)
    const priorityScore = (item: NavActionItem) => {
      if (item.priority === 'high') return 3;
      if (item.priority === 'low') return 1;
      return 2;
    };

    const indexed = items.map((item, index) => ({ item, index, score: priorityScore(item) }));
    const sorted = [...indexed].sort((a, b) => b.score - a.score || a.index - b.index);
    const visibleIndices = new Set(sorted.slice(0, countToKeep).map((x) => x.index));

    const visible: NavActionItem[] = [];
    const overflow: NavActionItem[] = [];

    items.forEach((item, index) => {
      if (visibleIndices.has(index)) {
        visible.push(item);
      } else {
        overflow.push(item);
      }
    });

    return { visibleActions: visible, overflowActions: overflow };
  }, [items, maxVisibleActions, measuredMaxVisible]);

  return (
    <div
      ref={containerRef}
      className="flex items-center gap-1.5 sm:gap-2.5 lg:gap-[18px]"
      data-slot="nav-actions-container"
    >
      {/* Visible Action Buttons */}
      {visibleActions.map((item) => {
        if (item.render) {
          return (
            <div key={item.id} className="relative inline-flex items-center">
              {item.render({ item, isOverflow: false })}
            </div>
          );
        }

        const resolvedHref = resolveNavDestination(item.href, item.zone, config.zones?.zones);
        const requiresCrossZone = isCrossZoneNavigation(item.zone, config.zones?.currentZone, item.crossZone);

        const content = (
          <>
            <div className="relative flex items-center justify-center">
              {item.icon}
              {typeof item.badge !== 'undefined' && item.badge !== null && (
                <span className="absolute -top-1 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-primary text-grey-50 text-caption font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </div>
            <span
              className={cn(
                'hidden lg:inline-block font-bold text-caption tracking-[0.0926em] uppercase whitespace-nowrap',
                item.labelClassName
              )}
              title={!item.isLoading && typeof item.label === 'string' ? item.label : undefined}
              data-slot="nav-action-label"
            >
              {item.isLoading ? <NavActionLabelSkeleton /> : item.label}
            </span>
          </>
        );

        const actionClass = cn(
          navActionVariants(),
          item.disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
          !shouldAnimate && 'transition-none',
          motionClass,
          item.className
        );

        if (resolvedHref && !item.disabled) {
          if (CustomLink && !requiresCrossZone) {
            return (
              <CustomLink
                key={item.id}
                href={resolvedHref}
                aria-label={item.ariaLabel}
                className={actionClass}
                onClick={item.onClick}
                data-slot="nav-action-link"
              >
                {content}
              </CustomLink>
            );
          }

          return (
            <a
              key={item.id}
              href={resolvedHref}
              aria-label={item.ariaLabel}
              data-cross-zone={requiresCrossZone ? 'true' : undefined}
              className={actionClass}
              onClick={item.onClick}
              data-slot="nav-action-link"
            >
              {content}
            </a>
          );
        }

        return (
          <button
            key={item.id}
            type="button"
            disabled={item.disabled}
            aria-label={item.ariaLabel}
            aria-busy={item.isLoading || undefined}
            onClick={item.onClick}
            className={actionClass}
            data-slot="nav-action-button"
          >
            {content}
          </button>
        );
      })}

      {/* Overflow Menu Trigger and Popover */}
      {overflowActions.length > 0 && (
        <NavActionOverflow
          items={overflowActions}
          label={overflowActionLabel}
          icon={overflowActionIcon}
          shouldAnimate={shouldAnimate}
          motionClass={motionClass}
          linkComponent={CustomLink}
        />
      )}

      {rightContent && <div className="ml-2 flex items-center">{rightContent}</div>}
    </div>
  );
};

export default NavActions;
