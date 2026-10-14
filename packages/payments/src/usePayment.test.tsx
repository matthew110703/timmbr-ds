import { act, renderHook, waitFor } from '@testing-library/react';
import { ApiError } from '@timmbr/utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { PaymentInit } from './contract/types';
import type { RazorpayCheckoutOptions, RazorpayConstructor } from './razorpay/types';
import { usePayment, type PayArgs } from './usePayment';

vi.mock('./api', () => ({
  paymentsApi: {
    quote: vi.fn(),
    createOrder: vi.fn(),
    getPaymentSession: vi.fn(),
    verifyPayment: vi.fn(),
    getOrder: vi.fn(),
  },
}));

import { paymentsApi } from './api';

const api = vi.mocked(paymentsApi);

const payment: PaymentInit = {
  id: 'pay-1',
  provider: 'RAZORPAY',
  status: 'PENDING',
  amount: 21368,
  currency: 'INR',
  razorpayOrderId: 'order_rzp_1',
  razorpayKeyId: 'rzp_test_key',
};

const order = {
  id: 'order-1',
  status: 'PENDING' as const,
  grandTotal: 21368,
  currency: 'INR',
  expiresAt: null,
};

const args: PayArgs = {
  items: [{ variantId: 'variant-1', quantity: 1 }],
  shippingAddressId: 'addr-1',
  method: 'upi',
};

const paidResponse = {
  razorpay_payment_id: 'pay_rzp_1',
  razorpay_order_id: 'order_rzp_1',
  razorpay_signature: 'sig',
};

/** Stands in for Razorpay's modal: tests drive it through `FakeRazorpay.current`. */
class FakeRazorpay {
  static current: FakeRazorpay | null = null;
  static opened = 0;
  handlers: Record<string, () => void> = {};

  constructor(public options: RazorpayCheckoutOptions) {
    FakeRazorpay.current = this;
  }
  open() {
    FakeRazorpay.opened += 1;
  }
  close() {}
  on(event: string, handler: () => void) {
    this.handlers[event] = handler;
  }

  pay() {
    this.options.handler(paidResponse);
  }
  fail() {
    this.handlers['payment.failed']?.();
  }
  dismiss() {
    this.options.modal?.ondismiss?.();
  }
}

const apiError = (statusCode: number, code?: string) => new ApiError(statusCode, 'nope', undefined, code);

/** Waits until the (fake) modal is open. */
const modal = async () => {
  await waitFor(() => expect(FakeRazorpay.current).not.toBeNull());
  return FakeRazorpay.current!;
};

describe('usePayment', () => {
  beforeEach(() => {
    FakeRazorpay.current = null;
    FakeRazorpay.opened = 0;
    window.Razorpay = FakeRazorpay as unknown as RazorpayConstructor;
    api.createOrder.mockResolvedValue({ order, payment });
    api.getPaymentSession.mockResolvedValue({ orderId: order.id, payment });
    api.verifyPayment.mockResolvedValue({ orderId: order.id, orderStatus: 'CONFIRMED' });
  });

  afterEach(() => {
    vi.clearAllMocks();
    delete window.Razorpay;
  });

  it('creates the order, opens the modal with core’s values and confirms the payment', async () => {
    const onSuccess = vi.fn();
    const phases: string[] = [];
    const { result } = renderHook(() =>
      usePayment({ onSuccess, onPhaseChange: (phase) => phases.push(phase) })
    );

    act(() => {
      void result.current.pay(args);
    });
    const rzp = await modal();

    expect(api.createOrder).toHaveBeenCalledWith(args.items, 'addr-1');
    expect(rzp.options).toMatchObject({
      key: 'rzp_test_key',
      order_id: 'order_rzp_1',
      amount: 2136800,
      prefill: { method: 'upi' },
    });
    await waitFor(() => expect(result.current.phase).toBe('awaiting'));
    expect(result.current.busy).toBe(true);

    act(() => rzp.pay());

    await waitFor(() => expect(result.current.phase).toBe('success'));
    expect(api.verifyPayment).toHaveBeenCalledWith({
      razorpayPaymentId: 'pay_rzp_1',
      razorpayOrderId: 'order_rzp_1',
      razorpaySignature: 'sig',
    });
    expect(onSuccess).toHaveBeenCalledWith({ orderId: 'order-1' });
    expect(phases).toEqual(['creating', 'awaiting', 'verifying', 'success']);
    expect(result.current.busy).toBe(false);
  });

  it('ignores a second pay() while one is running', async () => {
    const { result } = renderHook(() => usePayment());

    act(() => {
      void result.current.pay(args);
      void result.current.pay(args);
    });
    await modal();

    expect(api.createOrder).toHaveBeenCalledTimes(1);
    expect(FakeRazorpay.opened).toBe(1);
  });

  it('reports dismissed when the modal is closed unpaid, and retry resumes the same order', async () => {
    const { result } = renderHook(() => usePayment());

    act(() => {
      void result.current.pay(args);
    });
    const first = await modal();
    act(() => first.dismiss());

    await waitFor(() => expect(result.current.phase).toBe('dismissed'));
    expect(result.current.orderId).toBe('order-1');
    expect(result.current.error).toBeNull();

    FakeRazorpay.current = null;
    act(() => {
      void result.current.retry();
    });
    const second = await modal();

    expect(api.getPaymentSession).toHaveBeenCalledWith('order-1');
    expect(api.createOrder).toHaveBeenCalledTimes(1);

    act(() => second.pay());
    await waitFor(() => expect(result.current.phase).toBe('success'));
  });

  it('reports failed when a payment failed before the modal closed', async () => {
    const { result } = renderHook(() => usePayment());

    act(() => {
      void result.current.pay(args);
    });
    const rzp = await modal();
    act(() => {
      rzp.fail();
      rzp.dismiss();
    });

    await waitFor(() => expect(result.current.phase).toBe('failed'));
    expect(result.current.error).toMatch(/did not go through/);
  });

  it('lets the shopper pay inside the modal after a failed attempt', async () => {
    const { result } = renderHook(() => usePayment());

    act(() => {
      void result.current.pay(args);
    });
    const rzp = await modal();
    act(() => rzp.fail());
    expect(result.current.phase).toBe('awaiting');

    act(() => rzp.pay());
    await waitFor(() => expect(result.current.phase).toBe('success'));
  });

  it('starts a new order when the held one expired', async () => {
    const { result } = renderHook(() => usePayment());

    act(() => {
      void result.current.pay(args);
    });
    const first = await modal();
    act(() => first.dismiss());
    await waitFor(() => expect(result.current.phase).toBe('dismissed'));

    api.getPaymentSession.mockRejectedValueOnce(apiError(409, 'ORDER_NOT_PAYABLE'));
    api.createOrder.mockResolvedValueOnce({ order: { ...order, id: 'order-2' }, payment });
    FakeRazorpay.current = null;

    act(() => {
      void result.current.retry();
    });
    await modal();

    expect(api.createOrder).toHaveBeenCalledTimes(2);
    await waitFor(() => expect(result.current.orderId).toBe('order-2'));
  });

  it('shows core’s message when the order cannot be created', async () => {
    api.createOrder.mockRejectedValue(apiError(422, 'INSUFFICIENT_STOCK'));
    const { result } = renderHook(() => usePayment());

    await act(async () => {
      await result.current.pay(args);
    });

    expect(result.current.phase).toBe('error');
    expect(result.current.error).toMatch(/no longer available in the quantity/);
    expect(FakeRazorpay.opened).toBe(0);
    expect(result.current.busy).toBe(false);
  });

  it('reports a script failure without leaving the hook busy', async () => {
    delete window.Razorpay;
    const original = document.head.appendChild.bind(document.head);
    const spy = vi.spyOn(document.head, 'appendChild').mockImplementation((node) => {
      const result = original(node);
      queueMicrotask(() => node.dispatchEvent(new Event('error')));
      return result;
    });

    const { result } = renderHook(() => usePayment());
    await act(async () => {
      await result.current.pay(args);
    });
    spy.mockRestore();

    expect(result.current.phase).toBe('error');
    expect(result.current.error).toMatch(/payment window could not be loaded/);
    expect(result.current.busy).toBe(false);
  });

  it('falls back to polling the order when verify cannot be reached', async () => {
    api.verifyPayment.mockRejectedValue(apiError(0));
    api.getOrder
      .mockResolvedValueOnce({ ...order, status: 'PENDING' })
      .mockResolvedValueOnce({ ...order, status: 'CONFIRMED' });
    const onSuccess = vi.fn();
    const { result } = renderHook(() =>
      usePayment({ onSuccess, confirmPollIntervalMs: 5, confirmTimeoutMs: 1000 })
    );

    act(() => {
      void result.current.pay(args);
    });
    const rzp = await modal();
    act(() => rzp.pay());

    await waitFor(() => expect(result.current.phase).toBe('success'));
    expect(api.getOrder).toHaveBeenCalledTimes(2);
    expect(onSuccess).toHaveBeenCalledWith({ orderId: 'order-1' });
  });

  it('gives up with an unconfirmed message when the order never confirms', async () => {
    api.verifyPayment.mockRejectedValue(apiError(503));
    api.getOrder.mockResolvedValue({ ...order, status: 'PENDING' });
    const { result } = renderHook(() =>
      usePayment({ confirmPollIntervalMs: 5, confirmTimeoutMs: 30 })
    );

    act(() => {
      void result.current.pay(args);
    });
    const rzp = await modal();
    act(() => rzp.pay());

    await waitFor(() => expect(result.current.phase).toBe('error'));
    expect(result.current.error).toMatch(/could not confirm the order/);
  });

  it('does not poll after a definitive verify rejection', async () => {
    api.verifyPayment.mockRejectedValue(apiError(409, 'ORDER_NOT_PAYABLE'));
    const { result } = renderHook(() => usePayment());

    act(() => {
      void result.current.pay(args);
    });
    const rzp = await modal();
    act(() => rzp.pay());

    await waitFor(() => expect(result.current.phase).toBe('error'));
    expect(result.current.error).toMatch(/It will be refunded/);
    expect(api.getOrder).not.toHaveBeenCalled();
  });

  it('polls when the session expired during verify (401), because the webhook may have confirmed', async () => {
    api.verifyPayment.mockRejectedValue(apiError(401, 'UNAUTHORIZED'));
    api.getOrder.mockResolvedValue({ ...order, status: 'CONFIRMED' });
    const onSuccess = vi.fn();
    const { result } = renderHook(() =>
      usePayment({ onSuccess, confirmPollIntervalMs: 5, confirmTimeoutMs: 1000 })
    );

    act(() => {
      void result.current.pay(args);
    });
    const rzp = await modal();
    act(() => rzp.pay());

    await waitFor(() => expect(result.current.phase).toBe('success'));
    expect(api.getOrder).toHaveBeenCalled();
    expect(onSuccess).toHaveBeenCalledWith({ orderId: 'order-1' });
  });

  it('still reports success to the app when the page was left while the payment completed', async () => {
    const onSuccess = vi.fn();
    const { result, unmount } = renderHook(() => usePayment({ onSuccess }));

    act(() => {
      void result.current.pay(args);
    });
    const rzp = await modal();
    unmount();
    act(() => rzp.pay());

    await waitFor(() => expect(onSuccess).toHaveBeenCalledWith({ orderId: 'order-1' }));
  });

  it('does not open the payment window on a page the shopper already left', async () => {
    let release!: () => void;
    api.createOrder.mockReturnValue(
      new Promise((resolve) => {
        release = () => resolve({ order, payment });
      })
    );
    const { result, unmount } = renderHook(() => usePayment());

    act(() => {
      void result.current.pay(args);
    });
    unmount();
    release();
    await new Promise((resolve) => setTimeout(resolve, 20));

    expect(FakeRazorpay.opened).toBe(0);
  });

  it('lets the app override the copy', async () => {
    api.createOrder.mockRejectedValue(apiError(422, 'VARIANT_UNAVAILABLE'));
    const { result } = renderHook(() =>
      usePayment({ messages: { errors: { VARIANT_UNAVAILABLE: 'Sold out, sorry.' } } })
    );

    await act(async () => {
      await result.current.pay(args);
    });

    expect(result.current.error).toBe('Sold out, sorry.');
  });

  it('reset() returns to idle', async () => {
    api.createOrder.mockRejectedValue(apiError(500));
    const { result } = renderHook(() => usePayment());
    await act(async () => {
      await result.current.pay(args);
    });
    expect(result.current.phase).toBe('error');

    act(() => result.current.reset());

    expect(result.current.phase).toBe('idle');
    expect(result.current.error).toBeNull();
  });
});
