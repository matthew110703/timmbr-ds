import type { PaymentInit, PaymentMethod } from '../contract/types';
import type { RazorpayCheckoutOptions, RazorpaySuccessResponse } from './types';

/** Rupees to paise, rounded (floating point: 19999.1 * 100 is not an integer). */
export function toPaise(rupees: number): number {
  return Math.round(rupees * 100);
}

/** Methods the storefront does not offer; hidden inside the Razorpay modal. */
export const HIDDEN_METHODS = ['wallet', 'paylater', 'cardless_emi'] as const;

export interface CheckoutBranding {
  /** Shown in the modal header (the store name). */
  name?: string;
  description?: string;
  /** Absolute URL of a logo. */
  image?: string;
  /** Hex colour of the modal's buttons and accents. */
  themeColor?: string;
}

export interface CheckoutPrefill {
  name?: string;
  email?: string;
  contact?: string;
}

export interface BuildCheckoutOptionsInput {
  payment: PaymentInit;
  method?: PaymentMethod;
  prefill?: CheckoutPrefill;
  branding?: CheckoutBranding;
  onPaid: (response: RazorpaySuccessResponse) => void;
  onDismiss: () => void;
}

/**
 * Builds the options for `new Razorpay(...)` from what core returned. The key id, order id and
 * amount always come from core, never from the caller. Throws when core did not return a
 * Razorpay order (e.g. a mock-mode key id of "").
 */
export function buildCheckoutOptions(input: BuildCheckoutOptionsInput): RazorpayCheckoutOptions {
  const { payment, method, prefill, branding } = input;
  if (!payment.razorpayKeyId || !payment.razorpayOrderId) {
    throw new Error('Payment is not configured: missing Razorpay key or order.');
  }

  return {
    key: payment.razorpayKeyId,
    amount: toPaise(payment.amount),
    currency: payment.currency,
    order_id: payment.razorpayOrderId,
    name: branding?.name,
    description: branding?.description,
    image: branding?.image,
    prefill: { ...prefill, ...(method && { method }) },
    theme: branding?.themeColor ? { color: branding.themeColor } : undefined,
    config: { display: { hide: HIDDEN_METHODS.map((m) => ({ method: m })) } },
    modal: { ondismiss: input.onDismiss, confirm_close: true },
    handler: input.onPaid,
  };
}
