import type { StorybookConfig } from "@storybook/react-vite";
import { resolve } from "node:path";

const config: StorybookConfig = {
  stories: ["../stories/*.stories.tsx", "../stories/**/*.stories.tsx"],
  framework: "@storybook/react-vite",
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    "@storybook/addon-themes",
  ],
  viteFinal: (config) => {
    return {
      ...config,
      define: { "process.env": {} },
      resolve: {
        alias: [
          {
            find: "@secrecy/ui/components",
            replacement: resolve(
              import.meta.dirname,
              "../../../packages/ui/dist/components",
            ),
          },
        ],
      },
    };
  },
};

export default config;
