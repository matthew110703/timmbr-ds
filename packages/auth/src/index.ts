// Client entry ('use client' banner added at build time).
export * from './contract';

export { authApi } from './api';
export {
  bumpCartCount,
  getCartCount,
  getCartQuantity,
  loadCartCount,
  setCartCount,
  setCartLines,
  useCartCount,
  useCartQuantity,
  type CartLine,
} from './cart-count';
export { authErrorMessage } from './errors';
export {
  DEFAULT_AUTH_MESSAGES,
  resolveAuthMessages,
  type AuthMessages,
  type AuthMessagesOverrides,
} from './messages';
export {
  broadcastAuth,
  clearSession,
  getFirstName,
  getSession,
  loadSession,
  logout,
  onAuthBroadcast,
  setSignedIn,
  signOut,
  signOutEverywhere,
  type SignOutOptions,
  useSession,
  whenSessionReady,
  type SessionState,
  type SessionStatus,
} from './session';
export { DEFAULT_OAUTH_POPUP, useAuthFlow, type UseAuthFlowOptions } from './useAuthFlow';
export { AuthModalHost, type AuthModalHostProps, type AuthOAuthProviderId } from './AuthModalHost';
export {
  useProfileAction,
  type ProfileActionProps,
  type UseProfileActionOptions,
} from './useProfileAction';
export { openAuthModal, closeAuthModal } from '@timmbr/hooks';
