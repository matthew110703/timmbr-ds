import type { Meta, StoryObj } from '@storybook/react';
import { NavMenuColumns, NavMenuPromo, NavMenuTiles } from './NavMenuColumns';
import type { NavMenuGroup } from './NavMenuColumns.types';

// Figma 105:149 promo image, kept locally for the story only.
const promoImage = new URL('./__assets__/promo-sofa.png', import.meta.url).href;

const slug = (label: string) => `/category/${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
const group = (title: string, links: string[] = []): NavMenuGroup => ({
  id: title,
  title,
  links: links.map((label) => ({ id: label, label, href: slug(label) })),
});

/** Figma 105:108 "mega-menu-dropdown" content. */
const sofas: NavMenuGroup[] = [
  group('Sofa', [
    'All Sofas',
    'Fabric Sofas',
    'Wooden Sofas',
    '3 Seater Sofas',
    '2 Seater Sofas',
    '1 Seater Sofas',
    '3+1+1 Sofa Sets',
    'Sofa Cum Beds',
    'L Shaped Sofas',
    'Leather Sofas',
    'Outdoor Sofas',
  ]),
  group('Sofa Cum Bed', ['All Sofa Cum Beds', 'Wooden Sofa Cum Beds', 'Fabric Sofa Cum Beds']),
  group('Recliners', ['All Recliners', '1 Seater Recliners', '2 Seater Recliners', '3 Seater Recliners']),
  group('Seating', [
    'Lounge Chairs',
    'Accent Chairs',
    'Arm Chair',
    'Wingback Chairs',
    'Loveseats',
    'Benches',
    'Ottomans',
    'Stools',
  ]),
];

const promo = (
  <NavMenuPromo
    imageSrc={promoImage}
    imageAlt="Woman reading on a cream sofa in a sunlit living room"
    title={[
      <>
        Cherish <em>Moments</em>
      </>,
      <>
        Create <em>Memories</em>
      </>,
    ]}
    subtitle="with Affordable Sofa Sets"
    badge="UP TO 55% OFF"
    href="/category/sofas"
  />
);

const meta: Meta<typeof NavMenuColumns> = {
  title: 'Navigation/NavMenuColumns',
  component: NavMenuColumns,
  tags: ['autodocs'],
  args: {
    'aria-label': 'Sofas',
    groups: sofas,
    aside: promo,
  },
  decorators: [
    (Story) => (
      <div className="max-w-[1216px] overflow-hidden rounded-b-xl border border-border">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NavMenuColumns>;

/** Figma 105:108: three link columns split by dividers, plus a promo card. */
export const Default: Story = {};

/** No aside: up to four link columns. */
export const WithoutPromo: Story = {
  args: {
    aside: undefined,
    groups: [
      ...sofas,
      group('Tables', ['All Tables', 'Coffee Tables', 'Side Tables', 'Console Tables']),
      group('Storage', ['All Storage', 'TV Units', 'Bookshelves']),
    ],
  },
};

/** A small category: one group still keeps steady column widths. */
export const Small: Story = {
  args: {
    'aria-label': 'Outdoor',
    aside: undefined,
    groups: [group('Outdoor', ['All Outdoor', 'Loungers', 'Swings', 'Planters'])],
  },
};

export const Promo: StoryObj<typeof NavMenuPromo> = {
  render: () => promo,
  decorators: [(Story) => <div className="p-6">{Story()}</div>],
};

/** Mobile panel: image tiles in two scrolling rows (a NavHeader item's `mobileContent`). */
export const MobileTiles: StoryObj<typeof NavMenuTiles> = {
  render: () => (
    <NavMenuTiles
      aria-label="Furniture"
      items={[
        'Sofas & Seating',
        'Beds',
        'Dining Sets',
        'TV Units',
        'Coffee Tables',
        'Wardrobes',
        'Study Tables',
        'Office Chairs',
        'Shoe Racks',
        'Sofa Cum Beds',
      ].map((label, index) => ({
        id: label,
        label,
        href: slug(label),
        imageSrc: index % 3 === 2 ? undefined : promoImage,
      }))}
    />
  ),
  decorators: [(Story) => <div className="max-w-[390px] border border-border">{Story()}</div>],
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};
