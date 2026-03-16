import { cn } from '@/lib/utils';

interface FildPdfViewerProps {
	fileUrl: string;
	fullScreen?: boolean;
}

function PDFFileViewerUI({
	fileUrl,
	fullScreen,

	className,
	...iframeProps
}: FildPdfViewerProps & React.ComponentProps<'iframe'>) {
	return (
		<iframe
			src={fileUrl}
			className={cn(
				'sds:lg:w-90% sds:min-h-80 sds:w-full  sds:border-0 sds:sm:h-[50vh] sds:md:h-[70vh] sds:lg:h-[75vh] sds:rounded',
				fullScreen && 'sds:lg:h-screen sds:lg:w-full sds:rounded-none',
				className,
			)}
			height='100%'
			width='100%'
			{...iframeProps}
		/>
	);
}

export { PDFFileViewerUI };
