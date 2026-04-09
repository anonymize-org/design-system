import { Button } from '@/components/core/button';
import { cn } from '@/lib/utils';
import { DoorClosed, Settings } from 'lucide-react';

function AccountControlBtn({
	onClick,
	children,
	className,
	...rest
}: React.ComponentProps<typeof Button>): React.ReactNode {
	return (
		<Button
			variant='outline'
			size='sm'
			className={cn('sds:h-7 sds:text-xs', className)}
			onClick={onClick}
			{...rest}>
			{children}
		</Button>
	);
}

interface AccountControlBtnProps {
	label?: string;
	icon?: React.ReactNode;
	onClick?: () => void;
	className?: string;
}

function ManageAccountBtn({
	onClick: onManageAccount,
	icon = <Settings />,
	label = 'Manage Account',
	className,
}: AccountControlBtnProps): React.ReactNode {
	return (
		<AccountControlBtn onClick={onManageAccount} className={className}>
			{icon}
			{label}
		</AccountControlBtn>
	);
}

function LogoutBtn({
	onClick: onLogout,
	icon = <DoorClosed />,
	label = 'Logout',
	className,
}: AccountControlBtnProps): React.ReactNode {
	return (
		<AccountControlBtn onClick={onLogout} className={className}>
			{icon}
			{label}
		</AccountControlBtn>
	);
}

export { ManageAccountBtn, LogoutBtn };
