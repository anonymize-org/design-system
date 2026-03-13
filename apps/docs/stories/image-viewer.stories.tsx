import ImageFileViewer from '@secrecy/ui/components/features/media-players/image/image-viewer';
import type { Meta, StoryObj } from '@storybook/react-vite';

type ImageViewerStoryArgs = {
	fileUrl: string;
	zoom?: number;
	sizeMode: 'compact' | 'medium' | 'full';
};

const meta: Meta<ImageViewerStoryArgs> = {
	component: ImageFileViewer,
	title: 'Media Players/Image File Viewer',
	argTypes: {
		fileUrl: {
			control: { type: 'text' },
		},
		sizeMode: {
			control: { type: 'select' },
			options: ['compact', 'medium', 'full'],
		},
	},
	parameters: {
		layout: 'centered',
	},
};

export default meta;

type Story = StoryObj<ImageViewerStoryArgs>;

export const Compact: Story = {
	render: (props: ImageViewerStoryArgs) => <ImageFileViewer {...props} />,
	args: {
		fileUrl: '/image/video-poster.jpg',
		sizeMode: 'compact',
	},
};

export const Medium: Story = {
	render: (props: ImageViewerStoryArgs) => <ImageFileViewer {...props} />,
	args: {
		fileUrl: '/image/video-poster.jpg',
		sizeMode: 'medium',
	},
};

export const Full: Story = {
	render: (props: ImageViewerStoryArgs) => <ImageFileViewer {...props} />,
	args: {
		fileUrl: '/image/video-poster.jpg',
		sizeMode: 'full',
	},
};
