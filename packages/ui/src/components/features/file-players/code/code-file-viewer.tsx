import {
	CodeFileViewerFrame,
	CodeFileViewerUI,
} from '@/components/elements/media-payers/code/code-file-viewer-ui';

import SpinnerLoader from '@/components/elements/loader/spinner';
import { ErrorFileFallback } from '@/components/elements/media-payers/shared/file-alert-fallback';
import { useCodeFileViewer } from './use-code-file-viewer';

interface CodeFileViewerProps {
	file: File;
	className?: string;
	classes?: {
		content?: string;
	};
	fallback?: React.ReactNode;
}

function CodeFileViewer({
	file,
	className,
	classes,
	fallback,
}: CodeFileViewerProps) {
	const { html, error, isLoading } = useCodeFileViewer(file);

	if (error) {
		return fallback ?? <ErrorFileFallback />;
	}

	if (isLoading) {
		return <SpinnerLoader />;
	}

	return (
		<CodeFileViewerFrame className={className}>
			<CodeFileViewerUI html={html} className={classes?.content} />
		</CodeFileViewerFrame>
	);
}

export { CodeFileViewer };
