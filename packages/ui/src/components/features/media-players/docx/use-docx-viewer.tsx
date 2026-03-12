import { useEffect, useState } from 'react';
import type Mammoth from 'mammoth';

const useDocxViewer = (src: string) => {
	const [html, setHtml] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		let isMounted = true;

		async function fetchAndConvert() {
			setHtml(null);
			setError(null);

			try {
				const response = await fetch(src);
				const mammoth = (await import('mammoth')) as typeof Mammoth;

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const buffer = await response.arrayBuffer();
				const result = await mammoth.convertToHtml({ arrayBuffer: buffer });

				if (isMounted) {
					setHtml(result.value);
					setIsLoading(false);
				}
			} catch (err) {
				if (isMounted) {
					setError(
						err instanceof Error ? err.message : 'Failed to load document',
					);
					setHtml(null);
				}
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		}

		fetchAndConvert();

		return () => {
			isMounted = false;
		};
	}, [src]);

	return { html, error, isLoading };
};

export { useDocxViewer };
