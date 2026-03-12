import { cn } from '@/lib/utils';

function DocxViewerHtml({
	html,
	className,
}: {
	html: string;
	className?: string;
}): React.ReactNode {
	return (
		<article
			className={cn(
				'sds:prose sds:prose-sm sds:sm:prose-base sds:dark:prose-invert sds:max-w-none sds:wrap-anywhere',
				// Refined typography styles
				'sds:prose-headings:font-semibold sds:prose-headings:tracking-tight',
				'sds:prose-p:text-foreground/90 sds:prose-p:leading-relaxed',
				'sds:prose-a:text-primary sds:prose-a:no-underline hover:sds:prose-a:underline',
				'sds:prose-strong:text-foreground sds:prose-strong:font-semibold',
				'sds:prose-ul:my-4 sds:prose-ol:my-4',
				'sds:prose-li:marker:text-muted-foreground',
				'sds:prose-blockquote:border-l-primary/30 sds:prose-blockquote:text-muted-foreground',
				'sds:prose-code:rounded sds:prose-code:bg-muted sds:prose-code:px-1.5 sds:prose-code:py-0.5 sds:prose-code:text-foreground sds:prose-code:before:content-none sds:prose-code:after:content-none',
				'sds:prose-pre:bg-muted sds:prose-pre:text-foreground',
				'sds:prose-img:rounded-md sds:prose-img:shadow-sm',
				'sds:prose-table:text-sm',
				'sds:prose-th:bg-muted/50 sds:prose-th:px-3 sds:prose-th:py-2',
				'sds:prose-td:px-3 sds:prose-td:py-2',
				'sds:[&_img]:mx-auto sds:[&_img]:h-auto sds:[&_img]:max-w-full',
				'sds:[&_pre]:overflow-x-auto sds:[&_pre]:whitespace-pre-wrap',
				'sds:[&_table]:min-w-full sds:[&_table]:border-collapse sds:[&_table]:text-xs sds:sm:[&_table]:text-sm',
				'sds:[&_td]:whitespace-normal sds:[&_th]:whitespace-normal',
				'sds:[&_a]:break-all',
				'sds:[&_.docx-table-scroll]:-mx-4 sds:[&_.docx-table-scroll]:my-6 sds:[&_.docx-table-scroll]:overflow-x-auto sds:[&_.docx-table-scroll]:px-4 sds:sm:[&_.docx-table-scroll]:mx-0 sds:sm:[&_.docx-table-scroll]:px-0',
				className,
			)}
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
}

export { DocxViewerHtml };
