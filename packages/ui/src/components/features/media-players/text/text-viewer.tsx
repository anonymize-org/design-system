import TextLineNumberList from '@/components/elements/media-payers/text/text-line-number-list';
import { useTextFileContent } from './use-text-content';
import {
	TextLineContentPre,
	TextLineContentCount,
} from '@/components/elements/media-payers/text/text-file-content';
import { cn } from '@/lib/utils';
import { FileErrorFallback } from '@/components/elements/media-payers/shared/file-error-fallback';
import SpinnerLoader from '@/components/loader/spinner';

interface TextFileViewerProps {
	file: File;
	className?: string;
	classes?: {
		lineNumbers?: string;
		contentCount?: string;
		content?: string;
	};
	fallback?: React.ReactNode;
}

function TextFileViewer({
	file,
	className,
	classes,
	fallback,
}: TextFileViewerProps): React.ReactNode {
	const { text, linesCount, lines, error } = useTextFileContent(file);

	if (error) {
		return fallback ?? <FileErrorFallback />;
	}

	return (
		<div className={cn('sds:flex', className)}>
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
		</div>
	);
}

export default TextFileViewer;
