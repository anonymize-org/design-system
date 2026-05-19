import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/core/popover';

import { cn } from '@/lib/utils';
import { Separator } from '@/index';
import {
	AvatarAccount,
	AvatarAccountProps,
} from '@/components/elements/secrecy-account/avatar-account';
import { AccountUserInfo } from '@/components/elements/secrecy-account/account-user-infos';
import {
	LogoutBtn,
	ManageAccountBtn,
} from '@/components/elements/secrecy-account/account-controls';
import { SwitchOrganizationSelectUI } from '@/components/elements/secrecy-account/switcher/select-organization-ui';
import { SecrecySignature } from '@/components/elements/secrecy-account/secrecy-signature';

interface PopoverAccountUIProps {
	avatar: AvatarAccountProps['avatar'];
	user_name: string;
	org: {
		name: string;
		id: string;
	};
	onManageAccount?: () => void;
	onLogout?: () => void;
	onSwitchOrganization?: (args: {
		context: {
			orgId: string;
		};
	}) => Promise<void>;
	getListSecrecyOrganizations?: () => Promise<
		{
			id: string;
			name: string;
		}[]
	>;
	classes?: {
		content?: string;
		trigger?: string;
		avatar?: string;
		controls?: string;
		signature?: string;
		switcher?: string;
	};
	organizations?: { id: string; name: string }[];
	onOrganizationChange?: (value: string) => void;
	isOrganizationsLoading?: boolean;
	onOpenSelectOrganizationChange?: (open: boolean) => void;
}

export function PopoverAccountUI({
	avatar,
	user_name,
	org,
	onManageAccount,
	onLogout,
	organizations,
	onOrganizationChange,
	isOrganizationsLoading,
	onOpenSelectOrganizationChange,
	classes,
}: PopoverAccountUIProps): React.ReactNode {
	const hasControls = onManageAccount || onLogout;
	const hasSwitcher = !!onOrganizationChange;

	return (
		<Popover>
			<PopoverTrigger className={classes?.trigger}>
				<AvatarAccount avatar={avatar} />
			</PopoverTrigger>
			<PopoverContent
				className={cn('sds:w-fit sds:min-w-64 sds:p-0', classes?.content)}
				align='end'>
				<div className='sds:flex sds:gap-4 sds:p-4'>
					<AvatarAccount
						avatar={avatar}
						withAnimation={false}
						className={classes?.avatar}
					/>
					<div>
						<AccountUserInfo name={user_name} org={org.name} />
						{hasControls && (
							<div
								className={cn(
									'sds:mt-4 sds:flex sds:items-center sds:gap-4',
									classes?.controls,
								)}>
								{onManageAccount && (
									<ManageAccountBtn onClick={onManageAccount} />
								)}
								{onLogout && <LogoutBtn onClick={onLogout} />}
							</div>
						)}
					</div>
				</div>

				<Separator />
				{hasSwitcher && (
					<div className='sds:flex sds:h-14 sds:w-full sds:items-center sds:p-4'>
						<SwitchOrganizationSelectUI
							onValueChange={onOrganizationChange}
							isLoading={isOrganizationsLoading || false}
							organizations={organizations || []}
							currentOrgId={org.id}
							className={classes?.switcher}
							handleOpenChange={onOpenSelectOrganizationChange}
						/>
					</div>
				)}
				<SecrecySignature
					className={cn(
						'sds:bg-accent sds:h-8 sds:w-full sds:justify-center',
						classes?.signature,
					)}
				/>
			</PopoverContent>
		</Popover>
	);
}
