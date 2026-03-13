import { ArchiveFileViewer } from '@secrecy/ui/components/features/media-players/archive/archive-file-viewer';
import type { Meta, StoryObj } from '@storybook/react-vite';

const archiveExamples = [
	{ extension: 'zip', fileName: 'project-backup.zip', fileSize: '24.7 MB' },
	{ extension: 'rar', fileName: 'design-assets.rar', fileSize: '18.2 MB' },
	{ extension: '7z', fileName: 'database-dump.7z', fileSize: '96.4 MB' },
	{ extension: 'tar', fileName: 'logs.tar', fileSize: '11.1 MB' },
	{ extension: 'gz', fileName: 'server.log.gz', fileSize: '2.9 MB' },
	{ extension: 'bz2', fileName: 'dataset.tar.bz2', fileSize: '148.0 MB' },
	{ extension: 'xz', fileName: 'archive.tar.xz', fileSize: '62.3 MB' },
	{ extension: 'iso', fileName: 'linux-installer.iso', fileSize: '2.4 GB' },
	{ extension: 'dmg', fileName: 'app-installer.dmg', fileSize: '210.5 MB' },
	{ extension: 'pkg', fileName: 'desktop-client.pkg', fileSize: '88.0 MB' },
];

const meta: Meta<typeof ArchiveFileViewer> = {
	component: ArchiveFileViewer,
	title: 'Media Players/Archive File Viewer',
	argTypes: {
		extension: {
			control: { type: 'text' },
		},
		fileName: {
			control: { type: 'text' },
		},
		fileSize: {
			control: { type: 'text' },
		},
	},
	parameters: {
		layout: 'centered',
	},
};

export default meta;

type Story = StoryObj<typeof ArchiveFileViewer>;

export const Default: Story = {
	render: (props) => (
		<div style={{ width: '440px', maxWidth: '100%' }}>
			<ArchiveFileViewer {...props} />
		</div>
	),
	name: 'Archive File Viewer',
	args: {
		extension: 'zip',
		fileName: 'source-code.zip',
		fileSize: '12.8 MB',
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
			{archiveExamples.map((item) => (
				<ArchiveFileViewer
					key={item.extension}
					extension={item.extension}
					fileName={item.fileName}
					fileSize={item.fileSize}
				/>
			))}
		</div>
	),
	name: 'All Supported Extensions',
};

export const UnknownExtension: Story = {
	render: (props) => (
		<div style={{ width: '440px', maxWidth: '100%' }}>
			<ArchiveFileViewer {...props} />
		</div>
	),
	args: {
		extension: 'cab',
		fileName: 'legacy-package.cab',
		fileSize: '6.4 MB',
	},
};

export const LongFileName: Story = {
	render: (props) => (
		<div>
			<ArchiveFileViewer {...props} />
		</div>
	),
	args: {
		extension: '7z',
		fileName: 'quarterly-financial-reports-and-analytics-2025-final-version.7z',
		fileSize: '184.9 MB',
	},
};
