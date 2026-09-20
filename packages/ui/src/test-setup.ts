import '@testing-library/jest-dom';

// JSDOM mock for ResizeObserver required by Radix UI (Slider, etc.)
if (typeof globalThis !== 'undefined') {
  (globalThis as any).ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}
