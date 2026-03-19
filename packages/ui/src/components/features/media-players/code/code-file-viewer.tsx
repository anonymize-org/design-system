import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import SpinnerLoader from '@/components/loader/spinner';
import { ErrorFileFallback } from '@/components/elements/media-payers/shared/file-alert-fallback';
import { useTextFileContent } from '../hooks/use-text-content';
import { getFileExtension } from '../utils/file';

function CodeFileViewer({ file }: { file: File }) {
	const { text, error } = useTextFileContent(file);

	if (error) {
		return <ErrorFileFallback />;
	}

	if (!text) {
		return <SpinnerLoader />;
	}

	return (
		<SyntaxHighlighter
			showLineNumbers
			wrapLines
			wrapLongLines
			language={getFileExtension(file.name)}
			style={vscDarkPlus}>
			{text}
		</SyntaxHighlighter>
	);
}

export { CodeFileViewer };
