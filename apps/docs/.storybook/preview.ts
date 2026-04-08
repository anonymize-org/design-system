import '@secrecy/design-system/styles';

import { withThemeByClassName } from '@storybook/addon-themes';

export const decorators = [
	withThemeByClassName({
		themes: {
			light: 'light',
			dark: 'dark',
		},
		defaultTheme: 'light',
	}),
	(Story: () => unknown) => {
		if (typeof document !== 'undefined') {
			document.body.style.backgroundColor = 'var(--background)';
			document.body.style.color = 'var(--foreground)';
			document.body.style.padding = '1.5rem';
			document.body.style.minHeight = '100vh';
			document.body.style.boxSizing = 'border-box';
		}

		return Story();
	},
];

export const parameters = {
	darkMode: {
		stylePreview: true,
	},
};
