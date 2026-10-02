'use client';

import * as React from 'react';
import { motion, AnimatePresence, collapseVariants, getTransition } from '@timmbr/motion';
import { X } from '@timmbr/icons';
import { cn } from '@timmbr/utils';
import { useTimmbrConfig } from '../../../providers';
import { offerBannerVariants } from '../NavHeader.styles';
import type { OfferBannerConfig } from '../NavHeader.types';
import { resolveNavDestination, isCrossZoneNavigation } from '../NavHeader.helpers';

export interface OfferBannerProps {
  banner?: OfferBannerConfig | React.ReactNode | boolean;
  show?: boolean;
  shouldAnimate?: boolean;
  motionClass?: string;
  linkComponent?: React.ComponentType<any>;
}

export const OfferBanner: React.FC<OfferBannerProps> = ({
  banner,
  show = true,
  shouldAnimate = true,
  motionClass,
  linkComponent: CustomLink,
}) => {
  const [dismissed, setDismissed] = React.useState(false);
  const config = useTimmbrConfig();

  if (!show || banner === false || banner === null || banner === undefined || dismissed) {
    return null;
  }

  // If banner is a pure ReactNode
  if (React.isValidElement(banner) || typeof banner === 'string' || typeof banner === 'number') {
    return (
      <div className={offerBannerVariants()} data-slot="nav-offer-banner">
        {banner}
      </div>
    );
  }

  const bannerConfig = banner as OfferBannerConfig;
  const { content, href, zone, crossZone, dismissible = false, onDismiss, action, className } = bannerConfig;

  const resolvedHref = resolveNavDestination(href, zone, config.zones?.zones);
  const requiresCrossZone = isCrossZoneNavigation(zone, config.zones?.currentZone, crossZone);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDismissed(true);
    onDismiss?.();
  };

  const renderContent = () => {
    if (resolvedHref) {
      if (CustomLink && !requiresCrossZone) {
        return (
          <CustomLink href={resolvedHref} className="hover:underline flex items-center gap-2">
            <span>{content}</span>
            {action && <span className="ml-2">{action}</span>}
          </CustomLink>
        );
      }
      return (
        <a
          href={resolvedHref}
          data-cross-zone={requiresCrossZone ? 'true' : undefined}
          className="hover:underline flex items-center gap-2"
        >
          <span>{content}</span>
          {action && <span className="ml-2">{action}</span>}
        </a>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <span>{content}</span>
        {action && <span className="ml-2">{action}</span>}
      </div>
    );
  };

  return (
    <AnimatePresence initial={false}>
      {!dismissed && (
        <motion.div
          initial={shouldAnimate ? 'visible' : false}
          exit={shouldAnimate ? 'exit' : undefined}
          variants={shouldAnimate ? collapseVariants : undefined}
          transition={getTransition('fast')}
          data-slot="nav-offer-banner"
          className={cn(
            offerBannerVariants(),
            !shouldAnimate && 'transition-none',
            motionClass,
            className
          )}
        >
          <div className="flex items-center justify-center w-full px-8 text-center">
            {renderContent()}
          </div>

          {dismissible && (
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dismiss offer banner"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#F7F1E6]/70 hover:text-[#F7F1E6] hover:bg-white/10 rounded transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
            >
              <X size={14} />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
