type ColorKey =
	| 'blue'
	| 'emerald'
	| 'red'
	| 'orange'
	| 'purple'
	| 'pink'
	| 'indigo'
	| 'rose'
	| 'cyan'
	| 'violet'
	| 'slate'
	| 'amber';

const EXTENSION_THEMES: Record<string, ColorKey> = {
	// --- DOCUMENTS (Blue) ---
	doc: 'blue',
	docx: 'blue',
	pdf: 'red',
	odt: 'blue',
	rtf: 'slate',
	txt: 'slate',

	// --- DATA & SPREADSHEETS (Green) ---
	xls: 'emerald',
	xlsx: 'emerald',
	csv: 'emerald',
	ods: 'emerald',
	json: 'amber',

	// --- PRESENTATIONS (Orange) ---
	ppt: 'orange',
	pptx: 'orange',
	key: 'orange',

	// --- IMAGES & DESIGN (Purple/Pink) ---
	png: 'purple',
	jpg: 'purple',
	jpeg: 'purple',
	svg: 'pink',
	gif: 'purple',
	psd: 'indigo',
	ai: 'orange',

	// --- VIDEO (Rose/Red) ---
	mp4: 'rose',
	mov: 'rose',
	avi: 'rose',
	mkv: 'rose',

	// --- AUDIO (Cyan) ---
	mp3: 'cyan',
	wav: 'cyan',
	aac: 'cyan',

	// --- CODE (Violet/Indigo) ---
	js: 'violet',
	ts: 'violet',
	py: 'blue',
	php: 'indigo',
	html: 'orange',
	css: 'blue',

	// --- ARCHIVES (Amber) ---
	zip: 'amber',
	rar: 'amber',
	tgz: 'amber',
	dmg: 'slate',
	iso: 'slate',
};

const classes: Record<ColorKey, string> = {
	blue: 'sds:border-blue-400 sds:text-blue-700 dark:sds:border-blue-500/30 dark:sds:text-blue-400',
	emerald:
		'sds:border-emerald-400 sds:text-emerald-700 dark:sds:border-emerald-500/30 dark:sds:text-emerald-400',
	red: 'sds:border-red-400 sds:text-red-700 dark:sds:border-red-500/30 dark:sds:text-red-400',
	orange:
		'sds:border-orange-400 sds:text-orange-700 dark:sds:border-orange-500/30 dark:sds:text-orange-400',
	purple:
		'sds:border-purple-400  sds:text-purple-700 dark:sds:border-purple-500/30 dark:sds:text-purple-400',
	pink: 'sds:border-pink-400 sds:text-pink-700 dark:sds:border-pink-500/30 dark:sds:text-pink-400',
	indigo:
		'sds:border-indigo-400 sds:text-indigo-700 dark:sds:border-indigo-500/30 dark:sds:text-indigo-400',
	rose: 'sds:border-rose-400 sds:text-rose-700 dark:sds:border-rose-500/30 dark:sds:text-rose-400',
	cyan: 'sds:border-cyan-400 sds:text-cyan-700 dark:sds:border-cyan-500/30 dark:sds:text-cyan-400',
	violet:
		'sds:border-violet-400 sds:text-violet-700 dark:sds:border-violet-500/30 dark:sds:text-violet-400',
	slate:
		'sds:border-slate-400 sds:text-slate-700 dark:sds:border-slate-500/30 dark:sds:text-slate-400',
	amber:
		'sds:border-amber-400 sds:text-amber-700 dark:sds:border-amber-500/30 dark:sds:text-amber-400',
};

const getColorByExtension = (input: string) => {
	if (!input) return 'slate';
	const ext = input.includes('.')
		? input.split('.').pop()!.toLowerCase()
		: input.toLowerCase();
	return EXTENSION_THEMES[ext] || 'slate';
};

const getTailwindClass = (ext: string) => {
	const theme = getColorByExtension(ext);
	return classes[theme] || 'sds:border-slate-400 sds:text-slate-600';
};
export { getColorByExtension, classes, getTailwindClass };
