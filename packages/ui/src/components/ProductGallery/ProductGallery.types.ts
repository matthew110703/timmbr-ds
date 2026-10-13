import type * as React from 'react';

export interface ProductGalleryImage {
  src: string;
  alt: string;
}

export interface ProductGalleryRenderOptions {
  /** True for the first main image: load it eagerly with high priority (it's usually the LCP). */
  priority: boolean;
  /** `sizes` for a responsive image. */
  sizes: string;
  /** Where the image is drawn; each needs a different `sizes`. */
  slot: 'main' | 'thumbnail' | 'lightbox';
  className: string;
}

export interface ProductGalleryLabels {
  /** Accessible name of the gallery. */
  gallery?: string;
  previous?: string;
  next?: string;
  /** e.g. "2 of 5" (slides and the visible counter). */
  position?: (index: number, total: number) => string;
  /** Button name over the main image. */
  openFullscreen?: (index: number, total: number) => string;
  thumbnail?: (index: number, total: number) => string;
  close?: string;
  zoomIn?: string;
  zoomOut?: string;
}

export interface ProductGalleryProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  images: ProductGalleryImage[];
  /** Controlled index of the shown image. */
  index?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  /**
   * Draws an image filling its box (e.g. Next.js `<Image fill>`). Defaults to a plain <img> with
   * object-fit cover (contain in the lightbox).
   */
  renderImage?: (image: ProductGalleryImage, options: ProductGalleryRenderOptions) => React.ReactNode;
  /** CSS aspect ratio of the main image. Defaults to "4 / 3". */
  aspectRatio?: string;
  /** `sizes` of the main image. Defaults to "(min-width: 1024px) 50vw, 100vw". */
  sizes?: string;
  /** Thumbnails below the image, or in a column on its left from lg up. Defaults to "bottom". */
  thumbnails?: 'bottom' | 'left';
  /**
   * Desktop (mouse) hover zoom: a lens over the image and a magnified pane beside it. The pane
   * draws `src` at full size, so use a high-resolution source. Defaults to true.
   */
  hoverZoom?: boolean;
  /** Magnification of the hover zoom. Defaults to 2.5. */
  zoomScale?: number;
  labels?: ProductGalleryLabels;
}
