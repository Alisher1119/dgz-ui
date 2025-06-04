/// <reference types="vitest/config" />
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dtsPlugin from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dtsPlugin({
      include: ["src/**/*"],
      exclude: ["src/**/*.test.*", "src/**/*.spec.*"],
      outDir: "dist",
      insertTypesEntry: true,
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        // 'components/ui/button/index': resolve(__dirname, 'src/components/ui/button/index.ts'),
        // 'components/ui/badge/index': resolve(__dirname, 'src/components/ui/badge/index.ts'),
        // 'components/ui/avatar/index': resolve(__dirname, 'src/components/ui/avatar/index.ts'),
      },
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      input: {
        index: resolve(__dirname, "src/index.ts"),
        "components/ui/button/index": resolve(
          __dirname,
          "src/components/ui/button/index.ts",
        ),
        "components/ui/badge/index": resolve(
          __dirname,
          "src/components/ui/badge/index.ts",
        ),
        "components/ui/avatar/index": resolve(
          __dirname,
          "src/components/ui/avatar/index.ts",
        ),
      },
      output: [
        {
          format: "es",
          entryFileNames: "[name].es.js",
          dir: "dist",
        },
        {
          format: "cjs",
          entryFileNames: "[name].umd.js",
          dir: "dist",
        },
      ],
    },
  },
});
