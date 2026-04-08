import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
	stories: ['../stories/*.stories.tsx', '../stories/**/*.stories.tsx'],
	framework: '@storybook/react-vite',
	addons: [
		'@storybook/addon-essentials',
		'@storybook/addon-links',
		'@storybook/addon-themes',
		'storybook-dark-mode',
	],
};

export default config;
