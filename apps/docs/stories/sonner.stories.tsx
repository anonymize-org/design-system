import { Button } from '@secrecy/design-system/button';
import { toast, Toaster } from '@secrecy/design-system/sonner';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Toaster> = {
	component: Toaster,
	title: 'Feedback/Sonner',
};

export default meta;

type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
	render: (props) => (
		<>
			<Toaster {...props} />
			<div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
				<Button
					onClick={(): void => {
						toast.success('Profile saved', {
							description: 'Your changes have been updated successfully.',
						});
					}}>
					Trigger toast
				</Button>
			</div>
		</>
	),
	args: {
		richColors: true,
	},
};
