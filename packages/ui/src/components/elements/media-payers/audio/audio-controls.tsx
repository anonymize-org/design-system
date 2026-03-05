import { cn } from '@/lib/utils';
import {
	PlayPauseButton,
	SkipButton,
	VolumeControl,
} from '../shared/payer-controls-btn';
import { Size, Variant } from '../shared/types';

interface AudioControlsProps {
	isPlaying: boolean;
	volume: number;
	isMuted: boolean;
	onTogglePlay: () => void;
	onVolumeChange: (value: number[]) => void;
	onToggleMute: () => void;
	onSkip: (seconds: number) => void;
	className?: string;
	variant?: Variant;
	size?: Size;
}

function AudioControls({
	isPlaying,
	volume,
	isMuted,
	onTogglePlay,
	onVolumeChange,
	onToggleMute,
	onSkip,
	className,
	variant = 'dark',
	size = 'sm',
}: AudioControlsProps) {
	return (
		<div
			className={cn(
				'sds:flex sds:items-center sds:justify-between sds:gap-4',
				className,
			)}>
			<div className='sds:flex sds:items-center sds:gap-2 md:sds:gap-4'>
				<PlayPauseButton
					isPlaying={isPlaying}
					onTogglePlay={onTogglePlay}
					variant={variant}
					size={size}
				/>
				<SkipButton
					direction='backward'
					seconds={5}
					onSkip={onSkip}
					size={size}
					variant={variant}
				/>
				<SkipButton
					direction='forward'
					seconds={5}
					onSkip={onSkip}
					size={size}
					variant={variant}
				/>
			</div>

			{/* Controls - Volume */}
			<div className='sds:flex sds:items-center sds:gap-2'>
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

export { AudioControls };
