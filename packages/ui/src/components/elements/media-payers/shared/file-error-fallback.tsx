import {
	Empty,
	EmptyHeader,
	EmptyMedia,
	EmptyDescription,
} from '@/components/core/empty';
import { FileQuestion } from 'lucide-react';
import React from 'react';

interface FileErrorFallbackProps {
	message?: string;
}

function FileErrorFallback({
	message = 'Failed to load file content',
}: FileErrorFallbackProps): React.ReactNode {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia
					variant='icon'
					className='sds:bg-destructive/5 sds:text-destructive'>
					<FileQuestion />
				</EmptyMedia>

				<EmptyDescription className='sds:text-sm'>{message}</EmptyDescription>
			</EmptyHeader>
		</Empty>
	);
}

export { FileErrorFallback };
