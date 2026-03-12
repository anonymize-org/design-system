import { DocxViewer } from '@secrecy/ui/components/features/media-players/docx/docx-viewer';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof DocxViewer> = {
	component: DocxViewer,
	title: 'Media Players/DOCX Viewer',
	argTypes: {
		src: {
			control: { type: 'text' },
		},
	},
	parameters: {
		layout: 'centered',
	},
};

export default meta;

type Story = StoryObj<typeof DocxViewer>;

/*
 * Local sample DOCX - served from public/docx/sample-docx.docx
 */
export const Default: Story = {
	render: (props) => (
		<>
			<DocxViewer {...props} />
		</>
	),
	name: 'DOCX Viewer',
	args: {
		src: '/docx/sample-docx.docx',
	},
};

export const ErrorState: Story = {
	render: (props) => (
		<>
			<DocxViewer {...props} />
		</>
	),
	args: {
		src: '/docx/does-not-exist.docx',
	},
};
