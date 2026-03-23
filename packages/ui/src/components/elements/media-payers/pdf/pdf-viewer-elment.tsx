import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

const VaraintClasses = cva('sds:h-full sds:w-full sds:min-h-[60vh]', {
	variants: {
		fullScreen: {
			true: 'sds:rounded-none sds:lg:h-screen sds:lg:w-full',
			false: 'sds:rounded sds:border-0 sds:bg-transparent',
		},
	},
	defaultVariants: {
		fullScreen: false,
	},
});

interface FildPdfViewerProps {
	fileUrl: string;
	fullScreen?: boolean;
	fileName?: string;
}

function PDFFileViewerUI({
	fileUrl,
	fullScreen,
	className,
	fileName,
	...iframeProps
}: FildPdfViewerProps & React.ComponentProps<'iframe'>) {
	return (
		<iframe
			src={fileUrl}
			className={cn(VaraintClasses({ fullScreen }), className)}
			height='100%'
			width='100%'
			title={fileName}
			{...iframeProps}
		/>
	);
}

export { PDFFileViewerUI };
