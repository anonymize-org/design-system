'use server';

import * as XLSX from 'xlsx';

type SheetData = (string | number | boolean | null)[][];

export async function parseSheetFile(buffer: ArrayBuffer): Promise<SheetData> {
	const workbook = XLSX.read(buffer, {
		type: 'array',
	});

	const firstSheetName = workbook.SheetNames[0];
	const sheet = workbook.Sheets[firstSheetName];

	const json = XLSX.utils.sheet_to_json(sheet, {
		header: 1,
		defval: '',
	}) as SheetData;

	return json;
}
