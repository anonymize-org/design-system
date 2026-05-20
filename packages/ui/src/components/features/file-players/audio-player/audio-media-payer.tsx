import { ProgressBar } from '../../../elements/media-payers/shared/player-progress-bar';
import { PlayerHeadlines } from '../../../elements/media-payers/shared/player-headlines';
import { Size, Variant } from '../../../elements/media-payers/shared/types';
import { AudioControls } from '../../../elements/media-payers/audio/audio-controls';
import { AudioOverlay } from '../../../elements/media-payers/audio/audio-overlay';
import { useAudioPlayer } from './use-audio-payer';
import { cn } from '@/lib/utils';
import { MediaPlayerClasses } from '../types';

interface AudioPlayerProps {
	fileName: string;
	fileUrl: string;
	fileType: string;
	variant?: Variant;
	size?: Size;
	className?: string;
	classes?: MediaPlayerClasses;
	audioProps?: React.AudioHTMLAttributes<HTMLAudioElement>;
	fullScreen?: boolean;
}

function AudioPlayer({
	fileName,
	fileUrl,
	fileType,
	variant = 'dark',
	size = 'sm',
	className,
	classes,
	audioProps,
	fullScreen = false,
}: AudioPlayerProps) {
	const {
		audioRef,
		currentTime,
		duration,
		volume,
		isMuted,
		isPlaying,
		togglePlay,
		handleSeek,
		handleVolumeChange,
		toggleMute,
		formatTime,
		skip,
	} = useAudioPlayer();

	return (
		<div className={className}>
			{/* Main Player Card */}
			<AudioOverlay
				className={classes?.overlay}
				fullScreen={fullScreen}
				classes={{
					content: 'sds:flex sds:flex-col sds:justify-between',
				}}>
				<audio
					ref={audioRef}
					src={fileUrl}
					className={classes?.player}
					{...audioProps}
				/>

				{/* Album Art and Track Info */}
				<PlayerHeadlines
					title={fileName}
					description={fileType}
					className={cn('sds:min-h-40 sds:sm:min-h-56', classes?.headlines)}
				/>

				<div className='sds:flex sds:w-full sds:flex-col sds:items-center sds:justify-center sds:space-y-4'>
					<ProgressBar
						className={cn('sds:w-full', classes?.progressBar?.container)}
						classes={classes?.progressBar}
						duration={duration || 100}
						currentTime={currentTime}
						formatTime={formatTime}
						onSeek={handleSeek}
						variant={variant}
					/>

					{/* Controls */}
					<AudioControls
						isPlaying={isPlaying}
						volume={volume}
						isMuted={isMuted}
						onTogglePlay={togglePlay}
						onVolumeChange={handleVolumeChange}
						onToggleMute={toggleMute}
						variant={variant}
						size={size}
						onSkip={skip}
						className={cn('sds:w-full', classes?.controls)}
					/>
				</div>
			</AudioOverlay>
		</div>
	);
}

export { AudioPlayer };
