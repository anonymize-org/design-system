import { FileView } from '@secrecy/ui/components/elements/file-view/file-view-item';
import type { Meta, StoryObj } from '@storybook/react-vite';

type FileViewStoryArgs = {
	extension: string;
	size: 'sm' | 'md' | 'lg' | 'xl';
};

const meta: Meta<FileViewStoryArgs> = {
	argTypes: {
		extension: {
			control: { type: 'text' },
		},
		size: {
			control: { type: 'select' },
			options: ['sm', 'md', 'lg', 'xl'],
		},
	},
};

export default meta;

type Story = StoryObj<FileViewStoryArgs>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
	render: (props) => (
		<FileView>
			<FileView.Icon extension={props.extension} size={props.size} />
			<FileView.Label>{`sample.${props.extension}`}</FileView.Label>
		</FileView>
	),
	name: 'FileView',
	args: {
		extension: 'pdf',
		size: 'sm',
	},
};
