import { Button } from '@/components/core/button';
import { cn } from '@/lib/utils';
import {
	Play,
	Pause,
	SkipForward,
	SkipBack,
	Maximize,
	Minimize,
	VolumeX,
	Volume2,
} from 'lucide-react';
import { Size, Variant } from './types';
import { Slider } from '@/components/core/slider';

const sizeClasses = {
	sm: { button: 'sds:size-8', icon: 'sds:size-4' },
	md: { button: 'sds:sm:size-12 sds:size-8', icon: 'sds:sm:size-6 sds:size-4' },
	lg: {
		button: 'sds:sm:size-16 sds:size-12',
		icon: 'sds:sm:size-8 sds:size-6',
	},
};

const variantClasses = {
	light:
		'sds:text-primary-foreground/80 sds:hover:text-primary sds:hover:bg-primary-foreground/20',
	dark: 'sds:text-primary-foreground sds:hover:bg-primary-foreground/20 sds:hover:text-primary',
};

interface PlayerControlsBtnProps {
	size?: Size;
	variant?: Variant;
}

interface PlayPauseButtonProps extends PlayerControlsBtnProps {
	isPlaying: boolean;
	onTogglePlay: () => void;
	className?: string;
}

function PlayPauseButton({
	isPlaying,
	onTogglePlay,
	className,
	size = 'md',
	variant = 'light',
}: PlayPauseButtonProps): React.JSX.Element {
	return (
		<Button
			variant='ghost'
			size='icon'
			onClick={onTogglePlay}
			className={cn(
				sizeClasses[size].button,
				variantClasses[variant],
				'sds:rounded-full',
				className,
			)}>
			{isPlaying ? (
				<Pause className={sizeClasses[size].icon} />
			) : (
				<Play className={cn(sizeClasses[size].icon, 'sds:fill-current')} />
			)}
		</Button>
	);
}

interface SkipButtonProps extends PlayerControlsBtnProps {
	direction: 'forward' | 'backward';
	seconds?: number;
	onSkip: (seconds: number) => void;
	className?: string;
}

function SkipButton({
	direction,
	seconds = 10,
	onSkip,
	className,
	size = 'md',
	variant = 'light',
}: SkipButtonProps): React.JSX.Element {
	const skipAmount = direction === 'forward' ? seconds : -seconds;

	return (
		<Button
			size='icon'
			variant='ghost'
			onClick={() => onSkip(skipAmount)}
			className={cn(
				'sds:rounded-full',
				sizeClasses[size].button,
				variantClasses[variant],
				className,
			)}
			aria-label={`Skip ${direction} ${seconds} seconds`}>
			{direction === 'backward' ? (
				<SkipBack className={sizeClasses[size].icon} />
			) : (
				<SkipForward className={sizeClasses[size].icon} />
			)}
		</Button>
	);
}

interface FullScreenButtonProps extends PlayerControlsBtnProps {
	isFullscreen: boolean;
	toggleFullscreen: () => void;
}

function FullScreenButton({
	isFullscreen,
	toggleFullscreen,
	size = 'md',
	variant = 'light',
}: FullScreenButtonProps): React.JSX.Element {
	return (
		<Button
			size='icon'
			variant='ghost'
			onClick={toggleFullscreen}
			className={cn(sizeClasses[size].button, variantClasses[variant])}
			aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}>
			{isFullscreen ? (
				<Minimize className={sizeClasses[size].icon} />
			) : (
				<Maximize className={sizeClasses[size].icon} />
			)}
		</Button>
	);
}

interface VolumeControlProps extends PlayerControlsBtnProps {
	volume: number;
	isMuted: boolean;
	onToggleMute: () => void;
	onVolumeChange: (value: number[]) => void;
	className?: string;
	classes?: {
		button?: string;
		slider?: string;
	};
}

function VolumeControl({
	volume,
	isMuted,
	onToggleMute,
	onVolumeChange,
	className,
	classes,
	size = 'md',
	variant = 'light',
}: VolumeControlProps): React.JSX.Element {
	return (
		<div className={cn('sds:flex sds:items-center sds:gap-2', className)}>
			<Button
				variant='ghost'
				size='icon'
				onClick={onToggleMute}
				className={cn(
					'sds:rounded-full',
					variantClasses[variant],
					sizeClasses[size].button,
					classes?.button,
				)}>
				{isMuted || volume === 0 ? (
					<VolumeX className={sizeClasses[size].icon} />
				) : (
					<Volume2 className={sizeClasses[size].icon} />
				)}
			</Button>
			<Slider
				value={[isMuted ? 0 : volume]}
				max={1}
				step={0.01}
				onValueChange={onVolumeChange}
				className={cn('sds:min-w-20 sds:cursor-pointer', classes?.slider)}
			/>
		</div>
	);
}

export { PlayPauseButton, SkipButton, FullScreenButton, VolumeControl };
