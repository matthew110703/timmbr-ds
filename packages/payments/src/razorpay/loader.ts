import { RAZORPAY_CHECKOUT_SCRIPT_URL } from '../contract/constants';
import type { RazorpayConstructor } from './types';

/** The script is injected once per page; concurrent callers share the same promise. */
let pending: Promise<RazorpayConstructor> | null = null;

/**
 * Loads Razorpay's checkout script on demand (browser only) and resolves its constructor.
 * A failed load is not cached, so the next payment attempt tries again.
 */
export function loadRazorpay(timeoutMs = 15_000): Promise<RazorpayConstructor> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Razorpay can only be loaded in the browser.'));
  }
  if (window.Razorpay) return Promise.resolve(window.Razorpay);
  if (pending) return pending;

  pending = new Promise<RazorpayConstructor>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = RAZORPAY_CHECKOUT_SCRIPT_URL;
    script.async = true;

    const fail = (message: string) => {
      window.clearTimeout(timer);
      script.remove();
      pending = null;
      reject(new Error(message));
    };

    const timer = window.setTimeout(() => fail('Razorpay took too long to load.'), timeoutMs);

    script.onload = () => {
      window.clearTimeout(timer);
      if (window.Razorpay) resolve(window.Razorpay);
      else fail('Razorpay loaded without its checkout.');
    };
    script.onerror = () => fail('Razorpay could not be loaded.');

    document.head.appendChild(script);
  });

  return pending;
}
