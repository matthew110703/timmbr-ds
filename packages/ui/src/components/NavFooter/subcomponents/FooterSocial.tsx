'use client';

import * as React from 'react';
import { motion, footerSocialHoverVariants } from '@timmbr/motion';
import { cn } from '@timmbr/utils';
import type { NavFooterSocialLink } from '../NavFooter.types';
import { footerSocialButtonVariants } from '../NavFooter.styles';
import { DefaultSocialIcons } from '../NavFooter.helpers';

export interface FooterSocialProps {
  links?: NavFooterSocialLink[];
  title?: React.ReactNode;
  shouldAnimate?: boolean;
  motionClass?: string;
  className?: string;
}

export const FooterSocial: React.FC<FooterSocialProps> = ({
  links = [],
  title,
  shouldAnimate = true,
  motionClass,
  className,
}) => {
  if (!links || links.length === 0) return null;

  return (
    <div className={cn('flex flex-col gap-3', className)} data-slot="footer-social">
      {title && (
        <div className="text-xs font-semibold text-[#D39375] uppercase tracking-[0.14em] font-title">
          {title}
        </div>
      )}

      <div className="flex items-center gap-4 sm:gap-6 flex-wrap" data-slot="footer-social-icons">
        {links.map((link) => {
          const platformKey = link.name.toLowerCase();
          const iconElement = link.icon ?? DefaultSocialIcons[platformKey] ?? (
            <span className="text-sm uppercase font-bold">{link.name.slice(0, 2)}</span>
          );

          const defaultAria = `Follow us on ${link.name.charAt(0).toUpperCase() + link.name.slice(1)}`;

          return (
            <motion.a
              key={`${link.name}-${link.href}`}
              href={link.href}
              target={link.target ?? '_blank'}
              rel={link.rel ?? 'noopener noreferrer'}
              aria-label={link.ariaLabel ?? defaultAria}
              onClick={link.onClick}
              variants={shouldAnimate ? footerSocialHoverVariants : undefined}
              initial="initial"
              whileHover={shouldAnimate ? 'hover' : undefined}
              whileTap={shouldAnimate ? 'tap' : undefined}
              className={cn(
                footerSocialButtonVariants(),
                'relative p-1.5 text-[#D39375] hover:text-[#F7F1E6] transition-colors',
                motionClass,
                link.className
              )}
              data-slot="footer-social-link"
              data-platform={link.name}
            >
              {iconElement}
            </motion.a>
          );
        })}
      </div>
    </div>
  );
};

export default FooterSocial;
