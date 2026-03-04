import VideoPlayer from '@secrecy/ui/components/elements/media-payers/video/video-media-payer';
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
		className: {
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
		<div className='w-[800px] max-w-full'>
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
		<div className='w-[800px] max-w-full'>
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

export const WithoutInfo: Story = {
	render: (props) => (
		<div className='w-[800px] max-w-full'>
			<VideoPlayer {...props} />
		</div>
	),
	name: 'Without Title & Description',
	args: {
		src: '/video/sample-video.mp4',
	},
};

export const ShortVideo: Story = {
	render: (props) => (
		<div className='w-[640px] max-w-full'>
			<VideoPlayer {...props} />
		</div>
	),
	args: {
		src: '/video/sample-video.mp4',
		title: 'Sample Video',
		description: 'Responsive video player',
	},
};

export const CustomWidth: Story = {
	render: (props) => (
		<div className='w-[600px] max-w-full'>
			<VideoPlayer {...props} />
		</div>
	),
	name: 'Custom Width Container',
	args: {
		src: '/video/sample-video.mp4',
		title: 'Custom Width',
		description: 'Video player with custom container width',
		className: 'ring-2 ring-blue-500',
	},
};
