'use client';

import * as React from 'react';
import NextLink from 'next/link';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@timmbr/utils';
import { SpinnerIcon } from '@timmbr/icons';
import { useTimmbrConfig, useGlobalAnimation, resolveZoneHref } from '../../providers';
import { resolveMotion } from '../../types/motion';
import { linkButtonVariants } from './LinkButton.styles';
import type { LinkButtonProps } from './LinkButton.types';

/**
 * LinkButton is a unified navigation component for internal, cross-zone, and external links.
 * 
 * NAVIGATION RULES:
 * 1. Internal same-zone navigation: Uses Next.js `next/link` by default for client-side SPA routing and prefetching.
 * 2. Cross-zone boundary navigation: Uses native HTML `<a>` navigation when `crossZone={true}` or when `zone` points
 *    to an external zone. NEVER use `next/link` across zone boundaries.
 * 3. Default variant: Styled as a link by default, with button visual styling available via variant props.
 */
export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    {
      className,
      style,
      variant,
      size,
      asChild = false,
      motion,
      leftIcon,
      rightIcon,
      loading = false,
      loadingText,
      disabled = false,
      href,
      zone,
      crossZone = false,
      prefetch,
      replace,
      scroll,
      target,
      rel,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const config = useTimmbrConfig();
    const globalMotion = useGlobalAnimation();

    const resolvedVariant =
      variant ?? config.components?.button?.defaultVariant ?? 'default';
    const resolvedSize =
      size ?? config.components?.button?.defaultSize ?? 'default';

    const { shouldAnimate, motionClass } = resolveMotion(motion, globalMotion);
    const isDisabled = disabled || loading;

    const resolvedHref = href ? resolveZoneHref(href, zone, config.zones?.zones) : undefined;

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (isDisabled) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      onClick?.(e);
    };

    const buttonClassName = cn(
      linkButtonVariants({
        variant: resolvedVariant,
        size: resolvedSize,
        disabled: isDisabled,
        className,
      }),
      !shouldAnimate && 'transition-none active:scale-100',
      motionClass
    );

    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={buttonClassName}
          style={style}
          data-slot="link-button"
          aria-disabled={isDisabled ? 'true' : undefined}
          tabIndex={isDisabled ? -1 : props.tabIndex}
          onClick={handleClick}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    const content = loading ? (
      <>
        <SpinnerIcon size={resolvedSize === 'sm' ? 14 : 18} />
        {loadingText ? <span>{loadingText}</span> : children}
      </>
    ) : (
      <>
        {leftIcon && (
          <span
            className="inline-flex shrink-0 items-center justify-center pointer-events-none"
            data-slot="link-button-left-icon"
          >
            {leftIcon}
          </span>
        )}
        {children && <span>{children}</span>}
        {rightIcon && (
          <span
            className="inline-flex shrink-0 items-center justify-center pointer-events-none"
            data-slot="link-button-right-icon"
          >
            {rightIcon}
          </span>
        )}
      </>
    );

    // 1. Disabled or loading state: render inert anchor without href to prevent prefetching and navigation
    if (isDisabled) {
      return (
        <a
          ref={ref}
          data-slot="link-button"
          data-testid="timmbr-link-button"
          aria-disabled="true"
          tabIndex={-1}
          style={style}
          onClick={handleClick}
          className={buttonClassName}
          {...props}
        >
          {content}
        </a>
      );
    }

    const isExternal =
      Boolean(resolvedHref) &&
      (resolvedHref!.startsWith('http://') ||
        resolvedHref!.startsWith('https://') ||
        resolvedHref!.startsWith('mailto:') ||
        resolvedHref!.startsWith('tel:') ||
        target === '_blank');

    const isDifferentZone =
      Boolean(zone) &&
      Boolean(config.zones?.currentZone) &&
      zone !== config.zones?.currentZone;

    const requiresCrossZone =
      crossZone || isDifferentZone || Boolean(zone && !config.zones?.currentZone);

    const resolvedRel = rel ?? (isExternal ? 'noopener noreferrer' : undefined);

    // 2. Cross-Zone or External Links: MUST NEVER use next/link across zone boundaries; use native <a>
    if (requiresCrossZone || isExternal) {
      return (
        <a
          ref={ref}
          href={resolvedHref ?? '#'}
          target={target}
          rel={resolvedRel}
          data-slot="link-button"
          data-cross-zone={requiresCrossZone ? 'true' : undefined}
          data-testid="timmbr-link-button"
          style={style}
          onClick={handleClick}
          className={buttonClassName}
          {...props}
        >
          {content}
        </a>
      );
    }

    // 3. Default Internal Navigation: uses next/link for client-side SPA routing & prefetching
    if (resolvedHref) {
      return (
        <NextLink
          ref={ref}
          href={resolvedHref}
          prefetch={prefetch}
          replace={replace}
          scroll={scroll}
          target={target}
          rel={resolvedRel}
          data-slot="link-button"
          data-testid="timmbr-link-button"
          style={style}
          onClick={handleClick}
          className={buttonClassName}
          {...props}
        >
          {content}
        </NextLink>
      );
    }

    // 4. Fallback without href
    return (
      <a
        ref={ref}
        data-slot="link-button"
        data-testid="timmbr-link-button"
        style={style}
        onClick={handleClick}
        className={buttonClassName}
        {...props}
      >
        {content}
      </a>
    );
  }
);

LinkButton.displayName = 'LinkButton';
