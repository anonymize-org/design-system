import { AudioPlayer } from '@secrecy/ui/components/elements/media-payers/audio/audio-media-payer';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof AudioPlayer> = {
	component: AudioPlayer,
	argTypes: {
		track: {
			control: { type: 'object' },
		},
	},
	parameters: {
		layout: 'centered',
	},
};

export default meta;

type Story = StoryObj<typeof AudioPlayer>;

/*
 * Local sample audio - served from public/audio/audio-sample.mp3
 */
export const Default: Story = {
	render: (props) => (
		<div className='w-[500px] max-w-full'>
			<AudioPlayer {...props} />
		</div>
	),
	name: 'Audio Player',
	args: {
		track: {
			title: 'Sample Audio Track',
			type: 'audio/mp3',
			src: '/audio/audio-sample.mp3',
		},
	},
};

export const WithLongTitle: Story = {
	render: (props) => (
		<div className='w-[500px] max-w-full'>
			<AudioPlayer {...props} />
		</div>
	),
	args: {
		track: {
			title:
				'A Really Long Audio Track Title That Demonstrates Text Overflow Handling',
			type: 'audio/mp3',
			src: '/audio/audio-sample.mp3',
		},
	},
};

export const CompactWidth: Story = {
	render: (props) => (
		<div className='w-[350px] max-w-full'>
			<AudioPlayer {...props} />
		</div>
	),
	args: {
		track: {
			title: 'Compact Player',
			type: 'audio/mp3',
			src: '/audio/audio-sample.mp3',
		},
	},
};

export const WideLayout: Story = {
	render: (props) => (
		<div className='w-[700px] max-w-full'>
			<AudioPlayer {...props} />
		</div>
	),
	args: {
		track: {
			title: 'Wide Audio Player',
			type: 'audio/mp3',
			src: '/audio/audio-sample.mp3',
		},
	},
};

export const CustomStyling: Story = {
	render: (props) => (
		<div className='w-[500px] max-w-full'>
			<AudioPlayer {...props} />
		</div>
	),
	args: {
		track: {
			title: 'Custom Styled Player',
			type: 'audio/mp3',
			src: '/audio/audio-sample.mp3',
		},
	},
};
