import {
	Empty,
	EmptyContent,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
	EmptyDescription,
} from '@/components/core/empty';
import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

import { AlertCircleIcon, LucideProps } from 'lucide-react';

const MediaClassVariants = cva('sds:bg-muted sds:text-muted-foreground', {
	variants: {
		variant: {
			default: 'sds:bg-muted sds:text-muted-foreground',
			error: 'sds:bg-destructive/5 sds:text-destructive',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

interface EmptyAlertUIProps {
	content?: React.ReactNode;
	title?: string;
	description?: string;
	className?: string;
	icon?: React.ForwardRefExoticComponent<
		Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
	>;
	variant?: VariantProps<typeof MediaClassVariants>['variant'];
}

function EmptyAlertUI({
	content,
	title,
	description,
	className,
	icon,
	variant = 'default',
}: EmptyAlertUIProps): React.ReactNode {
	const Icon = icon || AlertCircleIcon;
	return (
		<Empty className={cn(className)}>
			<EmptyHeader>
				<EmptyMedia
					variant='icon'
					className={cn(MediaClassVariants({ variant }))}>
					<Icon />
				</EmptyMedia>
				{title ? <EmptyTitle>{title}</EmptyTitle> : null}
				{description ? (
					<EmptyDescription>{description}</EmptyDescription>
				) : null}
			</EmptyHeader>
			{content && <EmptyContent>{content}</EmptyContent>}
		</Empty>
	);
}

export { EmptyAlertUI };
