import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { isApiError } from '@timmbr/utils';
import { paymentsApi } from './api';
import { paymentErrorCode, paymentErrorMessage } from './errors';
import { resolvePaymentMessages, type PaymentMessagesOverrides } from './messages';
import type {
  CheckoutItem,
  OrderStatus,
  PaymentInit,
  PaymentMethod,
  PaymentPhase,
} from './contract/types';
import { loadRazorpay } from './razorpay/loader';
import {
  buildCheckoutOptions,
  type BuildCheckoutOptionsInput,
  type CheckoutBranding,
  type CheckoutPrefill,
} from './razorpay/options';
import type { RazorpayConstructor, RazorpaySuccessResponse } from './razorpay/types';

export interface PayArgs {
  items: CheckoutItem[];
  shippingAddressId: string;
  /** Preselects this tab in the Razorpay modal. */
  method?: PaymentMethod;
  prefill?: CheckoutPrefill;
}

export interface UsePaymentOptions {
  messages?: PaymentMessagesOverrides;
  /** Logo and colour for the Razorpay modal (its name and description come from `messages`). */
  branding?: Pick<CheckoutBranding, 'image' | 'themeColor'>;
  /** The order is confirmed. Clear the cart mirror and navigate here. */
  onSuccess?: (result: { orderId: string }) => void;
  onPhaseChange?: (phase: PaymentPhase) => void;
  /** After a paid-but-unverified payment, how often to look for the webhook's confirmation. */
  confirmPollIntervalMs?: number;
  /** ...and how long to keep looking before giving up. */
  confirmTimeoutMs?: number;
}

export interface UsePayment {
  phase: PaymentPhase;
  /** User-facing copy for the last failure; null otherwise. */
  error: string | null;
  /** The order being paid for; kept after a failed or dismissed attempt so `retry()` resumes it. */
  orderId: string | null;
  /** True while an attempt is running (creating, modal open or verifying). */
  busy: boolean;
  /** Create (or re-open) the order and open the Razorpay modal. Ignored while `busy`. */
  pay: (args: PayArgs) => Promise<void>;
  /** Pay again for the same order after `failed` or `dismissed` (falls back to a new order if it expired). */
  retry: () => Promise<void>;
  /** Back to `idle`, clearing the error. */
  reset: () => void;
}

type ModalOutcome =
  | { type: 'paid'; response: RazorpaySuccessResponse }
  | { type: 'closed'; paymentFailed: boolean };

const PLACED: readonly OrderStatus[] = ['CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED'];

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * A 4xx answer is final (retrying or polling will not change it). Network errors, 5xx, timeouts,
 * rate limits and an expired session (401) may be transient or fixable, and the webhook may
 * confirm the order anyway, so those fall back to polling.
 */
function isDefinitive(error: unknown): boolean {
  return (
    isApiError(error) &&
    error.statusCode >= 400 &&
    error.statusCode < 500 &&
    error.statusCode !== 401 &&
    error.statusCode !== 408 &&
    error.statusCode !== 429
  );
}

function openModal(
  Razorpay: RazorpayConstructor,
  options: Omit<BuildCheckoutOptionsInput, 'onPaid' | 'onDismiss'>
): Promise<ModalOutcome> {
  return new Promise((resolve) => {
    let settled = false;
    let paymentFailed = false;

    const instance = new Razorpay(
      buildCheckoutOptions({
        ...options,
        onPaid: (response) => {
          settled = true;
          resolve({ type: 'paid', response });
        },
        onDismiss: () => {
          if (settled) return;
          settled = true;
          resolve({ type: 'closed', paymentFailed });
        },
      })
    );

    // The modal stays open after a failed attempt so the shopper can try another method;
    // only closing it ends the attempt.
    instance.on('payment.failed', () => {
      paymentFailed = true;
    });
    instance.open();
  });
}

/**
 * The whole Razorpay payment flow behind one hook: create (or resume) the order through core,
 * load and open the checkout modal with core's key and amount, then confirm the payment.
 * Core stays the authority on price, stock and order state; this hook only sequences the
 * calls and turns every outcome into a `phase` and user-facing copy.
 */
export function usePayment(options: UsePaymentOptions = {}): UsePayment {
  const [phase, setPhaseState] = useState<PaymentPhase>('idle');
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  const messages = useMemo(() => resolvePaymentMessages(options.messages), [options.messages]);

  // Latest options without re-creating `pay`, and the in-flight guard that makes double
  // clicks harmless (core's idempotent `POST /orders` is the second line of defence).
  const optionsRef = useRef(options);
  optionsRef.current = options;
  const messagesRef = useRef(messages);
  messagesRef.current = messages;
  const busyRef = useRef(false);
  const mountedRef = useRef(true);
  const orderIdRef = useRef<string | null>(null);
  const lastArgsRef = useRef<PayArgs | null>(null);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const setPhase = useCallback((next: PaymentPhase) => {
    if (!mountedRef.current) return;
    setPhaseState(next);
    optionsRef.current.onPhaseChange?.(next);
  }, []);

  const fail = useCallback(
    (message: string, next: PaymentPhase = 'error') => {
      if (!mountedRef.current) return;
      setError(message);
      setPhase(next);
    },
    [setPhase]
  );

  const succeed = useCallback(
    (confirmedOrderId: string) => {
      // The payment is done whether or not the page is still here, so the success callback
      // (clear the cart, go to the confirmation) always runs; only the state update is skipped.
      if (mountedRef.current) setPhase('success');
      optionsRef.current.onSuccess?.({ orderId: confirmedOrderId });
    },
    [setPhase]
  );

  /** The webhook may confirm the order even though our verify call failed; look for that. */
  const waitForConfirmation = useCallback(async (id: string): Promise<boolean> => {
    const interval = optionsRef.current.confirmPollIntervalMs ?? 2000;
    const deadline = Date.now() + (optionsRef.current.confirmTimeoutMs ?? 20_000);

    while (Date.now() < deadline && mountedRef.current) {
      try {
        const order = await paymentsApi.getOrder(id);
        if (PLACED.includes(order.status)) return true;
        if (order.status === 'CANCELLED' || order.status === 'RETURNED') return false;
      } catch {
        // Keep trying until the deadline.
      }
      await sleep(interval);
    }
    return false;
  }, []);

  const confirm = useCallback(
    async (id: string, response: RazorpaySuccessResponse) => {
      setPhase('verifying');
      try {
        const result = await paymentsApi.verifyPayment({
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        });
        succeed(result.orderId);
      } catch (verifyError) {
        if (isDefinitive(verifyError)) {
          // At this point the money has been taken, so an expired order is a refund, not a retry.
          fail(
            paymentErrorCode(verifyError) === 'ORDER_NOT_PAYABLE'
              ? messagesRef.current.errors.PAID_ORDER_EXPIRED
              : paymentErrorMessage(verifyError, messagesRef.current.errors)
          );
          return;
        }
        if (await waitForConfirmation(id)) {
          succeed(id);
        } else {
          fail(messagesRef.current.errors.UNCONFIRMED);
        }
      }
    },
    [fail, setPhase, succeed, waitForConfirmation]
  );

  const run = useCallback(
    async (args: PayArgs, resume: boolean) => {
      if (busyRef.current) return;
      busyRef.current = true;
      lastArgsRef.current = args;
      setError(null);
      setPhase('creating');

      try {
        let payment: PaymentInit | null = null;
        let id = orderIdRef.current;

        if (resume && id) {
          try {
            payment = (await paymentsApi.getPaymentSession(id)).payment;
          } catch (sessionError) {
            const code = paymentErrorCode(sessionError);
            if (code !== 'ORDER_NOT_PAYABLE' && code !== 'ORDER_NOT_FOUND') throw sessionError;
            // The held order expired: start over with a fresh one below.
            orderIdRef.current = null;
            id = null;
          }
        }

        if (!payment) {
          const created = await paymentsApi.createOrder(args.items, args.shippingAddressId);
          id = created.order.id;
          payment = created.payment;
        }

        orderIdRef.current = id;
        if (mountedRef.current) setOrderId(id);

        // The shopper left while the order was being made: do not open a payment window on a
        // page they are no longer on. The order stays open and is reused next time.
        if (!mountedRef.current) return;

        let Razorpay: RazorpayConstructor;
        try {
          Razorpay = await loadRazorpay();
        } catch {
          fail(messagesRef.current.errors.SCRIPT_LOAD_FAILED);
          return;
        }

        if (!mountedRef.current) return;

        setPhase('awaiting');
        const outcome = await openModal(Razorpay, {
          payment,
          method: args.method,
          prefill: args.prefill,
          branding: { ...messagesRef.current.checkout, ...optionsRef.current.branding },
        });

        if (outcome.type === 'closed') {
          if (outcome.paymentFailed) fail(messagesRef.current.errors.PAYMENT_FAILED, 'failed');
          else setPhase('dismissed');
          return;
        }

        await confirm(id as string, outcome.response);
      } catch (caught) {
        fail(paymentErrorMessage(caught, messagesRef.current.errors));
      } finally {
        busyRef.current = false;
      }
    },
    [confirm, fail, setPhase]
  );

  const pay = useCallback((args: PayArgs) => run(args, false), [run]);

  const retry = useCallback(async () => {
    const args = lastArgsRef.current;
    if (args) await run(args, true);
  }, [run]);

  const reset = useCallback(() => {
    if (busyRef.current) return;
    setError(null);
    setPhase('idle');
  }, [setPhase]);

  return {
    phase,
    error,
    orderId,
    busy: phase === 'creating' || phase === 'awaiting' || phase === 'verifying',
    pay,
    retry,
    reset,
  };
}
