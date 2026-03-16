import { PDFFileViewerUI } from '@/components/elements/media-payers/pdf/pdf-viewer-elment';

function PDFFileViewer(props: React.ComponentProps<typeof PDFFileViewerUI>) {
	return <PDFFileViewerUI {...props} />;
}

export default PDFFileViewer;
