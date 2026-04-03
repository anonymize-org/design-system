import * as React from 'react';

import { cn } from '@/lib/utils';

function Card({
	className,
	size = 'default',
	...props
}: React.ComponentProps<'div'> & { size?: 'default' | 'sm' }) {
	return (
		<div
			data-slot='card'
			data-size={size}
			className={cn(
				'sds:group/card sds:flex sds:flex-col sds:gap-4 sds:overflow-hidden sds:rounded-xl sds:bg-card sds:py-4 sds:text-sm sds:text-card-foreground sds:ring-1 sds:ring-foreground/10 sds:has-data-[slot=card-footer]:pb-0 sds:has-[>img:first-child]:pt-0 sds:data-[size=sm]:gap-3 sds:data-[size=sm]:py-3 sds:data-[size=sm]:has-data-[slot=card-footer]:pb-0 sds:*:[img:first-child]:rounded-t-xl sds:*:[img:last-child]:rounded-b-xl',
				className,
			)}
			{...props}
		/>
	);
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='card-header'
			className={cn(
				'sds:group/card-header sds:@container/card-header sds:grid sds:auto-rows-min sds:items-start sds:gap-1 sds:rounded-t-xl sds:px-4 sds:group-data-[size=sm]/card:sds:px-3 sds:has-data-[slot=card-action]:sds:grid-cols-[1fr_auto] sds:has-data-[slot=card-description]:sds:grid-rows-[auto_auto] sds:[.border-b]:sds:pb-4 sds:group-data-[size=sm]/card:[.border-b]:pb-3',
				className,
			)}
			{...props}
		/>
	);
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='card-title'
			className={cn(
				'sds:group/card-title sds:cn-font-heading sds:text-base sds:leading-snug sds:font-medium sds:group-data-[size=sm]/card:text-sm',
				className,
			)}
			{...props}
		/>
	);
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='card-description'
			className={cn(
				'sds:group/card-description sds:text-sm sds:text-muted-foreground',
				className,
			)}
			{...props}
		/>
	);
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='card-action'
			className={cn(
				'sds:group/card-action sds:col-start-2 sds:row-span-2 sds:row-start-1 sds:self-start sds:justify-self-end',
				className,
			)}
			{...props}
		/>
	);
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='card-content'
			className={cn(
				'sds:group/card-content sds:px-4 sds:group-data-[size=sm]/card:px-3',
				className,
			)}
			{...props}
		/>
	);
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='card-footer'
			className={cn(
				'sds:group/card-footer sds:flex sds:items-center sds:rounded-b-xl sds:border-t sds:bg-muted/50 sds:p-4 sds:group-data-[size=sm]/card:p-3',
				className,
			)}
			{...props}
		/>
	);
}

export {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardAction,
	CardDescription,
	CardContent,
};
