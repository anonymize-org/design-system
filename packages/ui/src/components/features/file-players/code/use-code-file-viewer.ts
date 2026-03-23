import { useEffect, useState } from 'react';
import { createHighlighter, type Highlighter } from 'shiki';

import { useTextFileContent } from '../hooks/use-text-content';
import { getFileExtension } from '../utils/file';

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighterInstance() {
	if (!highlighterPromise) {
		highlighterPromise = createHighlighter({
			themes: ['github-dark'],
			langs: [],
		});
	}

	return highlighterPromise;
}

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
				const highlighter = await getHighlighterInstance();
				const loadedLanguages = highlighter.getLoadedLanguages();

				if (!loadedLanguages.includes(extension)) {
					const languageToLoad = extension as Parameters<
						Highlighter['loadLanguage']
					>[0];

					await highlighter.loadLanguage(languageToLoad).catch(() => {
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
