import { useEffect, useState } from 'react';
import type { CellValue } from '@office-kit/xlsx/cell';
import { getFileExtension } from '../../utils/file';
import { optionalDependencyError } from '../../utils/optional-dependency';

type SheetCell = string | number | boolean | null;
type SheetData = SheetCell[][];

/**
 * Flatten a cell to something React can render. `CellValue` is a wider union
 * than a table cell can display — dates, rich text, formulas and error tokens
 * all arrive as objects — and an object reaching JSX throws rather than
 * rendering. Empty cells collapse to `''` so a sparse row still lines up with
 * its neighbours.
 */
function toDisplayCell(value: CellValue): SheetCell {
	if (value === null) return '';
	if (value instanceof Date) return value.toISOString();

	if (typeof value === 'object') {
		switch (value.kind) {
			case 'duration':
				return value.ms;
			case 'error':
				return value.code;
			case 'rich-text':
				return value.runs.map((run) => run.text).join('');
			case 'formula':
				return value.cachedValue ?? '';
		}
	}

	return value;
}

/**
 * CSV reaches this viewer too — `use-dialog-file-viewer.tsx` routes both the
 * `csv` and `spreadsheet` media kinds here. SheetJS sniffed the bytes and
 * handled CSV itself; `@office-kit/xlsx` is xlsx-only and rejects anything that
 * is not an OPC package, so the delimited case is parsed here instead. It also
 * means a CSV preview no longer pulls the spreadsheet library at all.
 */
function isDelimitedText(file: File): boolean {
	return (
		file.type.includes('csv') ||
		getFileExtension(file.name).toLowerCase() === 'csv'
	);
}

/**
 * RFC 4180 reader: honours quoted fields containing delimiters, newlines and
 * doubled quotes, and accepts LF or CRLF. Values stay strings — no numeric
 * coercion — so identifiers keep any leading zeros.
 */
function parseDelimitedText(text: string): SheetData {
	const rows: SheetData = [];
	let row: SheetCell[] = [];
	let field = '';
	let quoted = false;

	for (let i = 0; i < text.length; i++) {
		const char = text[i];

		if (quoted) {
			if (char === '"') {
				if (text[i + 1] === '"') {
					field += '"';
					i++;
				} else {
					quoted = false;
				}
			} else {
				field += char;
			}
			continue;
		}

		if (char === '"') {
			quoted = true;
		} else if (char === ',') {
			row.push(field);
			field = '';
		} else if (char === '\n' || char === '\r') {
			// Swallow the LF of a CRLF pair so it does not open a second row.
			if (char === '\r' && text[i + 1] === '\n') i++;
			row.push(field);
			rows.push(row);
			row = [];
			field = '';
		} else {
			field += char;
		}
	}

	// Flush whatever the last line left behind, but not a bare trailing newline.
	if (field !== '' || row.length > 0) {
		row.push(field);
		rows.push(row);
	}

	// Pad short rows so every row matches the widest, mirroring the rectangular
	// shape `iterValues` returns for a worksheet.
	const width = rows.reduce((max, r) => Math.max(max, r.length), 0);
	for (const r of rows) {
		while (r.length < width) r.push('');
	}

	return rows;
}

export function useSheetData(file: File) {
	const [data, setData] = useState<SheetData | null>(null);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		let cancelled = false;

		setData(null);
		setError(null);

		async function parse() {
			try {
				if (isDelimitedText(file)) {
					const rows = parseDelimitedText(await file.text());
					if (!cancelled) setData(rows);
					return;
				}

				// `@office-kit/xlsx` has no root barrel: every export lives behind a
				// subpath, so the reader needs both the io and worksheet entries.
				const [{ fromArrayBuffer, loadWorkbook }, { iterValues }] =
					await Promise.all([
						import('@office-kit/xlsx/io'),
						import('@office-kit/xlsx/worksheet'),
					]);

				const buffer = await file.arrayBuffer();
				const workbook = await loadWorkbook(fromArrayBuffer(buffer));

				// A workbook's first sheet can be a chartsheet, which holds no cells.
				const first = workbook.sheets.find((sheet) => sheet.kind === 'worksheet');

				// `iterValues` walks the populated bounding box rectangularly, blank
				// rows included, so every row comes back the same length.
				const rows = first
					? [...iterValues(first.sheet)].map((row) => row.map(toDisplayCell))
					: [];

				if (!cancelled) setData(rows);
			} catch (err) {
				if (!cancelled)
					setError(optionalDependencyError('@office-kit/xlsx', err));
			}
		}

		parse();

		return () => {
			cancelled = true;
		};
	}, [file]);

	return { data, error };
}
