import { Button } from '@/components/core/button';
import { cn } from '@/lib/utils';
import ProgressBar from '../shared/payer-progress-bar';
import PlayPauseButton from '../shared/play-pause-btn';
import VolumeControl from '../shared/volume-controls';
import { Maximize, Minimize, SkipBack, SkipForward } from 'lucide-react';

interface VideoControlsProps {
	isPlaying: boolean;
	currentTime: number;
	duration: number;
	volume: number;
	isMuted: boolean;
	isFullscreen: boolean;
	showControls: boolean;
	onTogglePlay: () => void;
	onSeek: (value: number[]) => void;
	onVolumeChange: (value: number[]) => void;
	onToggleMute: () => void;
	onToggleFullscreen: () => void;
	onSkip: (seconds: number) => void;
	formatTime: (time: number) => string;
}

function VideoControls({
	isPlaying,
	currentTime,
	duration,
	volume,
	isMuted,
	isFullscreen,
	showControls,
	onTogglePlay,
	onSeek,
	onVolumeChange,
	onToggleMute,
	onToggleFullscreen,
	onSkip,
	formatTime,
}: VideoControlsProps): React.JSX.Element {
	return (
		<div
			className={cn(
				'sds:absolute sds:right-0 sds:bottom-0 sds:left-0 sds:space-y-2 sds:p-4 sds:transition-all sds:duration-300',
				showControls
					? 'sds:translate-y-0 sds:opacity-100'
					: 'sds:translate-y-4 sds:opacity-0',
			)}>
			{/* Progress Bar */}
			<ProgressBar
				currentTime={currentTime}
				duration={duration}
				onSeek={onSeek}
				formatTime={formatTime}
				variant='light'
			/>

			{/* Control Buttons */}
			<div className='sds:flex sds:items-center sds:justify-between sds:gap-2'>
				<div className='sds:flex sds:items-center sds:gap-1 md:sds:gap-2'>
					{/* Play/Pause */}
					<PlayPauseButton
						isPlaying={isPlaying}
						onTogglePlay={onTogglePlay}
						size='md'
						variant='light'
						className='sds:h-9 sds:w-9 md:sds:h-10 md:sds:w-10'
					/>
					{/* Skip Backward */}
					<Button
						size='icon'
						variant='ghost'
						onClick={() => onSkip(-10)}
						className='sds:h-9 sds:w-9 sds:text-white sds:hover:bg-white/20 sds:hover:text-white md:sds:h-10 md:sds:w-10'>
						<SkipBack className='sds:h-4 sds:w-4' />
					</Button>

					{/* Skip Forward */}
					<Button
						size='icon'
						variant='ghost'
						onClick={() => onSkip(10)}
						className='sds:h-9 sds:w-9 sds:text-white sds:hover:bg-white/20 sds:hover:text-white md:sds:h-10 md:sds:w-10'>
						<SkipForward className='sds:h-4 sds:w-4' />
					</Button>

					{/* Volume Control */}
					<VolumeControl
						volume={volume}
						isMuted={isMuted}
						onToggleMute={onToggleMute}
						onVolumeChange={onVolumeChange}
						size='md'
						className='sds:hidden md:sds:flex'
						classes={{ slider: 'sds:w-20' }}
					/>
				</div>

				<div className='sds:flex sds:items-center sds:gap-1 md:sds:gap-2'>
					{/* Fullscreen */}
					<Button
						size='icon'
						variant='ghost'
						onClick={onToggleFullscreen}
						className='sds:h-9 sds:w-9 sds:text-white sds:hover:bg-white/20 sds:hover:text-white md:sds:h-10 md:sds:w-10'>
						{isFullscreen ? (
							<Minimize className='sds:h-5 sds:w-5' />
						) : (
							<Maximize className='sds:h-5 sds:w-5' />
						)}
					</Button>
				</div>
			</div>
		</div>
	);
}

export default VideoControls;
