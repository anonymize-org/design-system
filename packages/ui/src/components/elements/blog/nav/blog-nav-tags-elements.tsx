import { cn } from '@/lib/utils';

export type BlogNavTagItem = {
	label: string;
	onClickTag: (tag: string) => void;
};

function TagMenuItem({
	label,
	onClickTag,
	className,
	classes,
}: {
	className?: string;
	classes?: {
		tag?: string;
	};
} & BlogNavTagItem): React.ReactNode {
	const handleClickTag = () => {
		onClickTag(label);
	};
	return (
		<li
			className={cn('sds:inline-block sds:cursor-pointer', className)}
			onClick={handleClickTag}>
			<span
				className={cn(
					'sds:group sds:text-accent-foreground sds:hover:text-primary sds:font-medium sds:transition-colors sds:relative',
					classes?.tag,
				)}>
				{label}
				<span className='sds:bg-primary sds:absolute sds:-bottom-1 sds:left-0 sds:h-0.5 sds:w-full sds:origin-left sds:scale-x-0 sds:rounded sds:transition-transform  sds:group-hover:scale-x-100' />
			</span>
		</li>
	);
}

function BlogNavTagsList({
	className,
	...props
}: React.ComponentProps<'ul'>): React.ReactNode {
	return (
		<ul
			className={cn(
				'sds:flex sds:h-full sds:flex-wrap sds:items-center sds:justify-center sds:gap-8',
				className,
			)}
			{...props}
		/>
	);
}

function BlogNavTags({
	className,
	...props
}: React.ComponentProps<'nav'>): React.ReactNode {
	return (
		<nav
			className={cn(
				'sds:border-accent-foreground sds:w-full sds:border-y sds:py-4',
				className,
			)}
			{...props}
		/>
	);
}

export { TagMenuItem, BlogNavTagsList, BlogNavTags };
