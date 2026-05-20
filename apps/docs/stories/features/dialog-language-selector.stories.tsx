import type { Meta, StoryObj } from '@storybook/react-vite';
import { DialogLanguageSelector } from '@secrecy/design-system/components/features/language-selector/dialog-language-selector';

const meta: Meta<typeof DialogLanguageSelector> = {
	component: DialogLanguageSelector,
	title: 'Features/DialogLanguageSelector',
};

export default meta;

type Story = StoryObj<typeof DialogLanguageSelector>;

export const Default: Story = {
	args: {
		open: true,
		onOpenChange: (open) => console.log('Dialog open state changed:', open),
		locales: ['en', 'es', 'fr', 'de'],
		currentLocale: 'en',
		onLocaleChange: (locale) => console.log('Locale changed to:', locale),
	},
};
