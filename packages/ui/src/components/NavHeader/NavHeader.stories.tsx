import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { User, Heart, ShoppingCart, Bell, Package, HelpCircle, Settings } from '@timmbr/icons';
import { NavHeader } from './NavHeader';
import type { NavHeaderItem } from './NavHeader.types';

const meta: Meta<typeof NavHeader> = {
  title: 'Overlays & Navigation/NavHeader',
  component: NavHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    // 1. Branding & Global Layout
    branding: {
      table: { category: '1. Branding & Layout' },
    },
    containerMaxWidth: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
      table: { category: '1. Branding & Layout' },
    },
    sticky: {
      control: 'boolean',
      table: { category: '1. Branding & Layout' },
    },
    linkComponent: {
      table: { category: '1. Branding & Layout' },
    },
    rightContent: {
      table: { category: '1. Branding & Layout' },
    },

    // 2. Offer / Announcement Banner
    offerBanner: {
      table: { category: '2. Offer Banner' },
    },
    showOfferBanner: {
      control: 'boolean',
      table: { category: '2. Offer Banner' },
    },

    // 3. Primary Navigation Items & Mega-Menu
    items: {
      table: { category: '3. Navigation Items' },
    },
    showNavItems: {
      control: 'boolean',
      table: { category: '3. Navigation Items' },
    },
    activeItemId: {
      control: 'text',
      table: { category: '3. Navigation Items' },
    },
    defaultActiveItemId: {
      control: 'text',
      table: { category: '3. Navigation Items' },
    },
    onActiveItemChange: {
      action: 'activeItemChanged',
      table: { category: '3. Navigation Items' },
    },

    // 4. Search Configuration
    search: {
      table: { category: '4. Search' },
    },
    showSearch: {
      control: 'boolean',
      table: { category: '4. Search' },
    },

    // 5. Action Buttons & Overflow Menu
    actions: {
      table: { category: '5. Actions' },
    },
    showActions: {
      control: 'boolean',
      table: { category: '5. Actions' },
    },
    maxVisibleActions: {
      control: { type: 'select' },
      options: ['auto', 1, 2, 3, 4, 5],
      table: { category: '5. Actions' },
    },
    profileAction: {
      table: { category: '5. Actions' },
    },
    wishlistAction: {
      table: { category: '5. Actions' },
    },
    cartAction: {
      table: { category: '5. Actions' },
    },

    // 6. Mobile & Tablet Responsive Navigation
    mobileTabSlider: {
      control: 'boolean',
      table: { category: '6. Mobile & Tablet' },
    },
    mobileSearchMode: {
      control: { type: 'select' },
      options: ['bar', 'icon', 'auto'],
      table: { category: '6. Mobile & Tablet' },
    },
    mobileActiveItemId: {
      control: 'text',
      table: { category: '6. Mobile & Tablet' },
    },
    defaultMobileActiveItemId: {
      control: 'text',
      table: { category: '6. Mobile & Tablet' },
    },
    onMobileActiveItemChange: {
      action: 'mobileActiveItemChanged',
      table: { category: '6. Mobile & Tablet' },
    },
    mobileSearchOpen: {
      control: 'boolean',
      table: { category: '6. Mobile & Tablet' },
    },
    defaultMobileSearchOpen: {
      control: 'boolean',
      table: { category: '6. Mobile & Tablet' },
    },
    onMobileSearchOpenChange: {
      action: 'mobileSearchOpenChanged',
      table: { category: '6. Mobile & Tablet' },
    },

    // 7. Motion & Styling
    motion: {
      table: { category: '7. Motion & Styling' },
    },
    className: {
      control: 'text',
      table: { category: '7. Motion & Styling' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NavHeader>;

// Logo components matching Figma design
const FullLogo = () => (
  <div className="flex items-center gap-2 cursor-pointer select-none">
    <div className="w-8 h-8 rounded-lg bg-[#C0643A] flex items-center justify-center text-white font-black text-xl tracking-tighter shadow-sm">
      T
    </div>
    <span className="font-display text-2xl font-bold tracking-tight text-[#1A1714]">
      timmbr
    </span>
  </div>
);

const MiniLogo = () => (
  <div className="flex items-center cursor-pointer select-none">
    <div className="w-8 h-8 rounded-lg bg-[#C0643A] flex items-center justify-center text-white font-black text-xl tracking-tighter shadow-sm">
      T
    </div>
  </div>
);

// Figma Node 105:108 Mega-Menu Dropdown Content
const SofasMegaMenuContent = () => (
  <div className="grid grid-cols-1 md:grid-cols-4 p-8 gap-8 bg-[#FFFFFE] text-[#1A1A1A]">
    {/* Column 1: Sofas */}
    <div>
      <h3 className="font-sans font-bold text-sm text-[#1A1A1A] mb-3">Sofa</h3>
      <ul className="space-y-2.5 text-xs text-[#4C4C4C]">
        {['All Sofas', 'Fabric Sofas', 'Wooden Sofas', '3 Seater Sofas', '2 Seater Sofas', '1 Seater Sofas', '3+1+1 Sofa Sets', 'Sofa Cum Beds', 'L Shaped Sofas', 'Leather Sofas', 'Outdoor Sofas'].map((name) => (
          <li key={name}>
            <a href={`/sofas/${name.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-[#C0643A] hover:underline transition-colors block">
              {name}
            </a>
          </li>
        ))}
      </ul>
    </div>

    {/* Column 2: Sofa Cum Bed & Recliners */}
    <div className="border-l border-grey-200 pl-6 space-y-6">
      <div>
        <h3 className="font-sans font-bold text-sm text-[#1A1A1A] mb-3">Sofa Cum Bed</h3>
        <ul className="space-y-2 text-xs text-[#4C4C4C]">
          {['All Sofa Cum Beds', 'Wooden Sofa Cum Beds', 'Fabric Sofa Cum Beds'].map((name) => (
            <li key={name}>
              <a href="#" className="hover:text-[#C0643A] hover:underline transition-colors block">
                {name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-sans font-bold text-sm text-[#1A1A1A] mb-3">Recliners</h3>
        <ul className="space-y-2 text-xs text-[#4C4C4C]">
          {['All Recliners', '1 Seater Recliners', '2 Seater Recliners', '3 Seater Recliners'].map((name) => (
            <li key={name}>
              <a href="#" className="hover:text-[#C0643A] hover:underline transition-colors block">
                {name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Column 3: Seating */}
    <div className="border-l border-grey-200 pl-6">
      <h3 className="font-sans font-bold text-sm text-[#1A1A1A] mb-3">Seating</h3>
      <ul className="space-y-2.5 text-xs text-[#4C4C4C]">
        {['Lounge Chairs', 'Accent Chairs', 'Arm Chair', 'Wingback Chairs', 'Loveseats', 'Benches', 'Ottomans', 'Stools'].map((name) => (
          <li key={name}>
            <a href="#" className="hover:text-[#C0643A] hover:underline transition-colors block">
              {name}
            </a>
          </li>
        ))}
      </ul>
    </div>

    {/* Column 4: Promo Card from Figma node 105:149 */}
    <div className="flex items-center justify-center">
      <div className="w-full h-full min-h-[260px] rounded-xl bg-gradient-to-br from-[#2A241F] to-[#141210] p-6 text-white flex flex-col justify-between shadow-lg relative overflow-hidden">
        <div className="space-y-1.5 z-10">
          <p className="font-serif text-xl italic font-normal tracking-wide text-white">
            Cherish <span className="font-bold not-italic">Moments</span>
          </p>
          <p className="font-serif text-xl italic font-normal tracking-wide text-white">
            Create <span className="font-bold not-italic">Memories</span>
          </p>
          <p className="text-[11px] font-sans text-grey-300 opacity-90 pt-1">
            with Affordable Sofa Sets
          </p>
        </div>

        <div className="z-10">
          <span className="inline-block px-3 py-1 rounded bg-[#D35F27] text-white text-[10px] font-bold tracking-wider uppercase shadow-sm">
            UP TO 55% OFF
          </span>
        </div>

        {/* Ambient background glow */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#C0643A]/30 rounded-full blur-2xl pointer-events-none" />
      </div>
    </div>
  </div>
);

const figmaNavItems: NavHeaderItem[] = [
  {
    id: 'sofas',
    label: 'Sofas',
    content: <SofasMegaMenuContent />,
  },
  {
    id: 'living',
    label: 'Living',
    href: '/category/living',
  },
  {
    id: 'bedroom',
    label: 'Bedroom',
    href: '/category/bedroom',
  },
  {
    id: 'office',
    label: 'Office',
    href: '/category/office',
  },
  {
    id: 'dining',
    label: 'Dining',
    href: '/category/dining',
  },
];

export const Default: Story = {
  render: () => (
    <div className="min-h-[400px] bg-grey-100">
      <NavHeader
        branding={{
          logo: <FullLogo />,
          miniLogo: <MiniLogo />,
        }}
        offerBanner={{
          content: 'Extra 15% Off on All Home and Kitchen Orders*',
          dismissible: true,
        }}
        items={figmaNavItems}
        wishlistAction={{ count: 2 }}
        cartAction={{ count: 1 }}
      />
    </div>
  ),
};

export const WithMegaMenuOpen: Story = {
  render: () => (
    <div className="min-h-[600px] bg-grey-100">
      <NavHeader
        branding={{
          logo: <FullLogo />,
          miniLogo: <MiniLogo />,
        }}
        offerBanner={{
          content: 'Extra 15% Off on All Home and Kitchen Orders*',
        }}
        items={figmaNavItems}
        defaultActiveItemId="sofas"
        wishlistAction={{ count: 2 }}
        cartAction={{ count: 1 }}
      />
    </div>
  ),
};

export const SearchExpanded: Story = {
  render: () => (
    <div className="min-h-[500px] bg-grey-100">
      <NavHeader
        branding={{
          logo: <FullLogo />,
          miniLogo: <MiniLogo />,
        }}
        offerBanner={{
          content: 'Extra 15% Off on All Home and Kitchen Orders*',
        }}
        items={figmaNavItems}
        wishlistAction={{ count: 2 }}
        cartAction={{ count: 1 }}
        search={{
          defaultOpen: true,
          defaultValue: 'Wooden',
          popularSearches: [
            { id: '1', label: 'Centre Tables' },
            { id: '2', label: 'TV Units' },
            { id: '3', label: 'bed' },
            { id: '4', label: 'bedsheet' },
            { id: '5', label: 'mirror' },
            { id: '6', label: 'office chair' },
            { id: '7', label: 'shoe rack' },
            { id: '8', label: 'sofa cum bed' },
          ],
        }}
      />
    </div>
  ),
};

export const WithoutOfferBanner: Story = {
  render: () => (
    <div className="min-h-[300px] bg-grey-100">
      <NavHeader
        showOfferBanner={false}
        branding={{
          logo: <FullLogo />,
          miniLogo: <MiniLogo />,
        }}
        items={figmaNavItems}
        wishlistAction={{ count: 0 }}
        cartAction={{ count: 1 }}
      />
    </div>
  ),
};

export const WithCustomToggles: Story = {
  render: () => (
    <div className="min-h-[300px] bg-grey-100 space-y-6 p-4">
      <div>
        <p className="text-xs font-bold text-grey-500 mb-2 uppercase">1. Logo + Actions Only (No Nav Items, No Search):</p>
        <NavHeader
          showOfferBanner={false}
          showNavItems={false}
          showSearch={false}
          showActions={true}
          branding={{
            logo: <FullLogo />,
            miniLogo: <MiniLogo />,
          }}
          wishlistAction={{ count: 2 }}
          cartAction={{ count: 1 }}
        />
      </div>

      <div>
        <p className="text-xs font-bold text-grey-500 mb-2 uppercase">2. Logo + Nav Items Only (No Actions, No Search):</p>
        <NavHeader
          showOfferBanner={false}
          showNavItems={true}
          showSearch={false}
          showActions={false}
          items={figmaNavItems}
          branding={{
            logo: <FullLogo />,
            miniLogo: <MiniLogo />,
          }}
        />
      </div>
    </div>
  ),
};

export const CrossZoneNavigation: Story = {
  render: () => (
    <div className="min-h-[300px] bg-grey-100">
      <NavHeader
        branding={{
          logo: <FullLogo />,
          miniLogo: <MiniLogo />,
        }}
        items={[
          { id: 'home', label: 'Home', href: '/' },
          { id: 'store', label: 'Store (Zone)', href: '/shop', zone: 'store', crossZone: true },
          { id: 'docs', label: 'Documentation', href: '/docs', zone: 'docs', crossZone: true },
        ]}
      />
    </div>
  ),
};

export const ManyActionsOverflow: Story = {
  render: () => {
    // Dynamic list of 6 actions to showcase automatic or explicit overflow
    return (
      <div className="min-h-[450px] bg-grey-100">
        <NavHeader
          branding={{
            logo: <FullLogo />,
            miniLogo: <MiniLogo />,
          }}
          offerBanner={{
            content: 'Extra 15% Off on All Home and Kitchen Orders*',
          }}
          items={figmaNavItems}
          maxVisibleActions={3}
          actions={[
            { id: 'profile', label: 'PROFILE', icon: <User size={22} className="stroke-[1.8]" /> },
            { id: 'wishlist', label: 'WISH LIST', icon: <Heart size={22} className="stroke-[1.8]" />, badge: 2 },
            { id: 'cart', label: 'CART', icon: <ShoppingCart size={22} className="stroke-[1.8]" />, badge: 3, priority: 'high' },
            { id: 'orders', label: 'MY ORDERS', icon: <Package size={22} className="stroke-[1.8]" /> },
            { id: 'alerts', label: 'NOTIFICATIONS', icon: <Bell size={22} className="stroke-[1.8]" />, badge: 5 },
            { id: 'help', label: 'HELP & SUPPORT', icon: <HelpCircle size={22} className="stroke-[1.8]" /> },
          ]}
        />
      </div>
    );
  },
};

export const ExplicitMaxVisibleActions: Story = {
  render: () => (
    <div className="min-h-[450px] bg-grey-100">
      <NavHeader
        branding={{
          logo: <FullLogo />,
          miniLogo: <MiniLogo />,
        }}
        items={figmaNavItems}
        maxVisibleActions={2}
        actions={[
          { id: 'profile', label: 'PROFILE', icon: <User size={22} className="stroke-[1.8]" /> },
          { id: 'wishlist', label: 'WISH LIST', icon: <Heart size={22} className="stroke-[1.8]" /> },
          { id: 'cart', label: 'CART', icon: <ShoppingCart size={22} className="stroke-[1.8]" />, badge: 1, priority: 'high' },
          { id: 'orders', label: 'ORDERS', icon: <Package size={22} className="stroke-[1.8]" /> },
          { id: 'settings', label: 'SETTINGS', icon: <Settings size={22} className="stroke-[1.8]" /> },
        ]}
      />
    </div>
  ),
};

export const ResponsiveAutoOverflow: Story = {
  render: () => (
    <div className="min-h-[450px] bg-grey-100">
      <NavHeader
        branding={{
          logo: <FullLogo />,
          miniLogo: <MiniLogo />,
        }}
        offerBanner={{
          content: 'Resize the browser or expand search to see auto-overflow in action!',
        }}
        items={figmaNavItems}
        maxVisibleActions="auto"
        actions={[
          { id: 'profile', label: 'PROFILE', icon: <User size={22} className="stroke-[1.8]" /> },
          { id: 'wishlist', label: 'WISH LIST', icon: <Heart size={22} className="stroke-[1.8]" />, badge: 2 },
          { id: 'cart', label: 'CART', icon: <ShoppingCart size={22} className="stroke-[1.8]" />, badge: 3, priority: 'high' },
          { id: 'orders', label: 'MY ORDERS', icon: <Package size={22} className="stroke-[1.8]" /> },
          { id: 'alerts', label: 'NOTIFICATIONS', icon: <Bell size={22} className="stroke-[1.8]" />, badge: 5 },
          { id: 'help', label: 'HELP & SUPPORT', icon: <HelpCircle size={22} className="stroke-[1.8]" /> },
        ]}
      />
    </div>
  ),
};

// Mobile Category Grid matching user reference image
const MobileSofasContent = () => (
  <div className="p-4 space-y-4 bg-[#FBF8F3]">
    <div className="flex items-center justify-between">
      <h4 className="font-sans font-bold text-sm text-[#1A1714]">Explore Sofas & Seating</h4>
      <a href="/category/sofas" className="text-xs font-semibold text-[#C0643A] hover:underline">
        View All →
      </a>
    </div>
    <div className="grid grid-cols-2 gap-3">
      {[
        { name: 'Fabric Sofas', desc: 'Starting ₹14,999', tag: 'Popular' },
        { name: 'Wooden Sofas', desc: 'Solid Sheesham', tag: 'Bestseller' },
        { name: 'Sofa Cum Beds', desc: 'Multi-functional', tag: 'Trending' },
        { name: 'L Shaped Sofas', desc: 'Spacious 5-6 Seater', tag: 'Sale' },
        { name: 'Recliners', desc: 'Power & Manual', tag: 'Luxury' },
        { name: 'Lounge Chairs', desc: 'Accent & Armchairs', tag: 'New' },
      ].map((cat) => (
        <a
          key={cat.name}
          href={`/category/${cat.name.toLowerCase().replace(/\s+/g, '-')}`}
          className="p-3 bg-white rounded-xl border border-[#E7DFD3] shadow-xs hover:border-[#C0643A] transition-all flex flex-col justify-between h-24"
        >
          <div className="flex items-start justify-between">
            <span className="font-sans font-bold text-xs text-[#1A1714] leading-snug">{cat.name}</span>
            <span className="text-[9px] font-bold text-[#C0643A] bg-[#C0643A]/10 px-1.5 py-0.5 rounded">
              {cat.tag}
            </span>
          </div>
          <span className="text-[10px] text-grey-500 font-medium">{cat.desc}</span>
        </a>
      ))}
    </div>
  </div>
);

const mobileNavItems: NavHeaderItem[] = [
  {
    id: 'sofas',
    label: 'Sofas',
    content: <MobileSofasContent />,
  },
  {
    id: 'living',
    label: 'Living',
    content: (
      <div className="p-4 space-y-2 bg-[#FBF8F3]">
        <h4 className="font-sans font-bold text-sm text-[#1A1714]">Living Room Essentials</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {['Coffee Tables', 'TV Units', 'Bookshelves', 'Display Units'].map((item) => (
            <a key={item} href="#" className="p-2.5 bg-white rounded-lg border border-[#E7DFD3] font-medium text-grey-800">
              {item}
            </a>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'bedroom',
    label: 'Bedroom',
    content: (
      <div className="p-4 space-y-2 bg-[#FBF8F3]">
        <h4 className="font-sans font-bold text-sm text-[#1A1714]">Bedroom Furniture</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {['King Size Beds', 'Queen Size Beds', 'Wardrobes', 'Bedside Tables'].map((item) => (
            <a key={item} href="#" className="p-2.5 bg-white rounded-lg border border-[#E7DFD3] font-medium text-grey-800">
              {item}
            </a>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'dining',
    label: 'Dining',
    href: '/category/dining',
  },
  {
    id: 'office',
    label: 'Office',
    href: '/category/office',
  },
  {
    id: 'decor',
    label: 'Decor & Lighting',
    href: '/category/decor',
  },
];

export const MobileResponsiveView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => (
    <div className="max-w-[430px] mx-auto min-h-[700px] bg-grey-100 border-x border-grey-300 shadow-xl">
      <NavHeader
        branding={{
          logo: <FullLogo />,
          miniLogo: <MiniLogo />,
        }}
        offerBanner={{
          content: 'Extra 15% Off on All Orders*',
          dismissible: true,
        }}
        items={mobileNavItems}
        mobileSearchMode="bar"
        search={{
          placeholder: 'Search for sofas, beds, decor...',
          popularSearches: [
            { id: '1', label: 'Centre Tables' },
            { id: '2', label: 'TV Units' },
            { id: '3', label: 'Wooden Bed' },
            { id: '4', label: 'L Shape Sofa' },
            { id: '5', label: 'Recliners' },
          ],
        }}
        wishlistAction={{ id: 'wishlist', label: 'WISHLIST', icon: <Heart size={20} className="stroke-[1.8]" />, count: 2 }}
        cartAction={{ id: 'cart', label: 'CART', icon: <ShoppingCart size={20} className="stroke-[1.8]" />, count: 1 }}
      />
      <div className="p-4 text-center text-xs text-grey-500 mt-8">
        <p>📱 Mobile layout with sticky offer banner, brand header, search pill, and horizontal tab slider.</p>
        <p className="mt-1">Tap a category above (e.g. <strong>Sofas</strong> or <strong>Living</strong>) to expand category cards.</p>
      </div>
    </div>
  ),
};

export const MobileWithTabContentOpen: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => (
    <div className="max-w-[430px] mx-auto min-h-[700px] bg-grey-100 border-x border-grey-300 shadow-xl">
      <NavHeader
        branding={{
          logo: <FullLogo />,
          miniLogo: <MiniLogo />,
        }}
        offerBanner={{
          content: 'Extra 15% Off on All Orders*',
        }}
        items={mobileNavItems}
        defaultMobileActiveItemId="sofas"
        mobileSearchMode="bar"
        search={{
          placeholder: 'Search for sofas, beds, decor...',
        }}
        wishlistAction={{ id: 'wishlist', label: 'WISHLIST', icon: <Heart size={20} className="stroke-[1.8]" />, count: 2 }}
        cartAction={{ id: 'cart', label: 'CART', icon: <ShoppingCart size={20} className="stroke-[1.8]" />, count: 1 }}
      />
    </div>
  ),
};

export const MobileSearchDrawerOpen: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => (
    <div className="max-w-[430px] mx-auto min-h-[700px] bg-grey-100 border-x border-grey-300 shadow-xl relative overflow-hidden">
      <NavHeader
        branding={{
          logo: <FullLogo />,
          miniLogo: <MiniLogo />,
        }}
        items={mobileNavItems}
        defaultMobileSearchOpen={true}
        mobileSearchMode="bar"
        search={{
          placeholder: 'Search for sofas, beds, decor...',
          defaultValue: 'Wooden',
          popularSearches: [
            { id: '1', label: 'Centre Tables' },
            { id: '2', label: 'TV Units' },
            { id: '3', label: 'Wooden Bed' },
            { id: '4', label: 'L Shape Sofa' },
            { id: '5', label: 'Recliners' },
          ],
        }}
      />
    </div>
  ),
};

export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  render: () => (
    <div className="max-w-[820px] mx-auto min-h-[700px] bg-grey-100 border-x border-grey-300 shadow-xl">
      <NavHeader
        branding={{
          logo: <FullLogo />,
          miniLogo: <MiniLogo />,
        }}
        offerBanner={{
          content: 'Extra 15% Off on All Home and Kitchen Orders*',
        }}
        items={mobileNavItems}
        mobileSearchMode="bar"
        search={{
          placeholder: 'Search our catalogue...',
          popularSearches: [
            { id: '1', label: 'Centre Tables' },
            { id: '2', label: 'TV Units' },
          ],
        }}
        actions={[
          { id: 'profile', label: 'PROFILE', icon: <User size={22} className="stroke-[1.8]" /> },
          { id: 'wishlist', label: 'WISH LIST', icon: <Heart size={22} className="stroke-[1.8]" />, badge: 2 },
          { id: 'cart', label: 'CART', icon: <ShoppingCart size={22} className="stroke-[1.8]" />, badge: 3, priority: 'high' },
        ]}
      />
    </div>
  ),
};

export const ModularConfigStructure: Story = {
  render: () => (
    <NavHeader
      branding={{
        logo: <FullLogo />,
        miniLogo: <MiniLogo />,
      }}
      offerBanner={{
        content: 'Exclusive 20% Off for App Users • Code: APP20',
        dismissible: true,
      }}
      navigation={{
        items: figmaNavItems,
        defaultActiveItemId: null,
      }}
      search={{
        placeholder: 'Search 10,000+ home products...',
        popularSearches: [
          { id: '1', label: 'Solid Wood Dining Tables' },
          { id: '2', label: 'Sectional Sofas' },
          { id: '3', label: 'Ergonomic Chairs' },
        ],
      }}
      actions={{
        items: [
          { id: 'orders', label: 'ORDERS', icon: <Package size={22} className="stroke-[1.8]" /> },
        ],
        cart: { count: 3 },
        wishlist: { count: 6 },
        profile: {
          onClick: () => alert('Profile clicked'),
        },
      }}
      mobile={{
        tabSlider: true,
        search: { mode: 'bar' },
      }}
    />
  ),
};



