import type { Meta, StoryObj } from '@storybook/react-vite';
import { BlogPostCard } from '@secrecy/ui/components/features/blog/card/blog-post-card';

const meta: Meta<typeof BlogPostCard> = {
	component: BlogPostCard,
	title: 'Features/BlogPostCard',
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
		},
	},
};

export default meta;

type Story = StoryObj<typeof BlogPostCard>;

const baseArgs = {
	tagLabel: 'Engineering',
	img: {
		src: '/image/video-poster.jpg',
	},
	title: 'Design System Update',
	description: 'A short overview of recent component improvements.',
	text: '5 min read',
	link: {
		href: '#read-more',
		label: 'Read more',
	},
};

export const Default: Story = {
	args: {
		...baseArgs,
	},
};

export const Small: Story = {
	args: {
		...baseArgs,
		size: 'sm',
	},
};

export const Medium: Story = {
	args: {
		...baseArgs,
		size: 'md',
	},
};

export const Large: Story = {
	args: {
		...baseArgs,
		size: 'lg',
	},
};
