import type { StorybookConfig } from '@storybook/react-vite';
import { resolve as pathResolve } from 'path';

const config: StorybookConfig = {
	stories: ['../stories/*.stories.tsx', '../stories/**/*.stories.tsx'],
	framework: '@storybook/react-vite',
	addons: [
		'@storybook/addon-essentials',
		'@storybook/addon-links',
		'@storybook/addon-themes',
		'storybook-dark-mode',
	],
	viteFinal: (config) => {
		return {
			...config,
			define: { 'process.env': {} },
			resolve: {
				alias: [
					{
						find: '@secrecy/ui/components',
						replacement: pathResolve(
							__dirname,
							'../../../packages/ui/dist/components',
						),
					},
				],
			},
		};
	},
};

export default config;
