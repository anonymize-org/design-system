import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const TitleVariants = cva(
	'sds:font-heading sds:max-w-3xl sds:text-4xl sds:font-bold sds:tracking-tight sds:text-balance md:sds:text-5xl',
	{
		variants: {
			variant: {
				default: 'sds:text-foreground',
				gradient:
					'sds:bg-gradient-to-r sds:from-primary sds:via-emerald-600 sds:to-emerald-500 sds:bg-clip-text sds:text-transparent',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

export type BlogHeadingTitleVariant = VariantProps<
	typeof TitleVariants
>['variant'];

function BlogHeadingTitle({
	className,
	variant,
	...props
}: React.ComponentPropsWithoutRef<'h1'> & {
	variant?: BlogHeadingTitleVariant;
}) {
	return (
		<h1 className={cn(TitleVariants({ variant }), className)} {...props} />
	);
}

function BlogHeadingDescription({
	className,
	...props
}: React.ComponentPropsWithoutRef<'p'>): React.ReactNode {
	return (
		<p
			className={cn(
				'sds:text-muted-foreground sds:inline-block sds:max-w-2xl sds:text-center sds:text-lg sds:text-pretty',
				className,
			)}
			{...props}
		/>
	);
}

export { BlogHeadingTitle, BlogHeadingDescription };
