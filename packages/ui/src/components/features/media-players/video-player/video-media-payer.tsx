import { cn } from '@/lib/utils';

import { useVideoPlayer } from './use-video-payer';
import { VideoOverlay } from '../../../elements/media-payers/video/video-player-overlay';
import { PlayerHeadlines } from '../../../elements/media-payers/shared/player-headlines';
import { ProgressBar } from '../../../elements/media-payers/shared/player-progress-bar';
import { VideoControls } from '../../../elements/media-payers/video/video-player-controls';
import { FullScreenButton } from '../../../elements/media-payers/shared/player-controls-btn';
import { Size, Variant } from '../../../elements/media-payers/shared/types';
import { MediaPlayerClasses } from '../types';
import { useFileUrl } from '../hooks/use-file-url';
import SpinnerLoader from '@/components/loader/spinner';

interface VideoPlayerProps {
	file: File;
	variant?: Variant;
	size?: Size;
	className?: string;
	classes?: MediaPlayerClasses;
	videoProps?: React.ComponentProps<'video'>;
}

function VideoPlayer({
	file,
	className,
	variant = 'light',
	size = 'md',
	classes,
	videoProps,
}: VideoPlayerProps): React.ReactNode {
	const fileUrl = useFileUrl(file);
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

	if (!fileUrl) {
		return <SpinnerLoader />;
	}

	return (
		<div
			ref={containerRef}
			className={cn(
				'sds:group sds:relative sds:h-fit sds:w-full sds:overflow-hidden sds:rounded-xl sds:bg-black/90 sds:shadow-2xl',
				className,
			)}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}>
			{/* Video Element */}
			<video
				ref={videoRef}
				src={fileUrl}
				className={cn(
					'sds:aspect-video sds:min-h-60 sds:w-full sds:transition-opacity sds:duration-300 sds:sm:min-h-72 sds:lg:min-h-80',
					isPlaying ? 'sds:opacity-100' : 'sds:opacity-70',
					classes?.player,
				)}
				onClick={togglePlay}
				{...videoProps}
			/>

			<VideoOverlay
				isPlaying={isPlaying}
				showControls={showControls}
				onTogglePlay={togglePlay}
				className={classes?.overlay}>
				{/* Video Info */}
				<PlayerHeadlines
					title={file.name}
					description={file.type}
					className={cn(
						'sds:absolute sds:top-6 sds:left-6 sds:max-w-md sds:transition-opacity sds:duration-300',
						showControls ? 'sds:opacity-100' : 'sds:opacity-0',
						classes?.headlines,
					)}
					withBackdrop
				/>
			</VideoOverlay>

			<div
				className={cn(
					'sds:absolute sds:right-0 sds:bottom-0 sds:left-0 sds:space-y-1 sds:p-2 sds:transition-all sds:duration-300 sds:sm:space-y-2 sds:sm:p-3 sds:lg:p-4',
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
					className={classes?.progressBar?.container}
					classes={classes?.progressBar}
				/>

				<div className='sds:flex sds:items-center sds:justify-between sds:gap-1 sds:sm:gap-2'>
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
						className={classes?.controls}
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
