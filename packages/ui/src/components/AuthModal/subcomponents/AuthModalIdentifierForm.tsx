'use client';

import * as React from 'react';
import { useAuthModalLabels } from '../AuthModal.labels';
import { authModalInputVariants, authModalLinkVariants } from '../AuthModal.styles';
import type { AuthModalFormProps, AuthModalLegalProps } from '../AuthModal.types';
import { AuthFieldError, AuthForm, AuthStepHeader, AuthSubmitButton, AuthTextLink } from './AuthModalParts';

export interface AuthModalIdentifierFormProps {
  form: AuthModalFormProps;
  legal?: AuthModalLegalProps;
}

const INPUT_ID = 'auth-identifier-input';
const ERROR_ID = 'auth-identifier-error';

export function AuthModalIdentifierForm({ form, legal }: AuthModalIdentifierFormProps) {
  const labels = useAuthModalLabels();
  const {
    identifier = '',
    onIdentifierChange,
    onIdentifierSubmit,
    onUsePassword,
    isLoading = false,
    error,
  } = form;

  const isEmpty = !identifier.trim();

  return (
    <div data-slot="auth-modal-identifier-step" className="flex flex-col">
      <AuthStepHeader title={labels.identifierTitle} subtitle={labels.identifierSubtitle} />

      <AuthForm onSubmit={onIdentifierSubmit} className="space-y-4">
        <div>
          <label htmlFor={INPUT_ID} className="sr-only">
            {labels.identifierLabel}
          </label>
          <input
            id={INPUT_ID}
            type="text"
            inputMode="email"
            autoComplete="username"
            autoCapitalize="none"
            spellCheck={false}
            value={identifier}
            onChange={(e) => onIdentifierChange?.(e.target.value)}
            placeholder={labels.identifierPlaceholder}
            disabled={isLoading}
            autoFocus
            aria-invalid={!!error || undefined}
            aria-describedby={error ? ERROR_ID : undefined}
            className={authModalInputVariants({ invalid: !!error })}
          />
          <AuthFieldError id={ERROR_ID}>{error}</AuthFieldError>
        </div>

        <AuthSubmitButton isLoading={isLoading} disabled={isEmpty}>
          {labels.continue}
        </AuthSubmitButton>

        {onUsePassword && (
          <div className="text-center">
            <AuthTextLink onClick={onUsePassword} disabled={isLoading || isEmpty} className="text-body-2">
              {labels.usePassword}
            </AuthTextLink>
          </div>
        )}

        <p className="text-body-3 text-grey-600 text-center leading-relaxed pt-1">
          {labels.legalPrefix}{' '}
          <a href={legal?.termsUrl ?? '/terms'} className={authModalLinkVariants()}>
            {labels.termsOfUse}
          </a>{' '}
          &{' '}
          <a href={legal?.privacyUrl ?? '/privacy'} className={authModalLinkVariants()}>
            {labels.privacyPolicy}
          </a>
        </p>
      </AuthForm>
    </div>
  );
}

AuthModalIdentifierForm.displayName = 'AuthModalIdentifierForm';
