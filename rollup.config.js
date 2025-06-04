import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

const components = ["button", "avatar", "badge"];

export default [
  // Main bundle
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/index.esm.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: true,
        outDir: "dist",
      }),
    ],
    external: ["react", "react-dom"],
  },
  // Individual component bundles
  ...components.map((component) => ({
    input: `src/components/ui/${component}/index.ts`,
    output: [
      {
        file: `dist/components/ui/${component}/index.js`,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: `dist/components/ui/${component}/index.esm.js`,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: true,
        outDir: "dist",
      }),
    ],
    external: ["react", "react-dom"],
  })),
];
