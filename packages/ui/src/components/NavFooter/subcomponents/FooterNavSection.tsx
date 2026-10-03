'use client';

import * as React from 'react';
import { motion, AnimatePresence, footerAccordionVariants, footerChevronVariants } from '@timmbr/motion';
import { ChevronDown } from '@timmbr/icons';
import { cn } from '@timmbr/utils';
import { useTimmbrConfig } from '../../../providers';
import type { NavFooterSection, NavFooterLinkItem } from '../NavFooter.types';
import { footerSectionTitleVariants, footerNavLinkVariants } from '../NavFooter.styles';
import { resolveNavDestination, isCrossZoneNavigation } from '../NavFooter.helpers';

export interface FooterNavSectionProps {
  section: NavFooterSection;
  isMobileAccordion?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
  shouldAnimate?: boolean;
  motionClass?: string;
  linkComponent?: React.ComponentType<any>;
  className?: string;
}

export const FooterNavSection: React.FC<FooterNavSectionProps> = ({
  section,
  isMobileAccordion = true,
  isOpen = false,
  onToggle,
  shouldAnimate = true,
  motionClass,
  linkComponent: CustomLink,
  className,
}) => {
  const config = useTimmbrConfig();
  const { id, title, items = [], collapsible = true, className: sectionClass } = section;

  const contentId = `footer-section-content-${id}`;
  const headerId = `footer-section-header-${id}`;

  const renderLink = (item: NavFooterLinkItem) => {
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

    const linkContent = (
      <>
        {item.icon && <span className="shrink-0">{item.icon}</span>}
        <span>{item.label}</span>
        {item.badge && (
          <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#D39375] text-[#1A1714] uppercase tracking-wider">
            {item.badge}
          </span>
        )}
      </>
    );

    const linkProps = {
      href: resolvedHref,
      target: item.target ?? (isExternal ? '_blank' : undefined),
      rel: item.rel ?? (isExternal ? 'noopener noreferrer' : undefined),
      onClick: item.onClick,
      className: cn(footerNavLinkVariants(), item.className),
      'data-cross-zone': requiresCrossZone ? 'true' : undefined,
      'data-slot': 'footer-nav-link',
    };

    return (
      <li key={item.id ?? String(item.label)} className="list-none">
        {CustomLink && !requiresCrossZone && !isExternal ? (
          <CustomLink {...linkProps}>{linkContent}</CustomLink>
        ) : (
          <a {...linkProps}>{linkContent}</a>
        )}
      </li>
    );
  };

  const linksList = (
    <ul
      id={contentId}
      role="region"
      aria-labelledby={headerId}
      className="flex flex-col gap-3.5 pt-1 pb-3 md:py-0 list-none p-0 m-0"
      data-slot="footer-nav-links-list"
    >
      {items.map(renderLink)}
    </ul>
  );

  return (
    <div
      className={cn(
        'flex flex-col border-b border-white/10 md:border-b-0 py-3 md:py-0 transition-colors',
        sectionClass,
        className
      )}
      data-slot="footer-nav-section"
      data-section-id={id}
    >
      {/* Mobile Accordion Header Button */}
      {isMobileAccordion && collapsible ? (
        <div className="md:hidden">
          <button
            id={headerId}
            type="button"
            aria-expanded={isOpen}
            aria-controls={contentId}
            onClick={onToggle}
            className={cn(
              footerSectionTitleVariants(),
              'py-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D39375]/50 rounded'
            )}
            data-slot="footer-section-accordion-trigger"
          >
            <span>{title}</span>
            <motion.span
              variants={shouldAnimate ? footerChevronVariants : undefined}
              initial={false}
              animate={shouldAnimate ? (isOpen ? 'expanded' : 'collapsed') : undefined}
              className={cn(
                'shrink-0 text-[#D39375] transition-transform duration-200',
                !shouldAnimate && (isOpen ? 'rotate-180' : 'rotate-0'),
                motionClass
              )}
            >
              <ChevronDown size={18} className="stroke-[2]" />
            </motion.span>
          </button>

          {/* Mobile Collapsible Content */}
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={shouldAnimate ? 'hidden' : false}
                animate={shouldAnimate ? 'visible' : undefined}
                exit={shouldAnimate ? 'exit' : undefined}
                variants={shouldAnimate ? footerAccordionVariants : undefined}
                className={cn('overflow-hidden', motionClass)}
              >
                {linksList}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : null}

      {/* Desktop Column Static Header & Links */}
      <div className={cn(isMobileAccordion && collapsible ? 'hidden md:flex flex-col gap-5' : 'flex flex-col gap-5')}>
        <div className={footerSectionTitleVariants()} data-slot="footer-section-title">
          <span>{title}</span>
        </div>
        {linksList}
      </div>
    </div>
  );
};

export default FooterNavSection;
