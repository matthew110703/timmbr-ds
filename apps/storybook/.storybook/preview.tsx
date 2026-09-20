import type { Preview } from '@storybook/react';
import { withThemeByClassName } from '@storybook/addon-themes';
import * as React from 'react';
import { TimmbrConfigProvider } from '@timmbr/ui';
import '../src/globals.css';

// Non-intrusive autonomous diagnostic harness for Browser MCP / DevTools inspection
if (typeof window !== 'undefined') {
  (window as any).__TIMMBR_INSPECT__ = (
    selector = '[data-slot], button, input, [role="switch"], [role="checkbox"], [data-state]'
  ) => {
    const el = document.querySelector(selector) as HTMLElement | null;
    if (!el) {
      return {
        found: false,
        selector,
        availableSlots: Array.from(document.querySelectorAll('[data-slot]')).map((e) =>
          e.getAttribute('data-slot')
        ),
      };
    }
    const computed = window.getComputedStyle(el);
    return {
      found: true,
      tagName: el.tagName.toLowerCase(),
      slot: el.getAttribute('data-slot') || null,
      variant: el.getAttribute('data-variant') || null,
      size: el.getAttribute('data-size') || null,
      state: el.getAttribute('data-state') || null,
      disabled: (el as any).disabled ?? el.getAttribute('aria-disabled') === 'true',
      aria: Object.fromEntries(
        Array.from(el.attributes)
          .filter((a) => a.name.startsWith('aria-'))
          .map((a) => [a.name, a.value])
      ),
      className: el.className,
      computedStyles: {
        backgroundColor: computed.backgroundColor,
        color: computed.color,
        borderColor: computed.borderColor,
        borderRadius: computed.borderRadius,
        fontSize: computed.fontSize,
        fontWeight: computed.fontWeight,
        height: computed.height,
        padding: computed.padding,
      },
      boundingBox: {
        width: Math.round(el.getBoundingClientRect().width),
        height: Math.round(el.getBoundingClientRect().height),
      },
    };
  };
}

const preview: Preview = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0B0B0B' },
      ],
    },
    options: {
      storySort: {
        order: [
          'Overview',
          ['Home'],
          'Foundations',
          ['Colors', 'Typography', 'Spacing', 'Radius', 'Shadows', 'Breakpoints'],
          'Layout',
          'Forms',
          'Overlays & Navigation',
          'Feedback',
          'Data',
          'Components & Data',
          'Motion',
        ],
      },
    },
  },
  decorators: [
    (Story) => (
      <TimmbrConfigProvider>
        <div className="bg-background text-foreground p-6 font-sans antialiased transition-colors duration-150">
          <Story />
        </div>
      </TimmbrConfigProvider>
    ),
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
};

export default preview;
