'use client';

import * as React from 'react';
import { AppleIcon, GitHubIcon, GoogleIcon } from '@timmbr/icons';
import { Spinner } from '../../Spinner';
import { useAuthModalLabels } from '../AuthModal.labels';
import { authModalSecondaryButtonVariants } from '../AuthModal.styles';
import type { AuthOAuthProvider } from '../AuthModal.types';

/** Built-in icons for well-known providers; any provider can pass its own `icon`. */
const PROVIDER_ICONS: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  google: GoogleIcon,
  apple: AppleIcon,
  github: GitHubIcon,
};

function ProviderIcon({ provider }: { provider: AuthOAuthProvider }) {
  if (provider.icon) return <>{provider.icon}</>;
  const BuiltIn = PROVIDER_ICONS[provider.id.toLowerCase()];
  return BuiltIn ? <BuiltIn className="size-5 shrink-0" /> : null;
}

export interface OAuthButtonProps {
  provider: AuthOAuthProvider;
  /** Disable while another sign-in request is in flight */
  disabled?: boolean;
}

export function OAuthButton({ provider, disabled }: OAuthButtonProps) {
  const labels = useAuthModalLabels();

  return (
    <button
      type="button"
      onClick={provider.onClick}
      disabled={disabled || provider.disabled || provider.isLoading}
      aria-busy={provider.isLoading || undefined}
      data-slot={`oauth-button-${provider.id}`}
      className={authModalSecondaryButtonVariants()}
    >
      {provider.isLoading ? (
        <Spinner size="sm" variant="primary" decorative />
      ) : (
        <ProviderIcon provider={provider} />
      )}
      <span>{labels.oauthContinueWith(provider.name)}</span>
    </button>
  );
}

OAuthButton.displayName = 'OAuthButton';
