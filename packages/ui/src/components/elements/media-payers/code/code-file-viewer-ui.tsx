import { cn } from '@/lib/utils';

function CodeFileViewerFrame({
	children,
	className,
	...props
}: React.ComponentProps<'div'>): React.ReactNode {
	return (
		<div
			className={cn(
				'sds:h-fit sds:w-full sds:max-h-[70vh] sds:overflow-auto sds:rounded sds:bg-zinc-800 sds:text-white',
				className,
			)}
			{...props}>
			{children}
		</div>
	);
}

function CodeFileViewerUI({
	html,
	className,
}: {
	html: string;
	className?: string;
}): React.ReactNode {
	return (
		<div
			className={cn(
				'sds:[&>pre]:rounded sds:[&>pre]:p-4 sds:[&>pre]:text-xs sds:[&>pre]:leading-relaxed sds:sm:[&>pre]:text-sm',
				className,
			)}
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
}

export { CodeFileViewerFrame, CodeFileViewerUI };
