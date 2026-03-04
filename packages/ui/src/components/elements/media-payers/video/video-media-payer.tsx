import { cn } from '@/lib/utils';
import { useVideoPlayer } from './hooks/use-video-payer';
import VideoOverlay from './video-player-overlay';
import VideoControls from './video-player-controls';

interface VideoPlayerProps {
	src: string;
	poster?: string;
	title?: string;
	description?: string;
	className?: string;
}

function VideoPlayer({
	src,
	poster,
	title,
	description,
	className,
}: VideoPlayerProps): React.JSX.Element {
	const {
		videoRef,
		containerRef,
		isPlaying,
		currentTime,
		duration,
		volume,
		isMuted,
		isFullscreen,
		showControls,
		setIsHovering,
		togglePlay,
		handleSeek,
		handleVolumeChange,
		toggleMute,
		toggleFullscreen,
		skip,
		formatTime,
	} = useVideoPlayer();

	return (
		<div
			ref={containerRef}
			className={cn(
				'sds:group sds:relative sds:h-fit sds:w-full sds:overflow-hidden sds:rounded-xl sds:bg-black sds:shadow-2xl',
				className,
			)}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}>
			{/* Video Element */}
			<video
				ref={videoRef}
				src={src}
				poster={poster}
				className='sds:aspect-video sds:w-full'
				onClick={togglePlay}
			/>

			<VideoOverlay
				isPlaying={isPlaying}
				showControls={showControls}
				title={title}
				description={description}
				onTogglePlay={togglePlay}
			/>

			<VideoControls
				isPlaying={isPlaying}
				currentTime={currentTime}
				duration={duration}
				volume={volume}
				isMuted={isMuted}
				isFullscreen={isFullscreen}
				showControls={showControls}
				onTogglePlay={togglePlay}
				onSeek={handleSeek}
				onVolumeChange={handleVolumeChange}
				onToggleMute={toggleMute}
				onToggleFullscreen={toggleFullscreen}
				onSkip={skip}
				formatTime={formatTime}
			/>
		</div>
	);
}

export { VideoPlayer };
