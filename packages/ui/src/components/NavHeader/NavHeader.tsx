'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';
import { useGlobalAnimation } from '../../providers';
import { resolveMotion } from '../../types/motion';
import { navHeaderVariants, navHeaderContainerVariants } from './NavHeader.styles';
import type {
  NavHeaderProps,
  NavHeaderItem,
  NavNavigationConfig,
  NavSearchConfig,
  NavActionsConfig,
  NavMobileConfig,
} from './NavHeader.types';
import { Search } from '@timmbr/icons';
import { NavHeaderContext } from './NavHeader.context';
import { OfferBanner } from './subcomponents/OfferBanner';
import { NavBrand } from './subcomponents/NavBrand';
import { NavItems } from './subcomponents/NavItems';
import { NavMegaMenu } from './subcomponents/NavMegaMenu';
import { NavSearch } from './subcomponents/NavSearch';
import { NavActions } from './subcomponents/NavActions';
import { NavMobileTabSlider } from './subcomponents/NavMobileTabSlider';
import { NavMobileTabContent } from './subcomponents/NavMobileTabContent';
import { NavMobileSearchDrawer } from './subcomponents/NavMobileSearchDrawer';

export const NavHeader = React.forwardRef<HTMLElement, NavHeaderProps>(
  (
    {
      // 1. Branding & Global Layout
      branding,
      containerMaxWidth = '2xl',
      sticky = false,
      linkComponent,
      rightContent,

      // 2. Modular Configuration Objects
      offerBanner = {
        content: 'Extra 15% Off on All Home and Kitchen Orders*',
      },
      navigation,
      search = true,
      actions,
      mobile,

      // 3. Shorthand & Convenience Props (Backwards Compatible)
      showOfferBanner: shorthandShowOfferBanner,
      items: shorthandItems,
      showNavItems: shorthandShowNavItems,
      maxVisibleNavItems: shorthandMaxVisibleNavItems,
      activeItemId: shorthandActiveItemId,
      defaultActiveItemId: shorthandDefaultActiveItemId,
      onActiveItemChange: shorthandOnActiveItemChange,
      showSearch: shorthandShowSearch,
      showActions: shorthandShowActions,
      maxVisibleActions: shorthandMaxVisibleActions,
      overflowActionLabel: shorthandOverflowActionLabel,
      overflowActionIcon: shorthandOverflowActionIcon,
      profileAction: shorthandProfileAction,
      wishlistAction: shorthandWishlistAction,
      cartAction: shorthandCartAction,
      mobileTabSlider: shorthandMobileTabSlider,
      mobileSearchMode: shorthandMobileSearchMode,
      mobileActiveItemId: shorthandMobileActiveItemId,
      defaultMobileActiveItemId: shorthandDefaultMobileActiveItemId,
      onMobileActiveItemChange: shorthandOnMobileActiveItemChange,
      mobileSearchOpen: shorthandMobileSearchOpen,
      defaultMobileSearchOpen: shorthandDefaultMobileSearchOpen,
      onMobileSearchOpenChange: shorthandOnMobileSearchOpenChange,

      // 4. Motion & Styling Overrides
      motion: motionProp,
      className,
      ...props
    }: NavHeaderProps,
    ref
  ) => {
    const globalMotion = useGlobalAnimation();
    const { shouldAnimate, motionClass } = resolveMotion(motionProp, globalMotion);

    // --- Normalized Offer Banner Config ---
    const isOfferBannerVisible =
      shorthandShowOfferBanner !== undefined
        ? shorthandShowOfferBanner
        : typeof offerBanner === 'object' && offerBanner !== null && 'show' in offerBanner
        ? (offerBanner as { show?: boolean }).show ?? true
        : Boolean(offerBanner);

    // --- Normalized Navigation Config ---
    const navigationConfig = React.useMemo<NavNavigationConfig>(
      () => (Array.isArray(navigation) ? { items: navigation } : navigation ?? {}),
      [navigation]
    );
    const navItems = React.useMemo(
      () => shorthandItems ?? navigationConfig.items ?? [],
      [shorthandItems, navigationConfig.items]
    );
    const isNavItemsVisible =
      shorthandShowNavItems !== undefined
        ? shorthandShowNavItems
        : navigationConfig.show ?? true;
    const maxVisibleNavItems =
      shorthandMaxVisibleNavItems ?? navigationConfig.maxVisibleItems;
    const controlledActiveId =
      shorthandActiveItemId !== undefined
        ? shorthandActiveItemId
        : navigationConfig.activeItemId;
    const defaultActiveItemId =
      shorthandDefaultActiveItemId !== undefined
        ? shorthandDefaultActiveItemId
        : navigationConfig.defaultActiveItemId ?? null;
    const onActiveItemChange =
      shorthandOnActiveItemChange ?? navigationConfig.onActiveItemChange;

    // --- Normalized Search Config ---
    const searchConfig = React.useMemo<NavSearchConfig>(
      () => (typeof search === 'object' && search !== null ? search : {}),
      [search]
    );
    const isSearchVisible =
      shorthandShowSearch !== undefined
        ? shorthandShowSearch
        : searchConfig.show ?? Boolean(search);

    // --- Normalized Actions Config ---
    const actionsConfig = React.useMemo<NavActionsConfig>(
      () => (Array.isArray(actions) ? { items: actions } : actions ?? {}),
      [actions]
    );
    const actionItems = actionsConfig.items;
    const isActionsVisible =
      shorthandShowActions !== undefined
        ? shorthandShowActions
        : actionsConfig.show ?? true;
    const maxVisibleActions =
      shorthandMaxVisibleActions !== undefined
        ? shorthandMaxVisibleActions
        : actionsConfig.maxVisible;
    const overflowActionLabel =
      shorthandOverflowActionLabel ?? actionsConfig.overflow?.label;
    const overflowActionIcon =
      shorthandOverflowActionIcon ?? actionsConfig.overflow?.icon;
    const profileAction = shorthandProfileAction ?? actionsConfig.profile;
    const wishlistAction = shorthandWishlistAction ?? actionsConfig.wishlist;
    const cartAction = shorthandCartAction ?? actionsConfig.cart;

    // --- Normalized Mobile Config ---
    const mobileConfig = React.useMemo<NavMobileConfig>(
      () => mobile ?? {},
      [mobile]
    );
    const tabSliderOption = mobileConfig.tabSlider;
    const tabSliderConfig =
      typeof tabSliderOption === 'object' && tabSliderOption !== null
        ? tabSliderOption
        : {};
    const isMobileTabSliderEnabled =
      shorthandMobileTabSlider !== undefined
        ? shorthandMobileTabSlider
        : typeof tabSliderOption === 'boolean'
        ? tabSliderOption
        : tabSliderConfig.show ?? true;
    const controlledMobileActiveId =
      shorthandMobileActiveItemId !== undefined
        ? shorthandMobileActiveItemId
        : tabSliderConfig.activeItemId;
    const defaultMobileActiveItemId =
      shorthandDefaultMobileActiveItemId !== undefined
        ? shorthandDefaultMobileActiveItemId
        : tabSliderConfig.defaultActiveItemId ?? null;
    const onMobileActiveItemChange =
      shorthandOnMobileActiveItemChange ?? tabSliderConfig.onActiveItemChange;

    const mobileSearchConfig = mobileConfig.search ?? {};
    const resolvedMobileSearchMode =
      shorthandMobileSearchMode ??
      mobileSearchConfig.mode ??
      searchConfig.mobileMode ??
      'bar';
    const controlledMobileSearchOpen =
      shorthandMobileSearchOpen !== undefined
        ? shorthandMobileSearchOpen
        : mobileSearchConfig.open;
    const defaultMobileSearchOpen =
      shorthandDefaultMobileSearchOpen !== undefined
        ? shorthandDefaultMobileSearchOpen
        : mobileSearchConfig.defaultOpen ?? false;
    const onMobileSearchOpenChange =
      shorthandOnMobileSearchOpenChange ?? mobileSearchConfig.onOpenChange;

    // --- Active Mega-Menu Item State ---
    const [uncontrolledActiveId, setUncontrolledActiveId] = React.useState<string | null>(
      defaultActiveItemId
    );
    const activeItemId = controlledActiveId !== undefined ? controlledActiveId : uncontrolledActiveId;

    const setActiveItemId = React.useCallback(
      (id: string | null) => {
        if (controlledActiveId === undefined) {
          setUncontrolledActiveId(id);
        }
        onActiveItemChange?.(id);
      },
      [controlledActiveId, onActiveItemChange]
    );

    // --- Search Expansion State ---
    const [uncontrolledSearchOpen, setUncontrolledSearchOpen] = React.useState<boolean>(
      searchConfig.defaultOpen ?? false
    );
    const isSearchOpen =
      searchConfig.isOpen !== undefined ? searchConfig.isOpen : uncontrolledSearchOpen;

    const setIsSearchOpen = React.useCallback(
      (open: boolean) => {
        if (searchConfig.isOpen === undefined) {
          setUncontrolledSearchOpen(open);
        }
        searchConfig.onOpenChange?.(open);
      },
      [searchConfig]
    );

    // --- Search Input Value State ---
    const [uncontrolledSearchValue, setUncontrolledSearchValue] = React.useState<string>(
      searchConfig.defaultValue ?? ''
    );
    const searchValue =
      searchConfig.value !== undefined ? searchConfig.value : uncontrolledSearchValue;

    const setSearchValue = React.useCallback(
      (val: string) => {
        if (searchConfig.value === undefined) {
          setUncontrolledSearchValue(val);
        }
        searchConfig.onChange?.(val);
      },
      [searchConfig]
    );

    // --- Hover Intent Timer for Mega-Menu ---
    const leaveTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    const cancelLeaveTimeout = React.useCallback(() => {
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
        leaveTimeoutRef.current = null;
      }
    }, []);

    const handleItemMouseEnter = React.useCallback(
      (id: string) => {
        cancelLeaveTimeout();
        setActiveItemId(id);
      },
      [cancelLeaveTimeout, setActiveItemId]
    );

    const handleItemMouseLeave = React.useCallback(() => {
      cancelLeaveTimeout();
      leaveTimeoutRef.current = setTimeout(() => {
        setActiveItemId(null);
      }, 180);
    }, [cancelLeaveTimeout, setActiveItemId]);

    const handleMegaMenuMouseEnter = React.useCallback(() => {
      cancelLeaveTimeout();
    }, [cancelLeaveTimeout]);

    const handleMegaMenuMouseLeave = React.useCallback(() => {
      cancelLeaveTimeout();
      leaveTimeoutRef.current = setTimeout(() => {
        setActiveItemId(null);
      }, 180);
    }, [cancelLeaveTimeout, setActiveItemId]);

    const handleMegaMenuClose = React.useCallback(() => {
      cancelLeaveTimeout();
      setActiveItemId(null);
    }, [cancelLeaveTimeout, setActiveItemId]);

    const handleItemClick = React.useCallback(
      (id: string, item: NavHeaderItem) => {
        if (item.content) {
          setActiveItemId(activeItemId === id ? null : id);
        }
      },
      [activeItemId, setActiveItemId]
    );

    const handleSearchSubmit = React.useCallback(
      (query: string) => {
        searchConfig.onSubmit?.(query);
      },
      [searchConfig]
    );

    // Clean up timer on unmount
    React.useEffect(() => {
      return () => {
        if (leaveTimeoutRef.current) {
          clearTimeout(leaveTimeoutRef.current);
        }
      };
    }, []);

    // --- Screen Size & Space-Aware Measurement for Auto-Overflow ---
    const innerRef = React.useRef<HTMLDivElement>(null);
    const leftRef = React.useRef<HTMLDivElement>(null);
    const centerRef = React.useRef<HTMLDivElement>(null);
    const searchContainerRef = React.useRef<HTMLDivElement>(null);
    const [autoMaxVisible, setAutoMaxVisible] = React.useState<number | undefined>(undefined);

    React.useEffect(() => {
      if (maxVisibleActions !== undefined && typeof maxVisibleActions === 'number') {
        setAutoMaxVisible(maxVisibleActions);
        return;
      }

      const updateFit = () => {
        if (!innerRef.current) return;

        const innerWidth = innerRef.current.clientWidth;
        if (innerWidth <= 0) return;

        const leftWidth = leftRef.current?.offsetWidth || 0;
        const centerWidth = centerRef.current?.offsetWidth || 0;
        const searchBaseWidth = isSearchVisible ? 52 : 0;

        // Responsive gaps between columns (gap-4 [16px] or lg:gap-8 [32px])
        const columnGap = innerWidth >= 1024 ? 32 : 16;
        const columnGapsTotal = columnGap * 2;
        // Right section gap between search and actions (gap-3 [12px] or lg:gap-5 [20px])
        const rightSectionGap = innerWidth >= 1024 ? 20 : 12;

        const availableWidthForActions = Math.max(
          0,
          innerWidth - leftWidth - centerWidth - searchBaseWidth - columnGapsTotal - rightSectionGap
        );

        // Footprint of an action item with gap (~64px mobile to ~74px desktop)
        const itemFootprint = innerWidth >= 640 ? 74 : 64;
        const moreButtonFootprint = itemFootprint;

        if (availableWidthForActions <= moreButtonFootprint) {
          setAutoMaxVisible(1);
          return;
        }

        const calculatedSlots = Math.floor(availableWidthForActions / itemFootprint);
        setAutoMaxVisible(Math.max(1, calculatedSlots));
      };

      updateFit();

      const handleResize = () => {
        requestAnimationFrame(updateFit);
      };

      window.addEventListener('resize', handleResize);

      let resizeObserver: ResizeObserver | null = null;
      if (typeof ResizeObserver !== 'undefined' && innerRef.current) {
        resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(innerRef.current);
        if (leftRef.current) resizeObserver.observe(leftRef.current);
        if (centerRef.current) resizeObserver.observe(centerRef.current);
      }

      return () => {
        window.removeEventListener('resize', handleResize);
        resizeObserver?.disconnect();
      };
    }, [maxVisibleActions, navItems.length, search, isSearchVisible]);

    // --- Mobile Active Tab State ---
    const [uncontrolledMobileActiveId, setUncontrolledMobileActiveId] = React.useState<string | null>(
      defaultMobileActiveItemId
    );
    const mobileActiveItemId =
      controlledMobileActiveId !== undefined ? controlledMobileActiveId : uncontrolledMobileActiveId;

    const handleMobileItemClick = React.useCallback(
      (id: string, item: NavHeaderItem) => {
        if (item.content) {
          const nextId = mobileActiveItemId === id ? null : id;
          if (controlledMobileActiveId === undefined) {
            setUncontrolledMobileActiveId(nextId);
          }
          onMobileActiveItemChange?.(nextId);
        }
      },
      [mobileActiveItemId, controlledMobileActiveId, onMobileActiveItemChange]
    );

    const activeMobileItem = React.useMemo(() => {
      return navItems.find((item) => item.id === mobileActiveItemId) ?? null;
    }, [navItems, mobileActiveItemId]);

    // --- Mobile Full-Screen Search Drawer State ---
    const [uncontrolledMobileSearchOpen, setUncontrolledMobileSearchOpen] = React.useState<boolean>(
      defaultMobileSearchOpen
    );
    const isMobileSearchOpen =
      controlledMobileSearchOpen !== undefined ? controlledMobileSearchOpen : uncontrolledMobileSearchOpen;

    const setIsMobileSearchOpen = React.useCallback(
      (open: boolean) => {
        if (controlledMobileSearchOpen === undefined) {
          setUncontrolledMobileSearchOpen(open);
        }
        onMobileSearchOpenChange?.(open);
      },
      [controlledMobileSearchOpen, onMobileSearchOpenChange]
    );

    const activeItem = React.useMemo(() => {
      return navItems.find((item) => item.id === activeItemId) ?? null;
    }, [navItems, activeItemId]);

    const contextValue = React.useMemo(
      () => ({
        activeItemId,
        setActiveItemId,
        isSearchOpen,
        setIsSearchOpen,
        searchValue,
        setSearchValue,
        shouldAnimate,
        motionClass,
        linkComponent,
        handleItemMouseEnter,
        handleItemMouseLeave,
        handleItemClick,
        handleSearchSubmit,
        autoMaxVisibleActions: autoMaxVisible,
      }),
      [
        activeItemId,
        setActiveItemId,
        isSearchOpen,
        setIsSearchOpen,
        searchValue,
        setSearchValue,
        shouldAnimate,
        motionClass,
        linkComponent,
        handleItemMouseEnter,
        handleItemMouseLeave,
        handleItemClick,
        handleSearchSubmit,
        autoMaxVisible,
      ]
    );

    return (
      <NavHeaderContext.Provider value={contextValue}>
        <header
          ref={ref}
          role="banner"
          data-slot="nav-header"
          className={cn(navHeaderVariants({ sticky }), className)}
          {...props}
        >
          {/* Top Offer / Announcement Banner */}
          <OfferBanner
            banner={offerBanner}
            show={isOfferBannerVisible}
            shouldAnimate={shouldAnimate}
            motionClass={motionClass}
            linkComponent={linkComponent}
          />

          {/* ========================================================================= */}
          {/* DESKTOP VIEWPORT (>= 1024px / lg)                                         */}
          {/* ========================================================================= */}
          <div className="hidden lg:block">
            {/* Main Navigation Bar */}
            <div
              ref={innerRef}
              className={cn(
                navHeaderContainerVariants({ maxWidth: containerMaxWidth }),
                'relative'
              )}
              data-slot="nav-header-inner"
            >
              {/* Left: Primary Nav Items */}
              <div ref={leftRef} className="flex-1 flex items-center justify-start h-full min-w-0 pr-8 xl:pr-14">
                {isNavItemsVisible && navItems.length > 0 && (
                  <NavItems
                    items={navItems}
                    activeItemId={activeItemId}
                    maxVisibleItems={maxVisibleNavItems}
                    onItemMouseEnter={handleItemMouseEnter}
                    onItemMouseLeave={handleItemMouseLeave}
                    onItemClick={handleItemClick}
                    shouldAnimate={shouldAnimate}
                    motionClass={motionClass}
                    linkComponent={linkComponent}
                  />
                )}
              </div>

              {/* Center: Brand Logo (Mathematically Centered in Container) */}
              <div
                ref={centerRef}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center shrink-0 z-10 pointer-events-auto"
              >
                <NavBrand
                  branding={branding}
                  isSearchOpen={isSearchOpen}
                  shouldAnimate={shouldAnimate}
                  motionClass={motionClass}
                  linkComponent={linkComponent}
                />
              </div>

              {/* Right: Search + Action Buttons */}
              <div className="flex-1 flex items-center gap-2.5 lg:gap-4 justify-end min-w-0 pl-8 xl:pl-14">
                {isSearchVisible && (
                  <div ref={searchContainerRef} className="flex items-center">
                    <NavSearch
                      config={search}
                      isOpen={isSearchOpen}
                      onOpenChange={setIsSearchOpen}
                      value={searchValue}
                      onChange={setSearchValue}
                      onSubmit={handleSearchSubmit}
                      shouldAnimate={shouldAnimate}
                      motionClass={motionClass}
                      linkComponent={linkComponent}
                    />
                  </div>
                )}

                {isActionsVisible && (
                  <NavActions
                    actions={actionItems}
                    maxVisibleActions={maxVisibleActions === 'auto' ? autoMaxVisible : (maxVisibleActions ?? autoMaxVisible)}
                    overflowActionLabel={overflowActionLabel}
                    overflowActionIcon={overflowActionIcon}
                    profileAction={profileAction}
                    wishlistAction={wishlistAction}
                    cartAction={cartAction}
                    rightContent={rightContent}
                    shouldAnimate={shouldAnimate}
                    motionClass={motionClass}
                    linkComponent={linkComponent}
                  />
                )}
              </div>
            </div>

            {/* Container-Aligned Mega Menu Popover */}
            {isNavItemsVisible && (
              <NavMegaMenu
                activeItem={activeItem}
                onMouseEnter={handleMegaMenuMouseEnter}
                onMouseLeave={handleMegaMenuMouseLeave}
                onClose={handleMegaMenuClose}
                shouldAnimate={shouldAnimate}
                motionClass={motionClass}
              />
            )}
          </div>

          {/* ========================================================================= */}
          {/* MOBILE & TABLET VIEWPORT (< 1024px / lg:hidden)                           */}
          {/* ========================================================================= */}
          <div className="lg:hidden" data-slot="nav-mobile-container">
            {/* Top Bar: Brand Logo (Left) + Actions (Right) */}
            <div
              className={cn(
                navHeaderContainerVariants({ maxWidth: containerMaxWidth }),
                'h-[62px] sm:h-[70px] px-3 sm:px-6'
              )}
              data-slot="nav-mobile-top-bar"
            >
              {/* Brand Logo */}
              <div className="flex items-center justify-start shrink-0">
                <NavBrand
                  branding={branding}
                  isSearchOpen={false}
                  shouldAnimate={shouldAnimate}
                  motionClass={motionClass}
                  linkComponent={linkComponent}
                />
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-1.5 sm:gap-2.5 lg:gap-4 justify-end">
                {isSearchVisible && resolvedMobileSearchMode === 'icon' && (
                  <button
                    type="button"
                    onClick={() => setIsMobileSearchOpen(true)}
                    aria-label="Open search drawer"
                    className="group flex flex-col items-center justify-center min-w-[36px] sm:min-w-[40px] lg:min-w-[52px] text-[#3C3C3C] hover:text-[#C0643A] transition-colors py-1 px-1 lg:px-1.5 cursor-pointer"
                    data-slot="nav-mobile-search-icon-trigger"
                  >
                    <Search size={22} className="shrink-0 stroke-[1.8]" />
                    <span className="hidden lg:inline font-sans font-bold text-[10px] tracking-[0.0926em] uppercase">
                      SEARCH
                    </span>
                  </button>
                )}

                {isActionsVisible && (
                  <NavActions
                    actions={actionItems}
                    maxVisibleActions={
                      isSearchVisible && resolvedMobileSearchMode === 'icon' ? 2 : 3
                    }
                    overflowActionLabel={overflowActionLabel}
                    overflowActionIcon={overflowActionIcon}
                    profileAction={profileAction}
                    wishlistAction={wishlistAction}
                    cartAction={cartAction}
                    rightContent={rightContent}
                    shouldAnimate={shouldAnimate}
                    motionClass={motionClass}
                    linkComponent={linkComponent}
                  />
                )}
              </div>
            </div>

            {/* Mobile Search Bar Pill (shown when mobileSearchMode !== 'icon') */}
            {isSearchVisible && resolvedMobileSearchMode !== 'icon' && (
              <div className="px-3 sm:px-6 pb-2.5 pt-0.5 bg-[var(--color-bg-2,#F7F1E6)]">
                <button
                  type="button"
                  onClick={() => setIsMobileSearchOpen(true)}
                  aria-label="Open search drawer"
                  className="w-full h-10 px-4 flex items-center gap-2.5 rounded-full bg-white border border-[#E7DFD3] text-left text-sm text-grey-400 hover:border-grey-400 shadow-xs transition-all cursor-pointer select-none"
                  data-slot="nav-mobile-search-pill"
                >
                  <Search size={18} className="text-grey-500 shrink-0" />
                  <span className="truncate">
                    {typeof search === 'object' && search.placeholder
                      ? search.placeholder
                      : 'Search for furniture, decor, and more...'}
                  </span>
                </button>
              </div>
            )}

            {/* Mobile Horizontal Tab Slider */}
            {isNavItemsVisible && isMobileTabSliderEnabled && navItems.length > 0 && (
              <>
                <NavMobileTabSlider
                  items={navItems}
                  activeItemId={mobileActiveItemId}
                  onItemClick={handleMobileItemClick}
                  shouldAnimate={shouldAnimate}
                  motionClass={motionClass}
                  linkComponent={linkComponent}
                />

                {/* Mobile Expandable Category Content Panel */}
                <NavMobileTabContent
                  activeItem={activeMobileItem}
                  onClose={() => handleMobileItemClick(mobileActiveItemId ?? '', activeMobileItem!)}
                  shouldAnimate={shouldAnimate}
                  motionClass={motionClass}
                />
              </>
            )}
          </div>

          {/* Full-Screen Mobile Search Drawer */}
          {isSearchVisible && (
            <NavMobileSearchDrawer
              isOpen={isMobileSearchOpen}
              onClose={() => setIsMobileSearchOpen(false)}
              value={searchValue}
              onChange={setSearchValue}
              onSubmit={handleSearchSubmit}
              config={search}
              shouldAnimate={shouldAnimate}
              motionClass={motionClass}
              linkComponent={linkComponent}
            />
          )}
        </header>
      </NavHeaderContext.Provider>
    );
  }
);

NavHeader.displayName = 'NavHeader';

/**
 * Convenience alias for NavHeader.
 */
export const Header = NavHeader;

