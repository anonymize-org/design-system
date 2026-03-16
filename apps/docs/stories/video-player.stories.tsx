import { VideoPlayer } from '@secrecy/ui/components/features/media-players/video-player/video-media-payer';
import type { Meta, StoryObj } from '@storybook/react-vite';

type VideoPlayerStoryArgs = {
	src: string;
	fileName: string;
	fileType: string;
	variant?: 'light' | 'dark';
	size?: 'sm' | 'md' | 'lg';
	poster?: string;
};

const meta: Meta<VideoPlayerStoryArgs> = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	component: VideoPlayer as any,
	title: 'Media Players/Video Player',
	argTypes: {
		src: { control: { type: 'text' } },
		fileName: { control: { type: 'text' } },
		fileType: { control: { type: 'text' } },
		variant: {
			control: { type: 'select' },
			options: ['light', 'dark'],
		},
		size: {
			control: { type: 'select' },
			options: ['sm', 'md', 'lg'],
		},
		poster: { control: { type: 'text' } },
	},
	parameters: {
		layout: 'centered',
	},
};

export default meta;

type Story = StoryObj<VideoPlayerStoryArgs>;

/*
 * Local sample video - served from public/video/sample-video.mp4
 */
export const Default: Story = {
	loaders: [
		async ({ args }) => ({
			file: await fetch(args.src)
				.then((r) => r.blob())
				.then(
					(blob) => new File([blob], args.fileName, { type: args.fileType }),
				),
		}),
	],
	render: (props, { loaded: { file } }) => (
		<div style={{ width: '800px', maxWidth: '100%' }}>
			<VideoPlayer
				file={file as File}
				variant={props.variant}
				size={props.size}
				videoProps={props.poster ? { poster: props.poster } : undefined}
			/>
		</div>
	),
	name: 'Video Player',
	args: {
		src: '/video/sample-video.mp4',
		fileName: 'sample-video.mp4',
		fileType: 'video/mp4',
	},
};

export const WithPoster: Story = {
	loaders: [
		async ({ args }) => ({
			file: await fetch(args.src)
				.then((r) => r.blob())
				.then(
					(blob) => new File([blob], args.fileName, { type: args.fileType }),
				),
		}),
	],
	render: (props, { loaded: { file } }) => (
		<div style={{ width: '800px', maxWidth: '100%' }}>
			<VideoPlayer
				file={file as File}
				variant={props.variant}
				size={props.size}
				videoProps={props.poster ? { poster: props.poster } : undefined}
			/>
		</div>
	),
	name: 'With Poster Image',
	args: {
		src: '/video/sample-video.mp4',
		fileName: 'sample-video.mp4',
		fileType: 'video/mp4',
		poster: '/image/video-poster.jpg',
	},
};

export const DarkVariant: Story = {
	loaders: [
		async ({ args }) => ({
			file: await fetch(args.src)
				.then((r) => r.blob())
				.then(
					(blob) => new File([blob], args.fileName, { type: args.fileType }),
				),
		}),
	],
	render: (props, { loaded: { file } }) => (
		<div style={{ width: '800px', maxWidth: '100%' }}>
			<VideoPlayer
				file={file as File}
				variant={props.variant}
				size={props.size}
				videoProps={props.poster ? { poster: props.poster } : undefined}
			/>
		</div>
	),

	args: {
		src: '/video/sample-video.mp4',
		fileName: 'sample-video.mp4',
		fileType: 'video/mp4',
		variant: 'dark',
	},
};

export const CompactWidth: Story = {
	loaders: [
		async ({ args }) => ({
			file: await fetch(args.src)
				.then((r) => r.blob())
				.then(
					(blob) => new File([blob], args.fileName, { type: args.fileType }),
				),
		}),
	],
	render: (props, { loaded: { file } }) => (
		<div style={{ width: '320px', maxWidth: '100%' }}>
			<VideoPlayer
				file={file as File}
				variant={props.variant}
				size={props.size}
				videoProps={props.poster ? { poster: props.poster } : undefined}
			/>
		</div>
	),

	args: {
		src: '/video/sample-video.mp4',
		fileName: 'sample-video.mp4',
		fileType: 'video/mp4',
	},
};
