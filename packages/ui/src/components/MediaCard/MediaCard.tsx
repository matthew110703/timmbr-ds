import * as React from 'react';
import { cn } from '@timmbr/utils';
import { Text } from '../Text';
import { mediaCardMediaVariants, mediaCardOverlayVariants, mediaCardVariants } from './MediaCard.styles';
import type { MediaCardLinkProps, MediaCardProps } from './MediaCard.types';

const PRESET_RATIOS = ['square', 'portrait', 'landscape'] as const;
type PresetRatio = (typeof PRESET_RATIOS)[number];

const DefaultLink = ({ href, className, title, children }: MediaCardLinkProps) => (
  <a href={href} className={className} title={title}>
    {children}
  </a>
);

const STRETCHED_LINK =
  'rounded-sm after:absolute after:inset-0 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

/**
 * Generic media + content card template.
 *
 * - `vertical`: media on top (grids of items).
 * - `horizontal`: media on the left, `aside` on the right (lists, line items).
 *
 * Pass `href` to make the whole card a link (a stretched title link);
 * overlays and `footer` stay clickable above it.
 */
export const MediaCard = React.forwardRef<HTMLElement, MediaCardProps>(
  (
    {
      media,
      mediaTopStart,
      mediaTopEnd,
      mediaZoom = false,
      mediaClassName,
      mediaFallback,
      href,
      linkComponent: Link = DefaultLink,
      titleSize,
      spacing = 'compact',
      eyebrow,
      title,
      fullTitle = typeof title === 'string' ? title : undefined,
      subtitle,
      meta,
      aside,
      footer,
      orientation = 'vertical',
      variant = 'plain',
      size = 'md',
      ratio = 'square',
      titleClassName,
      titleAs: Title = 'h3',
      as: Root = 'article',
      className,
      ...props
    },
    ref
  ) => {
    const horizontal = orientation === 'horizontal';
    const relaxed = spacing === 'relaxed';
    const presetRatio = (PRESET_RATIOS as readonly string[]).includes(ratio) ? (ratio as PresetRatio) : undefined;
    const resolvedTitleSize = titleSize ?? (size === 'sm' ? 'sm' : 'md');
    const showMedia = media || mediaFallback;

    return (
      <Root
        ref={ref as React.Ref<never>}
        data-slot="media-card"
        data-orientation={orientation}
        className={cn(mediaCardVariants({ orientation, variant, size }), 'relative', className)}
        {...props}
      >
        {showMedia && (
          <div
            className={cn(
              mediaCardMediaVariants({ orientation, size, ratio: presetRatio }),
              mediaZoom && 'group-hover/media-card:[&>img]:scale-105',
              mediaClassName
            )}
            style={presetRatio ? undefined : { aspectRatio: ratio }}
            data-slot="media-card-media"
          >
            {media ?? (
              <div
                className="flex h-full w-full items-center justify-center text-muted-foreground"
                data-slot="media-card-fallback"
              >
                {mediaFallback}
              </div>
            )}
            {mediaTopStart && (
              <div className={mediaCardOverlayVariants({ position: 'start' })} data-slot="media-card-top-start">
                {mediaTopStart}
              </div>
            )}
            {mediaTopEnd && (
              <div className={mediaCardOverlayVariants({ position: 'end' })} data-slot="media-card-top-end">
                {mediaTopEnd}
              </div>
            )}
          </div>
        )}

        <div className={cn('flex min-w-0 flex-1 flex-col', horizontal ? 'gap-1' : 'gap-1.5')}>
          <div
            className={cn(
              'flex min-w-0 gap-3',
              horizontal ? 'items-start justify-between' : cn('flex-col', relaxed ? 'gap-2' : 'gap-1.5')
            )}
          >
            <div className="min-w-0 flex-1">
              {eyebrow && (
                <Text asChild variant="body-3" foreground="muted">
                  <div className="mb-2 flex items-center gap-1.5" data-slot="media-card-eyebrow">
                    {eyebrow}
                  </div>
                </Text>
              )}
              <Title
                className={cn(
                  'font-medium text-foreground',
                  resolvedTitleSize === 'sm' ? 'text-body-2' : 'text-body-1',
                  'line-clamp-2',
                  titleClassName
                )}
                data-slot="media-card-title"
                title={href ? undefined : fullTitle}
              >
                {href ? (
                  <Link href={href} className={STRETCHED_LINK} title={fullTitle}>
                    {title}
                  </Link>
                ) : (
                  title
                )}
              </Title>
              {subtitle && (
                <Text asChild variant="body-2" foreground="muted">
                  <div className="mt-0.5" data-slot="media-card-subtitle">
                    {subtitle}
                  </div>
                </Text>
              )}
              {meta && (
                <Text asChild variant="body-3" foreground="muted">
                  <div className={relaxed ? 'mt-4' : 'mt-1'} data-slot="media-card-meta">
                    {meta}
                  </div>
                </Text>
              )}
            </div>
            {aside && (
              <div
                className={cn('text-body-1 font-medium', horizontal ? 'shrink-0 text-right' : '')}
                data-slot="media-card-aside"
              >
                {aside}
              </div>
            )}
          </div>

          {footer && (
            // mt-auto: pinned to the card's bottom, so footers line up across a grid row even when
            // titles or prices wrap differently.
            <div className="relative z-10 mt-auto flex flex-wrap items-center gap-2 pt-2" data-slot="media-card-footer">
              {footer}
            </div>
          )}
        </div>
      </Root>
    );
  }
);
MediaCard.displayName = 'MediaCard';
