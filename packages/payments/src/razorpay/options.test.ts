import { describe, expect, it, vi } from 'vitest';
import { buildCheckoutOptions, HIDDEN_METHODS, toPaise } from './options';
import type { PaymentInit } from '../contract/types';

const payment: PaymentInit = {
  id: 'pay-1',
  provider: 'RAZORPAY',
  status: 'PENDING',
  amount: 21368,
  currency: 'INR',
  razorpayOrderId: 'order_abc',
  razorpayKeyId: 'rzp_test_key',
};

const handlers = { onPaid: vi.fn(), onDismiss: vi.fn() };

describe('toPaise', () => {
  it('converts rupees to whole paise', () => {
    expect(toPaise(21368)).toBe(2136800);
    expect(toPaise(199.99)).toBe(19999);
  });

  it('rounds away floating point noise', () => {
    expect(toPaise(19999.1)).toBe(1999910);
    expect(toPaise(0.1 + 0.2)).toBe(30);
  });
});

describe('buildCheckoutOptions', () => {
  it('takes key, order and amount from the payment core returned', () => {
    const options = buildCheckoutOptions({ payment, ...handlers });

    expect(options).toMatchObject({
      key: 'rzp_test_key',
      order_id: 'order_abc',
      amount: 2136800,
      currency: 'INR',
    });
    expect(options.handler).toBe(handlers.onPaid);
    expect(options.modal?.ondismiss).toBe(handlers.onDismiss);
  });

  it('preselects the chosen method and keeps the prefill', () => {
    const options = buildCheckoutOptions({
      payment,
      method: 'upi',
      prefill: { name: 'Asha', contact: '9741791394' },
      ...handlers,
    });

    expect(options.prefill).toEqual({ name: 'Asha', contact: '9741791394', method: 'upi' });
  });

  it('adds no method when none is chosen', () => {
    const options = buildCheckoutOptions({ payment, ...handlers });
    expect(options.prefill).not.toHaveProperty('method');
  });

  it('hides the methods the storefront does not offer', () => {
    const options = buildCheckoutOptions({ payment, ...handlers });
    expect(options.config?.display?.hide).toEqual(HIDDEN_METHODS.map((method) => ({ method })));
  });

  it('applies branding', () => {
    const options = buildCheckoutOptions({
      payment,
      branding: { name: 'Timmbr', description: 'Order', themeColor: '#c0643a' },
      ...handlers,
    });

    expect(options).toMatchObject({ name: 'Timmbr', description: 'Order', theme: { color: '#c0643a' } });
  });

  it.each([
    ['key id', { razorpayKeyId: '' }],
    ['order id', { razorpayOrderId: undefined }],
  ])('refuses to open without a %s (core is in mock mode)', (_label, patch) => {
    expect(() => buildCheckoutOptions({ payment: { ...payment, ...patch }, ...handlers })).toThrow(
      /not configured/
    );
  });
});
