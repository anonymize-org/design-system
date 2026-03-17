import FileViewerFullScreenMode from '@/components/elements/full-screen-mode';
import { toHuman } from '../../media-players/audio-player/utils/file';
import { useFullScreen, useImageZoom } from './hooks/use-dialog-file-controls';
import PDFFileViewer from '../../media-players/pdf/pdf-file-viewer';
import { FileViewerDialogFullScreenUI } from '@/components/elements/file-view/dialog-file-view/full-screen/full-screen-dialog-ui';
import {
	ControlsImageFile,
	DownloadButton,
} from '@/components/elements/file-view/dialog-file-view/file-view-dialog-controls';
import { Button } from '@/components/core/button';
import { Maximize } from 'lucide-react';
import { useMediaKind } from '../hooks/use-media-kind';
import { useFileUrl } from '../../media-players/hooks/use-file-url';
import SpinnerLoader from '@/components/loader/spinner';
import { VideoPlayer } from '../../media-players/video-player/video-media-payer';

import { AudioPlayer } from '../../media-players/audio-player/audio-media-payer';
import ImageFileViewer from '../../media-players/image/image-viewer';
import TextFileViewer from '../../media-players/text/text-viewer';
import { DocxViewer } from '../../media-players/docx/docx-viewer';

import { ArchiveFileViewer } from '../../media-players/archive/archive-file-viewer';
import { FileUnknownFallback } from '@/components/elements/media-payers/shared/file-unkown-fallback';

interface FileContentDialogProps {
	file: File;
	open?: boolean;
	trigger?: React.ReactNode;
	onOpenChange?: (open: boolean) => void;
	onDownload?: () => void;
}

function FileViewerDialogFullScreen({
	open,
	onOpenChange,
	file,
	onDownload,
	trigger,
}: FileContentDialogProps) {
	const { fullScreen, toggleFullScreen } = useFullScreen();
	const { zoom, handleZoomIn, handleZoomOut, resetZoom } = useImageZoom();
	const fileUrl = useFileUrl(file);
	const mediaKind = useMediaKind(file);

	const fileName = file.name;
	const fileSize = toHuman(file.size);
	const type = file.type;

	const showImageControls = mediaKind === 'image';
	const showDownloadButton = Boolean(onDownload);
	const showFullScreenButton = mediaKind !== 'video' && mediaKind !== 'archive';
	const hasNoControls =
		!showImageControls && !showDownloadButton && !showFullScreenButton;

	const handleFullScreenToggle = () => {
		if (mediaKind === 'image') {
			resetZoom();
		}
		toggleFullScreen();
	};

	const filePlayerDispatcher = ({
		isFullScreen,
	}: {
		isFullScreen: boolean;
	}) => {
		if (!fileUrl || !mediaKind) {
			return <SpinnerLoader />;
		}

		switch (mediaKind) {
			case 'video':
				return (
					<VideoPlayer fileUrl={fileUrl} fileName={fileName} fileType={type} />
				);
			case 'audio':
				return (
					<AudioPlayer
						fileUrl={fileUrl}
						fileName={fileName}
						fileType={type}
						fullScreen={isFullScreen}
					/>
				);
			case 'pdf':
				return (
					<PDFFileViewer
						fileUrl={fileUrl}
						fileName={fileName}
						fullScreen={isFullScreen}
					/>
				);
			case 'image':
				return (
					<ImageFileViewer
						fileUrl={fileUrl}
						zoom={zoom}
						sizeMode={isFullScreen ? 'full' : 'medium'}
					/>
				);
			case 'text':
				return <TextFileViewer file={file} fullScreen={isFullScreen} />;
			case 'docx':
				return <DocxViewer file={file} />;
			case 'archive':
				return <ArchiveFileViewer fileName={fileName} fileSize={fileSize} />;
			default:
				return <FileUnknownFallback className='sds:mx-auto' />;
		}
	};

	if (fullScreen) {
		return (
			<FileViewerFullScreenMode onClose={toggleFullScreen}>
				{filePlayerDispatcher({ isFullScreen: true })}
			</FileViewerFullScreenMode>
		);
	}

	return (
		<FileViewerDialogFullScreenUI
			trigger={trigger}
			open={open}
			onOpenChange={onOpenChange}
			title={fileName}
			description={fileSize}
			controlsElements={
				hasNoControls ? null : (
					<div className='ml-auto flex items-center gap-2'>
						{showImageControls && (
							<ControlsImageFile
								zoom={zoom}
								onZoomIn={handleZoomIn}
								onZoomOut={handleZoomOut}
							/>
						)}

						{showDownloadButton && <DownloadButton onClick={onDownload} />}

						{showFullScreenButton && (
							<Button
								variant='outline'
								size='icon'
								onClick={handleFullScreenToggle}>
								<Maximize />
							</Button>
						)}
					</div>
				)
			}>
			<div className='sds:mx-auto sds:flex sds:h-full sds:w-full sds:justify-center sds:overflow-auto sds:lg:max-w-5xl'>
				{filePlayerDispatcher({ isFullScreen: false })}
			</div>
		</FileViewerDialogFullScreenUI>
	);
}

export { FileViewerDialogFullScreen };
