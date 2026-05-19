'use client';

import * as React from 'react';
import { Dialog as DialogPrimitive } from 'radix-ui';
import { XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

function FullScreenDialog({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
	return <DialogPrimitive.Root data-slot='full-screen-dialog' {...props} />;
}

function FullScreenDialogTrigger({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
	return (
		<DialogPrimitive.Trigger
			data-slot='full-screen-dialog-trigger'
			{...props}
		/>
	);
}

function FullScreenDialogPortal({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
	return (
		<DialogPrimitive.Portal data-slot='full-screen-dialog-portal' {...props} />
	);
}

function FullScreenDialogClose({
	...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
	return (
		<DialogPrimitive.Close data-slot='full-screen-dialog-close' {...props} />
	);
}

function FullScreenDialogOverlay({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
	return (
		<DialogPrimitive.Overlay
			data-slot='full-screen-dialog-overlay'
			className={cn(
				'sds:data-[state=open]:animate-in sds:data-[state=closed]:animate-out sds:data-[state=closed]:fade-out-0 sds:data-[state=open]:fade-in-0 sds:fixed sds:inset-0 sds:z-50 sds:bg-black/80',
				className,
			)}
			{...props}
		/>
	);
}

function FullScreenDialogContent({
	className,
	children,
	showCloseButton = true,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
	showCloseButton?: boolean;
}) {
	return (
		<FullScreenDialogPortal>
			<FullScreenDialogOverlay />
			<DialogPrimitive.Content
				data-slot='full-screen-dialog-content'
				className={cn(
					'sds:bg-background sds:fixed sds:inset-0 sds:z-50 sds:flex sds:flex-col sds:overflow-auto',
					'sds:data-[state=open]:animate-in sds:data-[state=closed]:animate-out',
					'sds:data-[state=closed]:fade-out-0 sds:data-[state=open]:fade-in-0',
					'sds:data-[state=closed]:slide-out-to-bottom sds:data-[state=open]:slide-in-from-bottom',
					'sds:duration-300',
					className,
				)}
				{...props}>
				{children}
				{showCloseButton && (
					<DialogPrimitive.Close
						data-slot='full-screen-dialog-close'
						className='sds:ring-offset-background sds:focus:ring-ring sds:bg-foreground/10 sds:absolute sds:top-4 sds:right-4 sds:z-10 sds:rounded-full sds:p-2 sds:opacity-70 sds:transition-opacity sds:hover:opacity-100 sds:focus:ring-2 sds:focus:ring-offset-2 sds:focus:outline-hidden sds:disabled:pointer-events-none'>
						<XIcon className='sds:size-4' />
						<span className='sds:sr-only'>Close</span>
					</DialogPrimitive.Close>
				)}
			</DialogPrimitive.Content>
		</FullScreenDialogPortal>
	);
}

function FullScreenDialogHeader({
	className,
	...props
}: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='full-screen-dialog-header'
			className={cn(
				'sds:bg-background sds:sticky sds:top-0 sds:z-10 sds:flex sds:flex-col sds:gap-2 sds:border-b sds:p-6',
				className,
			)}
			{...props}
		/>
	);
}

function FullScreenDialogFooter({
	className,
	...props
}: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='full-screen-dialog-footer'
			className={cn(
				'sds:bg-background sds:sticky sds:bottom-0 sds:z-10 sds:flex sds:flex-col-reverse sds:gap-2 sds:border-t sds:p-6 sm:sds:flex-row sm:sds:justify-end',
				className,
			)}
			{...props}
		/>
	);
}

function FullScreenDialogBody({
	className,
	...props
}: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot='full-screen-dialog-body'
			className={cn('sds:flex-1 sds:overflow-auto sds:p-6', className)}
			{...props}
		/>
	);
}

function FullScreenDialogTitle({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
	return (
		<DialogPrimitive.Title
			data-slot='full-screen-dialog-title'
			className={cn(
				'sds:text-2xl sds:font-semibold sds:tracking-tight',
				className,
			)}
			{...props}
		/>
	);
}

function FullScreenDialogDescription({
	className,
	...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
	return (
		<DialogPrimitive.Description
			data-slot='full-screen-dialog-description'
			className={cn('sds:text-muted-foreground sds:text-sm', className)}
			{...props}
		/>
	);
}

export {
	FullScreenDialog,
	FullScreenDialogBody,
	FullScreenDialogClose,
	FullScreenDialogContent,
	FullScreenDialogDescription,
	FullScreenDialogFooter,
	FullScreenDialogHeader,
	FullScreenDialogOverlay,
	FullScreenDialogPortal,
	FullScreenDialogTitle,
	FullScreenDialogTrigger,
};
