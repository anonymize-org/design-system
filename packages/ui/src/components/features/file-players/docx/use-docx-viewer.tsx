import { useEffect, useState } from 'react';
import { convertDocxToHtml } from '@/server-actions/docx-converter';

const useDocxViewer = (file: File) => {
	const [html, setHtml] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		let isMounted = true;

		async function fetchAndConvert() {
			setHtml(null);
			setError(null);

			try {
				const src = URL.createObjectURL(file);
				const response = await fetch(src);

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const buffer = await response.arrayBuffer();
				const result = await convertDocxToHtml(buffer);

				if (isMounted) {
					setHtml(result);
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
	}, [file]);

	return { html, error, isLoading };
};

export { useDocxViewer };
