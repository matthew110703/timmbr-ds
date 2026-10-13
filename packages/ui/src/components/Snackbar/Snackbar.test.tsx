import '@testing-library/jest-dom/vitest';
import * as React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { toast, ToastProvider } from '../Toast';
import { toastStore } from '../Toast/toastStore';
import { ToastContainer } from '../Toast/ToastContainer';
import { SnackbarHost } from './SnackbarHost';
import { SNACKBAR_EXIT_MS, snackbar, snackbarStore } from './snackbarStore';

const phone = (matches: boolean) =>
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: (query: string) => ({ matches, media: query, addEventListener() {}, removeEventListener() {} }),
  });

describe('Snackbar', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => {
    act(() => snackbarStore.reset());
    vi.useRealTimers();
    // @ts-expect-error test cleanup
    delete window.matchMedia;
  });

  it('shows a message and leaves on its own', () => {
    render(<SnackbarHost />);
    act(() => {
      snackbar('Saved');
    });
    expect(screen.getByRole('status')).toHaveTextContent('Saved');

    act(() => vi.advanceTimersByTime(4000 + SNACKBAR_EXIT_MS));
    expect(screen.queryByText('Saved')).not.toBeInTheDocument();
  });

  it('shows one at a time: a new one replaces the current one', () => {
    render(<SnackbarHost />);
    act(() => {
      snackbar('First');
      snackbar('Second');
    });
    act(() => vi.advanceTimersByTime(SNACKBAR_EXIT_MS));
    expect(screen.queryByText('First')).not.toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  it('runs its action and dismisses', () => {
    const onClick = vi.fn();
    render(<SnackbarHost />);
    act(() => {
      snackbar.success('Added to cart', { action: { label: 'View cart', onClick } });
    });
    fireEvent.click(screen.getByRole('button', { name: 'View cart' }));
    expect(onClick).toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(SNACKBAR_EXIT_MS));
    expect(screen.queryByText('Added to cart')).not.toBeInTheDocument();
  });

  it('waits while hovered', () => {
    render(<SnackbarHost />);
    act(() => {
      snackbar('Hold on');
    });
    fireEvent.mouseEnter(document.querySelector('[data-slot=snackbar]')!);
    act(() => vi.advanceTimersByTime(10000));
    expect(screen.getByText('Hold on')).toBeInTheDocument();
  });

  it('announces errors assertively', () => {
    render(<SnackbarHost />);
    act(() => {
      snackbar.error("Couldn't save");
    });
    expect(screen.getByRole('alert')).toHaveTextContent("Couldn't save");
  });

  it('can be closed with its button', () => {
    render(<SnackbarHost dismissLabel="Close" />);
    act(() => {
      snackbar('Bye');
    });
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    act(() => vi.advanceTimersByTime(SNACKBAR_EXIT_MS));
    expect(screen.queryByText('Bye')).not.toBeInTheDocument();
  });

  describe('from toast()', () => {
    it('becomes a snackbar on phones, keeping the action', () => {
      phone(true);
      const onClick = vi.fn();
      render(<SnackbarHost />);
      act(() => {
        toast.success('Added to cart', 'Hale Teak Bed', { action: { label: 'View cart', onClick } });
      });
      const bar = document.querySelector('[data-slot=snackbar]')!;
      expect(bar).toHaveTextContent('Added to cart');
      expect(bar).toHaveTextContent('Hale Teak Bed');
      expect(bar).toHaveAttribute('data-variant', 'success');
      fireEvent.click(screen.getByRole('button', { name: 'View cart' }));
      expect(onClick).toHaveBeenCalled();
    });

    it('stays a toast on wider screens, or when asked to', () => {
      phone(false);
      render(<SnackbarHost />);
      act(() => {
        toast.info('Desktop');
      });
      expect(document.querySelector('[data-slot=snackbar]')).not.toBeInTheDocument();

      phone(true);
      act(() => {
        toast.info('Forced toast', undefined, { layout: 'toast' });
      });
      expect(document.querySelector('[data-slot=snackbar]')).not.toBeInTheDocument();
      act(() => toast.dismiss());
    });

    it('respects mobileLayout: toast', () => {
      phone(true);
      render(
        <ToastProvider>
          <ToastContainer config={{ mobileLayout: 'toast' }} />
          <SnackbarHost />
        </ToastProvider>
      );
      act(() => {
        toast.info('Still a toast');
      });
      expect(document.querySelector('[data-slot=snackbar]')).not.toBeInTheDocument();
      act(() => toast.dismiss());
      toastStore.setMobileLayout('snackbar');
    });
  });
});
