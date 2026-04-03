import { DocxViewer } from '@secrecy/ui/components/features/file-players/docx/docx-viewer';
import type { Meta, StoryObj } from '@storybook/react-vite';

type DocxViewerStoryArgs = {
	src: string;
	fileName: string;
};

const meta: Meta<DocxViewerStoryArgs> = {
	component: DocxViewer as unknown as React.ComponentType<DocxViewerStoryArgs>,
	title: 'Media Players/DOCX Viewer',
	argTypes: {
		src: { control: { type: 'text' } },
		fileName: { control: { type: 'text' } },
	},
	parameters: {
		layout: 'centered',
	},
};

export default meta;

type Story = StoryObj<DocxViewerStoryArgs>;

/*
 * Local sample DOCX - served from public/docx/sample-docx.docx
 */
export const Default: Story = {
	loaders: [
		async ({ args }) => ({
			file: await fetch(args.src)
				.then((r) => r.blob())
				.then(
					(blob) =>
						new File([blob], args.fileName, {
							type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
						}),
				),
		}),
	],
	render: (_props, { loaded: { file } }) => <DocxViewer file={file as File} />,
	name: 'DOCX Viewer',
	args: {
		src: '/docx/sample-docx.docx',
		fileName: 'sample-docx.docx',
	},
};

export const ErrorState: Story = {
	render: () => (
		<DocxViewer
			file={
				new File(['this is not a valid docx file'], 'invalid.docx', {
					type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
				})
			}
		/>
	),
};
