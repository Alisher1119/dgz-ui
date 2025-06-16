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
        "alert/index": resolve(__dirname, "src/ui/alert/index.ts"),
        "alert-dialog/index": resolve(
          __dirname,
          "src/ui/alert-dialog/index.ts",
        ),
        "avatar/index": resolve(__dirname, "src/ui/avatar/index.ts"),
        "badge/index": resolve(__dirname, "src/ui/badge/index.ts"),
        "breadcrumb/index": resolve(__dirname, "src/ui/breadcrumb/index.ts"),
        "button/index": resolve(__dirname, "src/ui/button/index.ts"),
        "card/index": resolve(__dirname, "src/ui/card/index.ts"),
        "calendar/index": resolve(__dirname, "src/ui/calendar/index.ts"),
        "dialog/index": resolve(__dirname, "src/ui/dialog/index.ts"),
        "dropdown/index": resolve(__dirname, "src/ui/dropdown/index.ts"),
        "form/index": resolve(__dirname, "src/ui/form/index.ts"),
        "pagination/index": resolve(__dirname, "src/ui/pagination/index.ts"),
        "popover/index": resolve(__dirname, "src/ui/popover/index.ts"),
        "scroll-area/index": resolve(__dirname, "src/ui/scroll-area/index.ts"),
        "separator/index": resolve(__dirname, "src/ui/separator/index.ts"),
        "sheet/index": resolve(__dirname, "src/ui/sheet/index.ts"),
        "tab/index": resolve(__dirname, "src/ui/tab/index.ts"),
        "table/index": resolve(__dirname, "src/ui/table/index.ts"),
        "tooltip/index": resolve(__dirname, "src/ui/tooltip/index.ts"),
        "skeleton/index": resolve(__dirname, "src/ui/skeleton/index.ts"),
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
