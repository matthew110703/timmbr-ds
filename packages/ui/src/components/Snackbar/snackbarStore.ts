'use client';

import type * as React from 'react';
import type { SnackbarItem, SnackbarOptions, SnackbarVariant } from './Snackbar.types';

/** How long the closing animation runs before the next snackbar shows. */
export const SNACKBAR_EXIT_MS = 180;

type Listener = () => void;

/**
 * One snackbar at a time (the mobile pattern): showing a new one closes the current one first;
 * extra ones wait their turn. Re-showing an id that's on screen or queued updates it in place.
 */
class SnackbarStore {
  private current: SnackbarItem | null = null;
  private queue: SnackbarItem[] = [];
  private listeners = new Set<Listener>();
  private exitTimer: ReturnType<typeof setTimeout> | undefined;
  private hosts = 0;

  /** SnackbarHost registers while mounted; toast() only routes to snackbars when one is. */
  registerHost = () => {
    this.hosts += 1;
    return () => {
      this.hosts -= 1;
    };
  };

  hasHost = () => this.hosts > 0;

  subscribe = (listener: Listener) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  getCurrent = () => this.current;

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  show(message: React.ReactNode, options: SnackbarOptions = {}): string {
    const id = options.id ?? Math.random().toString(36).slice(2, 9);
    const item: SnackbarItem = { ...options, id, message, open: true };

    if (this.current?.id === id && this.current.open) {
      this.current = item;
      this.notify();
      return id;
    }
    const queued = this.queue.findIndex((q) => q.id === id);
    if (queued >= 0) {
      this.queue[queued] = item;
      return id;
    }

    // Newest wins: the one on screen steps aside for it (queued ones keep their order after).
    this.queue.unshift(item);
    if (this.current?.open) this.close();
    else if (!this.current) this.next();
    return id;
  }

  dismiss(id?: string) {
    if (!id) this.queue = [];
    if (this.current && (!id || this.current.id === id)) this.close();
    else if (id) this.queue = this.queue.filter((q) => q.id !== id);
  }

  private close() {
    if (!this.current || !this.current.open) return;
    const closing = this.current;
    this.current = { ...closing, open: false };
    this.notify();
    closing.onDismiss?.();
    clearTimeout(this.exitTimer);
    this.exitTimer = setTimeout(() => {
      this.current = null;
      this.next();
    }, SNACKBAR_EXIT_MS);
  }

  private next() {
    this.current = this.queue.shift() ?? null;
    this.notify();
  }

  /** Test helper. */
  reset() {
    clearTimeout(this.exitTimer);
    this.current = null;
    this.queue = [];
    this.notify();
  }
}

export const snackbarStore = new SnackbarStore();

type VariantShortcut = (message: React.ReactNode, options?: Omit<SnackbarOptions, 'variant'>) => string;

export interface SnackbarFunction {
  (message: React.ReactNode, options?: SnackbarOptions): string;
  success: VariantShortcut;
  info: VariantShortcut;
  warning: VariantShortcut;
  error: VariantShortcut;
  dismiss: (id?: string) => void;
}

const withVariant =
  (variant: SnackbarVariant): VariantShortcut =>
  (message, options) =>
    snackbarStore.show(message, { ...options, variant });

/** Shows a snackbar: `snackbar('Saved')`, `snackbar.success('Added to cart', { action })`. */
export const snackbar: SnackbarFunction = Object.assign(
  (message: React.ReactNode, options?: SnackbarOptions) => snackbarStore.show(message, options),
  {
    success: withVariant('success'),
    info: withVariant('info'),
    warning: withVariant('warning'),
    error: withVariant('destructive'),
    dismiss: (id?: string) => snackbarStore.dismiss(id),
  }
);
