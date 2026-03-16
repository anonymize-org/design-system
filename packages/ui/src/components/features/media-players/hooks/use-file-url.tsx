'use client';
import { useEffect, useState } from 'react';

const useFileUrl = (file: File) => {
	const [fileUrl, setFileUrl] = useState<string | null>(null);
	useEffect(() => {
		const url = URL.createObjectURL(file);
		setFileUrl(url);

		return () => {
			URL.revokeObjectURL(url);
			setFileUrl(null);
		};
	}, [file]);

	return fileUrl;
};

export { useFileUrl };
