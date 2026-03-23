import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

function TextLineContentCount({
	linesCount,
	className,
}: {
	linesCount: number;
	className?: string;
}): React.ReactNode {
	return (
		<div
			className={cn(
				'sds:text-muted-foreground sds:border-b sds:border-border sds:px-2 sds:py-1 sds:text-xs',
				className,
			)}>
			{linesCount} {linesCount === 1 ? 'line' : 'lines'}
		</div>
	);
}

function TextLineContentPre({
	content,
	className,
}: {
	content: string;
	className?: string;
}): React.ReactNode {
	return (
		<pre
			className={cn(
				'sds:flex-1 sds:overflow-x-auto sds:p-4 sds:font-mono sds:text-sm sds:leading-6 sds:wrap-break-word sds:whitespace-pre-wrap',
				className,
			)}>
			<code>{content}</code>
		</pre>
	);
}

const FrameVarians = cva('sds:bg-background sds:flex sds:w-full', {
	variants: {
		fullScreen: {
			true: 'sds:h-screen sds:w-full',
			false: 'sds:h-fit sds:w-full',
		},
	},
	defaultVariants: {
		fullScreen: false,
	},
});

function TextFileViewerFrame({
	className,
	children,
	fullScreen = false,
}: React.ComponentPropsWithoutRef<'div'> & {
	fullScreen?: boolean;
}): React.ReactNode {
	return (
		<div className={cn(FrameVarians({ fullScreen }), className)}>
			{children}
		</div>
	);
}

export { TextLineContentCount, TextLineContentPre, TextFileViewerFrame };
