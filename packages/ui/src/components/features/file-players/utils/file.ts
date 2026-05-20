const getFileExtension = (fileName: string): string => {
	const split = fileName.split('.');
	const pop = split.pop();

	if (pop) {
		return pop.replace('.', '');
	}

	return 'unknown';
};

function toHuman(bytes: bigint | number, timeUnit?: string): string {
	bytes = typeof bytes === 'number' ? bytes : Number(bytes);

	const units = ' KMGTPEZYXWVU';
	if (bytes <= 0) {
		return '0';
	}
	timeUnit = timeUnit ? `/${timeUnit}` : '';
	const t2 = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), 12);
	const val = Math.round((bytes * 100) / Math.pow(1024, t2)) / 100;

	return `${val}${units.charAt(t2).replace(' ', '')}B${timeUnit}`;
}

export { getFileExtension, toHuman };
