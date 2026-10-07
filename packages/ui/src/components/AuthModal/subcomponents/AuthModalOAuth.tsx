'use client';

import * as React from 'react';
import { OAuthButton } from './OAuthButton';
import { useAuthModalLabels } from '../AuthModal.labels';
import type { AuthModalOAuthProps } from '../AuthModal.types';

export interface AuthModalOAuthSectionProps extends AuthModalOAuthProps {
  /** Disable every provider (e.g. while an OTP request is in flight) */
  disabled?: boolean;
}

export function AuthModalOAuth({ providers, disabled }: AuthModalOAuthSectionProps) {
  const labels = useAuthModalLabels();
  if (!providers || providers.length === 0) return null;

  return (
    <div data-slot="auth-modal-oauth-section" className="mt-6 flex flex-col">
      <div className="relative flex items-center justify-center my-2" aria-hidden="true">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border-warm" />
        </div>
        <div className="relative px-3 bg-grey-50 text-body-3 text-sand-muted uppercase font-medium tracking-wider">
          {labels.oauthDivider}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {providers.map((provider) => (
          <OAuthButton key={provider.id} provider={provider} disabled={disabled} />
        ))}
      </div>
    </div>
  );
}

AuthModalOAuth.displayName = 'AuthModalOAuth';
