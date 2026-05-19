import { cn } from '@/lib/utils';

function BlogArticleHeadLinesTitle({
	className,
	...props
}: React.ComponentPropsWithoutRef<'h2'>) {
	return (
		<h2
			className={cn(
				'sds:w-full sds:text-2xl sds:font-bold sds:tracking-tighter sds:md:text-3xl sds:max-w-xl',
				className,
			)}
			{...props}
		/>
	);
}

function BlogArticleHeadLinesSubTitle({
	className,
	...props
}: React.ComponentPropsWithoutRef<'h5'>): React.ReactNode {
	return (
		<h5
			className={cn('sds:text-muted-foreground sds:italic', className)}
			{...props}
		/>
	);
}

function BlogArticleHeadLinesDescription({
	className,
	...props
}: React.ComponentPropsWithoutRef<'small'>): React.ReactNode {
	return (
		<small
			className={cn('sds:text-primary sds:text-sm ', className)}
			{...props}
		/>
	);
}

function BlogArticleHeadLinesRoot({
	...props
}: React.ComponentPropsWithoutRef<'div'>): React.ReactNode {
	return <div {...props} />;
}

export {
	BlogArticleHeadLinesRoot,
	BlogArticleHeadLinesTitle,
	BlogArticleHeadLinesSubTitle,
	BlogArticleHeadLinesDescription,
};
