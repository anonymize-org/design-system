import React from 'react';
import { useFullScreen, useImageZoom } from './use-dialog-file-controls';
import { useMediaKind } from '../../hooks/use-media-kind';
import { useFileUrl } from '@/components/features/media-players/hooks/use-file-url';
import { toHuman } from '@/components/features/media-players/utils/file';
import { MediaKind } from '../../helpers/file-types';
import { VideoPlayer } from '@/components/features/media-players/video-player/video-media-payer';
import { AudioPlayer } from '@/components/features/media-players/audio-player/audio-media-payer';
import SpinnerLoader from '@/components/loader/spinner';
import PDFFileViewer from '@/components/features/media-players/pdf/pdf-file-viewer';
import ImageFileViewer from '@/components/features/media-players/image/image-viewer';
import { CodeFileViewer } from '@/components/features/media-players/code/code-file-viewer';
import TextFileViewer from '@/components/features/media-players/text/text-viewer';
import { DocxViewer } from '@/components/features/media-players/docx/docx-viewer';
import { ArchiveFileViewer } from '@/components/features/media-players/archive/archive-file-viewer';
import { SheetFileViewer } from '@/components/features/media-players/sheet/sheet-file-viewer';
import {
	UnknownFileFallback,
	UnsupportedFileFallback,
} from '@/components/elements/media-payers/shared/file-alert-fallback';

interface UseFilePlayerModalParams {
	file: File;
	onDownload?: () => void;
}

const useFileViewerDialog = ({
	file,
	onDownload,
}: UseFilePlayerModalParams) => {
	const { fullScreen, toggleFullScreen } = useFullScreen();
	const { zoom, handleZoomIn, handleZoomOut, resetZoom } = useImageZoom();
	const fileUrl = useFileUrl(file);
	const mediaKind = useMediaKind(file);

	const fileName = file.name;
	const fileSize = toHuman(file.size);
	const type = file.type;

	const showImageControls = mediaKind === 'image';
	const showDownloadButton = Boolean(onDownload);
	const showsUnknownFallback =
		mediaKind === 'presentation' || mediaKind === 'unknown';
	const showFullScreenButton =
		mediaKind !== 'video' &&
		mediaKind !== 'archive' &&
		mediaKind !== 'code' &&
		!showsUnknownFallback;
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

		const filePlayerComponents: Record<MediaKind, React.ReactNode> = {
			video: (
				<VideoPlayer fileUrl={fileUrl} fileName={fileName} fileType={type} />
			),
			audio: (
				<AudioPlayer
					fileUrl={fileUrl}
					fileName={fileName}
					fileType={type}
					fullScreen={isFullScreen}
				/>
			),
			pdf: (
				<PDFFileViewer
					fileUrl={fileUrl}
					fileName={fileName}
					fullScreen={isFullScreen}
				/>
			),
			image: (
				<ImageFileViewer
					fileUrl={fileUrl}
					zoom={zoom}
					sizeMode={isFullScreen ? 'full' : 'medium'}
				/>
			),
			code: <CodeFileViewer file={file} />,
			text: <TextFileViewer file={file} fullScreen={isFullScreen} />,
			docx: <DocxViewer file={file} />,
			archive: <ArchiveFileViewer fileName={fileName} fileSize={fileSize} />,
			csv: <SheetFileViewer file={file} />,
			json: <TextFileViewer file={file} fullScreen={isFullScreen} />,
			spreadsheet: <SheetFileViewer file={file} />,
			presentation: <UnsupportedFileFallback />,
			unknown: <UnknownFileFallback />,
		};
		return filePlayerComponents[mediaKind] || <UnknownFileFallback />;
	};

	return {
		fullScreen,
		toggleFullScreen: handleFullScreenToggle,
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
	};
};

export { useFileViewerDialog };
