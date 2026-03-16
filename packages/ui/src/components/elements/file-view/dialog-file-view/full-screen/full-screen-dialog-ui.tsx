'use client';

import {
	FullScreenDialog,
	FullScreenDialogBody,
	FullScreenDialogContent,
	FullScreenDialogHeader,
	FullScreenDialogTrigger,
} from '@/components/core/full-screen-dialog';
import {
	DialogFileHeader,
	DialogFileHeaderSize,
} from './full-screen-dialog-elements';
import { Separator } from '@/components/core/separator';

interface FileContentDialogProps {
	title?: string;
	description?: string;
	trigger?: React.ReactNode;
	children?: React.ReactNode;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	controlsElements?: React.ReactNode;
}

function FileViewerDialogFullScreenUI({
	trigger,
	children,
	open,
	onOpenChange,
	title,
	description,
	controlsElements,
}: FileContentDialogProps) {
	return (
		<FullScreenDialog open={open} onOpenChange={onOpenChange}>
			{trigger ? (
				<FullScreenDialogTrigger asChild>{trigger}</FullScreenDialogTrigger>
			) : null}
			<FullScreenDialogContent>
				<FullScreenDialogHeader className='sds:px-6 sds:py-4'>
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
				<FullScreenDialogBody className='sds:bg-muted'>
					{children}
				</FullScreenDialogBody>
			</FullScreenDialogContent>
		</FullScreenDialog>
	);
}

export { FileViewerDialogFullScreenUI };
