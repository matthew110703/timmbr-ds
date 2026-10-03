'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';
import { useTimmbrConfig } from '../../../providers';
import type { NavFooterLegalConfig, NavFooterLinkItem } from '../NavFooter.types';
import { footerLegalBarVariants, footerLegalLinkVariants } from '../NavFooter.styles';
import { resolveNavDestination, isCrossZoneNavigation, DEFAULT_FOOTER_LEGAL_LINKS } from '../NavFooter.helpers';

export interface FooterLegalBarProps {
  legal?: NavFooterLegalConfig;
  linkComponent?: React.ComponentType<any>;
  className?: string;
}

export const FooterLegalBar: React.FC<FooterLegalBarProps> = ({
  legal,
  linkComponent: CustomLink,
  className,
}) => {
  const config = useTimmbrConfig();
  const currentYear = new Date().getFullYear();

  const {
    copyright = `© ${currentYear} Timmbr Furniture Co.`,
    links = DEFAULT_FOOTER_LEGAL_LINKS,
    extra,
    className: legalClass,
  } = legal || {};

  const renderLegalLink = (item: NavFooterLinkItem) => {
    if (item.render) {
      return (
        <li key={item.id ?? String(item.label)} className="list-none">
          {item.render({ item })}
        </li>
      );
    }

    const resolvedHref = resolveNavDestination(item.href, item.zone, config.zones?.zones) ?? '#';
    const requiresCrossZone = isCrossZoneNavigation(item.zone, config.zones?.currentZone, item.crossZone);
    const isExternal = item.external || item.href.startsWith('http://') || item.href.startsWith('https://');

    const linkProps = {
      href: resolvedHref,
      target: item.target ?? (isExternal ? '_blank' : undefined),
      rel: item.rel ?? (isExternal ? 'noopener noreferrer' : undefined),
      onClick: item.onClick,
      className: cn(footerLegalLinkVariants(), item.className),
      'data-cross-zone': requiresCrossZone ? 'true' : undefined,
      'data-slot': 'footer-legal-link',
    };

    return (
      <li key={item.id ?? String(item.label)} className="list-none">
        {CustomLink && !requiresCrossZone && !isExternal ? (
          <CustomLink {...linkProps}>{item.label}</CustomLink>
        ) : (
          <a {...linkProps}>{item.label}</a>
        )}
      </li>
    );
  };

  return (
    <div
      className={cn(footerLegalBarVariants(), legalClass, className)}
      data-slot="footer-legal-bar"
    >
      {/* Copyright Notice */}
      <div className="select-text" data-slot="footer-copyright">
        {typeof copyright === 'string' ? <span>{copyright}</span> : copyright}
      </div>

      {/* Extra Legal or Badge items if provided */}
      {extra && <div className="text-xs text-[#B7AEA2]">{extra}</div>}

      {/* Legal Policy Links */}
      {links && links.length > 0 && (
        <ul
          className="flex items-center gap-4 sm:gap-6 flex-wrap list-none p-0 m-0"
          data-slot="footer-legal-links"
        >
          {links.map(renderLegalLink)}
        </ul>
      )}
    </div>
  );
};

export default FooterLegalBar;
