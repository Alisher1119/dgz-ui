/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dtsPlugin from 'vite-plugin-dts';

const entries = {
  index: 'src/index.ts',
  'alert/index': 'src/ui/alert/index.ts',
  'alert-dialog/index': 'src/ui/alert-dialog/index.ts',
  'avatar/index': 'src/ui/avatar/index.ts',
  'accordion/index': 'src/ui/accordion/index.ts',
  'badge/index': 'src/ui/badge/index.ts',
  'breadcrumb/index': 'src/ui/breadcrumb/index.ts',
  'button/index': 'src/ui/button/index.ts',
  'card/index': 'src/ui/card/index.ts',
  'calendar/index': 'src/ui/calendar/index.ts',
  'collapsible/index': 'src/ui/collapsible/index.ts',
  'dialog/index': 'src/ui/dialog/index.ts',
  'dropdown/index': 'src/ui/dropdown/index.ts',
  'form/index': 'src/ui/form/index.ts',
  'pagination/index': 'src/ui/pagination/index.ts',
  'popover/index': 'src/ui/popover/index.ts',
  'scroll-area/index': 'src/ui/scroll-area/index.ts',
  'separator/index': 'src/ui/separator/index.ts',
  'sheet/index': 'src/ui/sheet/index.ts',
  'skeleton/index': 'src/ui/skeleton/index.ts',
  'tab/index': 'src/ui/tab/index.ts',
  'table/index': 'src/ui/table/index.ts',
  'tooltip/index': 'src/ui/tooltip/index.ts',
  'progress/index': 'src/ui/progress/index.ts',
};

const external = [
  'react',
  'react-dom',
  'react/jsx-runtime',
  'i18next',
  'react-i18next',
  'dayjs',
  'lucide-react',
  'react-hook-form',
  'tailwindcss',
  'tailwindcss-animate',
];

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dtsPlugin({
      include: ['src/**/*'],
      exclude: ['src/**/*.test.*', 'src/**/*.spec.*'],
      outDir: 'dist/types',
      tsconfigPath: './tsconfig.json',
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
  build: {
    sourcemap: true,
    minify: 'esbuild',
    lib: {
      entry: Object.fromEntries(
        Object.entries(entries).map(([key, value]) => [
          key,
          resolve(__dirname, value),
        ])
      ),
    },
    rollupOptions: {
      external: (id) =>
        external.some((ext) => id === ext || id.startsWith(`${ext}/`)),
      output: [
        {
          format: 'es',
          dir: 'dist',
          entryFileNames: '[name].es.js',
          chunkFileNames: 'chunks/[name]-[hash].es.js',
        },
        {
          format: 'cjs',
          dir: 'dist',
          entryFileNames: '[name].cjs.js',
          chunkFileNames: 'chunks/[name]-[hash].cjs.js',
          interop: 'auto',
        },
      ],
    },
  },
});
