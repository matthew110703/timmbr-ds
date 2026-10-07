import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    // Unminified (like @timmbr/ui) so the 'use client' banner survives intact.
    minify: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      // Every export is a client hook / browser helper.
      output: { banner: "'use client';" },
    },
    emptyOutDir: false,
  },
});
