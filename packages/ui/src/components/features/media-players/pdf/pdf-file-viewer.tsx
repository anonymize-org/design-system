import { PDFFileViewerUI } from '@/components/elements/media-payers/pdf/pdf-viewer-elment';
import { useFileUrl } from '../hooks/use-file-url';
import SpinnerLoader from '@/components/loader/spinner';

interface PDFFileViewerProps {
	file: File;
	iframeProps?: React.IframeHTMLAttributes<HTMLIFrameElement>;
}

function PDFFileViewer({ file, iframeProps }: PDFFileViewerProps) {
	const fileUrl = useFileUrl(file);

	if (!fileUrl) {
		return <SpinnerLoader />;
	}
	return <PDFFileViewerUI fileUrl={fileUrl} {...iframeProps} />;
}

export default PDFFileViewer;
