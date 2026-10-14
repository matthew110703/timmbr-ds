# @timmbr/payments

The Razorpay checkout flow for the Timmbr storefront, behind one hook.

It runs in the browser and talks only to the shell's same-origin `/api/core` routes, never to Razorpay's API or to timmbr-core directly. **timmbr-core stays the authority** on prices, stock, the Razorpay key id and the order. The client only sequences the calls, so it can never choose an amount or a key.

## Use in a zone

```tsx
"use client";
import { usePayment } from "@timmbr/payments";

const payment = usePayment({
  onSuccess: ({ orderId }) => router.push(`/success?orderId=${orderId}`),
});

<Button
  loading={payment.busy}
  onClick={() =>
    payment.pay({ items, shippingAddressId, method: "upi", prefill: { name, contact } })
  }
/>;
{payment.error && <Alert>{payment.error}</Alert>}
```

Add `@timmbr/payments` to `transpilePackages`.

## What `usePayment` does

1. Creates the order (`POST /orders`) or, on `retry()`, resumes it (`POST /orders/:id/payment-session`). Creating is idempotent in core, so a double click cannot make two orders.
2. Loads Razorpay's `checkout.js` on demand and opens the modal with core's key id, order id and amount.
3. On payment, confirms it with core (`POST /payments/razorpay/verify`). If that call cannot be completed (network error, 5xx, an expired session), it polls the order, because core's webhook may already have confirmed it.

`phase` is one of `idle | creating | awaiting | verifying | success | failed | dismissed | error`. After `failed` or `dismissed` the order is still open: call `retry()`. `error` is user-facing copy; override any of it with `messages`.

The success callback always runs once a payment completes, even if the page was left in the meantime. A call to `pay()` while one is in flight is ignored.

## Other exports

- `paymentsApi`: `quote`, `createOrder`, `getPaymentSession`, `verifyPayment`, `getOrder`.
- `loadRazorpay()`, `buildCheckoutOptions()`, `toPaise()`.
- `paymentErrorMessage()`, `resolvePaymentMessages()`, `DEFAULT_PAYMENT_MESSAGES`.

## Server code

Import wire types and constants from `@timmbr/payments/contract` (`CheckoutQuote`, `PaymentMethod`, `PAYMENT_ROUTES`, ...). It has no React and no `'use client'`.

## Contract

- **Envelope:** every response is `{ success, data }`; `paymentsApi` unwraps it.
- **Amounts:** rupees everywhere, converted to paise (`toPaise`) only for Razorpay.
- **Methods:** `upi | card | netbanking | emi` preselect that tab in the Razorpay window, which still offers the others. Wallets, pay later and cardless EMI are hidden.
- **Quote limit:** `CheckoutQuote.paymentLimit` is the largest total payable online; core refuses larger orders (`PAYMENT_AMOUNT_TOO_HIGH`).
