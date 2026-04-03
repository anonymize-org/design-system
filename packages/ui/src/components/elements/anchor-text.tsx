'use client';

import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const anchorVariants = cva(
	'sds:text-sm sds:font-bold sds:transition-all sds:hover:underline',
	{
		variants: {
			variant: {
				primary: 'sds:text-primary sds:hover:text-primary/80',
				secondary: 'sds:text-secondary sds:hover:text-secondary/80',
			},
		},
		defaultVariants: {
			variant: 'primary',
		},
	},
);

export const AnchorText = ({
	className,
	children,
	variant,
	...anchorProps
}: React.ComponentProps<'a'> & {
	variant?: VariantProps<typeof anchorVariants>['variant'];
}) => {
	return (
		<a className={cn(anchorVariants({ variant }), className)} {...anchorProps}>
			{children}
		</a>
	);
};
