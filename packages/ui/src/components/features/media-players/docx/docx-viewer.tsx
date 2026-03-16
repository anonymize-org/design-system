import { DocxViewerHtml } from '@/components/elements/media-payers/docx/docx-viewer-html';
import { useDocxViewer } from './use-docx-viewer';
import { cn } from '@/lib/utils';
import { FileErrorFallback } from '@/components/elements/media-payers/shared/file-error-fallback';
import SpinnerLoader from '@/components/loader/spinner';

interface DocxViewerProps {
	file: File;
	className?: string;
	classes?: {
		docx?: string;
	};
}

function DocxViewer({ file, className, classes }: DocxViewerProps) {
	const { html, error } = useDocxViewer(file);

	if (error) {
		return <FileErrorFallback message={error} />;
	}

	if (!html) {
		return <SpinnerLoader />;
	}

	return (
		<div
			className={cn('sds:w-full sds:max-w-5xl sds:min-w-0 sds:p-4', className)}>
			<DocxViewerHtml html={html} className={classes?.docx} />
		</div>
	);
}

export { DocxViewer };
