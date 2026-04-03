import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { AnchorText } from '../../anchor-text';
import { Separator } from '@/components/core/separator';

function BlogPostAnchorBody({
	title,
	imgSrc,
	classes,
}: {
	title: string;
	imgSrc: string;
	classes?: { img?: string; title?: string };
}) {
	return (
		<>
			<img
				width={300}
				height={75}
				loading='eager'
				alt='/'
				src={imgSrc}
				className={cn('sds:h-40 sds:rounded', classes?.img)}
			/>
			<div
				className={cn(
					'sds:mt-2 sds:text-center sds:text-xs sds:leading-3 sds:font-semibold',
					classes?.title,
				)}>
				{title}
			</div>
		</>
	);
}

function BlogPostAnchorRoot({
	href,
	className,
	children,
}: {
	href: string;
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<AnchorText
			className={cn(
				'sds:block sds:w-full sds:transform sds:px-2 sds:transition-all sds:duration-300 sds:hover:scale-105',
				className,
			)}
			href={href}>
			{children}
		</AnchorText>
	);
}

const AsideVariants = cva(
	'sds:hidden sds:h-fit sds:w-full sds:rounded-sm md:sds:flex',
	{
		variants: {
			variant: {
				primary:
					'sds:to-primary/15 sds:via-primary/10 sds:from-muted sds:bg-linear-to-b',
			},
		},
		defaultVariants: { variant: 'primary' },
	},
);

function AsideBlogPostAnchorUI({
	className,
	title,
	classes,
	children,
	variant,
}: {
	className?: string;
	title?: string;
	classes?: { title?: string };
	children?: React.ReactNode;
	variant?: VariantProps<typeof AsideVariants>['variant'];
}): React.ReactNode {
	return (
		<aside className={cn(AsideVariants({ variant }), className)}>
			{title && <h5 className={classes?.title}>{title}</h5>}
			{children}
		</aside>
	);
}

export type BlogPostAnchorType = {
	href: string;
	title: string;
	imgSrc: string;
};

interface BlogPostAnchorProps extends BlogPostAnchorType {
	className?: string;
	classes?: { img?: string; title?: string };
}

function BlogPostAnchor({
	href,
	title,
	imgSrc,
	className,
	classes,
}: BlogPostAnchorProps): React.ReactNode {
	return (
		<BlogPostAnchorRoot href={href} className={className}>
			<BlogPostAnchorBody title={title} imgSrc={imgSrc} classes={classes} />
			<Separator className='sds:bg-foreground/10 sds:my-4' />
		</BlogPostAnchorRoot>
	);
}

export { AsideBlogPostAnchorUI, BlogPostAnchor };
