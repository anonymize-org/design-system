import { AsideBlogPostAnchorList } from '@secrecy/design-system/components/features/blog/aside/aside-blog-post-anchor-list';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof AsideBlogPostAnchorList> = {
	component: AsideBlogPostAnchorList,
	title: 'Features/AsideBlogPostAnchorList',
};

export default meta;

type Story = StoryObj<typeof AsideBlogPostAnchorList>;

export const Default: Story = {
	args: {
		title: 'On this page',
		list: [
			{
				href: '#introduction',
				title: 'Introduction',
				imgSrc: '/image/video-poster.jpg',
			},
			{
				href: '#key-points',
				title: 'Key Points',
				imgSrc: '/image/video-poster.jpg',
			},
		],
	},
};
