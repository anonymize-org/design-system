import { VideoPlayer } from '@secrecy/ui/components/features/media-players/video-player/video-media-payer';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof VideoPlayer> = {
	component: VideoPlayer,
	argTypes: {
		src: {
			control: { type: 'text' },
		},
		poster: {
			control: { type: 'text' },
		},
		title: {
			control: { type: 'text' },
		},
		description: {
			control: { type: 'text' },
		},
	},
	parameters: {
		layout: 'centered',
	},
};

export default meta;

type Story = StoryObj<typeof VideoPlayer>;

/*
 * Local sample video - served from public/video/sample-video.mp4
 */
export const Default: Story = {
	render: (props) => (
		<div style={{ width: '800px', maxWidth: '100%' }}>
			<VideoPlayer {...props} />
		</div>
	),
	name: 'Video Player',
	args: {
		src: '/video/sample-video.mp4',
		title: 'Sample Video',
		description: 'Local video player demonstration',
	},
};

export const WithPoster: Story = {
	render: (props) => (
		<div style={{ width: '800px', maxWidth: '100%' }}>
			<VideoPlayer {...props} />
		</div>
	),
	name: 'With Poster Image',
	args: {
		src: '/video/sample-video.mp4',
		title: 'Sample Video',
		description: 'Video player with poster image',
		poster: '/image/video-poster.jpg',
	},
};

export const ShortVideo: Story = {
	render: (props) => (
		<div style={{ width: '320px', maxWidth: '100%' }}>
			<VideoPlayer {...props} />
		</div>
	),
	args: {
		src: '/video/sample-video.mp4',
		title: 'Sample Video',
		description: 'Responsive video player',
	},
};
