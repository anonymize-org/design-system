import { Meta, StoryObj } from '@storybook/react';
import { FileViewerDialogFullScreen } from '@secrecy/design-system/components/features/file-view/file-viewer-dialog/file-viewer-dialog';

const meta: Meta<typeof FileViewerDialogFullScreen> = {
	title: 'Components/Features/File Viewer Dialog',
	component: FileViewerDialogFullScreen,
	args: {
		open: true,
	},
};

export default meta;
type Story = StoryObj<typeof FileViewerDialogFullScreen>;

export const DocxFile: Story = {
	loaders: [
		async () => {
			const response = await fetch('docx/sample-docx.docx');
			const blob = await response.blob();
			const docxFile = new File([blob], 'example-docx.docx', {
				type: blob.type,
			});

			return { docxFile };
		},
	],
	render: (args, { loaded }) => {
		return (
			<div
				style={{
					backgroundColor: '#f0f0f0',
				}}>
				<FileViewerDialogFullScreen {...args} file={loaded.docxFile} />
			</div>
		);
	},
};

export const CsvFile: Story = {
	loaders: [
		async () => {
			const response = await fetch('csv/my-csv-sample.csv');
			const blob = await response.blob();
			const csvFile = new File([blob], 'example-csv.csv', {
				type: blob.type,
			});

			return { csvFile };
		},
	],
	render: (args, { loaded }) => {
		return (
			<div
				style={{
					backgroundColor: '#f0f0f0',
				}}>
				<FileViewerDialogFullScreen {...args} file={loaded.csvFile} />
			</div>
		);
	},
};
