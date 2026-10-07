'use client';

import * as React from 'react';
import { useAuthModalLabels } from '../AuthModal.labels';
import type { AuthModalFormProps } from '../AuthModal.types';
import {
  AuthDestination,
  AuthFieldError,
  AuthForm,
  AuthPasswordField,
  AuthStepHeader,
  AuthSubmitButton,
  AuthTextLink,
} from './AuthModalParts';

export interface AuthModalPasswordFormProps {
  form: AuthModalFormProps;
}

const ERROR_ID = 'auth-password-error';

export function AuthModalPasswordForm({ form }: AuthModalPasswordFormProps) {
  const labels = useAuthModalLabels();
  const {
    identifier = '',
    password = '',
    onPasswordChange,
    onPasswordSubmit,
    onForgotPassword,
    onEditIdentifier,
    isLoading = false,
    error,
  } = form;

  return (
    <div data-slot="auth-modal-password-step" className="flex flex-col">
      <AuthStepHeader
        title={labels.passwordTitle}
        subtitle={<AuthDestination value={identifier} onEdit={onEditIdentifier} disabled={isLoading} />}
      />

      <AuthForm onSubmit={onPasswordSubmit} className="space-y-4">
        {/* Lets password managers pair the saved credential with this identifier */}
        <input type="hidden" name="username" autoComplete="username" value={identifier} readOnly />

        <div>
          <AuthPasswordField
            id="auth-password-input"
            label={labels.passwordLabel}
            placeholder={labels.passwordPlaceholder}
            autoComplete="current-password"
            value={password}
            onValueChange={onPasswordChange}
            disabled={isLoading}
            autoFocus
            invalid={!!error}
            describedBy={error ? ERROR_ID : undefined}
          />
          <AuthFieldError id={ERROR_ID}>{error}</AuthFieldError>
        </div>

        <AuthSubmitButton isLoading={isLoading} disabled={!password}>
          {labels.passwordSubmit}
        </AuthSubmitButton>

        {onForgotPassword && (
          <div className="text-center">
            <AuthTextLink onClick={onForgotPassword} disabled={isLoading} className="text-body-2">
              {labels.forgotPassword}
            </AuthTextLink>
          </div>
        )}
      </AuthForm>
    </div>
  );
}

AuthModalPasswordForm.displayName = 'AuthModalPasswordForm';
