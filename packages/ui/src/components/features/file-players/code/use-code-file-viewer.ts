import { useEffect, useState } from 'react';
import { useTextFileContent } from '../hooks/use-text-content';
import { getFileExtension } from '../utils/file';

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
	const { text, error } = useTextFileContent(file);
	const [html, setHtml] = useState<string>('');
	const [isHighlighting, setIsHighlighting] = useState(false);

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

				// 1. Récupère l'instance Shiki côté client
				const highlighter = await getShikiInstance();
				const loadedLanguages = highlighter.getLoadedLanguages();

				// 2. Charge le langage dynamiquement si pas déjà présent
				if (!loadedLanguages.includes(extension)) {
					await highlighter
						.loadLanguage(extension as import('shiki').BundledLanguage)
						.catch(() => {
							console.warn(`Language not supported by Shiki: ${extension}`);
						});
				}

				// 3. Génère le HTML colorisé directement dans le navigateur
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
