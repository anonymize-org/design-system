import { ArchiveFileViewer } from '@secrecy/ui/components/features/file-players/archive/archive-file-viewer';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof ArchiveFileViewer> = {
	component: ArchiveFileViewer,
	title: 'Features/ArchiveFileViewer',
};

export default meta;

type Story = StoryObj<typeof ArchiveFileViewer>;

export const Default: Story = {
	args: {
		fileName: 'documents.zip',
		fileSize: '4.2 MB',
	},
};
