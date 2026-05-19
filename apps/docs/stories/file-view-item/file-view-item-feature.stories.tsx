import FileViewItem from '@secrecy/ui/components/features/file-view/file-view-item';
import type { Meta, StoryObj } from '@storybook/react-vite';

type FileViewItemStoryArgs = {
	extension: string;
	size: 'sm' | 'md' | 'lg' | 'xl';
	label?: string;
};

const meta: Meta<FileViewItemStoryArgs> = {
	component: FileViewItem,
	argTypes: {
		extension: {
			control: { type: 'text' },
		},
		size: {
			control: { type: 'select' },
			options: ['sm', 'md', 'lg', 'xl'],
		},
		label: {
			control: { type: 'text' },
		},
	},
};

export default meta;

type Story = StoryObj<FileViewItemStoryArgs>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
	render: (props) => <FileViewItem {...props} />,
	name: 'FileViewItem',
	args: {
		extension: 'pdf',
		size: 'lg',
		label: 'sample.pdf',
	},
};

export const WithoutLabel: Story = {
	render: (props) => <FileViewItem {...props} />,
	name: 'FileViewItem without Label',
	args: {
		extension: 'pdf',
		size: 'md',
	},
};

export const DifferentSizes: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
			<FileViewItem extension='pdf' size='sm' label='small.pdf' />
			<FileViewItem extension='pdf' size='md' label='medium.pdf' />
			<FileViewItem extension='pdf' size='lg' label='large.pdf' />
			<FileViewItem extension='pdf' size='xl' label='extra-large.pdf' />
		</div>
	),
	name: 'FileViewItem - Different Sizes',
	args: {
		size: 'sm',
	},
};

export const DifferentExtensions: Story = {
	render: (props) => (
		<div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
			<FileViewItem extension='pdf' size={props.size} label='document.pdf' />
			<FileViewItem extension='docx' size={props.size} label='document.docx' />
			<FileViewItem
				extension='xlsx'
				size={props.size}
				label='spreadsheet.xlsx'
			/>
			<FileViewItem extension='jpg' size={props.size} label='image.jpg' />
		</div>
	),
	name: 'FileViewItem - Different Extensions',
	args: {
		size: 'sm',
	},
};
