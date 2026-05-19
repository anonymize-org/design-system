import { DialogLanguageSelector } from '@secrecy/ui/components/features/language-selector/dialog-language-selector';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

const meta: Meta<typeof DialogLanguageSelector> = {
	component: DialogLanguageSelector,
	title: 'Elements/DialogLanguageSelector',
};

export default meta;

type Story = StoryObj<typeof DialogLanguageSelector>;

export const Default: Story = {
	render: (args) => {
		const [open, setOpen] = useState(false);
		const [currentLocale, setCurrentLocale] = useState(
			args.currentLocale ?? 'en',
		);

		return (
			<div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
				<DialogLanguageSelector
					{...args}
					open={open}
					onOpenChange={setOpen}
					currentLocale={currentLocale}
					onLocaleChange={setCurrentLocale}
				/>
			</div>
		);
	},
	args: {
		locales: ['en', 'fr', 'us', 'es', 'it', 'de', 'pt'],
		currentLocale: 'en',
		onOpenChange: () => {},
		onLocaleChange: () => {},
		open: false,
	},
};
