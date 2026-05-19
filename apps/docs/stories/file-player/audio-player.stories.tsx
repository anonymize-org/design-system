import { AudioPlayer } from '@secrecy/ui/components/features/file-players/audio-player/audio-media-payer';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof AudioPlayer> = {
	component: AudioPlayer,
	title: 'Features/AudioPlayer',
};

export default meta;

type Story = StoryObj<typeof AudioPlayer>;

export const Default: Story = {
	args: {
		fileName: 'audio-sample.mp3',
		fileUrl: '/audio/audio-sample.mp3',
		fileType: 'audio/mpeg',
	},
};
