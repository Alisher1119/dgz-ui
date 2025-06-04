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
        "button/index": resolve(__dirname, "src/ui/button/index.ts"),
        "badge/index": resolve(__dirname, "src/ui/badge/index.ts"),
        "avatar/index": resolve(__dirname, "src/ui/avatar/index.ts"),
      },
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: [
        {
          format: "es",
          dir: "dist",
          entryFileNames: "[name].es.js",
        },
        {
          format: "cjs",
          dir: "dist",
          entryFileNames: "[name].umd.js",
        },
      ],
    },
  },
});
