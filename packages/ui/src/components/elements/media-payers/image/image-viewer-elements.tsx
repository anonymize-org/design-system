import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

export interface ImageViewerProps {
	fileUrl: string;
	zoom?: number;
	sizeMode?: 'compact' | 'medium' | 'large' | 'full';
}

const ImageFrameVariants = cva('sds:relative sds:overflow-hidden', {
	variants: {
		sizeMode: {
			compact: 'sds:h-64 sds:w-80 sds:sm:h-72 sds:sm:w-96',
			medium: 'sds:h-80 sds:w-full sds:max-w-4xl sds:sm:h-96 sds:lg:h-[32rem]',
			large: 'sds:h-[85vh] sds:w-full sds:max-w-7xl',
			full: 'sds:h-screen sds:w-screen sds:bg-zinc-900/50 sds:p-4',
		},
	},
	defaultVariants: {
		sizeMode: 'medium',
	},
});

function ImageViewerFrame({
	children,
	sizeMode = 'medium',
	className,
	...props
}: React.ComponentProps<'div'> & { sizeMode?: ImageViewerProps['sizeMode'] }) {
	return (
		<div className={cn(ImageFrameVariants({ sizeMode }), className)} {...props}>
			{children}
		</div>
	);
}

function ImageContentViewer({
	fileUrl,
	zoom = 100,
	className,
	style,
	...props
}: React.ComponentProps<'img'> & {
	fileUrl: string;
	zoom?: number;
}) {
	return (
		<img
			src={fileUrl}
			alt='File preview'
			className={cn(
				'sds:h-full sds:w-full sds:object-contain sds:transition-transform sds:duration-150 sds:drop-shadow-2xl',
				className,
			)}
			style={{ transform: `scale(${zoom / 100})`, ...style }}
			loading='lazy'
			{...props}
		/>
	);
}

export { ImageViewerFrame, ImageContentViewer };
