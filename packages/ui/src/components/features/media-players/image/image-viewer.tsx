import {
	ImageContentViewer,
	ImageViewerFrame,
	ImageViewerProps,
} from '@/components/elements/media-payers/image/image-viewer-elements';

function ImageFileViewer({
	fileUrl,
	sizeMode = 'medium',
	zoom = 100,
	classes,
}: ImageViewerProps & {
	classes?: {
		frame?: string;
		content?: string;
	};
}): React.ReactNode {
	return (
		<ImageViewerFrame sizeMode={sizeMode} className={classes?.frame}>
			<ImageContentViewer
				fileUrl={fileUrl}
				zoom={zoom}
				className={classes?.content}
			/>
		</ImageViewerFrame>
	);
}

export default ImageFileViewer;
