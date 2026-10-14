# @timmbr/payments

## 1.0.0

### Major Changes

- New package: the Razorpay checkout flow for the storefront, behind one hook. It talks to timmbr-core only through the shell's same-origin `/api/core` BFF, and core stays the authority on price, stock, the key id and the order.

  - `usePayment()`: `pay({ items, shippingAddressId, method })` creates (or re-opens) the order, loads Razorpay on demand, opens the modal with core's key and amount, then confirms the payment. It exposes `phase` (`idle | creating | awaiting | verifying | success | failed | dismissed | error`), `error` (user-facing copy), `orderId`, `busy`, `retry()` and `reset()`.
  - Double clicks are ignored. After a dismissed or failed attempt `retry()` resumes the same order (or starts a new one if it expired). If verifying fails transiently (network, 5xx, an expired session) it polls the order, because the webhook may already have confirmed it. The success callback always runs once a payment completes, even if the page was left.
  - `paymentsApi`, `loadRazorpay()`, `buildCheckoutOptions()` / `toPaise()`, `paymentErrorMessage()` and `resolvePaymentMessages()` (all copy overridable).
  - `@timmbr/payments/contract`: wire types, `PAYMENT_ROUTES` and the handled core error codes, free of React and safe to import from server code.
  - The quote carries `paymentLimit` (the largest total payable online). An order above it (`PAYMENT_AMOUNT_TOO_HIGH`) and a payment received for an order that had already expired (`PAID_ORDER_EXPIRED`) each get their own clear message.
