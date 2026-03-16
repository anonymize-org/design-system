import {
	ImageContentViewer,
	ImageViewerFrame,
	ImageViewerProps,
} from '@/components/elements/media-payers/image/image-viewer-elements';
import { useFileUrl } from '../hooks/use-file-url';
import SpinnerLoader from '@/components/loader/spinner';

function ImageFileViewer({
	file,
	sizeMode = 'medium',
	zoom = 100,
	classes,
}: {
	file: File;
	sizeMode?: ImageViewerProps['sizeMode'];
	zoom?: number;
	classes?: {
		frame?: string;
		content?: string;
	};
}): React.ReactNode {
	const fileUrl = useFileUrl(file);

	if (!fileUrl) {
		return <SpinnerLoader />;
	}

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
