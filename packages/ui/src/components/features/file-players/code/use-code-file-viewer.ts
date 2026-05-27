import { useEffect, useState } from 'react';

import { useTextFileContent } from '../hooks/use-text-content';
import { getFileExtension } from '../utils/file';
import { highlightCode } from '@/server-actions/code-highlighter';

function useCodeFileViewer(file: File) {
	const { text, error } = useTextFileContent(file);
	const [html, setHtml] = useState<string>('');
	const [isHighlighting, setIsHighlighting] = useState(false);

	const extension = getFileExtension(file.name).toLowerCase();

	useEffect(() => {
		let cancelled = false;

		async function highlight() {
			if (text === null) {
				return;
			}

			if (!text) {
				setHtml('');
				return;
			}

			try {
				setIsHighlighting(true);
				const highlightedHtml = await highlightCode(text, extension);

				if (!cancelled) {
					setHtml(highlightedHtml);
				}
			} catch (err) {
				if (!cancelled) {
					setHtml('');
				}
				console.error('Shiki highlight error:', err);
			} finally {
				if (!cancelled) {
					setIsHighlighting(false);
				}
			}
		}

		highlight();

		return () => {
			cancelled = true;
		};
	}, [text, extension]);

	return {
		html,
		error,
		isHighlighting,
		isLoading: text === null || isHighlighting,
	};
}

export { useCodeFileViewer };
