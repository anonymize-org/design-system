import {
	DocxViewerFrame,
	DocxViewerHtml,
} from '@/components/elements/media-payers/docx/docx-viewer-html';
import { useDocxViewer } from './use-docx-viewer';

import { FileErrorFallback } from '@/components/elements/media-payers/shared/file-error-fallback';
import SpinnerLoader from '@/components/loader/spinner';

interface DocxViewerProps {
	file: File;
	fullScreen?: boolean;
	className?: string;
	classes?: {
		docx?: string;
	};
}

function DocxViewer({ file, className, classes, fullScreen }: DocxViewerProps) {
	const { html, error } = useDocxViewer(file);

	if (error) {
		return <FileErrorFallback message={error} />;
	}

	if (!html) {
		return <SpinnerLoader />;
	}

	return (
		<DocxViewerFrame className={className} fullScreen={fullScreen}>
			<DocxViewerHtml html={html} className={classes?.docx} />
		</DocxViewerFrame>
	);
}

export { DocxViewer };
