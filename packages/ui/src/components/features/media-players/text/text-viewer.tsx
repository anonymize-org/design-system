import TextLineNumberList from '@/components/elements/media-payers/text/text-line-number-list';
import { useTextFileContent } from './use-text-content';
import {
	TextLineContentPre,
	TextLineContentCount,
	TextFileViewerFrame,
} from '@/components/elements/media-payers/text/text-file-content';

import SpinnerLoader from '@/components/loader/spinner';
import { ErrorFileFallback } from '@/components/elements/media-payers/shared/file-alert-fallback';

interface TextFileViewerProps {
	file: File;
	className?: string;
	classes?: {
		lineNumbers?: string;
		contentCount?: string;
		content?: string;
	};
	fallback?: React.ReactNode;
	fullScreen?: boolean;
}

function TextFileViewer({
	file,
	className,
	classes,
	fallback,
	fullScreen = false,
}: TextFileViewerProps): React.ReactNode {
	const { text, linesCount, lines, error } = useTextFileContent(file);

	if (error) {
		return fallback ?? <ErrorFileFallback />;
	}

	return (
		<TextFileViewerFrame className={className} fullScreen={fullScreen}>
			{lines && (
				<TextLineNumberList lines={lines} className={classes?.lineNumbers} />
			)}
			{text ? (
				<div>
					{linesCount !== null && (
						<TextLineContentCount
							linesCount={linesCount}
							className={classes?.contentCount}
						/>
					)}

					<TextLineContentPre content={text} className={classes?.content} />
				</div>
			) : (
				<SpinnerLoader />
			)}
		</TextFileViewerFrame>
	);
}

export default TextFileViewer;
