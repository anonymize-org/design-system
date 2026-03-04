import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const titleVariants = cva('tracking-tight', {
	variants: {
		variant: {
			h1: 'sds:text-4xl font-bold lg:text-5xl',
			h2: 'sds:text-2xl font-semibold md:text-3xl',
			h3: 'sds:sm:text-2xl font-semibold sds:text-xl',
			h4: 'sds:text-xl font-semibold',
			h5: 'sds:text-lg font-medium',
		},
	},
	defaultVariants: {
		variant: 'h5',
	},
});

interface TitleProps {
	children: string | undefined;
	variant?: VariantProps<typeof titleVariants>['variant'];
}

function Title({
	variant,
	...props
}: React.ComponentProps<'span'> & TitleProps): React.JSX.Element {
	return (
		<span
			className={cn(titleVariants({ variant, className: props.className }))}
			{...props}>
			{props.children}
		</span>
	);
}

export { Title };
