import {
	Empty,
	EmptyHeader,
	EmptyMedia,
	EmptyDescription,
} from '@/components/core/empty';
import { FileQuestion } from 'lucide-react';
import React from 'react';

interface FileErrorFallbackProps {
	withDescription?: boolean;
}

function FileErrorFallback({
	withDescription,
}: FileErrorFallbackProps): React.ReactNode {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant='icon'>
					<FileQuestion />
				</EmptyMedia>
				{withDescription && (
					<EmptyDescription className='sds:text-sm'>
						Failed to load file content
					</EmptyDescription>
				)}
			</EmptyHeader>
		</Empty>
	);
}

export { FileErrorFallback };
