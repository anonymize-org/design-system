import { cn } from '@/lib/utils';

import { useVideoPlayer } from './use-video-payer';
import { VideoOverlay } from '../../../elements/media-payers/video/video-player-overlay';
import { PlayerHeadlines } from '../../../elements/media-payers/shared/player-headlines';
import { ProgressBar } from '../../../elements/media-payers/shared/player-progress-bar';
import { VideoControls } from '../../../elements/media-payers/video/video-player-controls';
import { FullScreenButton } from '../../../elements/media-payers/shared/player-controls-btn';
import { Size, Variant } from '../../../elements/media-payers/shared/types';
import { MediaPlayerClasses } from '../types';
import React from 'react';
import { VideoPlayerFrame } from '@/components/elements/media-payers/video/video-player-frame';

interface VideoPlayerProps {
	fileUrl: string;
	fileName: string;
	fileType: string;
	variant?: Variant;
	size?: Size;
	className?: string;
	classes?: MediaPlayerClasses;
	videoProps?: React.ComponentProps<'video'>;
}

function VideoPlayer({
	fileUrl,
	fileName,
	fileType,
	className,
	variant = 'light',
	size = 'md',
	classes,
	videoProps,
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
		<VideoPlayerFrame
			ref={containerRef}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			className={className}>
			{/* Video Element */}
			<video
				ref={videoRef}
				src={fileUrl}
				className={cn(
					'sds:aspect-video sds:transition-opacity sds:duration-300',
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
					title={fileName}
					description={fileType}
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
		</VideoPlayerFrame>
	);
}

export { VideoPlayer };
