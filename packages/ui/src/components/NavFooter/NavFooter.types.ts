import * as React from 'react';
import type { MotionProps } from '../../types/motion';

/**
 * Single navigation or legal link item in the footer.
 */
export interface NavFooterLinkItem {
  /**
   * Unique identifier for the link.
   */
  id?: string;

  /**
   * Display label for the link.
   */
  label: React.ReactNode;

  /**
   * Destination URL.
   */
  href: string;

  /**
   * Optional zone for multi-zone micro-frontend navigation.
   */
  zone?: string;

  /**
   * Force cross-zone full page transition even if zone matches.
   */
  crossZone?: boolean;

  /**
   * Standard anchor target (e.g., '_blank').
   */
  target?: string;

  /**
   * Standard anchor rel attribute.
   */
  rel?: string;

  /**
   * Optional badge indicator (e.g., 'NEW', 'SALE').
   */
  badge?: React.ReactNode;

  /**
   * Leading or trailing icon.
   */
  icon?: React.ReactNode;

  /**
   * Marks as external link (auto sets target="_blank" and rel="noopener noreferrer").
   */
  external?: boolean;

  /**
   * Custom click handler.
   */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;

  /**
   * Additional CSS classes for this link.
   */
  className?: string;

  /**
   * Custom render function override for this item.
   */
  render?: (props: { item: NavFooterLinkItem }) => React.ReactNode;
}

/**
 * Column of navigation links in the footer (e.g., Shop, Craft, Help).
 */
export interface NavFooterSection {
  /**
   * Unique identifier for the section.
   */
  id: string;

  /**
   * Column section title (e.g. 'SHOP', 'CRAFT', 'HELP').
   */
  title: React.ReactNode;

  /**
   * List of links within this section.
   */
  items: NavFooterLinkItem[];

  /**
   * Whether this section can collapse into an accordion on mobile viewports.
   * @default true
   */
  collapsible?: boolean;

  /**
   * Initial open state on mobile accordion.
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Optional custom className for the column container.
   */
  className?: string;
}

/**
 * Social media link item in the footer.
 */
export interface NavFooterSocialLink {
  /**
   * Platform identifier or name ('instagram' | 'facebook' | 'linkedin' | 'x' | 'twitter' | 'youtube' | 'pinterest' | string).
   */
  name: 'instagram' | 'facebook' | 'linkedin' | 'x' | 'twitter' | 'youtube' | 'pinterest' | string;

  /**
   * Target URL for the social profile.
   */
  href: string;

  /**
   * Custom icon element. If not provided, a built-in SVG is used for recognized platforms.
   */
  icon?: React.ReactNode;

  /**
   * Accessible ARIA label for screen readers.
   */
  ariaLabel?: string;

  /**
   * Target attribute (default: '_blank').
   */
  target?: string;

  /**
   * Rel attribute (default: 'noopener noreferrer').
   */
  rel?: string;

  /**
   * Custom click handler.
   */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;

  /**
   * Additional CSS classes for this social link icon.
   */
  className?: string;
}

/**
 * Brand logo and tagline configuration.
 */
export interface NavFooterBranding {
  /**
   * Brand logo node or image.
   */
  logo?: React.ReactNode;

  /**
   * Short tagline or description below the logo.
   */
  description?: React.ReactNode;

  /**
   * Destination URL when clicking the logo (default: '/').
   */
  href?: string;

  /**
   * Optional zone for multi-zone micro-frontend routing.
   */
  zone?: string;

  /**
   * Alt text / ARIA label for the logo link.
   */
  alt?: string;

  /**
   * Additional CSS classes for the brand block.
   */
  className?: string;

  /**
   * Custom click handler on brand logo.
   */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

/**
 * Registered office and contact information configuration.
 */
export interface NavFooterOfficeConfig {
  /**
   * Block title (default: 'Registered Office:').
   */
  title?: React.ReactNode;

  /**
   * Office address text or custom JSX.
   */
  address?: React.ReactNode;

  /**
   * Optional support / contact email.
   */
  email?: string;

  /**
   * Optional support phone number.
   */
  phone?: string;

  /**
   * Additional custom content rendered beneath the address.
   */
  extraContent?: React.ReactNode;

  /**
   * Additional CSS classes for the office block.
   */
  className?: string;
}

/**
 * Newsletter subscription form configuration.
 */
export interface NavFooterNewsletterConfig {
  /**
   * Explicit toggle to show/hide the newsletter form.
   */
  show?: boolean;

  /**
   * Title for the newsletter block (e.g. 'Stay in the loop').
   */
  title?: React.ReactNode;

  /**
   * Subtitle or explanation for the newsletter.
   */
  description?: React.ReactNode;

  /**
   * Input placeholder text.
   * @default 'Enter your email...'
   */
  placeholder?: string;

  /**
   * Label for the subscribe button.
   * @default 'Subscribe'
   */
  buttonText?: string;

  /**
   * Submit event handler with entered email.
   */
  onSubmit?: (email: string) => void | Promise<void>;

  /**
   * Current submission state.
   */
  status?: 'idle' | 'loading' | 'success' | 'error';

  /**
   * Error message displayed when status is 'error'.
   */
  errorMessage?: string;

  /**
   * Success message displayed when status is 'success'.
   */
  successMessage?: string;

  /**
   * Additional CSS classes for the newsletter block.
   */
  className?: string;
}

/**
 * Legal links and copyright configuration.
 */
export interface NavFooterLegalConfig {
  /**
   * Copyright text (default: '© {year} Timmbr Furniture Co.').
   */
  copyright?: React.ReactNode;

  /**
   * List of legal policy links (e.g., Privacy, Terms, Cookies).
   */
  links?: NavFooterLinkItem[];

  /**
   * Additional JSX rendered on the legal bar.
   */
  extra?: React.ReactNode;

  /**
   * Additional CSS classes for the legal bar.
   */
  className?: string;
}

/**
 * Mobile-specific behavior configuration.
 */
export interface NavFooterMobileConfig {
  /**
   * Whether navigation sections collapse into accordions on mobile (< 768px).
   * @default true
   */
  accordion?: boolean;

  /**
   * Whether multiple accordion sections can be open simultaneously on mobile.
   * @default true
   */
  allowMultipleOpen?: boolean;
}

/**
 * Modular Navigation Configuration Object.
 */
export interface NavFooterNavigationConfig {
  /**
   * Array of column sections.
   */
  sections: NavFooterSection[];

  /**
   * Master visibility toggle for the navigation columns.
   * @default true
   */
  show?: boolean;
}

/**
 * Modular Social Configuration Object.
 */
export interface NavFooterSocialConfig {
  /**
   * Array of social links.
   */
  links: NavFooterSocialLink[];

  /**
   * Optional title above the social icons.
   */
  title?: React.ReactNode;

  /**
   * Master visibility toggle for social links.
   * @default true
   */
  show?: boolean;
}

/**
 * Comprehensive Props for the `NavFooter` component.
 */
export interface NavFooterProps extends MotionProps {
  // =========================================================================
  // 1. MODULAR CONFIGURATION OBJECTS
  // =========================================================================

  /**
   * Brand logo and tagline description.
   */
  branding?: NavFooterBranding;

  /**
   * Structured navigation columns config or array of sections.
   */
  navigation?: NavFooterNavigationConfig | NavFooterSection[];

  /**
   * Structured social media configuration or array of social links.
   */
  social?: NavFooterSocialConfig | NavFooterSocialLink[];

  /**
   * Registered office and contact information configuration.
   */
  office?: NavFooterOfficeConfig & { show?: boolean };

  /**
   * Optional newsletter subscription configuration.
   */
  newsletter?: NavFooterNewsletterConfig;

  /**
   * Legal policy links and copyright configuration.
   */
  legal?: NavFooterLegalConfig & { show?: boolean };

  /**
   * Mobile-specific accordion behavior settings.
   */
  mobile?: NavFooterMobileConfig;

  // =========================================================================
  // 2. FLAT BACKWARDS-COMPATIBLE SHORTHANDS
  // =========================================================================

  /**
   * Shorthand brand logo node.
   */
  logo?: React.ReactNode;

  /**
   * Shorthand brand tagline description.
   */
  description?: React.ReactNode;

  /**
   * Shorthand array of navigation sections.
   */
  sections?: NavFooterSection[];

  /**
   * Shorthand array of social links.
   */
  socialLinks?: NavFooterSocialLink[];

  /**
   * Shorthand office address node or string.
   */
  address?: React.ReactNode;

  /**
   * Shorthand office block title.
   */
  officeTitle?: React.ReactNode;

  /**
   * Shorthand copyright notice.
   */
  copyright?: React.ReactNode;

  /**
   * Shorthand legal policy links.
   */
  legalLinks?: NavFooterLinkItem[];

  // =========================================================================
  // 3. MASTER VISIBILITY TOGGLES
  // =========================================================================

  /**
   * Master toggle for the entire navigation section.
   * @default true
   */
  showNavigation?: boolean;

  /**
   * Master toggle for social icons.
   */
  showSocial?: boolean;

  /**
   * Master toggle for registered office block.
   */
  showOffice?: boolean;

  /**
   * Master toggle for the bottom copyright & legal bar.
   */
  showLegal?: boolean;

  /**
   * Master toggle for the optional newsletter section.
   */
  showNewsletter?: boolean;

  // =========================================================================
  // 4. CONTAINER & ENVIRONMENT CUSTOMIZATION
  // =========================================================================

  /**
   * Maximum container width constraint.
   * @default '2xl' (1440px)
   */
  containerMaxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

  /**
   * Custom Link component injection (e.g. Next.js `next/link`).
   */
  linkComponent?: React.ComponentType<any>;

  /**
   * Additional root container CSS classes.
   */
  className?: string;

  /**
   * Optional custom children to append before the legal bar.
   */
  children?: React.ReactNode;
}
