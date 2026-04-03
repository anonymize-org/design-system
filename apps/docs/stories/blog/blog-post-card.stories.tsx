import type { Meta, StoryObj } from '@storybook/react-vite';
import { BlogPostCard } from '@secrecy/ui/components/features/blog/card/blog-post-card';

const meta: Meta<typeof BlogPostCard> = {
	component: BlogPostCard,
	title: 'Features/BlogPostCard',
};

export default meta;

type Story = StoryObj<typeof BlogPostCard>;

export const Default: Story = {
	args: {
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
	},
};
