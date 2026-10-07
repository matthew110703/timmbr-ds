'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';
import { authModalBannerVariants } from '../AuthModal.styles';
import type { AuthModalBannerProps } from '../AuthModal.types';

/**
 * Promotional side panel (≥ sm). All content comes from the consumer (CMS);
 * without an image the banner isn't rendered at all.
 */
export function AuthModalBanner({ data, promoTermsUrl, className }: AuthModalBannerProps) {
  if (!data?.imageUrl) return null;

  const brandIcon = data.iconUrl || data.logoUrl;

  return (
    <div data-slot="auth-modal-banner" className={cn(authModalBannerVariants(), className)}>
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-0">
        {/* lazy: browsers skip lazy images that aren't rendered (banner is hidden < sm) */}
        <img
          src={data.imageUrl}
          alt=""
          width={320}
          height={454}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-grey-1000/20" />
      </div>

      {(brandIcon || data.title || data.subtitle) && (
        <div className="relative z-10 flex items-center gap-3 pt-2">
          {brandIcon && (
            <img
              src={brandIcon}
              alt=""
              width={56}
              height={56}
              loading="lazy"
              decoding="async"
              className="size-14 object-contain"
            />
          )}
          <div className="text-grey-50 text-left leading-tight">
            {data.title && (
              <p className="text-h4 tracking-[1.4px]">{data.title}</p>
            )}
            {data.subtitle && (
              <p className="font-medium text-body-2 tracking-[0.7px]">{data.subtitle}</p>
            )}
          </div>
        </div>
      )}

      {(data.promoBadge || data.termsNotice) && (
        <div className="relative z-10 flex flex-col items-start gap-4 pb-2">
          {data.promoBadge && (
            <div className="bg-primary-400 px-3.5 py-1.5 rounded-sm shadow-sm">
              <span className="text-grey-50 font-semibold text-body-3 tracking-wider uppercase">
                {data.promoBadge}
              </span>
            </div>
          )}
          {data.termsNotice &&
            (promoTermsUrl ? (
              <a
                href={promoTermsUrl}
                className="text-grey-50/80 hover:text-grey-50 text-body-3 underline underline-offset-2 transition-colors"
              >
                {data.termsNotice}
              </a>
            ) : (
              <p className="text-grey-50/80 text-body-3">{data.termsNotice}</p>
            ))}
        </div>
      )}
    </div>
  );
}

AuthModalBanner.displayName = 'AuthModalBanner';
