import { ProgressBar } from '../../../elements/media-payers/shared/player-progress-bar';
import { PlayerHeadlines } from '../../../elements/media-payers/shared/player-headlines';
import { Size, Variant } from '../../../elements/media-payers/shared/types';
import { AudioControls } from '../../../elements/media-payers/audio/audio-controls';
import { AudioOverlay } from '../../../elements/media-payers/audio/audio-overlay';
import { useAudioPlayer } from './use-audio-payer';
import { cn } from '@/lib/utils';
import { MediaPlayerClasses } from '../types';
import { useFileUrl } from '../hooks/use-file-url';
import SpinnerLoader from '@/components/loader/spinner';

interface AudioPlayerProps {
	file: File;
	variant?: Variant;
	size?: Size;
	className?: string;
	classes?: MediaPlayerClasses;
	audioProps?: React.AudioHTMLAttributes<HTMLAudioElement>;
}

function AudioPlayer({
	file,
	variant = 'dark',
	size = 'sm',
	className,
	classes,
	audioProps,
}: AudioPlayerProps) {
	const fileUrl = useFileUrl(file);
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

	if (!fileUrl) {
		return <SpinnerLoader />;
	}

	return (
		<div className={className}>
			{/* Main Player Card */}
			<AudioOverlay className={classes?.overlay}>
				<audio
					ref={audioRef}
					src={fileUrl}
					className={classes?.player}
					{...audioProps}
				/>

				{/* Album Art and Track Info */}
				<PlayerHeadlines
					title={file.name}
					description={file.type}
					className={cn(
						'sds:mb-4 sds:min-h-24 sds:sm:mb-6 sds:sm:min-h-32 sds:md:mb-8 sds:md:min-h-40',
						classes?.headlines,
					)}
				/>

				<ProgressBar
					className={cn(
						'sds:mb-4 sds:space-y-1 sds:sm:space-y-2 ',
						classes?.progressBar?.container,
					)}
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
					className={classes?.controls}
				/>
			</AudioOverlay>
		</div>
	);
}

export { AudioPlayer };
