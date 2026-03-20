import type { Meta, StoryObj } from '@storybook/react-vite';
import { VideoPlayer } from '@secrecy/ui/components/features/media-players/video-player/video-media-payer';

const meta: Meta<typeof VideoPlayer> = {
	component: VideoPlayer,
	title: 'Features/VideoPlayer',
};

export default meta;

type Story = StoryObj<typeof VideoPlayer>;

export const Default: Story = {
	args: {
		fileName: 'sample-video.mp4',
		fileUrl: '/video/sample-video.mp4',
		fileType: 'video/mp4',
	},
};
