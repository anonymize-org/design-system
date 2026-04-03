import { CodeFileViewer } from '@secrecy/ui/components/features/file-players/code/code-file-viewer';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof CodeFileViewer> = {
	component: CodeFileViewer,
	title: 'Media Players/Code File Viewer',
	parameters: {
		layout: 'centered',
	},
};

export default meta;

type Story = StoryObj<typeof CodeFileViewer>;

export const Default: Story = {
	render: () => {
		const file = new File(
			[
				`function greet(name: string) {
	return \`Hello, \${name}!\`;
}

console.log(greet('World'));
`,
			],
			'sample.ts',
			{
				type: 'text/typescript',
			},
		);

		return <CodeFileViewer file={file} />;
	},
};
