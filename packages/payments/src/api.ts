import { createApiClient, type RequestOptions } from '@timmbr/utils';
import { PAYMENT_ROUTES } from './contract/constants';
import type {
  CheckoutItem,
  CheckoutQuote,
  CreateOrderResult,
  OrderSummary,
  PaymentSession,
  VerifyPaymentPayload,
  VerifyPaymentResult,
} from './contract/types';

/**
 * Payment calls go to the shell's `/api/core` BFF on the same origin, never to timmbr-core
 * or Razorpay directly: the BFF adds the session's token and checks the request origin.
 * Core owns every price, the key id and the order, so nothing here is trusted client input.
 */
const core = createApiClient({ baseUrl: '', apiPrefix: '/api/core' });

const REQUEST: RequestOptions = { skipAuth: true, cache: 'no-store' };

export const paymentsApi = {
  quote(items: CheckoutItem[], shippingAddressId: string) {
    return core.post<CheckoutQuote>(PAYMENT_ROUTES.quote, { items, shippingAddressId }, REQUEST);
  },

  /** Idempotent: the same lines and address return the order that is already open. */
  createOrder(items: CheckoutItem[], shippingAddressId: string) {
    return core.post<CreateOrderResult>(
      PAYMENT_ROUTES.createOrder,
      { items, shippingAddressId },
      REQUEST
    );
  },

  getPaymentSession(orderId: string) {
    return core.post<PaymentSession>(PAYMENT_ROUTES.paymentSession(orderId), undefined, REQUEST);
  },

  verifyPayment(payload: VerifyPaymentPayload) {
    return core.post<VerifyPaymentResult>(PAYMENT_ROUTES.verify, payload, REQUEST);
  },

  getOrder(orderId: string) {
    return core.get<OrderSummary>(PAYMENT_ROUTES.order(orderId), REQUEST);
  },
};
