import PDFFileViewer from '@secrecy/ui/components/features/media-players/pdf/pdf-file-viewer';
import type { Meta, StoryObj } from '@storybook/react-vite';

type PDFFileViewerStoryArgs = {
	src: string;
	fileName: string;
};

const meta: Meta<PDFFileViewerStoryArgs> = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	component: PDFFileViewer as any,
	title: 'Media Players/PDF File Viewer',
	argTypes: {
		src: { control: { type: 'text' } },
		fileName: { control: { type: 'text' } },
	},
	parameters: {
		layout: 'centered',
	},
};

export default meta;

type Story = StoryObj<PDFFileViewerStoryArgs>;

/*
 * Local sample PDF - served from public/pdf/sample.pdf
 */
export const Default: Story = {
	loaders: [
		async ({ args }) => ({
			file: await fetch(args.src)
				.then((r) => r.blob())
				.then(
					(blob) =>
						new File([blob], args.fileName, { type: 'application/pdf' }),
				),
		}),
	],
	render: (_props, { loaded: { file } }) => (
		<PDFFileViewer file={file as File} />
	),
	name: 'PDF File Viewer',
	args: {
		src: '/pdf/sample.pdf',
		fileName: 'sample.pdf',
	},
};
