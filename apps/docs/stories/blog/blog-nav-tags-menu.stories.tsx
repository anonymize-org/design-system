import type { Meta, StoryObj } from '@storybook/react-vite';
import { BlogNavTagsMenu } from '@secrecy/ui/components/features/blog/nav/blog-nav-tags';

const meta: Meta<typeof BlogNavTagsMenu> = {
	component: BlogNavTagsMenu,
	title: 'Features/BlogNavTagsMenu',
};

export default meta;

type Story = StoryObj<typeof BlogNavTagsMenu>;

export const Default: Story = {
	args: {
		tags: [
			{
				href: '#all',
				label: 'All',
				active: true,
			},
			{
				href: '#engineering',
				label: 'Engineering',
			},
			{
				href: '#product',
				label: 'Product',
			},
			{
				href: '#design-system',
				label: 'Design System',
			},
		],
	},
};
