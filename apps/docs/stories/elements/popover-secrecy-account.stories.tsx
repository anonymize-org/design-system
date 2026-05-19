import { PopoverAccountUI } from '@secrecy/ui/components/features/secrecy-account/popover-secrecy-account';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof PopoverAccountUI> = {
	component: PopoverAccountUI,
	title: 'Elements/PopoverSecrecyAccount',
};

export default meta;

type Story = StoryObj<typeof PopoverAccountUI>;

export const Default: Story = {
	render: (props) => (
		<div
			style={{
				display: 'flex',
				justifyContent: 'flex-end',
				width: '100%',
				position: 'relative',
			}}>
			<PopoverAccountUI {...props} />
		</div>
	),
	args: {
		avatar: {
			src: undefined,
			fallback: 'RC',
		},
		user_name: 'Raffi Haycan',
		org: {
			id: 'org-1',
			name: 'Secrecy',
		},
		onManageAccount: () => {},
		onLogout: () => {},
		onOrganizationChange: () => {},
		organizations: [
			{ id: 'org-1', name: 'Secrecy' },
			{ id: 'org-2', name: 'Design System' },
		],
		isOrganizationsLoading: false,
	},
};
