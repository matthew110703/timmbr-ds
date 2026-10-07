/** postMessage contract between the /oauth/callback popup and its opener. */
export const OAUTH_RESULT_MESSAGE = 'timmbr:oauth:result';

/**
 * Same-origin fallback channel. The provider's pages may set
 * Cross-Origin-Opener-Policy, which severs `window.opener` for the rest of
 * the popup's life; BroadcastChannel still reaches the opener in that case.
 */
export const OAUTH_CHANNEL_NAME = 'timmbr_oauth';

export type OAuthResultStatus = 'success' | 'error';

export interface OAuthResultMessage {
  type: typeof OAUTH_RESULT_MESSAGE;
  status: OAuthResultStatus;
}

export function isOAuthResultMessage(data: unknown): data is OAuthResultMessage {
  const msg = data as Partial<OAuthResultMessage> | null;
  return (
    !!msg &&
    msg.type === OAUTH_RESULT_MESSAGE &&
    (msg.status === 'success' || msg.status === 'error')
  );
}
