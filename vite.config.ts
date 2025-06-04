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
      entryRoot: "src",
      include: ["src/components"],
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
        button: resolve(__dirname, "src/components/ui/button/index.ts"),
        badge: resolve(__dirname, "src/components/ui/badge/index.ts"),
        avatar: resolve(__dirname, "src/components/ui/avatar/index.ts"),
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
        preserveModules: true,
        preserveModulesRoot: "src",
      },
    },
  },
});
