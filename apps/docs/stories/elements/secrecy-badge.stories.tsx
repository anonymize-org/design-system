import type { Meta, StoryObj } from '@storybook/react-vite';
import { SecrecyBadge } from '@secrecy/ui/components/elements/secrecy-badge';

const meta: Meta<typeof SecrecyBadge> = {
	component: SecrecyBadge,
	title: 'Elements/SecrecyBadge',
};

export default meta;

type Story = StoryObj<typeof SecrecyBadge>;

export const Default: Story = {
	args: {
		children: 'Powered by',
		href: 'https://secrecy.dev',
		target: '_blank',
		rel: 'noreferrer',
	},
};
