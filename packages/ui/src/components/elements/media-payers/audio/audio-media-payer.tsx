import { cn } from '@/lib/utils';
import ProgressBar from '../shared/payer-progress-bar';
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
}

function AudioPlayer({
	track,
	className,
}: AudioPlayerProps): React.JSX.Element {
	const {
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
		formatTime,
	} = useAudioPlayer();

	return (
		<div
			className={cn(
				'sds:relative sds:w-full sds:space-y-6 sds:h-fit sds:overflow-hidden sds:rounded-xl sds:bg-black sds:shadow-2xl',
				className,
			)}>
			<audio ref={audioRef} src={track.src} />

			<AudioOverlay track={track} />

			<ProgressBar
				currentTime={currentTime}
				duration={duration}
				onSeek={handleSeek}
				formatTime={formatTime}
				variant='dark'
				classes={{
					text: 'sds:text-sm',
				}}
			/>

			<AudioControls
				isPlaying={isPlaying}
				volume={volume}
				isMuted={isMuted}
				onTogglePlay={togglePlay}
				onVolumeChange={handleVolumeChange}
				onToggleMute={toggleMute}
			/>
		</div>
	);
}

export { AudioPlayer };
