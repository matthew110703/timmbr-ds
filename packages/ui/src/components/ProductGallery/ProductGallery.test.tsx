import '@testing-library/jest-dom/vitest';
import * as React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ProductGallery } from './ProductGallery';

const images = [
  { src: '/a.jpg', alt: 'Front' },
  { src: '/b.jpg', alt: 'Side' },
  { src: '/c.jpg', alt: 'Detail' },
];

describe('ProductGallery', () => {
  it('loads the first image eagerly and the rest lazily', () => {
    render(<ProductGallery images={images} />);
    const mains = screen.getAllByRole('img', { name: 'Front' });
    expect(mains[0]).toHaveAttribute('loading', 'eager');
    expect(mains[0]).toHaveAttribute('fetchpriority', 'high');
    expect(screen.getAllByRole('img', { name: 'Side', hidden: true })[0]).toHaveAttribute('loading', 'lazy');
  });

  it('steps with the arrows and thumbnails, marking the current thumbnail', () => {
    const onIndexChange = vi.fn();
    render(<ProductGallery images={images} onIndexChange={onIndexChange} />);

    expect(screen.getByRole('button', { name: 'Previous image' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Next image' }));
    expect(onIndexChange).toHaveBeenLastCalledWith(1);
    expect(screen.getByRole('button', { name: 'Show image 2 of 3' })).toHaveAttribute('aria-current', 'true');

    fireEvent.click(screen.getByRole('button', { name: 'Show image 3 of 3' }));
    expect(onIndexChange).toHaveBeenLastCalledWith(2);
    expect(screen.getByRole('button', { name: 'Next image' })).toBeDisabled();
  });

  it('steps with the arrow keys', () => {
    const onIndexChange = vi.fn();
    render(<ProductGallery images={images} onIndexChange={onIndexChange} />);
    const gallery = screen.getByRole('region', { name: 'Product images' });
    fireEvent.keyDown(gallery, { key: 'ArrowRight' });
    fireEvent.keyDown(gallery, { key: 'ArrowRight' });
    fireEvent.keyDown(gallery, { key: 'ArrowLeft' });
    expect(onIndexChange.mock.calls.map(([i]) => i)).toEqual([1, 2, 1]);
  });

  it('opens the fullscreen viewer on the clicked image and moves inside it', () => {
    render(<ProductGallery images={images} />);
    fireEvent.click(screen.getByRole('button', { name: 'Open image 1 of 3 in full screen' }));

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveTextContent('1 of 3');
    fireEvent.keyDown(dialog, { key: 'ArrowRight' });
    expect(dialog).toHaveTextContent('2 of 3');
    fireEvent.click(screen.getByRole('button', { name: 'Zoom in' }));
    expect(screen.getByRole('button', { name: 'Zoom out' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('swipes between images in the fullscreen viewer', () => {
    Element.prototype.setPointerCapture ??= () => {};
    // jsdom has no PointerEvent: a MouseEvent with the pointer fields is enough here.
    if (!('PointerEvent' in window)) {
      class PointerEventPolyfill extends MouseEvent {
        pointerId: number;
        pointerType: string;
        constructor(type: string, init: PointerEventInit = {}) {
          super(type, init);
          this.pointerId = init.pointerId ?? 0;
          this.pointerType = init.pointerType ?? 'mouse';
        }
      }
      Object.assign(window, { PointerEvent: PointerEventPolyfill });
    }
    render(<ProductGallery images={images} />);
    fireEvent.click(screen.getByRole('button', { name: 'Open image 1 of 3 in full screen' }));
    const dialog = screen.getByRole('dialog');
    const stage = dialog.querySelector('[data-slot=product-gallery-lightbox-stage]')!;
    const touch = { pointerId: 1, pointerType: 'touch' };

    fireEvent.pointerDown(stage, { ...touch, clientX: 300, clientY: 200 });
    fireEvent.pointerMove(stage, { ...touch, clientX: 180, clientY: 210 });
    fireEvent.pointerUp(stage, { ...touch, clientX: 180, clientY: 210 });
    expect(dialog).toHaveTextContent('2 of 3');

    // A short or mostly vertical drag doesn't change the image.
    fireEvent.pointerDown(stage, { ...touch, clientX: 300, clientY: 200 });
    fireEvent.pointerUp(stage, { ...touch, clientX: 280, clientY: 320 });
    expect(dialog).toHaveTextContent('2 of 3');
  });

  it('stays zoomed when the fingers lift after a pinch', () => {
    // PointerEvent polyfill and setPointerCapture are installed by the swipe test above.
    render(<ProductGallery images={images} />);
    fireEvent.click(screen.getByRole('button', { name: 'Open image 1 of 3 in full screen' }));
    const stage = screen.getByRole('dialog').querySelector('[data-slot=product-gallery-lightbox-stage]')!;
    const a = { pointerId: 1, pointerType: 'touch' };
    const b = { pointerId: 2, pointerType: 'touch' };

    fireEvent.pointerDown(stage, { ...a, clientX: 100, clientY: 200 });
    fireEvent.pointerDown(stage, { ...b, clientX: 200, clientY: 200 });
    fireEvent.pointerMove(stage, { ...b, clientX: 350, clientY: 200 });
    fireEvent.pointerUp(stage, { ...a, clientX: 100, clientY: 200 });
    fireEvent.pointerUp(stage, { ...b, clientX: 350, clientY: 200 });

    expect(screen.getByRole('button', { name: 'Zoom out' })).toBeInTheDocument();
  });

  it('returns focus to the image now showing when the viewer closes', async () => {
    render(<ProductGallery images={images} />);
    fireEvent.click(screen.getByRole('button', { name: 'Open image 1 of 3 in full screen' }));
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'ArrowRight' });
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));

    // Radix moves focus back just after the dialog unmounts.
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Open image 2 of 3 in full screen', hidden: true })).toHaveFocus()
    );
  });

  it('draws images with a custom renderer', () => {
    render(
      <ProductGallery
        images={images.slice(0, 1)}
        renderImage={(image, { slot, priority }) => <span data-testid={`${slot}-${priority}`}>{image.alt}</span>}
      />
    );
    expect(screen.getByTestId('main-true')).toHaveTextContent('Front');
    // A single image needs no arrows or thumbnails.
    expect(screen.queryByRole('button', { name: 'Next image' })).not.toBeInTheDocument();
  });

  it('keeps its box when there are no images', () => {
    const { container } = render(<ProductGallery images={[]} aspectRatio="1 / 1" />);
    expect(container.firstChild).toHaveStyle({ aspectRatio: '1 / 1' });
  });
});
