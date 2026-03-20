import type { Meta, StoryObj } from '@storybook/react-vite';
import ImageFileViewer from '@secrecy/ui/components/features/media-players/image/image-viewer';

const meta: Meta<typeof ImageFileViewer> = {
	component: ImageFileViewer,
	title: 'Features/ImageFileViewer',
};

export default meta;

type Story = StoryObj<typeof ImageFileViewer>;

export const Default: Story = {
	args: {
		fileUrl: '/image/video-poster.jpg',
	},
};
