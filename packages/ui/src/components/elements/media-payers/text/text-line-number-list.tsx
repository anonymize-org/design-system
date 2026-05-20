import { cn } from '@/lib/utils';

function TextLineNumberList({
	lines,
	className,
}: {
	lines: string[];
	className?: string;
}): React.ReactNode {
	return (
		<div
			className={cn(
				'sds:bg-muted/50 sds:text-muted-foreground sds:shrink-0 sds:border-r sds:px-3 sds:py-4 sds:text-right sds:font-mono sds:text-xs sds:select-none sds:border-border',
				className,
			)}
			aria-hidden='true'>
			{lines.map((_, index) => (
				<div key={index} className='sds:leading-6'>
					{index + 1}
				</div>
			))}
		</div>
	);
}

export default TextLineNumberList;
