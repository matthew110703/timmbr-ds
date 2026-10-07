import { useSyncExternalStore } from 'react';

export interface OpenAuthModalOptions {
  /** Called after a successful sign-in, before the modal closes. */
  onSuccess?: () => void;
  /** Pre-fills the email / phone field. */
  initialIdentifier?: string;
}

export interface AuthModalState {
  isOpen: boolean;
  options: OpenAuthModalOptions;
}

export const AUTH_MODAL_OPEN_EVENT = 'timmbr:auth-modal:open';
export const AUTH_MODAL_CLOSE_EVENT = 'timmbr:auth-modal:close';

/**
 * Open/close requests travel as window events, so any code on the page (even a
 * separately bundled copy of this package) can trigger the modal. Events don't
 * cross Next.js zones: each zone is its own page load.
 */
export function openAuthModal(options?: OpenAuthModalOptions): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent<OpenAuthModalOptions>(AUTH_MODAL_OPEN_EVENT, { detail: options })
    );
  }
}

export function closeAuthModal(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(AUTH_MODAL_CLOSE_EVENT));
  }
}

// ─── Shared store ────────────────────────────────────────────────────────────
// One state for every hook instance, so a component that mounts after the
// modal opened still sees `isOpen: true`.

const CLOSED: AuthModalState = { isOpen: false, options: {} };

let state: AuthModalState = CLOSED;
const listeners = new Set<() => void>();
let windowListenersAttached = false;

function setState(next: AuthModalState) {
  state = next;
  listeners.forEach((listener) => listener());
}

function attachWindowListeners() {
  if (windowListenersAttached || typeof window === 'undefined') return;
  windowListenersAttached = true;

  window.addEventListener(AUTH_MODAL_OPEN_EVENT, (e) => {
    setState({ isOpen: true, options: (e as CustomEvent<OpenAuthModalOptions>).detail ?? {} });
  });
  window.addEventListener(AUTH_MODAL_CLOSE_EVENT, () => setState(CLOSED));
}

function subscribe(listener: () => void) {
  attachWindowListeners();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

const getSnapshot = () => state;
const getServerSnapshot = () => CLOSED;

/** Subscribe to the auth modal's open state and the options it was opened with. */
export function useAuthModal() {
  const { isOpen, options } = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return {
    isOpen,
    modalOptions: options,
    open: openAuthModal,
    close: closeAuthModal,
  };
}
