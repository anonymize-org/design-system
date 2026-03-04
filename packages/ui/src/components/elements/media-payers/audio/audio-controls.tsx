import { cn } from '@/lib/utils';
import PlayPauseButton from '../shared/play-pause-btn';
import VolumeControl from '../shared/volume-controls';

interface AudioControlsProps {
	isPlaying: boolean;
	volume: number;
	isMuted: boolean;
	onTogglePlay: () => void;
	onVolumeChange: (value: number[]) => void;
	onToggleMute: () => void;
	className?: string;
}

function AudioControls({
	isPlaying,
	volume,
	isMuted,
	onTogglePlay,
	onVolumeChange,
	onToggleMute,
	className,
}: AudioControlsProps): React.JSX.Element {
	return (
		<div
			className={cn(
				'sds:flex sds:items-center sds:justify-between sds:gap-4',
				className,
			)}>
			<PlayPauseButton
				isPlaying={isPlaying}
				onTogglePlay={onTogglePlay}
				size='lg'
				variant='dark'
			/>

			<VolumeControl
				volume={volume}
				isMuted={isMuted}
				onToggleMute={onToggleMute}
				onVolumeChange={onVolumeChange}
				size='sm'
				variant='dark'
			/>
		</div>
	);
}

export { AudioControls };
