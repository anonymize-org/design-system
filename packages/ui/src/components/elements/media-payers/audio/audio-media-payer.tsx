import { ProgressBar } from '../shared/payer-progress-bar';
import { PlayerHeadlines } from '../shared/player-headlines';
import { Size, Variant } from '../shared/types';
import { AudioControls } from './audio-controls';
import { AudioOverlay } from './audio-overlay';
import { useAudioPlayer } from './hooks/use-audio-payer';

interface Track {
	title: string;
	type: string;
	src: string;
}

interface AudioPlayerProps {
	track: Track;
	className?: string;
	variant?: Variant;
	size?: Size;
}

function AudioPlayer({
	track,
	variant = 'dark',
	size = 'sm',
	className,
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
			<AudioOverlay>
				<audio ref={audioRef} src={track.src} />

				{/* Album Art and Track Info */}
				<PlayerHeadlines
					title={track.title}
					description={track.type}
					className='sds:mb-8 sds:h-40'
				/>

				<ProgressBar
					className='sds:mb-6 sds:space-y-2'
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
				/>
			</AudioOverlay>
		</div>
	);
}

export { AudioPlayer };
