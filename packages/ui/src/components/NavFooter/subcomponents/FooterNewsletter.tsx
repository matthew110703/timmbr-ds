'use client';

import * as React from 'react';
import { ArrowRight, Loader2, CheckCircle, AlertCircle } from '@timmbr/icons';
import { cn } from '@timmbr/utils';
import type { NavFooterNewsletterConfig } from '../NavFooter.types';

export interface FooterNewsletterProps {
  newsletter?: NavFooterNewsletterConfig;
  className?: string;
}

export const FooterNewsletter: React.FC<FooterNewsletterProps> = ({
  newsletter,
  className,
}) => {
  const {
    title = 'Stay in the loop',
    description = 'Sign up for our newsletter to receive updates and exclusive offers.',
    placeholder = 'Enter your email...',
    buttonText = 'Subscribe',
    onSubmit,
    status: controlledStatus,
    errorMessage = 'Something went wrong. Please try again.',
    successMessage = 'Thank you for subscribing!',
    className: newsletterClass,
  } = newsletter || {};

  const [email, setEmail] = React.useState('');
  const [internalStatus, setInternalStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const currentStatus = controlledStatus !== undefined ? controlledStatus : internalStatus;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || currentStatus === 'loading') return;

    if (onSubmit) {
      try {
        setInternalStatus('loading');
        await onSubmit(email);
        setInternalStatus('success');
        setEmail('');
      } catch {
        setInternalStatus('error');
      }
    } else {
      setInternalStatus('success');
      setEmail('');
    }
  };

  return (
    <div
      className={cn('flex flex-col gap-3 max-w-[420px]', newsletterClass, className)}
      data-slot="footer-newsletter"
    >
      {title && (
        <div className="font-title text-xs font-semibold text-[#D39375] uppercase tracking-[0.14em]">
          {title}
        </div>
      )}

      {description && (
        <p className="text-sm font-sans text-[#B7AEA2] m-0 leading-relaxed">
          {description}
        </p>
      )}

      {currentStatus === 'success' ? (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-[#4E8752]/20 border border-[#4E8752]/40 text-[#4E8752] text-sm font-sans">
          <CheckCircle size={18} className="shrink-0" />
          <span>{successMessage}</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex items-center rounded-lg bg-black/40 border border-white/15 focus-within:border-[#D39375] focus-within:ring-2 focus-within:ring-[#D39375]/30 transition-all p-1">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (currentStatus === 'error') setInternalStatus('idle');
              }}
              placeholder={placeholder}
              required
              disabled={currentStatus === 'loading'}
              className="flex-1 bg-transparent px-3 py-2 text-sm text-[#F7F1E6] placeholder-[#B7AEA2]/60 focus:outline-none disabled:opacity-50"
              data-slot="footer-newsletter-input"
            />
            <button
              type="submit"
              disabled={currentStatus === 'loading' || !email}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-md bg-[#D39375] text-[#1A1714] font-title text-xs font-semibold uppercase tracking-wider hover:bg-[#D39375]/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
              data-slot="footer-newsletter-button"
            >
              {currentStatus === 'loading' ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>
                  <span>{buttonText}</span>
                  <ArrowRight size={14} className="stroke-[2.5]" />
                </>
              )}
            </button>
          </div>

          {currentStatus === 'error' && (
            <div className="flex items-center gap-1.5 text-xs text-red-400">
              <AlertCircle size={14} className="shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default FooterNewsletter;
