'use server';

import type Mammoth from 'mammoth';

export async function convertDocxToHtml(buffer: ArrayBuffer): Promise<string> {
	const mammoth = (await import('mammoth')) as typeof Mammoth;
	const result = await mammoth.convertToHtml({ arrayBuffer: buffer });
	return result.value;
}
