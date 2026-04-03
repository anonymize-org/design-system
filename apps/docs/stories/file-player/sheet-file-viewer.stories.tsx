import { SheetFileViewer } from '@secrecy/ui/components/features/file-players/sheet/sheet-file-viewer';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof SheetFileViewer> = {
	component: SheetFileViewer,
	title: 'Features/SheetFileViewer',
};

export default meta;

type Story = StoryObj<typeof SheetFileViewer>;

export const Default: Story = {
	render: () => {
		const file = new File(
			[
				`Name,Role,Location
Alice,Engineer,Paris
Bob,Designer,Berlin
Charlie,PM,London
`,
			],
			'sample.csv',
			{
				type: 'text/csv',
			},
		);

		return <SheetFileViewer file={file} />;
	},
};
