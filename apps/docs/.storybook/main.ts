import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
	stories: ['../stories/*.stories.tsx', '../stories/**/*.stories.tsx'],
	framework: '@storybook/react-vite',
	addons: [
		'@storybook/addon-essentials',
		'@storybook/addon-links',
		'@storybook/addon-themes',
		'storybook-dark-mode',
	],
	async viteFinal(config) {
		return mergeConfig(config, {
			optimizeDeps: {
				include: ['@secrecy/design-system'],
			},
		});
	},
};

export default config;
