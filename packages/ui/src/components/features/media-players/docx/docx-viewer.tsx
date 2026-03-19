import {
	DocxViewerFrame,
	DocxViewerHtml,
} from '@/components/elements/media-payers/docx/docx-viewer-html';
import { useDocxViewer } from './use-docx-viewer';

import SpinnerLoader from '@/components/loader/spinner';
import { ErrorFileFallback } from '@/components/elements/media-payers/shared/file-alert-fallback';

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
		return <ErrorFileFallback message={error} />;
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
