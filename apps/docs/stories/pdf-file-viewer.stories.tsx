import PDFFileViewer from '@secrecy/ui/components/features/media-players/pdf/pdf-file-viewer';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof PDFFileViewer> = {
	component: PDFFileViewer,
	title: 'Media Players/PDF File Viewer',
	argTypes: {
		fileUrl: {
			control: { type: 'text' },
		},
		title: {
			control: { type: 'text' },
		},
	},
	parameters: {
		layout: 'centered',
	},
};

export default meta;

type Story = StoryObj<typeof PDFFileViewer>;

/*
 * Local sample PDF - served from public/pdf/sample.pdf
 */
export const Default: Story = {
	render: (props: typeof PDFFileViewer) => <PDFFileViewer {...props} />,
	name: 'PDF File Viewer',
	args: {
		fileUrl: '/pdf/sample.pdf',
		title: 'Sample PDF',
	},
};
