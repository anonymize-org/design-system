import { Button } from '@/components/core/button';
import {
	DialogLangFlagItem,
	DialogLanguageSelectorUI,
	DialogLanguageSelectorUIProps,
} from '@/components/elements/language-selector/dialog-elements';
import {
	fallBackDefaultLocale,
	FALL_BACK_LOCALE_META,
	LOCALE_META,
	type LocaleMetaKey,
} from './constants';
import { cn } from '@/lib/utils';
import React from 'react';

interface DialogLanguageSelectorProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	locales: LocaleMetaKey[];
	currentLocale?: LocaleMetaKey;
	onLocaleChange: (locale: LocaleMetaKey) => void;
	className?: string;
	classes?: DialogLanguageSelectorUIProps['classes'] & {
		item?: string;
	};
	size?: React.ComponentProps<typeof Button>['size'];
	variant?: React.ComponentProps<typeof Button>['variant'];
}

export function DialogLanguageSelector({
	open,
	onOpenChange,
	locales,
	currentLocale = fallBackDefaultLocale,
	onLocaleChange,
	className,
	classes,
	size = 'sm',
	variant = 'outline',
}: DialogLanguageSelectorProps) {
	return (
		<DialogLanguageSelectorUI
			open={open}
			onOpenChange={onOpenChange}
			trigger={
				<Button variant={variant} size={size} className={cn(className)}>
					{LOCALE_META[currentLocale]?.flag ?? FALL_BACK_LOCALE_META.flag}
				</Button>
			}
			classes={classes}>
			<div className='sds:flex sds:flex-col sds:gap-4 sds:py-2'>
				{locales.map((locale) => {
					const isCurrent = locale === currentLocale;
					const handleClick = () => {
						onLocaleChange(locale);
						onOpenChange(false);
					};
					return (
						<DialogLangFlagItem
							key={locale}
							label={
								<span>
									{LOCALE_META[locale]?.flag ?? FALL_BACK_LOCALE_META.flag}{' '}
									{LOCALE_META[locale]?.label ?? FALL_BACK_LOCALE_META.label}
								</span>
							}
							isActive={isCurrent}
							onFlagClick={handleClick}
							className={classes?.item}
						/>
					);
				})}
			</div>
		</DialogLanguageSelectorUI>
	);
}
