import type { Meta, StoryObj } from '@storybook/react-vite';
import { BlogArticleHeadings } from '@secrecy/ui/components/features/blog/headings/blog-article-headings';

const meta: Meta<typeof BlogArticleHeadings> = {
	component: BlogArticleHeadings,
	title: 'Features/BlogArticleHeadings',
};

export default meta;

type Story = StoryObj<typeof BlogArticleHeadings>;

export const Default: Story = {
	args: {
		title: 'Build Better Products with a Thoughtful Design System',
		subTitle: 'How teams ship faster with shared patterns',
		description:
			'A compact heading section for blog articles with optional subtitle and supporting description.',
	},
};
