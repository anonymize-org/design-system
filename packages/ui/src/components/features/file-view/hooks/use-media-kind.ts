import { useEffect, useState } from 'react';
import { detectMediaType, MediaKind } from '../helpers/file-types';

const useMediaKind = (file: File | null) => {
	const [mediaKind, setMediaKind] = useState<MediaKind | null>(null);

	useEffect(() => {
		let isMounted = true;

		if (!file) {
			setMediaKind(null);
			return;
		}

		detectMediaType(file).then((info) => {
			if (isMounted) {
				setMediaKind(info.kind);
			}
		});

		return () => {
			isMounted = false;
		};
	}, [file]);

	return mediaKind;
};

export { useMediaKind };
