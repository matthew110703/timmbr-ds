import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { RazorpayConstructor } from './types';

class FakeRazorpay {}

const scripts = () => document.head.querySelectorAll('script[src*="checkout.razorpay.com"]');

describe('loadRazorpay', () => {
  let loadRazorpay: typeof import('./loader').loadRazorpay;

  beforeEach(async () => {
    // The loader keeps its in-flight promise at module level.
    vi.resetModules();
    ({ loadRazorpay } = await import('./loader'));
    delete window.Razorpay;
    document.head.innerHTML = '';
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('resolves immediately when Razorpay is already on the page', async () => {
    window.Razorpay = FakeRazorpay as unknown as RazorpayConstructor;

    await expect(loadRazorpay()).resolves.toBe(FakeRazorpay);
    expect(scripts()).toHaveLength(0);
  });

  it('injects the script once for concurrent callers', async () => {
    const first = loadRazorpay();
    const second = loadRazorpay();

    expect(first).toBe(second);
    expect(scripts()).toHaveLength(1);

    window.Razorpay = FakeRazorpay as unknown as RazorpayConstructor;
    scripts()[0]!.dispatchEvent(new Event('load'));

    await expect(first).resolves.toBe(FakeRazorpay);
  });

  it('rejects when the script fails, and tries again next time', async () => {
    const failed = loadRazorpay();
    scripts()[0]!.dispatchEvent(new Event('error'));
    await expect(failed).rejects.toThrow(/could not be loaded/);
    expect(scripts()).toHaveLength(0);

    const retry = loadRazorpay();
    expect(retry).not.toBe(failed);
    expect(scripts()).toHaveLength(1);

    window.Razorpay = FakeRazorpay as unknown as RazorpayConstructor;
    scripts()[0]!.dispatchEvent(new Event('load'));
    await expect(retry).resolves.toBe(FakeRazorpay);
  });

  it('rejects when the script loads without defining Razorpay', async () => {
    const result = loadRazorpay();
    scripts()[0]!.dispatchEvent(new Event('load'));
    await expect(result).rejects.toThrow(/without its checkout/);
  });

  it('gives up after the timeout', async () => {
    vi.useFakeTimers();
    const result = loadRazorpay(1000);
    const assertion = expect(result).rejects.toThrow(/too long/);

    await vi.advanceTimersByTimeAsync(1000);
    await assertion;
  });
});
