'use client';
import { useState } from 'react';

const useImageZoom = () => {
	const [zoom, setZoom] = useState(100);

	const handleZoomIn = () => {
		setZoom((prev) => Math.min(prev + 25, 200));
	};

	const handleZoomOut = () => {
		setZoom((prev) => Math.max(prev - 25, 50));
	};

	const resetZoom = () => {
		setZoom(100);
	};

	return { zoom, handleZoomIn, handleZoomOut, resetZoom };
};

const useFullScreen = () => {
	const [fullScreen, setFullScreen] = useState<boolean>(false);

	const toggleFullScreen = () => {
		setFullScreen((prev) => !prev);
	};

	return { fullScreen, toggleFullScreen };
};

export { useImageZoom, useFullScreen };
