import type { Meta, StoryObj } from '@storybook/react-vite';
import PDFFileViewer from '@secrecy/ui/components/features/media-players/pdf/pdf-file-viewer';

const meta: Meta<typeof PDFFileViewer> = {
	component: PDFFileViewer,
	title: 'Features/PDFFileViewer',
};

export default meta;

type Story = StoryObj<typeof PDFFileViewer>;

export const Default: Story = {
	render: () => {
		return (
			<div
				style={{
					width: '600px',
					height: '800px',
				}}>
				<PDFFileViewer fileUrl='/pdf/sample.pdf' fileName='sample.pdf' />;
			</div>
		);
	},
	args: {
		fileUrl: '/pdf/sample.pdf',
		fileName: 'sample.pdf',
	},
};
