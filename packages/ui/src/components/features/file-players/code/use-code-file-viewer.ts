import { useEffect, useState } from 'react';
import { useTextFileContent } from '../hooks/use-text-content';
import { getFileExtension } from '../utils/file';
import { optionalDependencyError } from '../utils/optional-dependency';

let shikiPromise: Promise<import('shiki').Highlighter> | null = null;

async function getShikiInstance() {
	if (!shikiPromise) {
		// The try/catch has to wrap the `import()` itself, not just the call site:
		// bundlers only treat an unresolvable dynamic import as optional when it is
		// guarded here. Without it Turbopack fails the consumer's build outright
		// ("Module not found: Can't resolve 'shiki'") instead of letting the viewer
		// surface a message at runtime.
		let createHighlighter: typeof import('shiki').createHighlighter;

		try {
			({ createHighlighter } = await import('shiki'));
		} catch (err) {
			throw optionalDependencyError('shiki', err);
		}

		// Cache the promise so concurrent callers share one highlighter, but drop it
		// again if it rejects: a cached rejection would make every later attempt fail
		// with the original error instead of retrying.
		shikiPromise = createHighlighter({
			themes: ['github-dark'],
			langs: [],
		}).catch((err: unknown) => {
			shikiPromise = null;
			throw err;
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
