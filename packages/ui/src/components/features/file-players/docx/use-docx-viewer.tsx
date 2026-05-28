import { useEffect, useState } from 'react';

const useDocxViewer = (file: File) => {
	const [html, setHtml] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		let isMounted = true;

		async function convert() {
			setIsLoading(true);
			setHtml(null);
			setError(null);

			try {
				const buffer = await file.arrayBuffer();
				const mammoth = await import('mammoth');
				const result = await mammoth.convertToHtml({ arrayBuffer: buffer });

				if (isMounted) {
					setHtml(result.value);
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

		convert();

		return () => {
			isMounted = false;
		};
	}, [file]);

	return { html, error, isLoading };
};

export { useDocxViewer };
