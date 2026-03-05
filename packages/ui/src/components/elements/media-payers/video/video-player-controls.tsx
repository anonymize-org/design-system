import {
	PlayPauseButton,
	SkipButton,
	VolumeControl,
} from '../shared/payer-controls-btn';
import { Size, Variant } from '../shared/types';

interface VideoControlsProps {
	isPlaying: boolean;
	volume: number;
	isMuted: boolean;
	onTogglePlay: () => void;
	onVolumeChange: (value: number[]) => void;
	onToggleMute: () => void;
	onSkip: (seconds: number) => void;
	variant?: Variant;
	size?: Size;
}

function VideoControls({
	isPlaying,
	volume,
	isMuted,
	onTogglePlay,
	onVolumeChange,
	onToggleMute,
	onSkip,
	variant = 'light',
	size = 'md',
}: VideoControlsProps): React.ReactNode {
	return (
		<div className='sds:flex sds:items-center sds:gap-1 md:sds:gap-2'>
			{/* Play/Pause */}
			<PlayPauseButton
				isPlaying={isPlaying}
				onTogglePlay={onTogglePlay}
				variant={variant}
				size={size}
			/>

			{/* Skip Backward */}
			<SkipButton
				direction='backward'
				seconds={10}
				onSkip={onSkip}
				size={size}
				variant={variant}
			/>

			{/* Skip Forward */}
			<SkipButton
				direction='forward'
				seconds={10}
				onSkip={onSkip}
				size={size}
				variant={variant}
			/>

			{/* Volume Control */}
			<div className='sds:hidden md:sds:block'>
				<VolumeControl
					volume={volume}
					isMuted={isMuted}
					onToggleMute={onToggleMute}
					onVolumeChange={onVolumeChange}
					size={size}
					variant={variant}
				/>
			</div>
		</div>
	);
}

export { VideoControls };
