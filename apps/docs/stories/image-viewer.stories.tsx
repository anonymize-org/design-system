import ImageFileViewer from '@secrecy/ui/components/features/media-players/image/image-viewer';
import type { Meta, StoryObj } from '@storybook/react-vite';

type ImageViewerStoryArgs = {
	src: string;
	fileName: string;
	fileType: string;
	zoom?: number;
	sizeMode: 'compact' | 'medium' | 'full';
};

const meta: Meta<ImageViewerStoryArgs> = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	component: ImageFileViewer as any,
	title: 'Media Players/Image File Viewer',
	argTypes: {
		src: { control: { type: 'text' } },
		fileName: { control: { type: 'text' } },
		fileType: { control: { type: 'text' } },
		zoom: { control: { type: 'number' } },
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

const loader = async ({ args }: { args: ImageViewerStoryArgs }) => ({
	file: await fetch(args.src)
		.then((r) => r.blob())
		.then((blob) => new File([blob], args.fileName, { type: args.fileType })),
});

export const Compact: Story = {
	loaders: [loader],
	render: (props, { loaded: { file } }) => (
		<ImageFileViewer
			file={file as File}
			sizeMode={props.sizeMode}
			zoom={props.zoom}
		/>
	),
	args: {
		src: '/image/video-poster.jpg',
		fileName: 'video-poster.jpg',
		fileType: 'image/jpeg',
		sizeMode: 'compact',
	},
};

export const Medium: Story = {
	loaders: [loader],
	render: (props, { loaded: { file } }) => (
		<ImageFileViewer
			file={file as File}
			sizeMode={props.sizeMode}
			zoom={props.zoom}
		/>
	),
	args: {
		src: '/image/video-poster.jpg',
		fileName: 'video-poster.jpg',
		fileType: 'image/jpeg',
		sizeMode: 'medium',
	},
};

export const Full: Story = {
	loaders: [loader],
	render: (props, { loaded: { file } }) => (
		<ImageFileViewer
			file={file as File}
			sizeMode={props.sizeMode}
			zoom={props.zoom}
		/>
	),
	args: {
		src: '/image/video-poster.jpg',
		fileName: 'video-poster.jpg',
		fileType: 'image/jpeg',
		sizeMode: 'full',
	},
};
