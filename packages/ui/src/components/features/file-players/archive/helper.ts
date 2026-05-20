import { FileArchive, FileBox, HardDrive, Package } from 'lucide-react';

const ARCHIVE_EXTENSIONS: Record<string, { label: string; color: string }> = {
	zip: { label: 'ZIP', color: 'sds:bg-amber-500' },
	rar: { label: 'RAR', color: 'sds:bg-purple-500' },
	'7z': { label: '7Z', color: 'sds:bg-emerald-500' },
	tar: { label: 'TAR', color: 'sds:bg-orange-500' },
	gz: { label: 'GZ', color: 'sds:bg-blue-500' },
	bz2: { label: 'BZ2', color: 'sds:bg-rose-500' },
	xz: { label: 'XZ', color: 'sds:bg-cyan-500' },
	iso: { label: 'ISO', color: 'sds:bg-slate-500' },
	dmg: { label: 'DMG', color: 'sds:bg-indigo-500' },
	pkg: { label: 'PKG', color: 'sds:bg-teal-500' },
};

function getArchiveIcon(extension: string) {
	const ext = extension.toLowerCase().replace('tar.', '');

	switch (ext) {
		case 'iso':
		case 'dmg':
			return HardDrive;
		case 'pkg':
			return Package;
		case '7z':
		case 'rar':
			return FileBox;
		default:
			return FileArchive;
	}
}

export { ARCHIVE_EXTENSIONS, getArchiveIcon };
