import type { Meta, StoryObj } from '@storybook/react-vite';
import { BlogPostArticlePreview } from '@secrecy/ui/components/features/blog/article/post-content-preview';

const meta: Meta<typeof BlogPostArticlePreview> = {
	component: BlogPostArticlePreview,
	title: 'Features/BlogPostArticlePreview',
};

export default meta;

type Story = StoryObj<typeof BlogPostArticlePreview>;

export const Default: Story = {
	args: {
		body: `# Hello World\n\nThis is a **markdown** preview.\n\n- Item one\n- Item two\n- Item three\n\n> A blockquote example.\n\n\`\`\`ts\nconst hello = "world";\n\`\`\``,
	},
};
