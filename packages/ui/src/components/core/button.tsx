import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
	'sds:inline-flex sds:items-center sds:justify-center sds:gap-2 sds:whitespace-nowrap sds:rounded-md sds:text-sm sds:font-medium sds:transition-all sds:disabled:pointer-events-none sds:disabled:opacity-50 sds:[&_svg]:pointer-events-none sds:[&_svg:not([class*=size-])]:size-4 sds:shrink-0 sds:[&_svg]:shrink-0 sds:outline-none sds:focus-visible:border-ring sds:focus-visible:ring-ring/50 sds:focus-visible:ring-[3px] sds:aria-invalid:ring-destructive/20 sds:dark:aria-invalid:ring-destructive/40 sds:aria-invalid:border-destructive',
	{
		variants: {
			variant: {
				default:
					'sds:bg-primary sds:text-primary-foreground sds:shadow-xs sds:hover:bg-primary/90',
				destructive:
					'sds:bg-destructive sds:text-white sds:shadow-xs sds:hover:bg-destructive/90 sds:focus-visible:ring-destructive/20 sds:dark:focus-visible:ring-destructive/40 sds:dark:bg-destructive/60',
				outline:
					'sds:border sds:bg-background sds:shadow-xs sds:hover:bg-accent sds:hover:text-accent-foreground sds:dark:bg-input/30 sds:dark:border-input sds:dark:hover:bg-input/50',
				secondary:
					'sds:bg-secondary sds:text-secondary-foreground sds:shadow-xs sds:hover:bg-secondary/80',
				ghost:
					'sds:hover:bg-accent sds:hover:text-accent-foreground sds:dark:hover:bg-accent/50',
				link: 'sds:text-primary sds:underline-offset-4 sds:hover:underline',
			},
			size: {
				default: 'sds:h-9 sds:px-4 sds:py-2 sds:has-[>svg]:px-3',
				sm: 'sds:h-8 sds:rounded-md sds:gap-1.5 sds:px-3 sds:has-[>svg]:px-2.5',
				lg: 'sds:h-10 sds:rounded-md sds:px-6 sds:has-[>svg]:px-4',
				icon: 'sds:size-9',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

function Button({
	className,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<'button'> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : 'button';

	return (
		<Comp
			data-slot='button'
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
