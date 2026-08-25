import { useEffect, useState } from 'react';
import { useTextFileContent } from '../hooks/use-text-content';
import { getFileExtension } from '../utils/file';
import { optionalDependencyError } from '../utils/optional-dependency';

let shikiPromise: Promise<import('shiki').Highlighter> | null = null;

async function getShikiInstance() {
	if (!shikiPromise) {
		const { createHighlighter } = await import('shiki');
		shikiPromise = createHighlighter({
			themes: ['github-dark'],
			langs: [],
		});
	}
	return shikiPromise;
}

function useCodeFileViewer(file: File) {
	const { text, error: textError } = useTextFileContent(file);
	const [html, setHtml] = useState<string>('');
	const [isHighlighting, setIsHighlighting] = useState(false);
	const [highlightError, setHighlightError] = useState<Error | null>(null);

	const extension = getFileExtension(file.name).toLowerCase();

	useEffect(() => {
		let cancelled = false;

		async function highlight() {
			if (text === null) return;
			if (!text) {
				setHtml('');
				return;
			}

			try {
				setIsHighlighting(true);
				setHighlightError(null);
				const highlighter = await getShikiInstance();
				const loadedLanguages = highlighter.getLoadedLanguages();

				if (!loadedLanguages.includes(extension)) {
					await highlighter
						.loadLanguage(extension as import('shiki').BundledLanguage)
						.catch(() => {
							console.warn(`Language not supported by Shiki: ${extension}`);
						});
				}

				const highlightedHtml = highlighter.codeToHtml(text, {
					lang: highlighter.getLoadedLanguages().includes(extension)
						? extension
						: 'text',
					theme: 'github-dark',
				});

				if (!cancelled) {
					setHtml(highlightedHtml);
				}
			} catch (err) {
				if (!cancelled) {
					setHtml('');
					setHighlightError(optionalDependencyError('shiki', err));
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
		error: textError ?? highlightError,
		isHighlighting,
		isLoading: text === null || isHighlighting,
	};
}

export { useCodeFileViewer };
