import { SheetFileViewer } from '@secrecy/design-system/components/features/file-players/sheet/sheet-file-viewer';
import type { Meta, StoryObj } from '@storybook/react-vite';

type SheetFileViewerStoryArgs = {
	src: string;
	fileName: string;
};

const meta: Meta<SheetFileViewerStoryArgs> = {
	component: SheetFileViewer as unknown as React.ComponentType<SheetFileViewerStoryArgs>,
	title: 'Features/SheetFileViewer',
	argTypes: {
		src: { control: { type: 'text' } },
		fileName: { control: { type: 'text' } },
	},
};

export default meta;

type Story = StoryObj<SheetFileViewerStoryArgs>;

/*
 * Local sample XLSX - served from public/sheet/sample-sheet.xlsx
 */
export const Default: Story = {
	loaders: [
		async ({ args }) => ({
			file: await fetch(args.src)
				.then((r) => r.blob())
				.then(
					(blob) =>
						new File([blob], args.fileName, {
							type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
						}),
				),
		}),
	],
	render: (_props, { loaded: { file } }) => (
		<SheetFileViewer file={file as File} />
	),
	args: {
		src: '/sheet/sample-sheet.xlsx',
		fileName: 'sample-sheet.xlsx',
	},
};

/*
 * `use-dialog-file-viewer` routes the `csv` media kind here as well as
 * `spreadsheet`, so the delimited path gets its own story.
 */
export const Csv: StoryObj = {
	render: () => {
		const file = new File(
			[
				`Name,Role,Location
Alice,Engineer,Paris
Bob,Designer,Berlin
Charlie,PM,"London, UK"
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
