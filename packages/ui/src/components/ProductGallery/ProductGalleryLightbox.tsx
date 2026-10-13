'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from '@timmbr/icons';
import { productGalleryLightboxButtonVariants, productGalleryLightboxVariants } from './ProductGallery.styles';
import type { ProductGalleryImage, ProductGalleryLabels, ProductGalleryProps } from './ProductGallery.types';

const MAX_SCALE = 3;
const ZOOM_STEP = 2;
/** Horizontal travel that turns a drag into a swipe to the next/previous image. */
const SWIPE_PX = 50;
/** Movement under this still counts as a tap. */
const TAP_SLOP_PX = 10;

interface View {
  scale: number;
  x: number;
  y: number;
}
const FIT: View = { scale: 1, x: 0, y: 0 };

export interface ProductGalleryLightboxProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  images: ProductGalleryImage[];
  index: number;
  onIndexChange: (index: number) => void;
  renderImage: NonNullable<ProductGalleryProps['renderImage']>;
  labels: Required<Pick<ProductGalleryLabels, 'previous' | 'next' | 'position' | 'close' | 'zoomIn' | 'zoomOut'>> &
    ProductGalleryLabels;
  /** Where focus goes on close (the dialog has no trigger, so the gallery points it at the current slide). */
  onCloseAutoFocus?: (event: Event) => void;
}

/**
 * Fullscreen viewer: swipe (touch), arrow keys and the side buttons (tablet and up) move between
 * images; double-click / double-tap, the wheel and two-finger pinch zoom (up to 3×), and dragging
 * pans a zoomed image. Pointer events only, no gesture library.
 */
export function ProductGalleryLightbox({
  open,
  onOpenChange,
  images,
  index,
  onIndexChange,
  renderImage,
  labels,
  onCloseAutoFocus,
}: ProductGalleryLightboxProps) {
  const [view, setView] = React.useState<View>(FIT);
  const pointers = React.useRef(new Map<number, { x: number; y: number }>());
  const pinch = React.useRef<{ distance: number; scale: number } | null>(null);
  const lastTap = React.useRef(0);
  const lastPointerType = React.useRef<string>('mouse');
  // Where a one-finger gesture started; `multi` once a second finger joins (a pinch, not a swipe).
  const swipe = React.useRef<{ x: number; y: number; multi: boolean } | null>(null);
  const [dragX, setDragX] = React.useState(0);
  const total = images.length;
  const image = images[index];

  // Each image (and each opening) starts unzoomed.
  const [shown, setShown] = React.useState({ index, open });
  if (shown.index !== index || shown.open !== open) {
    setShown({ index, open });
    setView(FIT);
  }

  // Closing mid-gesture (Escape, the close button) never delivers the pointerup, so drop any
  // half-finished gesture; otherwise the next opening reads its first finger as a pinch.
  const handleOpenChange = (next: boolean) => {
    if (!next) {
      pointers.current.clear();
      pinch.current = null;
      swipe.current = null;
      lastTap.current = 0;
      setDragX(0);
    }
    onOpenChange(next);
  };

  const go = (delta: number) => {
    const next = index + delta;
    if (next >= 0 && next < total) onIndexChange(next);
  };

  const zoomTo = (scale: number) =>
    setView((current) => {
      const clamped = Math.min(MAX_SCALE, Math.max(1, scale));
      return clamped === 1 ? FIT : { ...current, scale: clamped };
    });
  const toggleZoom = () => zoomTo(view.scale > 1 ? 1 : ZOOM_STEP);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowRight') go(1);
    else if (event.key === 'ArrowLeft') go(-1);
    else if (event.key === '+' || event.key === '=') zoomTo(view.scale + 0.5);
    else if (event.key === '-') zoomTo(view.scale - 0.5);
  };

  const distance = () => {
    const [a, b] = [...pointers.current.values()];
    return Math.hypot(a.x - b.x, a.y - b.y);
  };

  const onPointerDown = (event: React.PointerEvent) => {
    lastPointerType.current = event.pointerType;
    event.currentTarget.setPointerCapture(event.pointerId);
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.current.size === 1) {
      swipe.current = { x: event.clientX, y: event.clientY, multi: false };
    } else {
      if (swipe.current) swipe.current.multi = true;
      setDragX(0);
    }
    if (pointers.current.size === 2) pinch.current = { distance: distance(), scale: view.scale };
  };

  const onPointerMove = (event: React.PointerEvent) => {
    const previous = pointers.current.get(event.pointerId);
    if (!previous) return;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pinch.current && pointers.current.size === 2) {
      zoomTo((pinch.current.scale * distance()) / pinch.current.distance);
    } else if (view.scale > 1) {
      const dx = event.clientX - previous.x;
      const dy = event.clientY - previous.y;
      setView((current) => ({ ...current, x: current.x + dx, y: current.y + dy }));
    } else if (swipe.current && !swipe.current.multi && event.pointerType !== 'mouse') {
      // Unzoomed: the image follows the finger sideways (a swipe to the next image).
      setDragX(event.clientX - swipe.current.x);
    }
  };

  const onPointerUp = (event: React.PointerEvent) => {
    const start = pointers.current.get(event.pointerId);
    pointers.current.delete(event.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
    const gesture = swipe.current;
    if (pointers.current.size === 0) {
      swipe.current = null;
      setDragX(0);
    }
    if (!start || event.pointerType === 'mouse') return;
    // Swipe: a mostly horizontal one-finger move of 50px+ on an unzoomed image.
    if (gesture && !gesture.multi && view.scale === 1) {
      const dx = event.clientX - gesture.x;
      const dy = event.clientY - gesture.y;
      if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(dy)) {
        lastTap.current = 0;
        go(dx < 0 ? 1 : -1);
        return;
      }
    }
    // Double tap (touch/pen); mouse uses dblclick. Only a still, one-finger touch counts as a tap,
    // so lifting the fingers after a pinch or a pan doesn't toggle the zoom back.
    const still =
      gesture && !gesture.multi && Math.hypot(event.clientX - gesture.x, event.clientY - gesture.y) < TAP_SLOP_PX;
    if (!still) {
      lastTap.current = 0;
      return;
    }
    const now = Date.now();
    if (now - lastTap.current < 300) {
      lastTap.current = 0;
      toggleZoom();
    } else {
      lastTap.current = now;
    }
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Content
          className={productGalleryLightboxVariants()}
          onKeyDown={onKeyDown}
          onCloseAutoFocus={onCloseAutoFocus}
          aria-describedby={undefined}
          data-slot="product-gallery-lightbox"
        >
          <div className="flex items-center justify-between gap-3 p-3 sm:p-4">
            <DialogPrimitive.Title className="text-body-2 font-semibold tabular-nums">
              {labels.position(index, total)}
              <span className="sr-only">{image ? ` — ${image.alt}` : ''}</span>
            </DialogPrimitive.Title>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className={productGalleryLightboxButtonVariants()}
                aria-label={view.scale > 1 ? labels.zoomOut : labels.zoomIn}
                onClick={toggleZoom}
              >
                {view.scale > 1 ? <ZoomOut aria-hidden="true" /> : <ZoomIn aria-hidden="true" />}
              </button>
              <DialogPrimitive.Close className={productGalleryLightboxButtonVariants()} aria-label={labels.close}>
                <X aria-hidden="true" />
              </DialogPrimitive.Close>
            </div>
          </div>

          <div
            className="relative min-h-0 flex-1 touch-none select-none overflow-hidden"
            // Touch double taps are handled in onPointerUp; some browsers also send dblclick.
            onDoubleClick={() => lastPointerType.current === 'mouse' && toggleZoom()}
            onWheel={(event) => zoomTo(view.scale - event.deltaY * 0.002)}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            style={{ cursor: view.scale > 1 ? 'grab' : 'zoom-in' }}
            data-slot="product-gallery-lightbox-stage"
          >
            {image && (
              <div
                className={`absolute inset-0 ease-out motion-reduce:transition-none ${dragX ? '' : 'transition-transform duration-150'}`}
                style={{ transform: `translate(${view.x + dragX}px, ${view.y}px) scale(${view.scale})` }}
              >
                {renderImage(image, {
                  priority: false,
                  sizes: '100vw',
                  slot: 'lightbox',
                  className: 'object-contain',
                })}
              </div>
            )}
            <button
              type="button"
              className={`${productGalleryLightboxButtonVariants()} absolute left-3 top-1/2 hidden -translate-y-1/2 md:flex`}
              aria-label={labels.previous}
              disabled={index === 0}
              onClick={() => go(-1)}
              onPointerDown={(event) => event.stopPropagation()}
            >
              <ChevronLeft aria-hidden="true" />
            </button>
            <button
              type="button"
              className={`${productGalleryLightboxButtonVariants()} absolute right-3 top-1/2 hidden -translate-y-1/2 md:flex`}
              aria-label={labels.next}
              disabled={index >= total - 1}
              onClick={() => go(1)}
              onPointerDown={(event) => event.stopPropagation()}
            >
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
