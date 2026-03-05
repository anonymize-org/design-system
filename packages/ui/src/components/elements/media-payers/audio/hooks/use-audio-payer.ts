import { useEffect, useRef, useState } from 'react';

export const useAudioPlayer = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [volume, setVolume] = useState(0.7);
	const [isMuted, setIsMuted] = useState(false);

	const audioRef = useRef<HTMLAudioElement>(null);
	const isMountedRef = useRef(false);

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		isMountedRef.current = true;

		const updateTime = () =>
			isMountedRef.current && setCurrentTime(audio.currentTime);
		const updateDuration = () =>
			isMountedRef.current && setDuration(audio.duration);
		const handleEnded = () => isMountedRef.current && setIsPlaying(false);
		const handlePlay = () => isMountedRef.current && setIsPlaying(true);
		const handlePause = () => isMountedRef.current && setIsPlaying(false);

		audio.addEventListener('timeupdate', updateTime);
		audio.addEventListener('loadedmetadata', updateDuration);
		audio.addEventListener('ended', handleEnded);
		audio.addEventListener('play', handlePlay);
		audio.addEventListener('pause', handlePause);

		return () => {
			audio.removeEventListener('timeupdate', updateTime);
			audio.removeEventListener('loadedmetadata', updateDuration);
			audio.removeEventListener('ended', handleEnded);
			audio.removeEventListener('play', handlePlay);
			audio.removeEventListener('pause', handlePause);
			isMountedRef.current = false;
		};
	}, []);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = isMuted ? 0 : volume;
		}
	}, [volume, isMuted]);

	const togglePlay = () => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.pause();
				setIsPlaying(false);
			} else {
				setIsPlaying(true);
				const playPromise = audioRef.current.play();
				if (playPromise !== undefined) {
					playPromise.catch((error) => {
						console.warn('Audio play failed:', error);
						setIsPlaying(false);
					});
				}
			}
		}
	};

	const handleSeek = (value: number[]) => {
		const newTime = value[0];
		if (typeof newTime !== 'number') return;
		if (audioRef.current && audioRef.current.duration > 0) {
			audioRef.current.currentTime = Math.min(
				newTime,
				audioRef.current.duration,
			);
			setCurrentTime(audioRef.current.currentTime);
		}
	};

	const handleVolumeChange = (value: number[]) => {
		const newVolume = value[0];
		if (typeof newVolume !== 'number') return;
		const clampedVolume = Math.max(0, Math.min(1, newVolume));
		setVolume(clampedVolume);
		setIsMuted(clampedVolume === 0);
	};

	const toggleMute = () => {
		setIsMuted(!isMuted);
	};

	const skip = (seconds: number) => {
		if (audioRef.current && audioRef.current.duration > 0) {
			audioRef.current.currentTime = Math.max(
				0,
				Math.min(
					audioRef.current.currentTime + seconds,
					audioRef.current.duration,
				),
			);
		}
	};

	const formatTime = (time: number) => {
		if (!Number.isFinite(time)) return '0:00';
		const totalSeconds = Math.floor(time);
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = totalSeconds % 60;
		return `${minutes}:${seconds.toString().padStart(2, '0')}`;
	};

	return {
		audioRef,
		isPlaying,
		currentTime,
		duration,
		volume,
		isMuted,
		togglePlay,
		handleSeek,
		handleVolumeChange,
		toggleMute,
		skip,
		formatTime,
	};
};
