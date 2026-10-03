import type { Meta, StoryObj } from '@storybook/react';
import { NavFooter } from './NavFooter';
import {
  DEFAULT_FOOTER_SECTIONS,
  DEFAULT_FOOTER_SOCIAL_LINKS,
  DEFAULT_FOOTER_LEGAL_LINKS,
} from './NavFooter.helpers';

const meta: Meta<typeof NavFooter> = {
  title: 'Overlays & Navigation/NavFooter',
  component: NavFooter,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    // 1. Modular Config Objects
    branding: {
      table: { category: '1. Modular Configurations' },
    },
    navigation: {
      table: { category: '1. Modular Configurations' },
    },
    social: {
      table: { category: '1. Modular Configurations' },
    },
    office: {
      table: { category: '1. Modular Configurations' },
    },
    newsletter: {
      table: { category: '1. Modular Configurations' },
    },
    legal: {
      table: { category: '1. Modular Configurations' },
    },
    mobile: {
      table: { category: '1. Modular Configurations' },
    },

    // 2. Master Visibility Toggles
    showNavigation: {
      control: 'boolean',
      table: { category: '2. Section Visibility Toggles' },
    },
    showSocial: {
      control: 'boolean',
      table: { category: '2. Section Visibility Toggles' },
    },
    showOffice: {
      control: 'boolean',
      table: { category: '2. Section Visibility Toggles' },
    },
    showLegal: {
      control: 'boolean',
      table: { category: '2. Section Visibility Toggles' },
    },
    showNewsletter: {
      control: 'boolean',
      table: { category: '2. Section Visibility Toggles' },
    },

    // 3. Layout Options
    containerMaxWidth: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
      table: { category: '3. Layout & Styling' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NavFooter>;

/**
 * 1. Default Figma Design System Footer
 * Exactly matches Figma specifications with dark luxury theme, brand wordmark, Shop/Craft/Help link columns, social media icons, registered office address, and copyright bar.
 */
export const Default: Story = {
  args: {
    containerMaxWidth: '2xl',
  },
};

/**
 * 2. Structured Modular Configuration
 * Demonstrates organizing all props into modular configuration objects (`branding`, `navigation`, `social`, `office`, `legal`, `mobile`).
 */
export const ModularConfiguration: Story = {
  args: {
    branding: {
      description: 'Solid-wood furniture, made by hand in Portland and built to be kept for life.',
      href: '/',
    },
    navigation: {
      sections: DEFAULT_FOOTER_SECTIONS,
      show: true,
    },
    social: {
      links: DEFAULT_FOOTER_SOCIAL_LINKS,
      show: true,
    },
    office: {
      title: 'Registered Office:',
      address: 'Timmbr Furnitures SABN Kallappa Layout, Ashwini Extenstion, Chintamani Karnataka 563125',
      email: 'care@timmbr.com',
      phone: '+91 80 1234 5678',
    },
    legal: {
      copyright: '© 2026 Timmbr Furniture Co. All rights reserved.',
      links: DEFAULT_FOOTER_LEGAL_LINKS,
    },
    mobile: {
      accordion: true,
      allowMultipleOpen: true,
    },
  },
};

/**
 * 3. With Newsletter Subscription Form
 * Demonstrates enabling the integrated newsletter email subscription form with live state handling.
 */
export const WithNewsletter: Story = {
  args: {
    showNewsletter: true,
    newsletter: {
      show: true,
      title: 'Stay in the loop',
      description: 'Sign up for our newsletter to receive design guides, new collection alerts, and exclusive offers.',
      placeholder: 'Enter your email address...',
      buttonText: 'Subscribe',
      onSubmit: async (email: string) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        alert(`Subscribed: ${email}`);
      },
    },
  },
};

/**
 * 4. Custom Categories & Product Badges
 * Shows custom navigation sections with 'NEW' and 'SALE' badges and custom links.
 */
export const CustomSectionsWithBadges: Story = {
  args: {
    sections: [
      {
        id: 'collections',
        title: 'Collections',
        items: [
          { id: 'living', label: 'Living Room', href: '/collections/living' },
          { id: 'bedroom', label: 'Bedroom Suites', href: '/collections/bedroom', badge: 'NEW' },
          { id: 'dining', label: 'Dining Sets', href: '/collections/dining' },
          { id: 'outdoor', label: 'Outdoor Teak', href: '/collections/outdoor', badge: 'SALE' },
          { id: 'storage', label: 'Storage & Credenzas', href: '/collections/storage' },
        ],
      },
      {
        id: 'craftsmanship',
        title: 'Craftsmanship',
        items: [
          { id: 'heritage', label: 'Heritage Joinery', href: '/craft/heritage' },
          { id: 'woods', label: 'Solid Teak & Oak', href: '/craft/woods' },
          { id: 'finishes', label: 'Natural Matte Finishes', href: '/craft/finishes' },
          { id: 'sustainability', label: 'FSC Certified', href: '/craft/fsc' },
        ],
      },
      {
        id: 'concierge',
        title: 'Concierge',
        items: [
          { id: 'trade', label: 'Trade & Hospitality', href: '/trade' },
          { id: 'custom', label: 'Custom Orders', href: '/custom' },
          { id: 'white-glove', label: 'White-Glove Delivery', href: '/delivery' },
          { id: 'faq', label: 'Help & FAQ', href: '/faq' },
        ],
      },
    ],
  },
};

/**
 * 5. Single-Open Accordion on Mobile
 * Enforces that only one section accordion can be expanded at a time on mobile viewports.
 */
export const SingleOpenMobileAccordion: Story = {
  args: {
    mobile: {
      accordion: true,
      allowMultipleOpen: false,
    },
  },
};

/**
 * 6. Section Visibility Toggles
 * Demonstrates granular control to selectively toggle sections on/off.
 */
export const SectionToggles: Story = {
  args: {
    showNavigation: true,
    showSocial: true,
    showOffice: false,
    showNewsletter: false,
    showLegal: true,
  },
};

