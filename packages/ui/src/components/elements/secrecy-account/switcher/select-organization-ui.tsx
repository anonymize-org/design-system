import { Select, SelectContent, SelectTrigger } from '@/components/core/select';
import {
	ItemLoader,
	NoOrganizations,
	OrgItem,
	SwitcherTrigger,
} from './select-org-elements';
import { cn } from '@/lib/utils';

interface SwitchOrganizationSelectUIProps {
	onValueChange: (value: string) => void;
	handleOpenChange?: (open: boolean) => void;
	isLoading: boolean;
	organizations: { id: string; name: string }[];
	currentOrgId: string;
	className?: string;
	classes?: {
		content?: string;
		item?: string;
	};
}

function SwitchOrganizationSelectUI({
	onValueChange,
	handleOpenChange,
	isLoading,
	organizations,
	currentOrgId,
	className,
	classes,
}: SwitchOrganizationSelectUIProps): React.ReactNode {
	return (
		<Select onOpenChange={handleOpenChange} onValueChange={onValueChange}>
			<SelectTrigger
				className={cn(
					'sds:group sds:cursor-pointer sds:border-0 sds:shadow-none',
					className,
				)}>
				<SwitcherTrigger />
			</SelectTrigger>
			<SelectContent className={cn('sds:w-56 sds:p-0', classes?.content)}>
				{isLoading ? (
					<ItemLoader />
				) : organizations.length === 0 ? (
					<NoOrganizations />
				) : (
					organizations.map((org) => {
						return (
							<OrgItem
								key={org.id}
								org={org}
								isCurrent={org.id === currentOrgId}
								className={classes?.item}
							/>
						);
					})
				)}
			</SelectContent>
		</Select>
	);
}

export { SwitchOrganizationSelectUI };
