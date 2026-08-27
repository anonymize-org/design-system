import { useEffect, useState } from 'react';
import { optionalDependencyError } from '../utils/optional-dependency';

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
					setError(optionalDependencyError('mammoth', err).message);
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
