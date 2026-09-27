'use client';

import * as React from 'react';
import type { ToastItem, ToastOptions } from './Toast.types';

type ToastSubscriber = () => void;

class ToastStore {
  private toasts: ToastItem[] = [];
  private listeners: Set<ToastSubscriber> = new Set();
  private maxVisible: number = 5;

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

  addToast(options: ToastOptions): string {
    const id = options.id || Math.random().toString(36).substring(2, 9);
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
  error: (
    title: React.ReactNode,
    description?: React.ReactNode,
    options?: Partial<ToastOptions>
  ) => string;
  success: (
    title: React.ReactNode,
    description?: React.ReactNode,
    options?: Partial<ToastOptions>
  ) => string;
  warning: (
    title: React.ReactNode,
    description?: React.ReactNode,
    options?: Partial<ToastOptions>
  ) => string;
  info: (
    title: React.ReactNode,
    description?: React.ReactNode,
    options?: Partial<ToastOptions>
  ) => string;
  dismiss: (id?: string) => void;
}

export const toast: ToastFunction = Object.assign(
  (options: ToastOptions) => toastStore.addToast(options),
  {
    error: (
      title: React.ReactNode,
      description?: React.ReactNode,
      options?: Partial<ToastOptions>
    ) =>
      toastStore.addToast({
        ...options,
        title,
        description,
        variant: 'destructive',
      }),
    success: (
      title: React.ReactNode,
      description?: React.ReactNode,
      options?: Partial<ToastOptions>
    ) =>
      toastStore.addToast({
        ...options,
        title,
        description,
        variant: 'success',
      }),
    warning: (
      title: React.ReactNode,
      description?: React.ReactNode,
      options?: Partial<ToastOptions>
    ) =>
      toastStore.addToast({
        ...options,
        title,
        description,
        variant: 'warning',
      }),
    info: (
      title: React.ReactNode,
      description?: React.ReactNode,
      options?: Partial<ToastOptions>
    ) =>
      toastStore.addToast({
        ...options,
        title,
        description,
        variant: 'info',
      }),
    dismiss: (id?: string) => toastStore.dismiss(id),
  }
);

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
