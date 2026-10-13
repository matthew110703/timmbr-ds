'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from '@timmbr/icons';
import { useControllableState } from '@timmbr/hooks';
import { cn } from '@timmbr/utils';
import {
  productGalleryArrowVariants,
  productGalleryCounterVariants,
  productGalleryFrameVariants,
  productGalleryLensVariants,
  productGalleryStageVariants,
  productGalleryThumbListVariants,
  productGalleryZoomPaneVariants,
  productGallerySlideVariants,
  productGalleryThumbsVariants,
  productGalleryThumbVariants,
  productGalleryTrackVariants,
  productGalleryVariants,
} from './ProductGallery.styles';
import { ProductGalleryLightbox } from './ProductGalleryLightbox';
import type { ProductGalleryProps, ProductGalleryRenderOptions, ProductGalleryImage } from './ProductGallery.types';

/** The scroll position settles this long after the last scroll event (swipe or smooth scroll). */
const SCROLL_SETTLE_MS = 120;

const defaultRenderImage = (image: ProductGalleryImage, { priority, className }: ProductGalleryRenderOptions) => (
  <img
    src={image.src}
    alt={image.alt}
    loading={priority ? 'eager' : 'lazy'}
    fetchPriority={priority ? 'high' : undefined}
    decoding="async"
    draggable={false}
    className={cn('absolute inset-0 size-full object-cover', className)}
  />
);

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Product images: a main image you can swipe (scroll-snap) or step with arrows, a thumbnail row
 * (visible on phones too: easier to aim than dots), and a fullscreen zoomable viewer when the main
 * image is clicked. The first image is marked high priority (it's usually the page's LCP), the
 * rest load lazily; the frame keeps its aspect ratio, so nothing shifts while images load.
 */
export const ProductGallery = React.forwardRef<HTMLDivElement, ProductGalleryProps>(
  (
    {
      images,
      index: indexProp,
      defaultIndex = 0,
      onIndexChange,
      renderImage = defaultRenderImage,
      aspectRatio = '4 / 3',
      sizes = '(min-width: 1024px) 50vw, 100vw',
      thumbnails = 'bottom',
      hoverZoom = true,
      zoomScale = 2.5,
      labels: labelsProp,
      className,
      ...props
    },
    ref
  ) => {
    // Hover zoom: pointer position over the image (0–1), null when not zooming.
    const [zoom, setZoom] = React.useState<{ x: number; y: number } | null>(null);
    const canHoverZoom = React.useRef(false);
    React.useEffect(() => {
      canHoverZoom.current = !!window.matchMedia?.('(hover: hover) and (pointer: fine) and (min-width: 1024px)')
        .matches;
    }, []);
    const total = images.length;
    const [rawIndex, setIndex] = useControllableState({
      value: indexProp,
      defaultValue: defaultIndex,
      onChange: onIndexChange,
    });
    const index = Math.min(Math.max(rawIndex, 0), Math.max(total - 1, 0));
    const [lightboxOpen, setLightboxOpen] = React.useState(false);
    const trackRef = React.useRef<HTMLDivElement>(null);
    const thumbRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
    const slideRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
    const settleTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    // Bumped after a swipe settles so the sync below re-runs even when a controlling parent keeps
    // `index` unchanged (the track then snaps back to the slide the parent chose).
    const [settleCount, setSettleCount] = React.useState(0);

    const labels = {
      gallery: 'Product images',
      previous: 'Previous image',
      next: 'Next image',
      position: (i: number, n: number) => `${i + 1} of ${n}`,
      openFullscreen: (i: number, n: number) => `Open image ${i + 1} of ${n} in full screen`,
      thumbnail: (i: number, n: number) => `Show image ${i + 1} of ${n}`,
      close: 'Close',
      zoomIn: 'Zoom in',
      zoomOut: 'Zoom out',
      ...labelsProp,
    };

    // Index → scroll position (arrows, thumbnails, keyboard, or the parent changing it).
    React.useEffect(() => {
      const track = trackRef.current;
      if (!track || track.clientWidth === 0) return;
      const target = index * track.clientWidth;
      if (Math.abs(track.scrollLeft - target) > 2) {
        track.scrollTo({ left: target, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      }
      thumbRefs.current[index]?.scrollIntoView?.({ block: 'nearest', inline: 'nearest' });
    }, [index, settleCount]);

    React.useEffect(() => () => clearTimeout(settleTimer.current), []);

    // Scroll position → index, once a swipe (or smooth scroll) has settled.
    const onScroll = () => {
      clearTimeout(settleTimer.current);
      settleTimer.current = setTimeout(() => {
        const track = trackRef.current;
        if (!track || track.clientWidth === 0) return;
        const settled = Math.round(track.scrollLeft / track.clientWidth);
        if (settled !== index && settled >= 0 && settled < total) {
          setIndex(settled);
          setSettleCount((count) => count + 1);
        }
      }, SCROLL_SETTLE_MS);
    };

    const go = (delta: number) => {
      const next = index + delta;
      if (next >= 0 && next < total) setIndex(next);
    };

    const onZoomMove = (event: React.PointerEvent<HTMLDivElement>) => {
      if (!hoverZoom || event.pointerType !== 'mouse' || !canHoverZoom.current || lightboxOpen) return;
      const box = event.currentTarget.getBoundingClientRect();
      const clamp = (n: number) => Math.min(Math.max(n, 0), 1);
      setZoom({
        x: clamp((event.clientX - box.left) / box.width),
        y: clamp((event.clientY - box.top) / box.height),
      });
    };
    const lens = 100 / zoomScale;
    // Keep the lens inside the image: its centre stays half a lens from each edge.
    const lensLeft = zoom ? Math.min(Math.max(zoom.x * 100 - lens / 2, 0), 100 - lens) : 0;
    const lensTop = zoom ? Math.min(Math.max(zoom.y * 100 - lens / 2, 0), 100 - lens) : 0;

    const onKeyDown = (event: React.KeyboardEvent) => {
      if (lightboxOpen) return;
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        go(1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        go(-1);
      }
    };

    if (total === 0) {
      return (
        <div
          ref={ref}
          className={cn(productGalleryFrameVariants(), className)}
          style={{ aspectRatio }}
          data-slot="product-gallery"
          {...props}
        />
      );
    }

    return (
      <div
        ref={ref}
        role="region"
        aria-roledescription="carousel"
        aria-label={labels.gallery}
        className={cn(productGalleryVariants({ thumbnails }), className)}
        onKeyDown={onKeyDown}
        data-slot="product-gallery"
        {...props}
      >
        <div className={productGalleryStageVariants()}>
          <div
            className={productGalleryFrameVariants()}
            style={{ aspectRatio }}
            onPointerMove={onZoomMove}
            onPointerLeave={() => setZoom(null)}
          >
            <div
              ref={trackRef}
              className={productGalleryTrackVariants()}
              onScroll={onScroll}
              data-slot="product-gallery-track"
            >
              {images.map((image, i) => (
                <div
                  key={`${image.src}-${i}`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={labels.position(i, total)}
                  aria-hidden={i === index ? undefined : true}
                  className="relative size-full shrink-0 snap-center snap-always"
                  data-slot="product-gallery-slide"
                >
                  <button
                    ref={(node) => {
                      slideRefs.current[i] = node;
                    }}
                    type="button"
                    aria-label={labels.openFullscreen(i, total)}
                    tabIndex={i === index ? 0 : -1}
                    className={productGallerySlideVariants()}
                    onClick={() => {
                      setIndex(i);
                      setLightboxOpen(true);
                    }}
                  >
                    {renderImage(image, { priority: i === 0, sizes, slot: 'main', className: 'object-cover' })}
                  </button>
                </div>
              ))}
            </div>

            {total > 1 && (
              <>
                <button
                  type="button"
                  aria-label={labels.previous}
                  className={productGalleryArrowVariants({ side: 'left' })}
                  disabled={index === 0}
                  onClick={() => go(-1)}
                >
                  <ChevronLeft aria-hidden="true" className="size-5" />
                </button>
                <button
                  type="button"
                  aria-label={labels.next}
                  className={productGalleryArrowVariants({ side: 'right' })}
                  disabled={index >= total - 1}
                  onClick={() => go(1)}
                >
                  <ChevronRight aria-hidden="true" className="size-5" />
                </button>
                <span className={productGalleryCounterVariants()} aria-hidden="true">
                  {index + 1} / {total}
                </span>
              </>
            )}

            {zoom && (
              <span
                aria-hidden="true"
                className={productGalleryLensVariants()}
                style={{ left: `${lensLeft}%`, top: `${lensTop}%`, width: `${lens}%`, height: `${lens}%` }}
                data-slot="product-gallery-lens"
              />
            )}
          </div>

          {/* Magnified view of the area under the lens (desktop mouse only). */}
          {/* The pane has the frame's shape and draws the image cropped the same way (cover), just
              `zoomScale` times larger and shifted so the lens area fills it: what's under the lens
              is exactly what's shown. */}
          {zoom && images[index] && (
            <div
              aria-hidden="true"
              className={productGalleryZoomPaneVariants()}
              style={{ aspectRatio }}
              data-slot="product-gallery-zoom"
            >
              <div
                className="absolute left-0 top-0"
                style={{
                  width: `${zoomScale * 100}%`,
                  height: `${zoomScale * 100}%`,
                  transform: `translate(${-lensLeft}%, ${-lensTop}%)`,
                }}
              >
                <img
                  src={images[index].src}
                  alt=""
                  decoding="async"
                  draggable={false}
                  className="size-full max-w-none object-cover"
                />
              </div>
            </div>
          )}
        </div>

        {total > 1 && (
          <div className={productGalleryThumbsVariants({ thumbnails })} data-slot="product-gallery-thumbs">
            <div className={productGalleryThumbListVariants({ thumbnails })}>
              {images.map((image, i) => (
                <button
                  key={`${image.src}-${i}`}
                  ref={(node) => {
                    thumbRefs.current[i] = node;
                  }}
                  type="button"
                  aria-label={labels.thumbnail(i, total)}
                  aria-current={i === index ? 'true' : undefined}
                  className={productGalleryThumbVariants({ active: i === index, thumbnails })}
                  onClick={() => setIndex(i)}
                >
                  {renderImage(image, {
                    priority: false,
                    sizes: thumbnails === 'left' ? '(min-width: 1024px) 72px, 22vw' : '(min-width: 1024px) 12vw, 22vw',
                    slot: 'thumbnail',
                    className: 'object-cover',
                  })}
                </button>
              ))}
            </div>
          </div>
        )}

        <ProductGalleryLightbox
          open={lightboxOpen}
          onOpenChange={setLightboxOpen}
          images={images}
          index={index}
          onIndexChange={setIndex}
          renderImage={renderImage}
          labels={labels}
          onCloseAutoFocus={(event) => {
            // Return focus to the slide now showing, not the (possibly hidden) one that opened it.
            const slide = slideRefs.current[index];
            if (!slide) return;
            event.preventDefault();
            slide.focus({ preventScroll: true });
          }}
        />
      </div>
    );
  }
);
ProductGallery.displayName = 'ProductGallery';
