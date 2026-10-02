import type * as React from 'react';
import type { MotionProp, MotionProps } from '../../types/motion';

/**
 * Offer / Announcement banner configuration shown above the navigation header.
 */
export interface OfferBannerConfig {
  /** Master toggle to show or hide the offer banner */
  show?: boolean;
  /** Text or content displayed in the offer banner */
  content: React.ReactNode;
  /** Optional destination link href */
  href?: string;
  /** Target zone key corresponding to TimmbrConfigProvider zones (e.g. 'store', 'docs') */
  zone?: string;
  /** If true, navigation will be treated as cross-zone */
  crossZone?: boolean;
  /** Whether the banner includes a dismiss button */
  dismissible?: boolean;
  /** Callback fired when user clicks the dismiss button */
  onDismiss?: () => void;
  /** Optional right-side CTA button or coupon element */
  action?: React.ReactNode;
  /** Custom background or text className */
  className?: string;
}


/**
 * Branding configuration for the header logo.
 */
export interface NavHeaderBranding {
  /** Full brand logo shown when search is closed */
  logo: React.ReactNode;
  /** Compact or mini brand logo shown when search expands */
  miniLogo?: React.ReactNode;
  /** Destination link for the brand logo. Defaults to '/' */
  href?: string;
  /** Target zone key for cross-zone branding link */
  zone?: string;
  /** Accessible label or alt text */
  alt?: string;
  /** Custom logo wrapper className */
  className?: string;
  /** Click handler for branding */
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * Individual navigation item.
 * Supports direct links (internal or cross-zone) OR rich popover / mega-menu dropdowns.
 */
export interface NavHeaderItem {
  /** Unique identifier for the item */
  id: string;
  /** Label displayed on the navbar */
  label: React.ReactNode;
  /** Optional link destination. If omitted and content is provided, item acts as popover trigger */
  href?: string;
  /** Target zone for cross-zone navigation */
  zone?: string;
  /** Explicit flag to force cross-zone navigation */
  crossZone?: boolean;
  /** Rich popover or mega-menu content. If provided, renders dropdown below header */
  content?: React.ReactNode;
  /** Width mode of the popover: 'container' (1216px centered), 'full' (100vw), 'dropdown' (anchor-aligned), or explicit number */
  popoverWidth?: 'container' | 'full' | 'dropdown' | number;
  /** Optional badge displayed adjacent to the label */
  badge?: React.ReactNode;
  /** Whether this item is visually disabled */
  disabled?: boolean;
  /** Accessible aria-label for the nav item */
  ariaLabel?: string;
  /** Custom className for the nav item trigger */
  className?: string;
}

/**
 * Popular search chip/tag configuration.
 */
export interface PopularSearchTag {
  id?: string;
  label: string;
  href?: string;
  zone?: string;
  onClick?: (tag: PopularSearchTag) => void;
}

/**
 * Configuration for the expandable search bar and its suggestions popover.
 */
export interface NavSearchConfig {
  /** Master toggle to show or hide the search feature and trigger */
  show?: boolean;
  /** Search input placeholder text */
  placeholder?: string;
  /** Controlled search input value */
  value?: string;
  /** Uncontrolled default search input value */
  defaultValue?: string;
  /** Callback fired when search input value changes */
  onChange?: (value: string) => void;
  /** Callback fired when user submits search (e.g. presses Enter) */
  onSubmit?: (query: string) => void;
  /** Controlled open state for search expansion */
  isOpen?: boolean;
  /** Uncontrolled default open state */
  defaultOpen?: boolean;
  /** Callback fired when search expands or collapses */
  onOpenChange?: (open: boolean) => void;
  /** Custom popover content rendered below the search input */
  popoverContent?: React.ReactNode;
  /** Custom suggestions node rendered inside search drawer */
  suggestions?: React.ReactNode;
  /** Optional preconfigured popular search suggestions */
  popularSearches?: PopularSearchTag[];
  /** Title for the popular searches section. Defaults to "Popular Searches" */
  popularSearchesTitle?: string;
  /** Callback fired when user clicks a popular search chip */
  onPopularSearchClick?: (tag: PopularSearchTag) => void;
  /** Custom aria-label for search input */
  ariaLabel?: string;
  /** Display mode for search on mobile/tablet viewports (< 1024px). Defaults to 'bar' */
  mobileMode?: 'bar' | 'icon' | 'auto';
}

/**
 * Header action item (e.g. Profile, Wishlist, Cart, Notifications).
 */
export interface NavActionItem {
  id: string;
  /** Action label (e.g. "PROFILE", "WISH LIST(0)", "CART(0)") */
  label: React.ReactNode;
  /** Action icon element rendered above the label */
  icon: React.ReactNode;
  /** Optional link destination */
  href?: string;
  /** Optional zone for cross-zone linking */
  zone?: string;
  /** Explicit cross-zone toggle */
  crossZone?: boolean;
  /** Badge counter or indicator */
  badge?: React.ReactNode | number;
  /** Click handler */
  onClick?: (e: React.MouseEvent) => void;
  /** Accessible aria-label */
  ariaLabel?: string;
  /** Custom action className */
  className?: string;
  /** Whether the action item is visually disabled */
  disabled?: boolean;
  /** Priority level determining which items resist collapsing into overflow */
  priority?: 'high' | 'normal' | 'low';
  /** Optional custom renderer for complex items */
  render?: (props: { item: NavActionItem; isOverflow: boolean }) => React.ReactNode;
}

/**
 * Navigation items and desktop mega-menu configuration object.
 */
export interface NavNavigationConfig {
  /** Primary navigation category items */
  items?: NavHeaderItem[];
  /** Master toggle to show or hide the navigation items bar */
  show?: boolean;
  /** Maximum number of nav items displayed before collapsing into three-dot overflow */
  maxVisibleItems?: number;
  /** Controlled active navigation item ID for open mega-menu */
  activeItemId?: string | null;
  /** Default active navigation item ID (uncontrolled) */
  defaultActiveItemId?: string | null;
  /** Callback fired when the active mega-menu item changes */
  onActiveItemChange?: (id: string | null) => void;
}

/**
 * Action buttons section configuration object.
 */
export interface NavActionsConfig {
  /** Array of custom action buttons */
  items?: NavActionItem[];
  /** Master toggle to show or hide the actions section */
  show?: boolean;
  /** Maximum number of action items displayed before collapsing to overflow ('auto' | number) */
  maxVisible?: number | 'auto';
  /** Custom overflow menu button configuration */
  overflow?: {
    label?: React.ReactNode;
    icon?: React.ReactNode;
  };
  /** Pre-configured profile action */
  profile?: Partial<NavActionItem>;
  /** Pre-configured wishlist action with optional badge count */
  wishlist?: Partial<NavActionItem> & { count?: number };
  /** Pre-configured cart action with optional badge count */
  cart?: Partial<NavActionItem> & { count?: number };
}

/**
 * Mobile and tablet responsive navigation (< 1024px) configuration object.
 */
export interface NavMobileConfig {
  /**
   * Horizontal category tab slider configuration or boolean toggle.
   */
  tabSlider?:
    | boolean
    | {
        show?: boolean;
        activeItemId?: string | null;
        defaultActiveItemId?: string | null;
        onActiveItemChange?: (id: string | null) => void;
      };
  /**
   * Mobile search configuration (bar pill or icon trigger, full-screen drawer state).
   */
  search?: {
    mode?: 'bar' | 'icon' | 'auto';
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
  };
}

export interface NavHeaderProps
  extends MotionProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  // =========================================================================
  // 1. Branding & Global Layout
  // =========================================================================

  /**
   * Brand logos configuration (full logo and mini logo for search expansion).
   */
  branding: NavHeaderBranding;

  /**
   * Maximum container width for the navigation bar and mega-menu.
   * Defaults to '2xl' (max-w-[1216px]).
   */
  containerMaxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

  /**
   * Whether the header stays sticky at the top of the viewport.
   * Defaults to false.
   */
  sticky?: boolean;

  /**
   * Custom router link component override (e.g. Next.js Link, Remix Link, or custom router).
   */
  linkComponent?: React.ComponentType<{
    href: string;
    children: React.ReactNode;
    className?: string;
    [key: string]: any;
  }>;

  /**
   * Custom slot rendered at the far right of the navigation bar.
   */
  rightContent?: React.ReactNode;

  // =========================================================================
  // 2. Modular Configuration Objects
  // =========================================================================

  /**
   * Offer / Announcement banner above header.
   * Pass an OfferBannerConfig object, a custom ReactNode, or false to disable.
   */
  offerBanner?: OfferBannerConfig | React.ReactNode | boolean;

  /**
   * Modular primary navigation configuration object or items array.
   */
  navigation?: NavNavigationConfig | NavHeaderItem[];

  /**
   * Modular search feature configuration object or boolean toggle.
   */
  search?: NavSearchConfig | boolean;

  /**
   * Modular actions configuration object or action items array.
   */
  actions?: NavActionsConfig | NavActionItem[];

  /**
   * Modular mobile and tablet responsive configuration object.
   */
  mobile?: NavMobileConfig;

  // =========================================================================
  // 3. Shorthand & Convenience Props (Backwards Compatible)
  // =========================================================================

  /** Shorthand master toggle for the offer banner. Defaults to true. */
  showOfferBanner?: boolean;

  /** Shorthand navigation items array. */
  items?: NavHeaderItem[];

  /** Shorthand master toggle for the navigation items section. Defaults to true. */
  showNavItems?: boolean;

  /** Shorthand maximum number of nav items displayed before collapsing into three-dot overflow. */
  maxVisibleNavItems?: number;

  /** Shorthand controlled active navigation item ID for open mega-menu. */
  activeItemId?: string | null;

  /** Shorthand default active navigation item ID (uncontrolled). */
  defaultActiveItemId?: string | null;

  /** Shorthand callback fired when the active mega-menu item changes. */
  onActiveItemChange?: (id: string | null) => void;

  /** Shorthand master toggle for the search feature and trigger. Defaults to true. */
  showSearch?: boolean;

  /** Shorthand master toggle for the action buttons section. Defaults to true. */
  showActions?: boolean;

  /** Shorthand maximum number of action items displayed before collapsing into overflow. */
  maxVisibleActions?: number | 'auto';

  /** Shorthand custom label for the overflow menu action button. Defaults to 'MORE'. */
  overflowActionLabel?: React.ReactNode;

  /** Shorthand custom icon for the overflow menu action button. Defaults to MoreHorizontal. */
  overflowActionIcon?: React.ReactNode;

  /** Shorthand profile action configuration. */
  profileAction?: Partial<NavActionItem>;

  /** Shorthand wishlist action configuration with optional badge count. */
  wishlistAction?: Partial<NavActionItem> & { count?: number };

  /** Shorthand cart action configuration with optional badge count. */
  cartAction?: Partial<NavActionItem> & { count?: number };

  /** Shorthand toggle for mobile horizontal tab slider. Defaults to true. */
  mobileTabSlider?: boolean;

  /** Shorthand search display style on mobile/tablet screens (< 1024px). */
  mobileSearchMode?: 'bar' | 'icon' | 'auto';

  /** Shorthand controlled active item ID for the mobile tab slider. */
  mobileActiveItemId?: string | null;

  /** Shorthand default active item ID for the mobile tab slider (uncontrolled). */
  defaultMobileActiveItemId?: string | null;

  /** Shorthand callback fired when the active mobile tab item changes. */
  onMobileActiveItemChange?: (id: string | null) => void;

  /** Shorthand controlled open state for the full-screen mobile search drawer. */
  mobileSearchOpen?: boolean;

  /** Shorthand default open state for the full-screen mobile search drawer. */
  defaultMobileSearchOpen?: boolean;

  /** Shorthand callback fired when the mobile search drawer opens or closes. */
  onMobileSearchOpenChange?: (open: boolean) => void;

  // =========================================================================
  // 4. Motion & Styling Overrides
  // =========================================================================

  /** Custom motion prop override. */
  motion?: MotionProp;
}


