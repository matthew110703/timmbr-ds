import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
} from './Toast';

describe('Toast Component', () => {
  it('renders toast with title and description', () => {
    render(
      <ToastProvider>
        <Toast open>
          <ToastTitle>Alert Title</ToastTitle>
          <ToastDescription>Detailed alert content</ToastDescription>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
    expect(screen.getByText('Alert Title')).toBeInTheDocument();
    expect(screen.getByText('Detailed alert content')).toBeInTheDocument();
  });

  it('adds and dispatches toasts via imperative toast store', async () => {
    const { toast, toastStore } = await import('./toastStore');

    const id = toast.error('Save Failed', 'Unable to reach backend', {
      duration: 5000,
      position: 'top-right',
    });

    const active = toastStore.getToasts();
    const item = active.find((t) => t.id === id);

    expect(item).toBeDefined();
    expect(item?.title).toBe('Save Failed');
    expect(item?.description).toBe('Unable to reach backend');
    expect(item?.variant).toBe('destructive');
    expect(item?.duration).toBe(5000);
    expect(item?.position).toBe('top-right');

    toast.dismiss(id);
    expect(toastStore.getToasts().find((t) => t.id === id)?.open).toBe(false);
  });
});
