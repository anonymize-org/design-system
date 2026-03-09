'use client';

import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { Accordion as AccordionPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils';

function Accordion({
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
	return <AccordionPrimitive.Root data-slot='accordion' {...props} />;
}

function AccordionItem({
	className,
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
	return (
		<AccordionPrimitive.Item
			data-slot='accordion-item'
			className={cn('sds:border-b sds:last:border-b-0', className)}
			{...props}
		/>
	);
}

function AccordionTrigger({
	className,
	children,
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
	return (
		<AccordionPrimitive.Header className='sds:flex'>
			<AccordionPrimitive.Trigger
				data-slot='accordion-trigger'
				className={cn(
					'sds:flex sds:flex-1 sds:items-start sds:justify-between sds:gap-4 sds:rounded-md sds:py-4 sds:text-left sds:text-sm sds:font-medium sds:transition-all sds:outline-none sds:hover:underline sds:focus-visible:border-ring sds:focus-visible:ring-[3px] sds:focus-visible:ring-ring/50 sds:disabled:pointer-events-none sds:disabled:opacity-50 sds:[&[data-state=open]>svg]:rotate-180',
					className,
				)}
				{...props}>
				{children}
				<ChevronDownIcon className='sds:pointer-events-none sds:size-4 sds:shrink-0 sds:translate-y-0.5 sds:text-muted-foreground sds:transition-transform sds:duration-200' />
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	);
}

function AccordionContent({
	className,
	children,
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
	return (
		<AccordionPrimitive.Content
			data-slot='accordion-content'
			className='sds:overflow-hidden sds:text-sm sds:data-[state=closed]:animate-accordion-up sds:data-[state=open]:animate-accordion-down'
			{...props}>
			<div className={cn('sds:pt-0 sds:pb-4', className)}>{children}</div>
		</AccordionPrimitive.Content>
	);
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
