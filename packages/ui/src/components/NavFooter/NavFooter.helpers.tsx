import * as React from 'react';
import { resolveZoneHref } from '../../providers';
import type { NavFooterSection, NavFooterLinkItem, NavFooterSocialLink } from './NavFooter.types';

/**
 * Resolves full destination URL across micro-frontends and zones.
 */
export function resolveNavDestination(
  href?: string,
  zone?: string,
  zones?: Record<string, string>
): string | undefined {
  if (!href) return undefined;
  return resolveZoneHref(href, zone, zones);
}

/**
 * Checks if link requires cross-origin / cross-zone full page load.
 */
export function isCrossZoneNavigation(
  zone?: string,
  currentZone?: string,
  explicitCrossZone?: boolean
): boolean {
  if (explicitCrossZone) return true;
  if (!zone) return false;
  if (!currentZone) return true;
  return zone !== currentZone;
}

/**
 * Built-in Social Icon SVGs matching Figma design system specifications.
 */
export const DefaultSocialIcons: Record<string, React.ReactNode> = {
  instagram: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ),
  facebook: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  linkedin: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  x: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  twitter: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  youtube: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
    </svg>
  ),
  pinterest: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
    </svg>
  ),
};

/**
 * Default sample sections from Figma design for out-of-the-box usage.
 */
export const DEFAULT_FOOTER_SECTIONS: NavFooterSection[] = [
  {
    id: 'shop',
    title: 'Shop',
    items: [
      { id: 'sofas', label: "Sofa's", href: '/shop/sofas' },
      { id: 'living', label: 'Living', href: '/shop/living' },
      { id: 'bedroom', label: 'Bedroom', href: '/shop/bedroom' },
      { id: 'office', label: 'Office', href: '/shop/office' },
      { id: 'dining', label: 'Dining', href: '/shop/dining' },
    ],
  },
  {
    id: 'craft',
    title: 'Craft',
    items: [
      { id: 'materials', label: 'Our materials', href: '/craft/materials' },
      { id: 'workshop', label: 'The workshop', href: '/craft/workshop' },
      { id: 'sustainability', label: 'Sustainability', href: '/craft/sustainability' },
      { id: 'care', label: 'Care guide', href: '/craft/care-guide' },
    ],
  },
  {
    id: 'help',
    title: 'Help',
    items: [
      { id: 'contact', label: 'Contact Us', href: '/help/contact' },
      { id: 'delivery', label: 'Delivery', href: '/help/delivery' },
      { id: 'returns', label: 'Returns', href: '/help/returns' },
      { id: 'warranty', label: 'Warranty', href: '/help/warranty' },
    ],
  },
];

/**
 * Default sample social links from Figma design.
 */
export const DEFAULT_FOOTER_SOCIAL_LINKS: NavFooterSocialLink[] = [
  { name: 'instagram', href: 'https://instagram.com/timmbr', ariaLabel: 'Follow us on Instagram' },
  { name: 'facebook', href: 'https://facebook.com/timmbr', ariaLabel: 'Follow us on Facebook' },
  { name: 'linkedin', href: 'https://linkedin.com/company/timmbr', ariaLabel: 'Connect on LinkedIn' },
  { name: 'x', href: 'https://x.com/timmbr', ariaLabel: 'Follow us on X' },
];

/**
 * Default sample legal links.
 */
export const DEFAULT_FOOTER_LEGAL_LINKS: NavFooterLinkItem[] = [
  { id: 'privacy', label: 'Privacy', href: '/privacy' },
  { id: 'terms', label: 'Terms', href: '/terms' },
];
