/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dtsPlugin from 'vite-plugin-dts';

const uiComponents = [
  'alert',
  'alert-dialog',
  'avatar',
  'accordion',
  'badge',
  'breadcrumb',
  'button',
  'card',
  'calendar',
  'collapsible',
  'dialog',
  'dropdown',
  'form',
  'pagination',
  'popover',
  'scroll-area',
  'separator',
  'sheet',
  'skeleton',
  'tab',
  'table',
  'tooltip',
  'progress',
] as const;

const entries = {
  index: 'src/index.ts',
  ...Object.fromEntries(
    uiComponents.map((name) => [`${name}/index`, `src/ui/${name}/index.ts`])
  ),
  'utils/index': 'src/lib/index.ts',
};

const external = [
  'react',
  'react-dom',
  'react/jsx-runtime',
  'i18next',
  'react-i18next',
  'react-hook-form',
];

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dtsPlugin({
      include: ['src'],
      exclude: ['src/**/*.test.*', 'src/**/*.spec.*', 'src/setupTests.ts'],
      outDir: 'dist/types',
      tsconfigPath: './tsconfig.build.json', // ← Use build config
      copyDtsFiles: true,
      rollupTypes: false,
      strictOutput: false,
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
    cssCodeSplit: false,
    lib: {
      entry: Object.fromEntries(
        Object.entries(entries).map(([key, value]) => [
          key,
          resolve(__dirname, value),
        ])
      ),
      cssFileName: 'styles',
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
