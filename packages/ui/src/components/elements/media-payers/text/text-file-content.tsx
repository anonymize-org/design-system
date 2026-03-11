import { cn } from '@/lib/utils';

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

export { TextLineContentCount, TextLineContentPre };
