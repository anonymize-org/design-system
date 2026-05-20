import { SelectItem } from '@/components/core/select';
import { cn } from '@/lib/utils';
import { Loader, Users2 } from 'lucide-react';

interface SwitchItem {
	label?: string;
	className?: string;
}

function SwitcherTrigger({
	className,
	label = 'Switch organization',
}: SwitchItem): React.ReactNode {
	return (
		<>
			<div
				className={cn(
					'sds:bg-primary/5 sds:group-hover:bg-primary/10 sds:flex sds:items-center sds:justify-center sds:rounded-full sds:p-2 sds:duration-100',
					className,
				)}>
				<Users2 className='sds:text-primary' />
			</div>
			<span className='sds:text-foreground sds:text-sm'>{label}</span>
		</>
	);
}

function OrgItem({
	org,
	isCurrent = false,
	className,
}: {
	org: { id: string; name: string };
	isCurrent?: boolean;
	className?: string;
}): React.ReactNode {
	return (
		<SelectItem
			key={org.id}
			value={org.id}
			className={cn(
				isCurrent
					? 'sds:disabled sds:pointer-none sds:text-primary sds:cursor-default'
					: 'sds:hover:bg-primary/5 sds:cursor-pointer',
				className,
			)}>
			{org.name}
			{isCurrent && <span className='sds:text-xs'> (Current)</span>}
		</SelectItem>
	);
}

function ItemLoader({
	className,
	label = 'Loading organizations...',
}: SwitchItem): React.ReactNode {
	return (
		<div
			className={cn(
				'sds:flex sds:items-center sds:justify-center sds:p-2',
				className,
			)}>
			<Loader className='sds:mr-2 sds:h-4 sds:w-4 sds:animate-spin' />
			<span className='sds:text-muted-foreground sds:text-sm'>{label}</span>
		</div>
	);
}

function NoOrganizations({
	className,
	label = 'No organizations found',
}: SwitchItem): React.ReactNode {
	return (
		<div
			className={cn(
				'sds:flex sds:items-center sds:justify-center sds:p-2',
				className,
			)}>
			<span className='sds:text-muted-foreground sds:text-sm'>{label}</span>
		</div>
	);
}

export { SwitcherTrigger, OrgItem, ItemLoader, NoOrganizations };
