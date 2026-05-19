import { useEffect, useState } from 'react';

const useTextFileContent = (file: File) => {
	const [text, setText] = useState<string | null>(null);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		let cancelled = false;

		setText(null);
		setError(null);

		file
			.text()
			.then((content) => {
				if (!cancelled) setText(content);
			})
			.catch((err) => {
				if (!cancelled) setError(err);
			});

		return () => {
			cancelled = true;
		};
	}, [file]);

	const lines = text?.split('\n');
	const linesCount = lines?.length ?? null;

	return { text, lines, linesCount, error };
};

export { useTextFileContent };
