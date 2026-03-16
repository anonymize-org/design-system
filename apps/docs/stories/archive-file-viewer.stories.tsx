import { ArchiveFileViewer } from '@secrecy/ui/components/features/media-players/archive/archive-file-viewer';
import type { Meta, StoryObj } from '@storybook/react-vite';

const archiveFileNames = [
	'project-backup.zip',
	'design-assets.rar',
	'database-dump.7z',
	'logs.tar',
	'server.log.gz',
	'dataset.tar.bz2',
	'archive.tar.xz',
	'linux-installer.iso',
	'app-installer.dmg',
	'desktop-client.pkg',
];

type ArchiveFileViewerStoryArgs = {
	fileName: string;
};

const meta: Meta<ArchiveFileViewerStoryArgs> = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	component: ArchiveFileViewer as any,
	title: 'Media Players/Archive File Viewer',
	argTypes: {
		fileName: { control: { type: 'text' } },
	},
	parameters: {
		layout: 'centered',
	},
};

export default meta;

type Story = StoryObj<ArchiveFileViewerStoryArgs>;

export const Default: Story = {
	render: ({ fileName }) => (
		<div style={{ width: '440px', maxWidth: '100%' }}>
			<ArchiveFileViewer file={new File([], fileName)} />
		</div>
	),
	name: 'Archive File Viewer',
	args: {
		fileName: 'source-code.zip',
	},
};

export const SupportedExtensions: Story = {
	render: () => (
		<div
			style={{
				width: '440px',
				maxWidth: '100%',
				display: 'grid',
				gap: '16px',
			}}>
			{archiveFileNames.map((fileName) => (
				<ArchiveFileViewer key={fileName} file={new File([], fileName)} />
			))}
		</div>
	),
	name: 'All Supported Extensions',
};

export const UnknownExtension: Story = {
	render: ({ fileName }) => (
		<div style={{ width: '440px', maxWidth: '100%' }}>
			<ArchiveFileViewer file={new File([], fileName)} />
		</div>
	),
	args: {
		fileName: 'legacy-package.cab',
	},
};

export const LongFileName: Story = {
	render: ({ fileName }) => (
		<div>
			<ArchiveFileViewer file={new File([], fileName)} />
		</div>
	),
	args: {
		fileName: 'quarterly-financial-reports-and-analytics-2025-final-version.7z',
	},
};
