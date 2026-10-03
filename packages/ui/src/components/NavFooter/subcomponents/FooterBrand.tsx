'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';
import { useTimmbrConfig } from '../../../providers';
import type { NavFooterBranding } from '../NavFooter.types';
import { resolveNavDestination, isCrossZoneNavigation } from '../NavFooter.helpers';

export interface FooterBrandProps {
  branding?: NavFooterBranding;
  linkComponent?: React.ComponentType<any>;
  className?: string;
}

/**
 * Default Timmbr Brand Wordmark SVG with green sprout leaf accent.
 */
export const DefaultFooterWordmark: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 201 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn('h-10 sm:h-11 w-auto shrink-0', className)}
    aria-label="Timmbr Logo"
  >
    <path
      d="M33 9.5C33 9.5 35 2 41 2C42.5 7 38.5 12 33 13.5V9.5Z"
      fill="#4E8752"
    />
    <text
      x="0"
      y="38"
      fill="#D39375"
      fontFamily="Outfit, sans-serif"
      fontWeight="700"
      fontSize="40"
      letterSpacing="-0.02em"
    >
      timmbr
    </text>
  </svg>
);

export const FooterBrand: React.FC<FooterBrandProps> = ({
  branding,
  linkComponent: CustomLink,
  className,
}) => {
  const config = useTimmbrConfig();
  const {
    logo,
    description = 'Solid-wood furniture, made by hand in Portland and built to be kept for life.',
    href = '/',
    zone,
    alt = 'Timmbr Home',
    className: brandClass,
    onClick,
  } = branding || {};

  const resolvedHref = resolveNavDestination(href, zone, config.zones?.zones) ?? '/';
  const requiresCrossZone = isCrossZoneNavigation(zone, config.zones?.currentZone);

  const logoContent = logo ?? <DefaultFooterWordmark />;

  const logoNode = CustomLink && !requiresCrossZone ? (
    <CustomLink
      href={resolvedHref}
      aria-label={alt}
      onClick={onClick}
      className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D39375]/50 rounded-md transition-opacity hover:opacity-90"
      data-slot="footer-brand-link"
    >
      {logoContent}
    </CustomLink>
  ) : (
    <a
      href={resolvedHref}
      aria-label={alt}
      onClick={onClick}
      data-cross-zone={requiresCrossZone ? 'true' : undefined}
      className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D39375]/50 rounded-md transition-opacity hover:opacity-90"
      data-slot="footer-brand-link"
    >
      {logoContent}
    </a>
  );

  return (
    <div
      className={cn('flex flex-col gap-4 items-start max-w-[320px]', brandClass, className)}
      data-slot="footer-brand"
    >
      {logoNode}

      {description && (
        <div
          className="text-sm font-sans text-[#B7AEA2] leading-relaxed select-text"
          data-slot="footer-brand-description"
        >
          {typeof description === 'string' ? (
            <p className="whitespace-pre-line m-0">{description}</p>
          ) : (
            description
          )}
        </div>
      )}
    </div>
  );
};

export default FooterBrand;
