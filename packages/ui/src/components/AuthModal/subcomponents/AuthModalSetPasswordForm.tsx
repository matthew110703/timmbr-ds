'use client';

import * as React from 'react';
import { useAuthModalLabels } from '../AuthModal.labels';
import type { AuthModalFormProps } from '../AuthModal.types';
import {
  AuthFieldError,
  AuthForm,
  AuthPasswordField,
  AuthStepHeader,
  AuthSubmitButton,
  AuthTextLink,
} from './AuthModalParts';

export interface AuthModalSetPasswordFormProps {
  form: AuthModalFormProps;
}

const HINT_ID = 'auth-new-password-hint';
const ERROR_ID = 'auth-set-password-error';

export function AuthModalSetPasswordForm({ form }: AuthModalSetPasswordFormProps) {
  const labels = useAuthModalLabels();
  const {
    setPasswordMode = 'create',
    newPassword = '',
    onNewPasswordChange,
    confirmPassword = '',
    onConfirmPasswordChange,
    onSetPasswordSubmit,
    onSkipSetPassword,
    isLoading = false,
    error,
  } = form;

  const isReset = setPasswordMode === 'reset';
  const mismatch = confirmPassword.length > 0 && confirmPassword !== newPassword;
  const shownError = error ?? (mismatch ? labels.passwordMismatch : null);

  return (
    <div data-slot="auth-modal-set-password-step" className="flex flex-col">
      <AuthStepHeader
        title={isReset ? labels.setPasswordResetTitle : labels.setPasswordCreateTitle}
        subtitle={isReset ? labels.setPasswordResetSubtitle : labels.setPasswordCreateSubtitle}
      />

      <AuthForm onSubmit={onSetPasswordSubmit} className="space-y-4">
        <AuthPasswordField
          id="auth-new-password-input"
          label={labels.newPasswordLabel}
          placeholder={labels.newPasswordLabel}
          autoComplete="new-password"
          value={newPassword}
          onValueChange={onNewPasswordChange}
          disabled={isLoading}
          autoFocus
          describedBy={HINT_ID}
        />

        <div>
          <AuthPasswordField
            id="auth-confirm-password-input"
            label={labels.confirmPasswordLabel}
            placeholder={labels.confirmPasswordLabel}
            autoComplete="new-password"
            value={confirmPassword}
            onValueChange={onConfirmPasswordChange}
            disabled={isLoading}
            invalid={!!shownError}
            describedBy={shownError ? ERROR_ID : undefined}
          />
          <AuthFieldError id={ERROR_ID}>{shownError}</AuthFieldError>
        </div>

        <p id={HINT_ID} className="text-body-3 text-grey-600">
          {labels.passwordHint}
        </p>

        <AuthSubmitButton
          isLoading={isLoading}
          disabled={!newPassword || newPassword !== confirmPassword}
        >
          {labels.setPasswordSubmit}
        </AuthSubmitButton>

        {!isReset && onSkipSetPassword && (
          <div className="text-center">
            <AuthTextLink onClick={onSkipSetPassword} disabled={isLoading} className="text-body-2">
              {labels.skipForNow}
            </AuthTextLink>
          </div>
        )}
      </AuthForm>
    </div>
  );
}

AuthModalSetPasswordForm.displayName = 'AuthModalSetPasswordForm';
