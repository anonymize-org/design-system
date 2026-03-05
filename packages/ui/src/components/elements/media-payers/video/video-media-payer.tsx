import { cn } from '@/lib/utils';

import { useVideoPlayer } from './hooks/use-video-payer';
import { VideoOverlay } from './video-player-overlay';
import { PlayerHeadlines } from '../shared/player-headlines';
import { ProgressBar } from '../shared/payer-progress-bar';
import { VideoControls } from './video-player-controls';
import { FullScreenButton } from '../shared/payer-controls-btn';
import { Size, Variant } from '../shared/types';

interface VideoPlayerProps {
	src: string;
	poster?: string;
	title?: string;
	description?: string;
	className?: string;
	variant?: Variant;
	size?: Size;
}

function VideoPlayer({
	src,
	poster,
	title,
	description,
	className,
	variant = 'light',
	size = 'md',
}: VideoPlayerProps): React.ReactNode {
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
				'sds:group sds:relative sds:h-fit sds:min-h-80 sds:w-full sds:overflow-hidden sds:rounded-xl sds:bg-black sds:shadow-2xl',
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
				onTogglePlay={togglePlay}>
				{/* Video Info */}
				{(title ?? description) && (
					<div
						className={cn(
							'sds:absolute sds:top-6 sds:left-6 sds:max-w-md sds:transition-opacity sds:duration-300',
							showControls ? 'sds:opacity-100' : 'sds:opacity-0',
						)}>
						<PlayerHeadlines
							title={title}
							description={description}
							withBackdrop
						/>
					</div>
				)}
			</VideoOverlay>

			<div
				className={cn(
					'sds:absolute sds:right-0 sds:bottom-0 sds:left-0 sds:space-y-2 sds:p-4 sds:transition-all sds:duration-300',
					showControls
						? 'sds:translate-y-0 sds:opacity-100'
						: 'sds:translate-y-4 sds:opacity-0',
				)}>
				<ProgressBar
					currentTime={currentTime}
					duration={duration}
					onSeek={handleSeek}
					formatTime={formatTime}
					variant={variant}
				/>

				<div className='sds:flex sds:items-center sds:justify-between sds:gap-2'>
					<VideoControls
						isPlaying={isPlaying}
						volume={volume}
						isMuted={isMuted}
						onTogglePlay={togglePlay}
						onVolumeChange={handleVolumeChange}
						onToggleMute={toggleMute}
						onSkip={skip}
						variant={variant}
						size={size}
					/>

					<FullScreenButton
						isFullscreen={isFullscreen}
						toggleFullscreen={toggleFullscreen}
						size={size}
						variant={variant}
					/>
				</div>
			</div>
		</div>
	);
}

export { VideoPlayer };
