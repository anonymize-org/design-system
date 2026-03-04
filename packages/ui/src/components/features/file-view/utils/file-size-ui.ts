export type Size = 'sm' | 'md' | 'lg' | 'xl';

const sizeMap: Record<Size, number> = {
	sm: 24,
	md: 32,
	lg: 40,
	xl: 48,
};

const getSizeValue = (size: Size | number) => {
	if (typeof size === 'number') {
		return size;
	}
	return sizeMap[size];
};

const getFontSizeClass = (size: Size | number) => {
	const sizeValue = getSizeValue(size);
	if (sizeValue <= 24) {
		return 'sds:text-xs';
	}
	if (sizeValue <= 32) {
		return 'sds:text-sm';
	}
	if (sizeValue <= 40) {
		return 'sds:text-base';
	}
	return 'sds:text-lg';
};

export { getSizeValue, getFontSizeClass };
