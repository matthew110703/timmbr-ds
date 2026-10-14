/** All user-facing copy of the payment flow. Override any part via `messages`. */
export interface PaymentMessages {
  /** Shown in the Razorpay modal header. */
  checkout: {
    name: string;
    description: string;
  };
  /** Messages keyed by timmbr-core error `code`, plus the client-side failures. */
  errors: {
    INSUFFICIENT_STOCK: string;
    VARIANT_UNAVAILABLE: string;
    ADDRESS_NOT_FOUND: string;
    ORDER_NOT_FOUND: string;
    ORDER_ACCESS_FORBIDDEN: string;
    ORDER_NOT_PAYABLE: string;
    /** The total is above what Razorpay accepts for one order (rupees). */
    PAYMENT_AMOUNT_TOO_HIGH: (limit?: number) => string;
    INVALID_PAYMENT_SIGNATURE: string;
    PAYMENT_NOT_FOUND: string;
    RAZORPAY_ORDER_CREATION_FAILED: string;
    /** The Razorpay script could not be loaded. */
    SCRIPT_LOAD_FAILED: string;
    /** The payment failed inside the modal (declined, wrong OTP…). */
    PAYMENT_FAILED: string;
    /** Paid, but the order had already expired: the money is coming back. */
    PAID_ORDER_EXPIRED: string;
    /** Paid, but we could not confirm the order in time. */
    UNCONFIRMED: string;
    NETWORK: string;
    GENERIC: string;
  };
}

/** Per-section partial overrides. */
export type PaymentMessagesOverrides = {
  [K in keyof PaymentMessages]?: Partial<PaymentMessages[K]>;
};

export const DEFAULT_PAYMENT_MESSAGES: PaymentMessages = {
  checkout: {
    name: 'Timmbr',
    description: 'Order payment',
  },
  errors: {
    INSUFFICIENT_STOCK: 'Some items are no longer available in the quantity you chose. Please update your cart.',
    VARIANT_UNAVAILABLE: 'Some items in your cart are no longer available. Please update your cart.',
    ADDRESS_NOT_FOUND: 'We could not find that delivery address. Please choose another one.',
    ORDER_NOT_FOUND: 'We could not find this order.',
    ORDER_ACCESS_FORBIDDEN: 'This order belongs to another account.',
    ORDER_NOT_PAYABLE: 'This order can no longer be paid for. Please place a new order.',
    PAYMENT_AMOUNT_TOO_HIGH: (limit) =>
      limit
        ? `Orders above ₹${limit.toLocaleString('en-IN')} can't be paid online. Please reduce your cart or split your order.`
        : "This order is too large to pay online. Please reduce your cart or split your order.",
    INVALID_PAYMENT_SIGNATURE: 'We could not verify this payment. If money was deducted, it will be refunded.',
    PAYMENT_NOT_FOUND: 'We could not find this payment.',
    RAZORPAY_ORDER_CREATION_FAILED: 'The payment service is unavailable right now. Please try again in a moment.',
    SCRIPT_LOAD_FAILED: 'The payment window could not be loaded. Check your connection and try again.',
    PAYMENT_FAILED: 'Your payment did not go through. You have not been charged. Please try again.',
    PAID_ORDER_EXPIRED:
      'We received your payment, but this order had already expired. It will be refunded. Please place a new order.',
    UNCONFIRMED:
      'We received your payment but could not confirm the order yet. Please check your orders before paying again.',
    NETWORK: "Can't reach the server. Check your connection and try again.",
    GENERIC: 'Something went wrong. Please try again.',
  },
};

export function resolvePaymentMessages(overrides?: PaymentMessagesOverrides): PaymentMessages {
  if (!overrides) return DEFAULT_PAYMENT_MESSAGES;
  return {
    checkout: { ...DEFAULT_PAYMENT_MESSAGES.checkout, ...overrides.checkout },
    errors: { ...DEFAULT_PAYMENT_MESSAGES.errors, ...overrides.errors },
  };
}
