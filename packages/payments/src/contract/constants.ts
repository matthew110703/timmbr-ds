/** timmbr-core paths (under `/api/v1`), reached through the shell's `/api/core` BFF. */
export const PAYMENT_ROUTES = {
  quote: '/checkout/quote',
  createOrder: '/orders',
  order: (orderId: string) => `/orders/${encodeURIComponent(orderId)}`,
  paymentSession: (orderId: string) => `/orders/${encodeURIComponent(orderId)}/payment-session`,
  verify: '/payments/razorpay/verify',
} as const;

export const RAZORPAY_CHECKOUT_SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js';

/** Core error codes this package knows how to explain. */
export const PAYMENT_ERROR_CODES = [
  'INSUFFICIENT_STOCK',
  'VARIANT_UNAVAILABLE',
  'ADDRESS_NOT_FOUND',
  'ORDER_NOT_FOUND',
  'ORDER_ACCESS_FORBIDDEN',
  'ORDER_NOT_PAYABLE',
  'PAYMENT_AMOUNT_TOO_HIGH',
  'INVALID_PAYMENT_SIGNATURE',
  'PAYMENT_NOT_FOUND',
  'RAZORPAY_ORDER_CREATION_FAILED',
] as const;

export type PaymentErrorCode = (typeof PAYMENT_ERROR_CODES)[number];
