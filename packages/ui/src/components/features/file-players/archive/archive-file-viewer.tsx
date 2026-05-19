import {
	ArchiveFileBadge,
	ArchiveFileDescription,
	ArchiveFileIcon,
	ArchiveFileTitle,
	ArchiveFileWrapper,
} from '@/components/elements/media-payers/archive/archive-viewer-elements';
import { ARCHIVE_EXTENSIONS, getArchiveIcon } from './helper';
import { cn } from '@/lib/utils';
import { TooltipUI } from '@/components/elements/tooltip-ui';
import { TooltipProvider } from '@/components/core/tooltip';
import { getFileExtension } from '../utils/file';

interface ArchiveFileViewerProps {
	fileName: string;
	fileSize: string;
	className?: string;
	classes?: {
		icon?: string;
		title?: string;
		badge?: string;
		description?: string;
	};
}

function ArchiveFileViewer({
	fileName,
	fileSize,
	className,
	classes,
}: ArchiveFileViewerProps): React.ReactNode {
	const extension = getFileExtension(fileName);
	const bgColor = ARCHIVE_EXTENSIONS[extension]?.color || 'sds:bg-gray-500';
	const label = ARCHIVE_EXTENSIONS[extension]?.label || extension.toUpperCase();
	const IconComponent = getArchiveIcon(extension);

	return (
		<ArchiveFileWrapper
			className={cn(
				'sds:bg-background sds:border-border sds:flex sds:h-fit sds:w-fit sds:gap-2 sds:rounded-2xl sds:border sds:p-6 sds:shadow-xs',
				className,
			)}>
			<ArchiveFileIcon
				className={cn(bgColor, classes?.icon)}
				IconComponent={IconComponent}
			/>
			<div>
				<div className='sds:flex sds:min-w-0 sds:flex-1 sds:items-center sds:gap-2'>
					<TooltipProvider>
						<TooltipUI description={fileName}>
							<ArchiveFileTitle
								fileName={fileName}
								className={classes?.title}
							/>
						</TooltipUI>
					</TooltipProvider>

					<ArchiveFileBadge
						label={label}
						className={cn(
							bgColor,
							'sds:hidden sds:sm:inline-block',
							classes?.badge,
						)}
					/>
				</div>
				<ArchiveFileDescription
					description={fileSize}
					className={cn('sds:hidden sds:sm:block', classes?.description)}
				/>
			</div>
		</ArchiveFileWrapper>
	);
}

export { ArchiveFileViewer };
