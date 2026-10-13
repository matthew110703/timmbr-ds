import { useEffect, useSyncExternalStore } from 'react';
import { createApiClient } from '@timmbr/utils';
import { useSession } from './session';

/**
 * What's in the shopper's cart, in brief: the unit count for the header badge on every zone, and
 * the quantity per variant ("In your cart" on product pages).
 *
 * The cart itself lives in timmbr-core (a guest cart is identified by an httpOnly cookie the
 * shell's /api/core proxy passes through; a signed-in cart by the session). This store only
 * mirrors it: loaded once per page, updated by whoever changes the cart (add to cart sets it from
 * core's answer), and kept in step across tabs.
 *
 * Module state: one store per zone bundle, shared by every component in it.
 */

export interface CartLine {
  variantId: string;
  quantity: number;
}

interface CartSnapshot {
  count: number;
  /** Quantity by variant id. */
  lines: Record<string, number>;
}

const CART_CHANNEL_NAME = 'timmbr_cart';
const core = createApiClient({ baseUrl: '', apiPrefix: '/api/core' });

/** null until the first load answers. */
let snapshot: CartSnapshot | null = null;
let loadPromise: Promise<number | null> | null = null;
/** Bumped by every local or cross-tab update, so an older load answer can't overwrite it. */
let version = 0;
/** Who the cart was last loaded for ("anonymous" or a user id); a change triggers a reload. */
let loadedFor: string | null = null;
const listeners = new Set<() => void>();

function emit(next: CartSnapshot | null) {
  snapshot = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function toSnapshot(items: CartLine[]): CartSnapshot {
  const lines: Record<string, number> = {};
  let count = 0;
  for (const { variantId, quantity } of items) {
    lines[variantId] = (lines[variantId] ?? 0) + quantity;
    count += quantity;
  }
  return { count, lines };
}

let channel: BroadcastChannel | null = null;

function getChannel(): BroadcastChannel | null {
  if (typeof window === 'undefined' || !('BroadcastChannel' in window)) return null;
  if (!channel) {
    channel = new BroadcastChannel(CART_CHANNEL_NAME);
    channel.addEventListener('message', (event: MessageEvent<Partial<CartSnapshot>>) => {
      const data = event.data;
      if (typeof data?.count === 'number' && data.lines && typeof data.lines === 'object') {
        version += 1;
        emit({ count: data.count, lines: data.lines });
      }
    });
  }
  return channel;
}

function publish(next: CartSnapshot) {
  version += 1;
  emit(next);
  getChannel()?.postMessage(next);
}

export function getCartCount(): number | null {
  return snapshot?.count ?? null;
}

/** Units of one variant in the cart (0 when none or not loaded yet). */
export function getCartQuantity(variantId: string): number {
  return snapshot?.lines[variantId] ?? 0;
}

/** Replaces the mirror with core's cart lines (e.g. the cart returned by an add). */
export function setCartLines(items: CartLine[]) {
  publish(toSnapshot(items));
}

/** Sets only the count (lines unchanged) and tells the other tabs. */
export function setCartCount(next: number) {
  publish({ count: Math.max(0, Math.floor(next)), lines: snapshot?.lines ?? {} });
}

/** Optimistic change (e.g. +2 while an add is in flight); undo with the opposite delta. */
export function bumpCartCount(delta: number) {
  setCartCount((snapshot?.count ?? 0) + delta);
}

/**
 * Asks core for the cart lines. Concurrent callers share one request; failures keep the old value.
 * An answer that arrives after a newer update (an add, another tab) is dropped.
 */
export function loadCartCount(): Promise<number | null> {
  if (loadPromise) return loadPromise;
  const startedAt = version;
  loadPromise = core
    .get<{ count: number; items?: CartLine[] }>('/cart/count', { skipAuth: true, cache: 'no-store' })
    .then(({ count, items }) => {
      if (version !== startedAt) return snapshot?.count ?? null;
      emit(items ? toSnapshot(items) : { count, lines: snapshot?.lines ?? {} });
      return count;
    })
    .catch(() => snapshot?.count ?? null)
    .finally(() => {
      loadPromise = null;
    });
  return loadPromise;
}

/**
 * Loads once per page, and again when the shopper changes (signing in merges the guest cart; a
 * different user has a different cart). Components mounting later reuse the loaded mirror.
 */
function useCartLoad() {
  const { status, user } = useSession();
  const identity = status === 'loading' ? null : status === 'authenticated' ? `user:${user?.id ?? ''}` : 'anonymous';
  useEffect(() => {
    getChannel();
    if (identity === null || identity === loadedFor) return;
    loadedFor = identity;
    void loadCartCount();
  }, [identity]);
}

/** The cart's unit count (null while unknown). */
export function useCartCount(): number | null {
  const value = useSyncExternalStore(subscribe, getCartCount, () => null);
  useCartLoad();
  return value;
}

/** Units of `variantId` in the cart (0 while unknown). */
export function useCartQuantity(variantId: string): number {
  const value = useSyncExternalStore(
    subscribe,
    () => getCartQuantity(variantId),
    () => 0
  );
  useCartLoad();
  return value;
}

/** Test helper: back to the initial (unknown) state. */
export function __resetCartCountForTests() {
  loadPromise = null;
  snapshot = null;
  version = 0;
  loadedFor = null;
}
