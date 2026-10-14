import { isApiError } from '@timmbr/utils';
import { PAYMENT_ERROR_CODES, type PaymentErrorCode } from './contract/constants';
import { DEFAULT_PAYMENT_MESSAGES, type PaymentMessages } from './messages';

function isPaymentErrorCode(code: string | undefined): code is PaymentErrorCode {
  return !!code && (PAYMENT_ERROR_CODES as readonly string[]).includes(code);
}

/** The error's `code` when it is one this package explains. */
export function paymentErrorCode(error: unknown): PaymentErrorCode | undefined {
  return isApiError(error) && isPaymentErrorCode(error.code) ? error.code : undefined;
}

/** Map a payment API failure to user-facing copy, keyed by the backend error `code`. */
export function paymentErrorMessage(
  error: unknown,
  copy: PaymentMessages['errors'] = DEFAULT_PAYMENT_MESSAGES.errors
): string {
  if (!isApiError(error)) return copy.GENERIC;
  if (error.isNetworkError) return copy.NETWORK;

  const code = paymentErrorCode(error);
  if (code === 'PAYMENT_AMOUNT_TOO_HIGH') {
    const body = error.details as { details?: { limit?: unknown } } | undefined;
    const limit = body?.details?.limit;
    return copy.PAYMENT_AMOUNT_TOO_HIGH(typeof limit === 'number' ? limit : undefined);
  }
  if (code) return copy[code];

  return copy.GENERIC;
}
