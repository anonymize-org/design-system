import {
	Empty,
	EmptyContent,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
	EmptyDescription,
} from '@/components/core/empty';
import { cn } from '@/lib/utils';

import { FileQuestion } from 'lucide-react';

interface FileUnknownFallbackProps {
	content?: React.ReactNode;
	title?: string;
	description?: string;
	className?: string;
}

function FileUnknownFallback({
	content,
	title = 'Preview not available for this file type.',
	description = 'This file type is not supported for preview. Please download the file to view its contents.',
	className,
}: FileUnknownFallbackProps): React.ReactNode {
	return (
		<Empty
			className={cn(
				'sds:bg-background sds:border-border sds:w-fit sds:border-solid sds:shadow-xs',
				className,
			)}>
			<EmptyHeader>
				<EmptyMedia variant='icon' className='sds:bg-muted '>
					<FileQuestion />
				</EmptyMedia>
				<EmptyTitle>{title}</EmptyTitle>
				<EmptyDescription>{description}</EmptyDescription>
			</EmptyHeader>
			{content && <EmptyContent>{content}</EmptyContent>}
		</Empty>
	);
}

export { FileUnknownFallback };
