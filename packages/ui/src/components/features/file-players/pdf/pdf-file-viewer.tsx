import { PDFFileViewerUI } from '@/components/elements/media-payers/pdf/pdf-viewer-elment';

interface PdfFileViewerProps {
	fileUrl: string;
	fileName: string;
	fullScreen?: boolean;
	iframeProps?: React.IframeHTMLAttributes<HTMLIFrameElement>;
}

function PDFFileViewer({
	fileUrl,
	fileName,
	fullScreen,
	iframeProps,
}: PdfFileViewerProps) {
	return (
		<PDFFileViewerUI
			fileUrl={fileUrl}
			fullScreen={fullScreen}
			title={fileName}
			{...iframeProps}
		/>
	);
}

export default PDFFileViewer;
