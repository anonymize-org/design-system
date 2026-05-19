import FileViewerFullScreenMode from '@/components/elements/full-screen-mode';

import {
	ControlsImageFile,
	DownloadButton,
} from '@/components/elements/file-view/dialog-file-viewer/dialog-controls';
import { Button } from '@/components/core/button';
import { Maximize } from 'lucide-react';

import { useFileViewerDialog } from './hooks/use-dialog-file-viewer';
import {
	FileViewerDialogFullScreenUI,
	FileViewerDialogUI,
	FileViewerDialogUIProps,
} from '@/components/elements/file-view/dialog-file-viewer/dialog-viewer-ui';
import { cn } from '@/index';

interface FileViewerDialogControlsProps {
	zoom: number;
	onZoomIn: () => void;
	onZoomOut: () => void;
	onDownload?: () => void;
	onToggleFullScreen: () => void;
	showImageControls: boolean;
	showDownloadButton: boolean;
	showFullScreenButton: boolean;
	className?: string;
}

function FileViewerDialogControls({
	zoom,
	onZoomIn,
	onZoomOut,
	onDownload,
	onToggleFullScreen,
	showImageControls,
	showDownloadButton,
	showFullScreenButton,
	className,
}: FileViewerDialogControlsProps): React.ReactNode {
	return (
		<div
			className={cn(
				'sds:ml-auto sds:flex sds:items-center sds:gap-2',
				className,
			)}>
			{showImageControls ? (
				<ControlsImageFile
					zoom={zoom}
					onZoomIn={onZoomIn}
					onZoomOut={onZoomOut}
				/>
			) : null}

			{showDownloadButton ? <DownloadButton onClick={onDownload} /> : null}

			{showFullScreenButton ? (
				<Button variant='outline' size='icon' onClick={onToggleFullScreen}>
					<Maximize />
				</Button>
			) : null}
		</div>
	);
}

interface FileContentDialogProps {
	file: File;
	open?: boolean;
	trigger?: React.ReactNode;
	onOpenChange?: (open: boolean) => void;
	onDownload?: () => void;
	variant?: 'dialog' | 'fullScreen';
	classes?: FileViewerDialogUIProps['classes'] & {
		controls?: string;
	};
}

function FileViewerDialogFullScreen({
	open,
	onOpenChange,
	file,
	onDownload,
	trigger,
	variant = 'dialog',
	classes,
}: FileContentDialogProps): React.ReactNode {
	const {
		fullScreen,
		toggleFullScreen,
		zoom,
		handleZoomIn,
		handleZoomOut,
		fileName,
		fileSize,
		showImageControls,
		showDownloadButton,
		showFullScreenButton,
		hasNoControls,
		filePlayerDispatcher,
	} = useFileViewerDialog({ file, onDownload });

	const controlsElements = hasNoControls ? null : (
		<FileViewerDialogControls
			zoom={zoom}
			onZoomIn={handleZoomIn}
			onZoomOut={handleZoomOut}
			onDownload={onDownload}
			onToggleFullScreen={toggleFullScreen}
			showImageControls={showImageControls}
			showDownloadButton={showDownloadButton}
			showFullScreenButton={showFullScreenButton}
			className={classes?.controls}
		/>
	);

	if (fullScreen) {
		return (
			<FileViewerFullScreenMode onClose={toggleFullScreen}>
				{filePlayerDispatcher({ isFullScreen: true })}
			</FileViewerFullScreenMode>
		);
	}

	if (variant === 'fullScreen') {
		return (
			<FileViewerDialogFullScreenUI
				trigger={trigger}
				open={open}
				onOpenChange={onOpenChange}
				title={fileName}
				description={fileSize}
				controlsElements={controlsElements}
				classes={classes}>
				<div className='sds:mx-auto sds:flex sds:h-full sds:w-full sds:justify-center sds:overflow-auto sds:lg:max-w-5xl'>
					{filePlayerDispatcher({ isFullScreen: false })}
				</div>
			</FileViewerDialogFullScreenUI>
		);
	}

	return (
		<FileViewerDialogUI
			trigger={trigger}
			open={open}
			onOpenChange={onOpenChange}
			title={fileName}
			description={fileSize}
			controlsElements={controlsElements}
			classes={classes}>
			<div className='sds:mx-auto sds:flex sds:h-full sds:w-full sds:justify-center sds:overflow-auto'>
				{filePlayerDispatcher({ isFullScreen: false })}
			</div>
		</FileViewerDialogUI>
	);
}

export { FileViewerDialogFullScreen };
