import '@testing-library/jest-dom/vitest';

// JSDOM mock for ResizeObserver required by Radix UI (Slider, etc.)
if (typeof globalThis !== 'undefined') {
  (globalThis as any).ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

// JSDOM mock for document.elementFromPoint required by input-otp
if (typeof document !== 'undefined' && !document.elementFromPoint) {
  document.elementFromPoint = () => null;
}

