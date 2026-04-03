import { Card, CardContent, CardHeader } from '@/components/core/card';
import { cn } from '@/lib/utils';

function TagCard({
	tag,
	className,
}: {
	tag: string;
	className?: string;
}): React.ReactNode {
	return (
		<span
			className={cn(
				'sds:absolute sds:top-2 sds:right-2 sds:z-10 sds:max-w-56 sds:truncate sds:rounded sds:bg-black/50 sds:px-2 sds:py-1 sds:text-xs sds:font-semibold sds:text-white sds:backdrop-blur-md',
				className,
			)}>
			{tag}
		</span>
	);
}

function BlogPostCardWrapper({
	children,
}: {
	children: React.ReactNode;
}): React.ReactNode {
	return <div className='sds:relative'>{children}</div>;
}

function BlogPostCardContainer({
	className,
	...cardProps
}: React.ComponentProps<typeof Card>) {
	return (
		<Card
			className={cn(
				'sds:flex sds:w-72 sds:flex-col sds:overflow-hidden sds:p-0',
				className,
			)}
			{...cardProps}
		/>
	);
}

function BlogPostCardHeader({
	className,
	classes,
	src,
	width = 288,
	height = 256,
}: {
	className?: string;
	classes?: {
		img?: string;
	};
	src: string;
	width?: number;
	height?: number;
}): React.ReactNode {
	return (
		<CardHeader className={cn('sds:rounded-t sds:p-0', className)}>
			<img
				alt='/Blog post image'
				className={cn(
					'sds:h-60 sds:w-full sds:rounded-t sds:object-cover',
					classes?.img,
				)}
				height={height}
				src={src}
				width={width}
			/>
		</CardHeader>
	);
}

function BlogPostCardBottom({
	className,
	children,
}: {
	className?: string;
	children?: React.ReactNode;
}) {
	return (
		<div
			className={cn(
				'sds:bg-accent sds:h-10 sds:w-full sds:border-t sds:py-2 sds:text-center',
				className,
			)}>
			{children}
		</div>
	);
}

function BlogPostCardContent({
	className,
	...contentProps
}: React.ComponentProps<typeof CardContent>) {
	return (
		<CardContent className={cn('sds:px-4', className)} {...contentProps} />
	);
}

function BlogPostCardBody({
	title,
	description,
	text,
	className,
	classes,
}: {
	title: string;
	description: string;
	text: string;
	className?: string;
	classes?: {
		title?: string;
		description?: string;
		text?: string;
	};
}) {
	return (
		<div className={className}>
			<h5
				className={cn(
					'sds:line-clamp-3 sds:text-center sds:leading-5 sds:font-bold sds:sm:text-lg',
					classes?.title,
				)}>
				{title}
			</h5>
			<div
				className={cn(
					'sds:mt-1 sds:truncate sds:text-center sds:text-xs sds:text-zinc-600 sds:italic',
					classes?.description,
				)}>
				{description}
			</div>
			<div
				className={cn(
					'sds:text-muted-foreground sds:mt-2 sds:line-clamp-2 sds:text-center sds:text-sm',
					classes?.text,
				)}>
				{text}
			</div>
		</div>
	);
}

export {
	TagCard,
	BlogPostCardWrapper,
	BlogPostCardContainer,
	BlogPostCardHeader,
	BlogPostCardBottom,
	BlogPostCardContent,
	BlogPostCardBody,
};
