'use client';

import {
	FullScreenDialogDescription,
	FullScreenDialogTitle,
} from '@/components/core/full-screen-dialog';
import { cn } from '@/lib/utils';
import { WeightIcon } from 'lucide-react';

interface DialogFileHeaderSizeProps {
	size?: string;
	className?: string;
	classes?: {
		icon?: string;
		description?: string;
	};
}

function DialogFileHeaderSize({
	size,
	className,
	classes,
}: DialogFileHeaderSizeProps): React.ReactNode {
	return (
		<>
			<div className={cn('sds:flex sds:items-center sds:gap-2', className)}>
				<WeightIcon
					className={cn(
						'sds:text-muted-foreground sds:inline-block sds:h-4 sds:w-4',
						classes?.icon,
					)}
				/>
				<FullScreenDialogDescription
					className={cn(
						'sds:text-muted-foreground sds:text-left sds:font-mono sds:text-xs sds:leading-4 sds:text-wrap sds:sm:text-sm',
						classes?.description,
					)}>
					{size}
				</FullScreenDialogDescription>
			</div>
		</>
	);
}

function DialogFileHeader({
	title,
	className,
}: {
	title?: string;
	className?: string;
}): React.ReactNode {
	return (
		<FullScreenDialogTitle
			className={cn(
				'sds:text-primary sds:max-w-60 sds:truncate sds:text-left sds:text-xl sds:sm:text-2xl sds:md:max-w-md sds:lg:max-w-fit sds:lg:text-wrap',
				className,
			)}>
			{title}
		</FullScreenDialogTitle>
	);
}

export { DialogFileHeader, DialogFileHeaderSize };
