import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/core/dropdown-menu';
import {
	DropdownAccountAvatar,
	DropdownAccountAvatarProps,
	DropdownAccountLabel,
} from '@/components/elements/dropdown-secrecy-account/dropdown-secrecy-account-elements';
import { cn } from '@/lib/utils';

type DropdownAccountItem = {
	label: string;
	icon?: React.ReactNode;
} & React.ComponentProps<typeof DropdownMenuItem>;

interface DropdownAccountUIProps {
	avatar: DropdownAccountAvatarProps['avatar'];
	className?: string;
	items: DropdownAccountItem[];
	classes?: {
		avatar?: string;
		logo?: string;
		content?: string;
	};
}
function DropdownSecrecyAccount({
	avatar,
	className,
	items,
	classes,
}: DropdownAccountUIProps): React.ReactNode {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className={cn(className)}>
				<DropdownAccountAvatar avatar={avatar} className={classes?.avatar} />
			</DropdownMenuTrigger>
			<DropdownMenuContent className={cn('sds:min-w-48', classes?.content)}>
				<DropdownAccountLabel className={classes?.logo} />
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					{items.map((item, index) => (
						<DropdownMenuItem
							key={index}
							className={cn(
								'sds:flex sds:cursor-pointer sds:items-center sds:gap-1.5',
								item.className,
							)}
							{...item}>
							{item.icon}
							{item.label}
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export { DropdownSecrecyAccount };
