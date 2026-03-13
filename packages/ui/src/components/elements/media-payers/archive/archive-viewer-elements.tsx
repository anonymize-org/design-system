import { cn } from '@/lib/utils';
import { FileArchiveIcon } from 'lucide-react';
import { Title } from '../../typo/title';

interface ArchiveFileBadgeProps {
	className?: string;
	label: string;
}

function ArchiveFileBadge({
	className,
	label,
}: ArchiveFileBadgeProps): React.ReactNode {
	return (
		<span
			className={cn(
				'sds:shrink-0 sds:rounded sds:px-1.5 sds:py-0.5 sds:text-xs sds:font-semibold sds:text-white',
				className,
			)}>
			{label}
		</span>
	);
}

interface ArchiveFileIconProps {
	className?: string;
	IconComponent: React.ComponentType<
		React.ComponentProps<typeof FileArchiveIcon>
	>;
}

function ArchiveFileIcon({
	className,
	IconComponent,
}: ArchiveFileIconProps): React.ReactNode {
	return (
		<div
			className={cn(
				'sds:flex sds:size-12 sds:shrink-0 sds:items-center sds:justify-center sds:rounded-lg',
				className,
			)}>
			<IconComponent
				className='sds:size-6 sds:text-white sds:sm:size-7'
				strokeWidth={1.5}
			/>
		</div>
	);
}

interface ArchiveFileTitleProps {
	fileName: string;
	className?: string;
}

function ArchiveFileTitle({ fileName, className }: ArchiveFileTitleProps) {
	return (
		<Title
			className={cn(
				'sds:inline-block sds:max-w-40 sds:truncate sds:font-mono sds:text-lg sds:font-semibold sds:tracking-tighter sds:sm:text-xl sds:md:max-w-md sds:lg:max-w-xl',
				className,
			)}>
			{fileName}
		</Title>
	);
}

interface ArchiveFileDescriptionProps {
	description: string;
	className?: string;
}

function ArchiveFileDescription({
	className,
	description,
}: ArchiveFileDescriptionProps): React.ReactNode {
	return (
		<p
			className={cn(
				'sds:text-muted-foreground sds:block sds:text-xs',
				className,
			)}>
			{description}
		</p>
	);
}

export {
	ArchiveFileBadge,
	ArchiveFileDescription,
	ArchiveFileIcon,
	ArchiveFileTitle,
};
