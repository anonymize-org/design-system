import { FileUnknownFallback } from '@secrecy/ui/components/elements/media-payers/shared/file-unkown-fallback';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof FileUnknownFallback> = {
	component: FileUnknownFallback,
	title: 'Media Players/File Unknown Fallback',
	argTypes: {
		title: {
			control: { type: 'text' },
		},
		description: {
			control: { type: 'text' },
		},
		className: {
			control: { type: 'text' },
		},
	},
	parameters: {
		layout: 'centered',
	},
};

export default meta;

type Story = StoryObj<typeof FileUnknownFallback>;

export const Default: Story = {
	render: (props) => (
		<div style={{ width: '500px', maxWidth: '100%' }}>
			<FileUnknownFallback {...props} />
		</div>
	),
	name: 'File Unknown Fallback',
};

export const CustomMessage: Story = {
	render: (props) => (
		<div style={{ width: '500px', maxWidth: '100%' }}>
			<FileUnknownFallback {...props} />
		</div>
	),
	args: {
		title: 'Unsupported file format',
		description: 'This file cannot be previewed. Try downloading it instead.',
	},
};

export const WithContent: Story = {
	render: (props) => (
		<div style={{ width: '500px', maxWidth: '100%' }}>
			<FileUnknownFallback
				{...props}
				content={
					<button
						style={{
							padding: '0.5rem 1rem',
							borderRadius: '0.375rem',
							border: '1px solid #e2e8f0',
							cursor: 'pointer',
						}}>
						Download file
					</button>
				}
			/>
		</div>
	),
	name: 'With Action Content',
};
