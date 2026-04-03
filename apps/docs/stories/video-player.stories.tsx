import { VideoPlayer } from '@secrecy/ui/components/features/file-players/video-player/video-media-payer';
import type { Meta, StoryObj } from '@storybook/react-vite';

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
