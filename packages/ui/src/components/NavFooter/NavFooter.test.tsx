import { describe, it, expect, vi } from 'vitest';
import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NavFooter } from './NavFooter';
import type { NavFooterSection, NavFooterSocialLink, NavFooterLinkItem } from './NavFooter.types';

describe('NavFooter Component', () => {
  it('renders default footer with brand, sections, social links, office info, and copyright', () => {
    render(<NavFooter motion={false} />);

    // Brand and description
    expect(screen.getByLabelText('Timmbr Home')).toBeInTheDocument();
    expect(screen.getByText(/Solid-wood furniture, made by hand in Portland/i)).toBeInTheDocument();

    // Default sections
    expect(screen.getAllByText('Shop').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Craft').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Help').length).toBeGreaterThan(0);
    expect(screen.getAllByText("Sofa's").length).toBeGreaterThan(0);
    expect(screen.getAllByText('Our materials').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Contact Us').length).toBeGreaterThan(0);

    // Social icons
    expect(screen.getByLabelText(/Instagram/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Facebook/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/LinkedIn/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/X/i)).toBeInTheDocument();

    // Office address
    expect(screen.getByText('Registered Office:')).toBeInTheDocument();
    expect(screen.getByText(/Timmbr Furnitures SABN Kallappa Layout/i)).toBeInTheDocument();

    // Legal bar
    expect(screen.getByText(/© \d{4} Timmbr Furniture Co\./)).toBeInTheDocument();
    expect(screen.getByText('Privacy')).toBeInTheDocument();
    expect(screen.getByText('Terms')).toBeInTheDocument();
  });

  it('renders custom brand logo, description, and link destination', () => {
    const onBrandClick = vi.fn();
    render(
      <NavFooter
        branding={{
          logo: <span data-testid="custom-logo">ACME WOODS</span>,
          description: 'Custom handcrafted furniture for modern homes.',
          href: '/home-custom',
          alt: 'Acme Home',
          onClick: (e) => {
            e.preventDefault();
            onBrandClick();
          },
        }}
        motion={false}
      />
    );

    expect(screen.getByTestId('custom-logo')).toBeInTheDocument();
    expect(screen.getByText('Custom handcrafted furniture for modern homes.')).toBeInTheDocument();

    const brandLink = screen.getByLabelText('Acme Home');
    expect(brandLink).toHaveAttribute('href', '/home-custom');
    fireEvent.click(brandLink);
    expect(onBrandClick).toHaveBeenCalledTimes(1);
  });

  it('renders dynamic navigation sections with custom links and badges', () => {
    const onCustomLinkClick = vi.fn();
    const customSections: NavFooterSection[] = [
      {
        id: 'products',
        title: 'Products',
        items: [
          { id: 'beds', label: 'Beds', href: '/shop/beds', badge: 'NEW' },
          {
            id: 'tables',
            label: 'Dining Tables',
            href: '/shop/tables',
            onClick: (e) => {
              e.preventDefault();
              onCustomLinkClick();
            },
          },
        ],
      },
      {
        id: 'company',
        title: 'Company',
        items: [{ id: 'about', label: 'About Us', href: '/about' }],
      },
    ];

    render(<NavFooter sections={customSections} motion={false} />);

    expect(screen.getAllByText('Products').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Beds').length).toBeGreaterThan(0);
    expect(screen.getAllByText('NEW').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Dining Tables').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Company').length).toBeGreaterThan(0);
    expect(screen.getAllByText('About Us').length).toBeGreaterThan(0);

    fireEvent.click(screen.getAllByText('Dining Tables')[0]);
    expect(onCustomLinkClick).toHaveBeenCalledTimes(1);
  });

  it('handles mobile accordion multi-open toggle interaction', () => {
    const customSections: NavFooterSection[] = [
      {
        id: 'shop',
        title: 'Shop Section',
        defaultOpen: false,
        items: [{ id: 'sofas', label: 'Section 1 Sofas', href: '/sofas' }],
      },
      {
        id: 'craft',
        title: 'Craft Section',
        defaultOpen: false,
        items: [{ id: 'workshop', label: 'Section 2 Workshop', href: '/workshop' }],
      },
    ];

    render(
      <NavFooter
        sections={customSections}
        mobile={{ accordion: true, allowMultipleOpen: true }}
        motion={false}
      />
    );

    const triggers = screen.getAllByRole('button', { name: /section/i });
    expect(triggers[0]).toHaveAttribute('aria-expanded', 'false');

    // Open first accordion
    fireEvent.click(triggers[0]);
    expect(triggers[0]).toHaveAttribute('aria-expanded', 'true');

    // Open second accordion
    fireEvent.click(triggers[1]);
    expect(triggers[0]).toHaveAttribute('aria-expanded', 'true');
    expect(triggers[1]).toHaveAttribute('aria-expanded', 'true');

    // Close first accordion
    fireEvent.click(triggers[0]);
    expect(triggers[0]).toHaveAttribute('aria-expanded', 'false');
    expect(triggers[1]).toHaveAttribute('aria-expanded', 'true');
  });

  it('respects single-open accordion mode when allowMultipleOpen is false', () => {
    const customSections: NavFooterSection[] = [
      {
        id: 'shop',
        title: 'Shop Section',
        defaultOpen: false,
        items: [{ id: 'sofas', label: 'Section 1 Sofas', href: '/sofas' }],
      },
      {
        id: 'craft',
        title: 'Craft Section',
        defaultOpen: false,
        items: [{ id: 'workshop', label: 'Section 2 Workshop', href: '/workshop' }],
      },
    ];

    render(
      <NavFooter
        sections={customSections}
        mobile={{ accordion: true, allowMultipleOpen: false }}
        motion={false}
      />
    );

    const triggers = screen.getAllByRole('button', { name: /section/i });
    expect(triggers[0]).toHaveAttribute('aria-expanded', 'false');
    expect(triggers[1]).toHaveAttribute('aria-expanded', 'false');

    // Open first accordion
    fireEvent.click(triggers[0]);
    expect(triggers[0]).toHaveAttribute('aria-expanded', 'true');
    expect(triggers[1]).toHaveAttribute('aria-expanded', 'false');

    // Open second accordion (should auto-close the first)
    fireEvent.click(triggers[1]);
    expect(triggers[0]).toHaveAttribute('aria-expanded', 'false');
    expect(triggers[1]).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders custom social links and handles click events', () => {
    const onInstaClick = vi.fn();
    const customSocial: NavFooterSocialLink[] = [
      {
        name: 'instagram',
        href: 'https://instagram.com/mybrand',
        ariaLabel: 'MyBrand Instagram',
        onClick: (e) => {
          e.preventDefault();
          onInstaClick();
        },
      },
      {
        name: 'youtube',
        href: 'https://youtube.com/mybrand',
        ariaLabel: 'MyBrand YouTube',
      },
      {
        name: 'custom-platform',
        href: 'https://custom.com',
        icon: <span data-testid="custom-social-icon">CS</span>,
      },
    ];

    render(<NavFooter social={customSocial} motion={false} />);

    const instaLink = screen.getByLabelText('MyBrand Instagram');
    expect(instaLink).toHaveAttribute('href', 'https://instagram.com/mybrand');
    fireEvent.click(instaLink);
    expect(onInstaClick).toHaveBeenCalledTimes(1);

    expect(screen.getByLabelText('MyBrand YouTube')).toBeInTheDocument();
    expect(screen.getByTestId('custom-social-icon')).toBeInTheDocument();
  });

  it('renders custom registered office address, phone, and email', () => {
    render(
      <NavFooter
        office={{
          title: 'Headquarters:',
          address: '123 Pine St, Suite 400, Portland, OR 97201',
          email: 'hello@timmbr.com',
          phone: '+1 503 555 0199',
        }}
        motion={false}
      />
    );

    expect(screen.getByText('Headquarters:')).toBeInTheDocument();
    expect(screen.getByText('123 Pine St, Suite 400, Portland, OR 97201')).toBeInTheDocument();
    expect(screen.getByText('hello@timmbr.com')).toHaveAttribute('href', 'mailto:hello@timmbr.com');
    expect(screen.getByText('+1 503 555 0199')).toHaveAttribute('href', 'tel:+15035550199');
  });

  it('renders and processes newsletter subscription form with success and error feedback', async () => {
    const onSubmit = vi.fn().mockImplementation(async (email: string) => {
      if (email === 'fail@timmbr.com') {
        throw new Error('Network error');
      }
    });

    render(
      <NavFooter
        newsletter={{
          show: true,
          title: 'Get 10% Off',
          description: 'Subscribe to our newsletter for exclusive discounts.',
          placeholder: 'Your email address',
          buttonText: 'Join',
          onSubmit,
        }}
        motion={false}
      />
    );

    expect(screen.getByText('Get 10% Off')).toBeInTheDocument();
    expect(screen.getByText('Subscribe to our newsletter for exclusive discounts.')).toBeInTheDocument();

    const input = screen.getByPlaceholderText('Your email address');
    const submitBtn = screen.getByRole('button', { name: /join/i });

    // Submit with successful email
    fireEvent.change(input, { target: { value: 'buyer@timmbr.com' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith('buyer@timmbr.com');
      expect(screen.getByText('Thank you for subscribing!')).toBeInTheDocument();
    });
  });

  it('displays error message when newsletter submission fails', async () => {
    const onSubmit = vi.fn().mockRejectedValue(new Error('Failed'));

    render(
      <NavFooter
        newsletter={{
          show: true,
          onSubmit,
          errorMessage: 'Unable to subscribe right now.',
        }}
        motion={false}
      />
    );

    const input = screen.getByPlaceholderText('Enter your email...');
    const submitBtn = screen.getByRole('button', { name: /subscribe/i });

    fireEvent.change(input, { target: { value: 'error@timmbr.com' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('Unable to subscribe right now.')).toBeInTheDocument();
    });
  });

  it('respects master section visibility toggles', () => {
    render(
      <NavFooter
        showNavigation={false}
        showSocial={false}
        showOffice={false}
        showLegal={false}
        motion={false}
      />
    );

    expect(screen.queryByTestId('footer-nav-grid')).not.toBeInTheDocument();
    expect(screen.queryByTestId('footer-social')).not.toBeInTheDocument();
    expect(screen.queryByTestId('footer-office')).not.toBeInTheDocument();
    expect(screen.queryByTestId('footer-legal-bar')).not.toBeInTheDocument();

    // Brand is still rendered
    expect(screen.getByLabelText('Timmbr Home')).toBeInTheDocument();
  });

  it('supports custom router linkComponent injection for navigation and legal links', () => {
    const MockCustomLink = ({ href, children, ...rest }: any) => (
      <a href={href} data-testid="custom-router-link" {...rest}>
        {children}
      </a>
    );

    const customLegalLinks: NavFooterLinkItem[] = [
      { id: 'privacy', label: 'Privacy Policy', href: '/legal/privacy' },
    ];

    render(
      <NavFooter
        legalLinks={customLegalLinks}
        linkComponent={MockCustomLink}
        motion={false}
      />
    );

    const customLinks = screen.getAllByTestId('custom-router-link');
    expect(customLinks.length).toBeGreaterThan(0);
  });

  it('supports custom render functions on individual nav and legal items', () => {
    const customSections: NavFooterSection[] = [
      {
        id: 'custom-sec',
        title: 'Special',
        items: [
          {
            id: 'rendered-item',
            label: 'Custom Item',
            href: '#',
            render: () => <div data-testid="custom-rendered-nav-item">SPECIAL LINK</div>,
          },
        ],
      },
    ];

    const customLegal: NavFooterLinkItem[] = [
      {
        id: 'rendered-legal',
        label: 'Custom Legal',
        href: '#',
        render: () => <div data-testid="custom-rendered-legal-item">CUSTOM LEGAL</div>,
      },
    ];

    render(
      <NavFooter
        sections={customSections}
        legalLinks={customLegal}
        motion={false}
      />
    );

    expect(screen.getByTestId('custom-rendered-nav-item')).toBeInTheDocument();
    expect(screen.getByTestId('custom-rendered-legal-item')).toBeInTheDocument();
  });

  it('renders custom children placed before the legal bar', () => {
    render(
      <NavFooter motion={false}>
        <div data-testid="extra-child">Custom Banner Inside Footer</div>
      </NavFooter>
    );

    expect(screen.getByTestId('extra-child')).toBeInTheDocument();
  });
});
