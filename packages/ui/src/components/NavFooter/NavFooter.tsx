'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';
import { useGlobalAnimation } from '../../providers';
import { resolveMotion } from '../../types/motion';
import type {
  NavFooterProps,
  NavFooterBranding,
  NavFooterSection,
  NavFooterSocialLink,
  NavFooterOfficeConfig,
  NavFooterNewsletterConfig,
  NavFooterLegalConfig,
} from './NavFooter.types';
import { navFooterRootVariants, navFooterContainerVariants } from './NavFooter.styles';
import {
  DEFAULT_FOOTER_SECTIONS,
  DEFAULT_FOOTER_SOCIAL_LINKS,
  DEFAULT_FOOTER_LEGAL_LINKS,
} from './NavFooter.helpers';
import { FooterBrand } from './subcomponents/FooterBrand';
import { FooterNavSection } from './subcomponents/FooterNavSection';
import { FooterSocial } from './subcomponents/FooterSocial';
import { FooterOffice } from './subcomponents/FooterOffice';
import { FooterNewsletter } from './subcomponents/FooterNewsletter';
import { FooterLegalBar } from './subcomponents/FooterLegalBar';

export const NavFooter = React.forwardRef<HTMLElement, NavFooterProps>(
  (props: NavFooterProps, ref) => {
    const {
      // 1. Modular Configuration Objects
      branding: brandingProp,
      navigation: navigationProp,
      social: socialProp,
      office: officeProp,
      newsletter: newsletterProp,
      legal: legalProp,
      mobile: mobileProp,

      // 2. Flat Shorthands
      logo,
      description,
      sections: sectionsProp,
      socialLinks: socialLinksProp,
      address,
      officeTitle,
      copyright,
      legalLinks,

      // 3. Section Visibility Toggles
      showNavigation: showNavProp,
      showSocial: showSocialProp,
      showOffice: showOfficeProp,
      showLegal: showLegalProp,
      showNewsletter: showNewsletterProp,

      // 4. Container & Customization
      containerMaxWidth = '2xl',
      linkComponent,
      motion: motionProp,
      className,
      children,
      ...rest
    } = props;

    // --- Motion Resolution ---
    const globalMotion = useGlobalAnimation();
    const { shouldAnimate, motionClass, dataAttributes } = resolveMotion(motionProp, globalMotion);

    // =========================================================================
    // Normalization Layer: Config Objects vs. Shorthand Props
    // =========================================================================

    // 1. Branding
    const resolvedBranding: NavFooterBranding = React.useMemo(() => {
      return {
        logo: brandingProp?.logo ?? logo,
        description: brandingProp?.description ?? description,
        href: brandingProp?.href ?? '/',
        zone: brandingProp?.zone,
        alt: brandingProp?.alt ?? 'Timmbr Home',
        className: brandingProp?.className,
        onClick: brandingProp?.onClick,
      };
    }, [brandingProp, logo, description]);

    // 2. Navigation
    const { resolvedSections, isNavigationVisible } = React.useMemo(() => {
      let sections: NavFooterSection[] = DEFAULT_FOOTER_SECTIONS;
      let isVisible = true;

      if (Array.isArray(navigationProp)) {
        sections = navigationProp;
      } else if (navigationProp && typeof navigationProp === 'object') {
        sections = navigationProp.sections ?? DEFAULT_FOOTER_SECTIONS;
        if (typeof navigationProp.show === 'boolean') isVisible = navigationProp.show;
      } else if (sectionsProp) {
        sections = sectionsProp;
      }

      if (typeof showNavProp === 'boolean') {
        isVisible = showNavProp;
      }

      return { resolvedSections: sections, isNavigationVisible: isVisible };
    }, [navigationProp, sectionsProp, showNavProp]);

    // 3. Social
    const { resolvedSocialLinks, socialTitle, isSocialVisible } = React.useMemo(() => {
      let links: NavFooterSocialLink[] = DEFAULT_FOOTER_SOCIAL_LINKS;
      let title: React.ReactNode | undefined = undefined;
      let isVisible = true;

      if (Array.isArray(socialProp)) {
        links = socialProp;
      } else if (socialProp && typeof socialProp === 'object') {
        links = socialProp.links ?? DEFAULT_FOOTER_SOCIAL_LINKS;
        title = socialProp.title;
        if (typeof socialProp.show === 'boolean') isVisible = socialProp.show;
      } else if (socialLinksProp) {
        links = socialLinksProp;
      }

      if (typeof showSocialProp === 'boolean') {
        isVisible = showSocialProp;
      }

      return { resolvedSocialLinks: links, socialTitle: title, isSocialVisible: isVisible };
    }, [socialProp, socialLinksProp, showSocialProp]);

    // 4. Office
    const { resolvedOffice, isOfficeVisible } = React.useMemo(() => {
      const office: NavFooterOfficeConfig = {
        title: officeProp?.title ?? officeTitle ?? 'Registered Office:',
        address: officeProp?.address ?? address ?? 'Timmbr Furnitures SABN Kallappa Layout, Ashwini Extenstion, Chintamani Karnataka 563125',
        email: officeProp?.email,
        phone: officeProp?.phone,
        extraContent: officeProp?.extraContent,
        className: officeProp?.className,
      };

      let isVisible = true;
      if (officeProp && typeof officeProp === 'object' && typeof officeProp.show === 'boolean') {
        isVisible = officeProp.show;
      }
      if (typeof showOfficeProp === 'boolean') {
        isVisible = showOfficeProp;
      }

      return { resolvedOffice: office, isOfficeVisible: isVisible };
    }, [officeProp, officeTitle, address, showOfficeProp]);

    // 5. Newsletter
    const { resolvedNewsletter, isNewsletterVisible } = React.useMemo(() => {
      const newsletter: NavFooterNewsletterConfig = {
        title: newsletterProp?.title ?? 'Stay in the loop',
        description: newsletterProp?.description ?? 'Sign up for our newsletter to receive updates and exclusive offers.',
        placeholder: newsletterProp?.placeholder ?? 'Enter your email...',
        buttonText: newsletterProp?.buttonText ?? 'Subscribe',
        onSubmit: newsletterProp?.onSubmit,
        status: newsletterProp?.status,
        errorMessage: newsletterProp?.errorMessage,
        successMessage: newsletterProp?.successMessage,
        className: newsletterProp?.className,
      };

      let isVisible = Boolean(newsletterProp?.show);
      if (typeof showNewsletterProp === 'boolean') {
        isVisible = showNewsletterProp;
      }

      return { resolvedNewsletter: newsletter, isNewsletterVisible: isVisible };
    }, [newsletterProp, showNewsletterProp]);

    // 6. Legal Bar
    const { resolvedLegal, isLegalVisible } = React.useMemo(() => {
      const currentYear = new Date().getFullYear();
      const legal: NavFooterLegalConfig = {
        copyright: legalProp?.copyright ?? copyright ?? `© ${currentYear} Timmbr Furniture Co.`,
        links: legalProp?.links ?? legalLinks ?? DEFAULT_FOOTER_LEGAL_LINKS,
        extra: legalProp?.extra,
        className: legalProp?.className,
      };

      let isVisible = true;
      if (legalProp && typeof legalProp === 'object' && typeof legalProp.show === 'boolean') {
        isVisible = legalProp.show;
      }
      if (typeof showLegalProp === 'boolean') {
        isVisible = showLegalProp;
      }

      return { resolvedLegal: legal, isLegalVisible: isVisible };
    }, [legalProp, copyright, legalLinks, showLegalProp]);

    // 7. Mobile Accordion State
    const isAccordionEnabled = mobileProp?.accordion ?? true;
    const allowMultipleOpen = mobileProp?.allowMultipleOpen ?? true;

    const [openSectionIds, setOpenSectionIds] = React.useState<Set<string>>(() => {
      const initial = new Set<string>();
      resolvedSections.forEach((sec) => {
        if (sec.defaultOpen) initial.add(sec.id);
      });
      return initial;
    });

    const handleSectionToggle = (sectionId: string) => {
      setOpenSectionIds((prev) => {
        const next = new Set(prev);
        if (next.has(sectionId)) {
          next.delete(sectionId);
        } else {
          if (!allowMultipleOpen) {
            next.clear();
          }
          next.add(sectionId);
        }
        return next;
      });
    };

    return (
      <footer
        ref={ref}
        role="contentinfo"
        data-slot="nav-footer"
        className={cn(navFooterRootVariants(), className)}
        {...dataAttributes}
        {...rest}
      >
        <div
          className={cn(
            navFooterContainerVariants({ maxWidth: containerMaxWidth }),
            'pt-12 sm:pt-14 md:pt-16 pb-6'
          )}
          data-slot="nav-footer-inner"
        >
          {/* Main Content Layout */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-10 sm:gap-12 lg:gap-14 xl:gap-20">
            {/* Column 1: Brand & Tagline */}
            <div className="shrink-0">
              <FooterBrand
                branding={resolvedBranding}
                linkComponent={linkComponent}
              />
            </div>

            {/* Column 2-4: Navigation Columns */}
            {isNavigationVisible && resolvedSections.length > 0 && (
              <div
                className="w-full lg:flex-1 grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-8 lg:gap-12 xl:gap-16"
                data-slot="footer-nav-grid"
              >
                {resolvedSections.map((sec) => (
                  <FooterNavSection
                    key={sec.id}
                    section={sec}
                    isMobileAccordion={isAccordionEnabled}
                    isOpen={openSectionIds.has(sec.id)}
                    onToggle={() => handleSectionToggle(sec.id)}
                    shouldAnimate={shouldAnimate}
                    motionClass={motionClass}
                    linkComponent={linkComponent}
                  />
                ))}
              </div>
            )}

            {/* Column 5: Social Icons & Registered Office / Newsletter */}
            <div className="flex flex-col gap-8 shrink-0 max-w-[320px] w-full">
              {isSocialVisible && resolvedSocialLinks.length > 0 && (
                <FooterSocial
                  links={resolvedSocialLinks}
                  title={socialTitle}
                  shouldAnimate={shouldAnimate}
                  motionClass={motionClass}
                />
              )}

              {isOfficeVisible && (
                <FooterOffice office={resolvedOffice} />
              )}

              {isNewsletterVisible && (
                <FooterNewsletter newsletter={resolvedNewsletter} />
              )}
            </div>
          </div>

          {/* Optional Children slot */}
          {children && <div className="mt-8 mb-4">{children}</div>}

          {/* Bottom Bordered Copyright & Legal Bar */}
          {isLegalVisible && (
            <div className="mt-12 sm:mt-14 md:mt-16">
              <FooterLegalBar
                legal={resolvedLegal}
                linkComponent={linkComponent}
              />
            </div>
          )}
        </div>
      </footer>
    );
  }
);

NavFooter.displayName = 'NavFooter';

/**
 * Convenience alias for `NavFooter`.
 */
export const Footer = NavFooter;

export default NavFooter;
