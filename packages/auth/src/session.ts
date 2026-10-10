import { useSyncExternalStore } from 'react';
import { authApi } from './api';
import { AUTH_CHANNEL_NAME } from './contract/constants';
import type { AuthBroadcast, SessionUser } from './contract/types';

/**
 * Client view of the server-side session.
 *
 * The session itself lives in httpOnly cookies on the storefront domain and
 * is kept fresh by the shell (its proxy and /api/auth routes). This store only
 * mirrors *who* is signed in, for the header and the auth modal. It never
 * holds a token.
 *
 * Module state: one store per zone bundle, shared by every component in it.
 */

export type SessionStatus = 'loading' | 'authenticated' | 'anonymous';

export interface SessionState {
  status: SessionStatus;
  user: SessionUser | null;
}

const SERVER_SNAPSHOT: SessionState = { status: 'loading', user: null };

let state: SessionState = SERVER_SNAPSHOT;
let loadPromise: Promise<SessionState> | null = null;
const listeners = new Set<() => void>();

function setState(next: SessionState) {
  state = next;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

// ─── Cross-tab channel ────────────────────────────────────────────────────────
// Cookies are shared by every tab (and zone) already; this only tells other
// tabs to re-read who is signed in. A channel never receives its own messages.

let channel: BroadcastChannel | null = null;

function getChannel(): BroadcastChannel | null {
  if (typeof window === 'undefined' || !('BroadcastChannel' in window)) return null;
  channel ??= new BroadcastChannel(AUTH_CHANNEL_NAME);
  return channel;
}

export function broadcastAuth(message: AuthBroadcast) {
  getChannel()?.postMessage(message);
}

/** Subscribe to auth events from other tabs. Returns an unsubscribe function. */
export function onAuthBroadcast(handler: (message: AuthBroadcast) => void) {
  const ch = getChannel();
  if (!ch) return () => {};
  const listener = (event: MessageEvent<AuthBroadcast>) => handler(event.data);
  ch.addEventListener('message', listener);
  return () => ch.removeEventListener('message', listener);
}

// ─── Public API ──────────────────────────────────────────────────────────────

export function getSession(): SessionState {
  return state;
}

/** A sign-in step succeeded (the BFF has already set the cookies). */
export function setSignedIn(user: SessionUser) {
  setState({ status: 'authenticated', user });
}

/**
 * Ask the BFF who is signed in (it refreshes server-side if needed).
 * Concurrent callers share one request.
 */
export function loadSession(): Promise<SessionState> {
  loadPromise ??= authApi
    .session()
    .then(({ user }) => {
      setState(user ? { status: 'authenticated', user } : { status: 'anonymous', user: null });
      return state;
    })
    .catch(() => {
      // Can't tell right now (offline / BFF down): show signed-out UI; the
      // server-side session is untouched and the next load will pick it up.
      if (state.status === 'loading') setState({ status: 'anonymous', user: null });
      return state;
    })
    .finally(() => {
      loadPromise = null;
    });
  return loadPromise;
}

/** Resolves once any in-flight session load settles (immediately if none). */
export function whenSessionReady(): Promise<SessionState> {
  return loadPromise ?? Promise.resolve(state);
}

export function clearSession() {
  setState({ status: 'anonymous', user: null });
}

/** Revoke the session server-side and sign out every tab. */
export async function logout() {
  try {
    await authApi.logout();
  } finally {
    clearSession();
    broadcastAuth({ type: 'LOGOUT' });
  }
}

export interface SignOutOptions {
  /**
   * Paths that need a session. Signing out on one of them leaves for
   * `redirectTo`; anywhere else the page stays and just shows signed-out UI.
   */
  protectedPrefixes?: string[];
  /** Where to go when leaving a protected page. */
  redirectTo?: string;
}

const DEFAULT_PROTECTED_PREFIXES = ['/account'];

function leaveIfProtected({
  protectedPrefixes = DEFAULT_PROTECTED_PREFIXES,
  redirectTo = '/',
}: SignOutOptions) {
  if (typeof window === 'undefined') return;
  const path = window.location.pathname;
  const isProtected = protectedPrefixes.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`)
  );
  // Zones are separate apps: full navigation.
  if (isProtected) window.location.assign(redirectTo);
}

/**
 * Log out (this device), sign out every open tab, and leave the page if it
 * requires a session. Used by the header menu and the account navigation.
 */
export async function signOut(options: SignOutOptions = {}) {
  await logout();
  leaveIfProtected(options);
}

/** Log out on every device (core revokes all sessions), then like `signOut`. */
export async function signOutEverywhere(options: SignOutOptions = {}) {
  try {
    await authApi.logoutAll();
  } finally {
    clearSession();
    broadcastAuth({ type: 'LOGOUT' });
  }
  leaveIfProtected(options);
}

const PLACEHOLDER_NAMES = new Set(['customer']);

/** First word of the user's name, or null when there's no usable name. */
export function getFirstName(user: Pick<SessionUser, 'name'> | null | undefined): string | null {
  const first = user?.name?.trim().split(/\s+/)[0];
  if (!first || PLACEHOLDER_NAMES.has(first.toLowerCase())) return null;
  return first;
}

export function useSession(): SessionState {
  return useSyncExternalStore(subscribe, getSession, () => SERVER_SNAPSHOT);
}

/** Test helper: back to the initial (loading) state. */
export function __resetSessionForTests() {
  loadPromise = null;
  state = SERVER_SNAPSHOT;
}
