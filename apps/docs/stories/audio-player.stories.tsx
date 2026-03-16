import { AudioPlayer } from '@secrecy/ui/components/features/media-players/audio-player/audio-media-payer';
import type { Meta, StoryObj } from '@storybook/react-vite';

type AudioPlayerStoryArgs = {
	src: string;
	fileName: string;
	fileType: string;
	variant?: 'light' | 'dark';
	size?: 'sm' | 'md' | 'lg';
};

const meta: Meta<AudioPlayerStoryArgs> = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	component: AudioPlayer as any,
	parameters: {
		layout: 'centered',
	},
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
	},
};

export default meta;

type Story = StoryObj<AudioPlayerStoryArgs>;

const loader = async ({ args }: { args: AudioPlayerStoryArgs }) => ({
	file: await fetch(args.src)
		.then((r) => r.blob())
		.then((blob) => new File([blob], args.fileName, { type: args.fileType })),
});

/*
 * Local sample audio - served from public/audio/audio-sample.mp3
 */
export const Default: Story = {
	loaders: [loader],
	render: (props, { loaded: { file } }) => (
		<div style={{ width: '500px', maxWidth: '100%' }}>
			<AudioPlayer
				file={file as File}
				variant={props.variant}
				size={props.size}
			/>
		</div>
	),
	name: 'Audio Player',
	args: {
		src: '/audio/audio-sample.mp3',
		fileName: 'audio-sample.mp3',
		fileType: 'audio/mpeg',
	},
};

export const WithLongTitle: Story = {
	loaders: [loader],
	render: (props, { loaded: { file } }) => (
		<div style={{ width: '500px', maxWidth: '100%' }}>
			<AudioPlayer
				file={file as File}
				variant={props.variant}
				size={props.size}
			/>
		</div>
	),
	args: {
		src: '/audio/audio-sample.mp3',
		fileName:
			'a-really-long-audio-track-title-that-demonstrates-text-overflow-handling.mp3',
		fileType: 'audio/mpeg',
	},
};

export const CompactWidth: Story = {
	loaders: [loader],
	render: (props, { loaded: { file } }) => (
		<div style={{ width: '350px', maxWidth: '100%' }}>
			<AudioPlayer
				file={file as File}
				variant={props.variant}
				size={props.size}
			/>
		</div>
	),
	args: {
		src: '/audio/audio-sample.mp3',
		fileName: 'audio-sample.mp3',
		fileType: 'audio/mpeg',
	},
};

export const WideLayout: Story = {
	loaders: [loader],
	render: (props, { loaded: { file } }) => (
		<div style={{ width: '700px', maxWidth: '100%' }}>
			<AudioPlayer
				file={file as File}
				variant={props.variant}
				size={props.size}
			/>
		</div>
	),
	args: {
		src: '/audio/audio-sample.mp3',
		fileName: 'audio-sample.mp3',
		fileType: 'audio/mpeg',
	},
};
