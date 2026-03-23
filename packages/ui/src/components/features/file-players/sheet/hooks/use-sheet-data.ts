import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

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

				const workbook = XLSX.read(buffer, {
					type: 'array',
				});

				const firstSheetName = workbook.SheetNames[0];
				const sheet = workbook.Sheets[firstSheetName];

				const json = XLSX.utils.sheet_to_json(sheet, {
					header: 1,
					defval: '',
				}) as SheetData;

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
