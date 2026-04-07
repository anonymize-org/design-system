import { DropdownSecrecyAccount } from '@secrecy/ui/components/features/dropown-secrecy-account/dropdown-secrecy-account';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof DropdownSecrecyAccount> = {
	component: DropdownSecrecyAccount,
	title: 'Elements/DropdownSecrecyAccount',
};

export default meta;

type Story = StoryObj<typeof DropdownSecrecyAccount>;

export const Default: Story = {
	render: (props) => (
		<div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
			<DropdownSecrecyAccount {...props} />
		</div>
	),
	args: {
		avatar: {
			src: undefined,
			fallback: 'RC',
		},
		items: [
			{
				label: 'Profile',
			},
			{
				label: 'Settings',
			},
			{
				label: 'Sign out',
				className: 'sds:text-red-600 sds:focus:text-red-600',
			},
		],
	},
};
