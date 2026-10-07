'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';
import type { NavFooterOfficeConfig } from '../NavFooter.types';
import { footerOfficeBlockVariants } from '../NavFooter.styles';

export interface FooterOfficeProps {
  office?: NavFooterOfficeConfig;
  className?: string;
}

export const FooterOffice: React.FC<FooterOfficeProps> = ({ office, className }) => {
  const {
    title = 'Registered Office:',
    address = 'Timmbr Furnitures SABN Kallappa Layout, Ashwini Extenstion, Chintamani Karnataka 563125',
    email,
    phone,
    extraContent,
    className: officeClass,
  } = office || {};

  return (
    <div
      className={cn('flex flex-col gap-2 max-w-[320px]', officeClass, className)}
      data-slot="footer-office"
    >
      {title && (
        <div
          className="font-bold text-body-2 text-bg-2/90 select-text"
          data-slot="footer-office-title"
        >
          {title}
        </div>
      )}

      {address && (
        <div
          className={cn(footerOfficeBlockVariants(), 'select-text text-body-2')}
          data-slot="footer-office-address"
        >
          {typeof address === 'string' ? (
            <p className="m-0 leading-relaxed whitespace-pre-line">{address}</p>
          ) : (
            address
          )}
        </div>
      )}

      {(email || phone) && (
        <div className="flex flex-col gap-1 pt-1 text-body-3 text-sand-muted">
          {email && (
            <a
              href={`mailto:${email}`}
              className="hover:text-primary-200 transition-colors inline-block select-text"
              data-slot="footer-office-email"
            >
              {email}
            </a>
          )}
          {phone && (
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="hover:text-primary-200 transition-colors inline-block select-text"
              data-slot="footer-office-phone"
            >
              {phone}
            </a>
          )}
        </div>
      )}

      {extraContent}
    </div>
  );
};

export default FooterOffice;
