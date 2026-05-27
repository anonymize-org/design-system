'use server';

import { createHighlighter, type Highlighter } from 'shiki';

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

export async function highlightCode(
	code: string,
	extension: string,
): Promise<string> {
	try {
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

		const highlightedHtml = highlighter.codeToHtml(code, {
			lang: highlighter.getLoadedLanguages().includes(extension)
				? extension
				: 'text',
			theme: 'github-dark',
		});

		return highlightedHtml;
	} catch (err) {
		console.error('Shiki highlight error:', err);
		return '';
	}
}
