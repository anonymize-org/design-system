import { useEffect, useState } from 'react';
import { parseSheetFile } from '@/server-actions/sheet-parser';

type SheetData = (string | number | boolean | null)[][];

export function useSheetData(file: File) {
	const [data, setData] = useState<SheetData | null>(null);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		let cancelled = false;

		setData(null);
		setError(null);

		async function parse() {
			try {
				const buffer = await file.arrayBuffer();
				const json = await parseSheetFile(buffer);

				if (!cancelled) setData(json);
			} catch (err) {
				if (!cancelled) setError(err as Error);
			}
		}

		parse();

		return () => {
			cancelled = true;
		};
	}, [file]);

	return { data, error };
}
