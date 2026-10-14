import { describe, expect, it } from 'vitest';
import { ApiError } from '@timmbr/utils';
import { paymentErrorMessage } from './errors';

const apiError = (statusCode: number, code?: string, details?: unknown) =>
  new ApiError(statusCode, 'nope', details, code);

describe('paymentErrorMessage', () => {
  it('explains known core codes', () => {
    expect(paymentErrorMessage(apiError(422, 'INSUFFICIENT_STOCK'))).toMatch(/no longer available/);
    expect(paymentErrorMessage(apiError(409, 'ORDER_NOT_PAYABLE'))).toMatch(/can no longer be paid/);
  });

  it('names the online payment limit core reports', () => {
    const error = apiError(422, 'PAYMENT_AMOUNT_TOO_HIGH', { details: { limit: 500000 } });

    expect(paymentErrorMessage(error)).toContain('₹5,00,000');
  });

  it('still answers when the limit is missing', () => {
    expect(paymentErrorMessage(apiError(422, 'PAYMENT_AMOUNT_TOO_HIGH'))).toMatch(/too large/);
  });

  it('reports network failures and unknown errors', () => {
    expect(paymentErrorMessage(apiError(0))).toMatch(/Can't reach the server/);
    expect(paymentErrorMessage(apiError(500, 'WHATEVER'))).toMatch(/Something went wrong/);
    expect(paymentErrorMessage(new Error('boom'))).toMatch(/Something went wrong/);
  });
});
