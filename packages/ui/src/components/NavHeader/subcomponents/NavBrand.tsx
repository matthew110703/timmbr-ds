'use client';

import * as React from 'react';
import { motion } from '@timmbr/motion';
import { cn } from '@timmbr/utils';
import { useTimmbrConfig } from '../../../providers';
import type { NavHeaderBranding } from '../NavHeader.types';
import { resolveNavDestination, isCrossZoneNavigation } from '../NavHeader.helpers';

const BRAND_FADE = { duration: 0.2, ease: [0.16, 1, 0.3, 1] } as const;

export interface NavBrandProps {
  branding: NavHeaderBranding;
  isSearchOpen?: boolean;
  shouldAnimate?: boolean;
  motionClass?: string;
  linkComponent?: React.ComponentType<any>;
}

export const NavBrand: React.FC<NavBrandProps> = ({
  branding,
  isSearchOpen = false,
  shouldAnimate = true,
  motionClass,
  linkComponent: CustomLink,
}) => {
  const config = useTimmbrConfig();
  const { logo, miniLogo, href = '/', zone, alt = 'Brand Home', className, onClick } = branding;

  const resolvedHref = resolveNavDestination(href, zone, config.zones?.zones) ?? '/';
  const requiresCrossZone = isCrossZoneNavigation(zone, config.zones?.currentZone);

  const showMini = Boolean(isSearchOpen && miniLogo);

  // Both logos stay mounted and cross-fade, so neither pops in/out (and the
  // mini logo's image is already loaded before it's first shown). Opacity is
  // animated by motion only: a CSS opacity transition on the same element
  // would fight it frame by frame and flicker.
  const visible = { opacity: 1, scale: 1 };
  const hidden = { opacity: 0, scale: 0.92 };

  const logoNode = (
    <div
      className="relative flex items-center justify-center shrink-0 min-w-[32px] h-8"
      data-slot="nav-brand-logo"
    >
      {/* Full Brand Logo */}
      <motion.div
        initial={false}
        animate={showMini ? hidden : visible}
        transition={shouldAnimate ? BRAND_FADE : { duration: 0 }}
        aria-hidden={showMini || undefined}
        className={cn(
          'flex items-center justify-center shrink-0 will-change-[opacity,transform]',
          showMini ? 'pointer-events-none' : 'pointer-events-auto',
          motionClass
        )}
      >
        {logo}
      </motion.div>

      {/* Mini Brand Logo - absolute overlay, so swapping causes no layout shift */}
      {miniLogo && (
        <motion.div
          initial={false}
          animate={showMini ? visible : hidden}
          transition={shouldAnimate ? BRAND_FADE : { duration: 0 }}
          aria-hidden={!showMini || undefined}
          className={cn(
            'absolute inset-0 flex items-center justify-center shrink-0 will-change-[opacity,transform]',
            showMini ? 'pointer-events-auto' : 'pointer-events-none',
            motionClass
          )}
        >
          {miniLogo}
        </motion.div>
      )}
    </div>
  );

  const wrapperClass = cn(
    'inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-md transition-transform',
    className
  );

  if (CustomLink && !requiresCrossZone) {
    return (
      <CustomLink
        href={resolvedHref}
        aria-label={alt}
        className={wrapperClass}
        onClick={onClick}
        data-slot="nav-brand-link"
      >
        {logoNode}
      </CustomLink>
    );
  }

  return (
    <a
      href={resolvedHref}
      aria-label={alt}
      data-cross-zone={requiresCrossZone ? 'true' : undefined}
      data-slot="nav-brand-link"
      className={wrapperClass}
      onClick={onClick}
    >
      {logoNode}
    </a>
  );
};

export default NavBrand;
