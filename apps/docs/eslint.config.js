import { config as storybook } from "@repo/eslint-config/storybook.js";

/** @type {import("eslint").Linter.Config} */
export default [
  ...storybook,
]