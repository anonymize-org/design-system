import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: ["src/index.ts", "src/components", "src/hooks", "src/lib"],
  format: ["cjs", "esm"],
  dts: true,
  treeshake: true,
  external: ["react"],
  clean: true,
  ...options,
}));
