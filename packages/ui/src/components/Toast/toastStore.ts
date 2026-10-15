'use client';

import * as React from 'react';
import type { ToastActionConfig, ToastItem, ToastOptions } from './Toast.types';
import { snackbarStore } from '../Snackbar/snackbarStore';

/** Phones: below the sm breakpoint (640px). */
const PHONE_QUERY = '(max-width: 639.98px)';

function isActionConfig(action: ToastOptions['action']): action is ToastActionConfig {
  return !!action && typeof action === 'object' && 'label' in action && 'onClick' in action;
}

type ToastSubscriber = () => void;

/**
 * Browser-only module-level singleton. Not SSR-safe — never import this on the server.
 * Use `.reset()` in tests to clear state between cases.
 */
class ToastStore {
  private toasts: ToastItem[] = [];
  private listeners: Set<ToastSubscriber> = new Set();
  private maxVisible: number = 5;
  private mobileLayout: 'snackbar' | 'toast' = 'snackbar';
  private defaultDuration: number | undefined;

  subscribe(listener: ToastSubscriber): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  getToasts(): ToastItem[] {
    return this.toasts;
  }

  setMaxVisible(max: number) {
    this.maxVisible = max;
  }

  setMobileLayout(layout: 'snackbar' | 'toast') {
    this.mobileLayout = layout;
  }

  /** ToastContainer's `config.duration`, so routed snackbars stay as long as toasts would. */
  setDefaultDuration(duration: number | undefined) {
    this.defaultDuration = duration;
  }

  /**
   * Whether this toast shows as a snackbar (phones by default; see ToastOptions.layout). Only when
   * a SnackbarHost is mounted, and only for content a snackbar can show: a JSX action or a
   * non-dismissible toast stays a toast.
   */
  private asSnackbar(options: ToastOptions): boolean {
    if (!snackbarStore.hasHost()) return false;
    if (options.layout === 'snackbar') return true;
    if (options.layout === 'toast' || this.mobileLayout === 'toast') return false;
    if ((options.action && !isActionConfig(options.action)) || options.dismissible === false) return false;
    return typeof window !== 'undefined' && !!window.matchMedia?.(PHONE_QUERY).matches;
  }

  addToast(options: ToastOptions): string {
    const id = options.id || Math.random().toString(36).substring(2, 9);

    // Phones: the same message as a snackbar (one at a time, at the bottom, swipeable).
    if (this.asSnackbar(options)) {
      return snackbarStore.show(options.title ?? options.description, {
        id,
        description: options.title ? options.description : undefined,
        variant: options.variant,
        duration: options.duration ?? this.defaultDuration,
        action: isActionConfig(options.action)
          ? {
              label: options.action.label,
              onClick: (event) => (options.action as ToastActionConfig).onClick(event),
            }
          : undefined,
        onDismiss: () => {
          options.onDismiss?.();
          options.onOpenChange?.(false);
        },
      });
    }
    const existingIndex = this.toasts.findIndex((t) => t.id === id);

    const newToast: ToastItem = {
      ...options,
      id,
      open: true,
    };

    if (existingIndex !== -1) {
      this.toasts[existingIndex] = newToast;
    } else {
      this.toasts = [...this.toasts, newToast];
      if (this.toasts.length > this.maxVisible) {
        this.toasts = this.toasts.slice(-this.maxVisible);
      }
    }

    this.notify();
    return id;
  }

  dismiss(id?: string) {
    snackbarStore.dismiss(id);
    if (!id) {
      this.toasts = this.toasts.map((t) => ({ ...t, open: false }));
    } else {
      this.toasts = this.toasts.map((t) => (t.id === id ? { ...t, open: false } : t));
    }
    this.notify();

    // Clean up closed items after exit animation completes
    setTimeout(() => {
      if (!id) {
        this.toasts = [];
      } else {
        this.toasts = this.toasts.filter((t) => t.id !== id);
      }
      this.notify();
    }, 350);
  }
}

export const toastStore = new ToastStore();

export interface ToastFunction {
  (options: ToastOptions): string;
  error: (title: React.ReactNode, description?: React.ReactNode, options?: Partial<ToastOptions>) => string;
  success: (title: React.ReactNode, description?: React.ReactNode, options?: Partial<ToastOptions>) => string;
  warning: (title: React.ReactNode, description?: React.ReactNode, options?: Partial<ToastOptions>) => string;
  info: (title: React.ReactNode, description?: React.ReactNode, options?: Partial<ToastOptions>) => string;
  dismiss: (id?: string) => void;
}

export const toast: ToastFunction = Object.assign((options: ToastOptions) => toastStore.addToast(options), {
  error: (title: React.ReactNode, description?: React.ReactNode, options?: Partial<ToastOptions>) =>
    toastStore.addToast({
      ...options,
      title,
      description,
      variant: 'destructive',
    }),
  success: (title: React.ReactNode, description?: React.ReactNode, options?: Partial<ToastOptions>) =>
    toastStore.addToast({
      ...options,
      title,
      description,
      variant: 'success',
    }),
  warning: (title: React.ReactNode, description?: React.ReactNode, options?: Partial<ToastOptions>) =>
    toastStore.addToast({
      ...options,
      title,
      description,
      variant: 'warning',
    }),
  info: (title: React.ReactNode, description?: React.ReactNode, options?: Partial<ToastOptions>) =>
    toastStore.addToast({
      ...options,
      title,
      description,
      variant: 'info',
    }),
  dismiss: (id?: string) => toastStore.dismiss(id),
});

export function useToast() {
  const [toasts, setToasts] = React.useState<ToastItem[]>(() => toastStore.getToasts());

  React.useEffect(() => {
    return toastStore.subscribe(() => {
      setToasts([...toastStore.getToasts()]);
    });
  }, []);

  return {
    toast,
    dismiss: React.useCallback((id?: string) => toastStore.dismiss(id), []),
    toasts,
  };
}
