import type { Meta, StoryObj } from '@storybook/react-vite';
import { BlogPostHeading } from '@secrecy/ui/components/features/blog/headings/blog-post-heading';

const meta: Meta<typeof BlogPostHeading> = {
	component: BlogPostHeading,
	title: 'Features/BlogPostHeading',
};

export default meta;

type Story = StoryObj<typeof BlogPostHeading>;

export const Default: Story = {
	args: {
		title: 'Build Better Products with a Thoughtful Design System',
		description:
			'A simple heading block for blog pages with optional badge and description text.',
		badgeLabel: 'Engineering',
	},
};
