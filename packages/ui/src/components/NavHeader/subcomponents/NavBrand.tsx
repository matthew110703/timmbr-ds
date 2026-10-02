'use client';

import * as React from 'react';
import { motion } from '@timmbr/motion';
import { cn } from '@timmbr/utils';
import { useTimmbrConfig } from '../../../providers';
import type { NavHeaderBranding } from '../NavHeader.types';
import { resolveNavDestination, isCrossZoneNavigation } from '../NavHeader.helpers';

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

  const logoNode = (
    <div
      className="relative flex items-center justify-center shrink-0 min-w-[32px] h-8"
      data-slot="nav-brand-logo"
    >
      {/* Full Brand Logo */}
      <motion.div
        initial={false}
        animate={
          shouldAnimate
            ? {
                opacity: showMini ? 0 : 1,
                scale: showMini ? 0.92 : 1,
              }
            : undefined
        }
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'flex items-center justify-center shrink-0 transition-opacity',
          showMini ? 'pointer-events-none' : 'pointer-events-auto',
          !shouldAnimate && (showMini ? 'opacity-0' : 'opacity-100'),
          motionClass
        )}
      >
        {logo}
      </motion.div>

      {/* Mini Brand Logo - Absolute center overlay to eliminate layout shift */}
      {showMini && (
        <motion.div
          initial={shouldAnimate ? { opacity: 0, scale: 0.92 } : false}
          animate={
            shouldAnimate
              ? {
                  opacity: 1,
                  scale: 1,
                }
              : undefined
          }
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            'absolute inset-0 flex items-center justify-center shrink-0 pointer-events-auto',
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
