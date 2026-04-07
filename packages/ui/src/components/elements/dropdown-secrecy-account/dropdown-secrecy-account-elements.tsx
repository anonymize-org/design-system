import { Avatar, AvatarFallback, AvatarImage } from '@/components/core/avatar';
import { DropdownMenuLabel } from '@/components/core/dropdown-menu';
import { cn } from '@/lib/utils';
import { SecrecyIcon } from '../svg/secrecy-icon';

export interface DropdownAccountAvatarProps {
	avatar: {
		src: string | undefined;
		fallback: string;
	};
	className?: string;
}

function DropdownAccountAvatar({
	avatar,
	className,
}: DropdownAccountAvatarProps): React.ReactNode {
	return (
		<Avatar
			className={cn(
				'sds:border-primary/50 sds:cursor-pointer sds:border',
				className,
			)}>
			<AvatarImage src={avatar.src} />
			<AvatarFallback className='sds:font-sans-geist sds:text-sm'>
				{avatar.fallback}
			</AvatarFallback>
		</Avatar>
	);
}

interface DropdownAccountLabelProps {
	className?: string;
	classes?: {
		svg?: string;
	};
	label?: string;
}

function DropdownAccountLabel({
	className,
	classes,
	label = 'Secrecy',
}: DropdownAccountLabelProps): React.ReactNode {
	return (
		<DropdownMenuLabel
			className={cn(
				'sds:flex sds:items-center sds:gap-2 sds:font-medium',
				className,
			)}>
			<SecrecyIcon
				width={16}
				height={16}
				className={cn('sds:inline-block', classes?.svg)}
			/>

			{label}
		</DropdownMenuLabel>
	);
}

export { DropdownAccountAvatar, DropdownAccountLabel };
