# Secrecy Design System

A modern, scalable design system built with React and TypeScript. This design system is powered by:

- 🏎 [Turborepo](https://turbo.build/repo) — High-performance build system for Monorepos
- 🚀 [React](https://reactjs.org/) — JavaScript library for user interfaces
- 🛠 [Tsup](https://github.com/egoist/tsup) — TypeScript bundler powered by esbuild
- 📖 [Storybook](https://storybook.js.org/) — UI component environment powered by Vite

## Getting Started

### Installation

```sh
pnpm install
```

### Development

To start the development environment and preview components in Storybook:

```sh
pnpm dev
```

This will start Storybook at `localhost:6006` with hot reloading enabled.

### Building

To build all packages and the Storybook site:

```sh
pnpm build
```

### Other Useful Commands

- `pnpm lint` - Lint all packages
- `pnpm changeset` - Generate a changeset for versioning
- `pnpm clean` - Clean up all `node_modules` and `dist` folders

## Project Structure

This monorepo includes:

- `apps/docs`: Component documentation site with Storybook
- `packages/ui`: Core React components
- `packages/typescript-config`: Shared `tsconfig.json`s
- `packages/eslint-config`: ESLint preset

## Component Development

Components are located in `packages/ui/src`. Each component is built with TypeScript and compiled using `tsup` to support both ES Modules and CommonJS formats.

Example component structure:

```tsx:packages/ui/src/Button.tsx
import * as React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
}

export function Button(props: ButtonProps) {
  return <button>{props.children}</button>;
}

Button.displayName = 'Button';
```

## Documentation

Documentation is built using Storybook and supports MDX for rich documentation pages. Each component should have its own story file in `apps/docs/stories/`.

Example story structure:

```js:apps/docs/stories/button.stories.mdx
import { Button } from '@secrecy/ui/button';
import { Meta, Story, Preview, Props } from '@storybook/addon-docs/blocks';

<Meta title="Components/Button" component={Button} />

# Button

Button component description and usage guidelines.

## Props

<Props of={Button} />

## Examples

<Preview>
  <Story name="Default">
    <Button>Hello</Button>
  </Story>
</Preview>
```

## Publishing

This project uses [Changesets](https://github.com/changesets/changesets) for version management and publishing. To publish a new version:

1. Run `pnpm changeset` to create a new changeset
2. Select the packages to include in the changeset
3. Choose version bump type (major, minor, patch)
4. Write a summary of changes
5. Push to GitHub

The GitHub Action will automatically handle the publishing process when changes are pushed to the main branch.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

[Add your license information here]
