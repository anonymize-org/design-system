import type { Meta, StoryObj } from '@storybook/react-vite';
import { BlogNavTagsMenu } from '@secrecy/design-system/components/features/blog/nav/blog-nav-tags';

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
				label: 'All',
				onClickTag: () => alert('All tags clicked'),
			},
			{
				onClickTag: () => alert('Engineering tag clicked'),
				label: 'Engineering',
			},
			{
				onClickTag: () => alert('Product tag clicked'),
				label: 'Product',
			},
			{
				onClickTag: () => alert('Design System tag clicked'),
				label: 'Design System',
			},
		],
	},
};
