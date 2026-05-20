'use client';

import {
	FullScreenDialog,
	FullScreenDialogBody,
	FullScreenDialogContent,
	FullScreenDialogHeader,
	FullScreenDialogTrigger,
} from '@/components/core/full-screen-dialog';

import { Separator } from '@/components/core/separator';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from '@/components/core/dialog';

import { DialogFileHeader, DialogFileHeaderSize } from './dialog-elements';
import { cn } from '@/lib/utils';

export interface FileViewerDialogUIProps {
	title?: string;
	description?: string;
	trigger?: React.ReactNode;
	children?: React.ReactNode;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	controlsElements?: React.ReactNode;
	classes?: {
		body?: string;
		content?: string;
		header?: string;
	};
}

function FileViewerDialogFullScreenUI({
	trigger,
	children,
	open,
	onOpenChange,
	title,
	description,
	controlsElements,
	classes,
}: FileViewerDialogUIProps) {
	return (
		<FullScreenDialog open={open} onOpenChange={onOpenChange}>
			{trigger ? (
				<FullScreenDialogTrigger asChild>{trigger}</FullScreenDialogTrigger>
			) : null}
			<FullScreenDialogContent className={classes?.content}>
				<FullScreenDialogHeader
					className={cn('sds:px-6 sds:py-4', classes?.header)}>
					<DialogFileHeader title={title} />
					{description && <DialogFileHeaderSize size={description} />}

					{controlsElements ? (
						<>
							{' '}
							<Separator className='sds:mb-2' />
							{controlsElements}
						</>
					) : null}
				</FullScreenDialogHeader>
				<FullScreenDialogBody className={cn('sds:bg-muted', classes?.body)}>
					{children}
				</FullScreenDialogBody>
			</FullScreenDialogContent>
		</FullScreenDialog>
	);
}

function FileViewerDialogUI({
	trigger,
	children,
	open,
	onOpenChange,
	title,
	description,
	controlsElements,
	classes,
}: FileViewerDialogUIProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			{trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
			<DialogContent
				className={cn(
					'sds:w-full sds:sm:max-w-lg sds:md:max-w-2xl',
					classes?.content,
				)}>
				<DialogHeader
					className={cn(
						'sds:px-4 sds:py-3 sds:text-left sds:sm:px-6 sds:sm:py-4',
						classes?.header,
					)}>
					<DialogFileHeader title={title} />
					{description && <DialogFileHeaderSize size={description} />}

					{controlsElements ? (
						<>
							<Separator className='sds:mb-2' />
							{controlsElements}
						</>
					) : null}
				</DialogHeader>

				<div
					className={cn(
						'sds:bg-muted/50 sds:max-h-[70vh] sds:w-full sds:max-w-2xl sds:overflow-hidden sds:rounded sds:p-2 sds:shadow-sm',
						classes?.body,
					)}>
					{children}
				</div>
			</DialogContent>
		</Dialog>
	);
}

export { FileViewerDialogUI, FileViewerDialogFullScreenUI };
