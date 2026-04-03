import TextFileViewer from '@secrecy/ui/components/features/file-players/text/text-viewer';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof TextFileViewer> = {
	component: TextFileViewer,
	title: 'Media Players/Text File Viewer',
	parameters: {
		layout: 'centered',
	},
};

export default meta;

type Story = StoryObj<typeof TextFileViewer>;

export const Default: Story = {
	render: () => {
		const file = new File(
			[
				`
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            `,
			],
			'sample-text.txt',
			{
				type: 'text/plain',
			},
		);

		return <TextFileViewer file={file} />;
	},
	name: 'Text File Viewer',
	args: {},
};
