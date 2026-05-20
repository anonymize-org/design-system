const LOCALE_META = {
	en: { flag: '🇬🇧', label: 'English' },
	fr: { flag: '🇫🇷', label: 'Français' },
	us: { flag: '🇺🇸', label: 'English (US)' },
	es: { flag: '🇪🇸', label: 'Español' },
	it: { flag: '🇮🇹', label: 'Italiano' },
	de: { flag: '🇩🇪', label: 'Deutsch' },
	pt: { flag: '🇵🇹', label: 'Português' },
} as const;

type LocaleMetaKey = keyof typeof LOCALE_META;

const FALL_BACK_LOCALE_META = { flag: '🌐', label: 'Unknown' };

const fallBackDefaultLocale: LocaleMetaKey = 'en';

export {
	LOCALE_META,
	fallBackDefaultLocale,
	FALL_BACK_LOCALE_META,
	type LocaleMetaKey,
};
