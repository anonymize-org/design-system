import { cn } from '@/lib/utils';

interface FildPdfViewerProps {
	fileUrl: string;
	title?: string;
}

function PDFFileViewerUI({
	fileUrl,
	title = 'PDF Viewer',
	className,
	...iframeProps
}: FildPdfViewerProps & React.ComponentProps<'iframe'>) {
	return (
		<iframe
			src={fileUrl}
			className={cn(
				'sds:h-[50vh] sds:min-h-80 sds:w-full sds:border-0 sds:sm:h-[60vh] sds:md:h-[70vh] sds:lg:h-[75vh]',
				className,
			)}
			title={title}
			{...iframeProps}
		/>
	);
}

export { PDFFileViewerUI };
