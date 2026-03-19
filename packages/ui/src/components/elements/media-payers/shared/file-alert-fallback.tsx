import { cn } from '@/lib/utils';

import { FileQuestion, FileX2Icon } from 'lucide-react';
import { EmptyAlertUI } from '../../empty-alert';

interface UnknownFileFallbackProps {
	className?: string;
}

function UnknownFileFallback({
	className,
}: UnknownFileFallbackProps): React.ReactNode {
	return (
		<EmptyAlertUI
			icon={FileQuestion}
			title={'Unknown file type'}
			description={'The file type is unknown. Preview is not available.'}
			className={cn(
				'sds:bg-background sds:border-border sds:w-fit sds:border-solid sds:shadow-xs',
				className,
			)}
		/>
	);
}

function UnsupportedFileFallback({
	className,
}: UnknownFileFallbackProps): React.ReactNode {
	return (
		<EmptyAlertUI
			icon={FileX2Icon}
			title={'Unsupported file type'}
			description={'The file type is not supported. Preview is not available.'}
			className={cn(
				'sds:bg-background sds:border-border sds:w-fit sds:border-solid sds:shadow-xs',
				className,
			)}
		/>
	);
}

interface FileErrorFallbackProps {
	message?: string;
}

function ErrorFileFallback({
	message = 'Failed to load file content',
}: FileErrorFallbackProps): React.ReactNode {
	return (
		<EmptyAlertUI description={message} variant='error' icon={FileQuestion} />
	);
}

export { UnknownFileFallback, UnsupportedFileFallback, ErrorFileFallback };
