/** Wire types of the checkout and payment calls (amounts are in rupees; Razorpay's are in paise). */

export interface CheckoutItem {
  variantId: string;
  quantity: number;
}

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'RETURNED';

/** The payment methods the checkout offers; each one preselects its tab in the Razorpay modal. */
export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'emi';

export interface QuoteItem {
  variantId: string;
  productId: string;
  name: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  taxAmount: number;
}

/** `POST /checkout/quote`: what core will charge for these lines. */
export interface CheckoutQuote {
  items: QuoteItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  grandTotal: number;
  currency: string;
  /** Largest total that can be paid online in one order. */
  paymentLimit: number;
}

/** Everything the client needs to open Razorpay for an order. */
export interface PaymentInit {
  id: string;
  provider: string;
  status: string;
  amount: number;
  currency: string;
  razorpayOrderId?: string;
  razorpayKeyId?: string;
}

export interface OrderSummary {
  id: string;
  status: OrderStatus;
  grandTotal: number;
  currency: string;
  expiresAt: string | null;
}

/** `POST /orders` (idempotent: an unexpired order for the same lines is returned again). */
export interface CreateOrderResult {
  order: OrderSummary;
  payment: PaymentInit;
}

/** `POST /orders/:id/payment-session`: resume or retry payment for a PENDING order. */
export interface PaymentSession {
  orderId: string;
  payment: PaymentInit;
}

/** What Razorpay hands back after a successful payment. */
export interface VerifyPaymentPayload {
  razorpayPaymentId: string;
  razorpayOrderId: string;
  razorpaySignature: string;
}

export interface VerifyPaymentResult {
  orderId: string;
  orderStatus: OrderStatus;
}

/** Where `usePayment` is in the flow. */
export type PaymentPhase =
  /** Nothing in flight. */
  | 'idle'
  /** Creating or resuming the order, loading Razorpay. */
  | 'creating'
  /** The Razorpay modal is open. */
  | 'awaiting'
  /** Paid; confirming with core. */
  | 'verifying'
  /** Order confirmed. */
  | 'success'
  /** The payment failed and the modal was closed. The order is still open: call `retry()`. */
  | 'failed'
  /** The modal was closed without paying. The order is still open: call `retry()`. */
  | 'dismissed'
  /** Something other than the payment itself went wrong; see `error`. */
  | 'error';
