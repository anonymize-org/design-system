import { fileTypeFromBlob } from 'file-type';
import { getFileExtension } from '../../file-players/utils/file';

export const CODE_EXTENSIONS = new Set([
	'js',
	'ts',
	'jsx',
	'tsx',
	'py',
	'rb',
	'php',
	'java',
	'c',
	'cpp',
	'cs',
	'sh',
	'bash',
	'zsh',
	'yml',
	'yaml',
	'md',
	'sql',
	'json',
	'xml',
	'html',
	'css',
]);

function mapExtensionToMime(ext: string): string | null {
	switch (ext.toLowerCase()) {
		case 'csv':
			return 'text/csv';
		case 'json':
			return 'application/json';
		case 'xml':
			return 'application/xml';
		case 'txt':
			return 'text/plain';
		case 'html':
			return 'text/html';
		case 'css':
			return 'text/css';
		case 'svg':
			return 'image/svg+xml';
		case 'pdf':
			return 'application/pdf';
		case 'docx':
			return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
		case 'xlsx':
			return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
		case 'pptx':
			return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
		default:
			return null;
	}
}

export type MediaKind =
	| 'image'
	| 'video'
	| 'audio'
	| 'pdf'
	| 'text'
	| 'csv'
	| 'json'
	| 'docx'
	| 'spreadsheet'
	| 'presentation'
	| 'archive'
	| 'code'
	| 'unknown';

export interface MediaInfo {
	kind: MediaKind;
	mime: string | null;
	ext: string | null;
}

/**
 * Détecte le type de média à partir d’un fichier ou d’un nom de fichier.
 * - Si `file` est un File, on lit ses bytes pour détecter le vrai MIME.
 * - Si `file` est un string, on se base sur l’extension.
 */
export async function detectMediaType(file: File | string): Promise<MediaInfo> {
	let mime: string | null = null;
	let ext: string | null = null;

	if (typeof file === 'string') {
		ext = getFileExtension(file) || null;
		mime = null;
	} else {
		const detected = await fileTypeFromBlob(file);

		ext = detected?.ext ?? getFileExtension(file.name) ?? null;

		mime =
			detected?.mime ??
			(file.type && file.type !== 'application/octet-stream'
				? file.type
				: null);

		// SVG correction
		if (!detected && ext === 'svg') {
			mime = 'image/svg+xml';
		}

		// Text-based fallback
		if (!mime && ext) {
			mime = mapExtensionToMime(ext);
		}
	}

	const kind = classifyMime(mime, ext);

	return { kind, mime, ext };
}

/**
 * Classification du MIME en grandes catégories de médias.
 */
export function classifyMime(
	mime: string | null,
	ext: string | null,
): MediaKind {
	if (!mime) return 'unknown';

	if (ext && CODE_EXTENSIONS.has(ext)) return 'code';

	if (mime.startsWith('image/')) return 'image';
	if (mime.startsWith('video/')) return 'video';
	if (mime.startsWith('audio/')) return 'audio';

	if (mime === 'application/pdf') return 'pdf';

	if (mime.includes('json')) return 'json';
	if (mime.includes('csv')) return 'csv';

	if (mime.startsWith('text/')) return 'text';

	if (
		mime.includes(
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		) ||
		mime.includes('word')
	) {
		// render with mammoth
		return 'docx';
	}

	if (mime.includes('spreadsheet') || mime.includes('excel')) {
		// render with sheetjs
		return 'spreadsheet';
	}

	if (mime.includes('presentation') || mime.includes('powerpoint')) {
		// render with pptx2json + custom renderer
		return 'presentation';
	}

	if (
		mime.includes('zip') ||
		mime.includes('compressed') ||
		mime.includes('tar') ||
		mime.includes('gzip')
	) {
		return 'archive';
	}

	return 'unknown';
}
