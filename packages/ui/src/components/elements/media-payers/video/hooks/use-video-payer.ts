import { useEffect, useRef, useState } from 'react';

const useVideoPlayer = () => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [volume, setVolume] = useState(1);
	const [isMuted, setIsMuted] = useState(false);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [showControls, setShowControls] = useState(true);
	const [isHovering, setIsHovering] = useState(false);
	const hideControlsTimeout = useRef<ReturnType<typeof setTimeout> | null>(
		null,
	);
	const isMountedRef = useRef(true);

	// Setup video event listeners
	useEffect(() => {
		isMountedRef.current = true;

		const video = videoRef.current;
		if (!video) return;

		const updateTime = () =>
			isMountedRef.current && setCurrentTime(video.currentTime);
		const updateDuration = () =>
			isMountedRef.current && setDuration(video.duration);
		const handleEnded = () => isMountedRef.current && setIsPlaying(false);
		const handlePlay = () => isMountedRef.current && setIsPlaying(true);
		const handlePause = () => isMountedRef.current && setIsPlaying(false);

		video.addEventListener('timeupdate', updateTime);
		video.addEventListener('loadedmetadata', updateDuration);
		video.addEventListener('ended', handleEnded);
		video.addEventListener('play', handlePlay);
		video.addEventListener('pause', handlePause);

		return () => {
			video.removeEventListener('timeupdate', updateTime);
			video.removeEventListener('loadedmetadata', updateDuration);
			video.removeEventListener('ended', handleEnded);
			video.removeEventListener('play', handlePlay);
			video.removeEventListener('pause', handlePause);
			isMountedRef.current = false;
		};
	}, []);

	// Handle fullscreen changes
	useEffect(() => {
		const handleFullscreenChange = () => {
			if (isMountedRef.current) {
				setIsFullscreen(!!document.fullscreenElement);
			}
		};

		document.addEventListener('fullscreenchange', handleFullscreenChange);
		return () =>
			document.removeEventListener('fullscreenchange', handleFullscreenChange);
	}, []);

	// Handle controls auto-hide
	useEffect(() => {
		if (isPlaying && !isHovering) {
			hideControlsTimeout.current = setTimeout(() => {
				if (isMountedRef.current) {
					setShowControls(false);
				}
			}, 3000);
		} else {
			setShowControls(true);
			if (hideControlsTimeout.current) {
				clearTimeout(hideControlsTimeout.current);
			}
		}

		return () => {
			if (hideControlsTimeout.current) {
				clearTimeout(hideControlsTimeout.current);
			}
		};
	}, [isPlaying, isHovering]);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			isMountedRef.current = false;
			if (hideControlsTimeout.current) {
				clearTimeout(hideControlsTimeout.current);
			}
		};
	}, []);

	const togglePlay = () => {
		if (videoRef.current) {
			if (isPlaying) {
				videoRef.current.pause();
				setIsPlaying(false);
			} else {
				setIsPlaying(true);
				const playPromise = videoRef.current.play();
				if (playPromise !== undefined) {
					playPromise.catch((error) => {
						console.warn('Play failed:', error);
						setIsPlaying(false);
					});
				}
			}
		}
	};

	const handleSeek = (value: number[]) => {
		if (videoRef.current && typeof value[0] === 'number') {
			const val = value[0];
			// Only seek if metadata is loaded
			if (videoRef.current.duration > 0) {
				videoRef.current.currentTime = Math.min(val, videoRef.current.duration);
				setCurrentTime(videoRef.current.currentTime);
			}
		}
	};

	const handleVolumeChange = (value: number[]) => {
		if (videoRef.current && typeof value[0] === 'number') {
			const newVolume = Math.max(0, Math.min(1, value[0]));
			videoRef.current.volume = newVolume;
			setVolume(newVolume);
			setIsMuted(newVolume === 0);
		}
	};

	const toggleMute = () => {
		if (videoRef.current) {
			videoRef.current.muted = !isMuted;
			setIsMuted(!isMuted);
		}
	};

	const toggleFullscreen = () => {
		if (!document.fullscreenElement) {
			containerRef?.current?.requestFullscreen().catch((error) => {
				console.warn('Fullscreen request failed:', error);
			});
		} else {
			document.exitFullscreen().catch((error) => {
				console.warn('Exit fullscreen failed:', error);
			});
		}
	};

	const skip = (seconds: number) => {
		if (videoRef.current && videoRef.current.duration > 0) {
			videoRef.current.currentTime = Math.max(
				0,
				Math.min(
					videoRef.current.currentTime + seconds,
					videoRef.current.duration,
				),
			);
		}
	};

	const formatTime = (time: number) => {
		if (!Number.isFinite(time)) return '0:00';
		const totalSeconds = Math.floor(time);
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;

		if (hours > 0) {
			return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds
				.toString()
				.padStart(2, '0')}`;
		}
		return `${minutes}:${seconds.toString().padStart(2, '0')}`;
	};

	return {
		videoRef,
		containerRef,
		isPlaying,
		currentTime,
		duration,
		volume,
		isMuted,
		isFullscreen,
		showControls,
		isHovering,
		setIsHovering,
		togglePlay,
		handleSeek,
		handleVolumeChange,
		toggleMute,
		toggleFullscreen,
		skip,
		formatTime,
	};
};

export { useVideoPlayer };
