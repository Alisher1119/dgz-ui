/// <reference types="vitest/config" />
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        Button: resolve(__dirname, "src/components/ui/button/index.ts"),
        Card: resolve(__dirname, "src/components/ui/badge/index.ts"),
        Modal: resolve(__dirname, "src/components/ui/avatar/index.ts"),
      },
      name: "dgz-ui",
      fileName: (format) => `dgz-ui.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
