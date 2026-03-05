import { Slider } from '@/components/core/slider';
import { cn } from '@/lib/utils';

const textClasses = {
	light: 'sds:text-primary-foreground sds:font-mono',
	dark: 'sds:text-primary-foreground/70',
};

interface ProgressBarProps {
	currentTime: number;
	duration: number;
	onSeek: (value: number[]) => void;
	formatTime: (time: number) => string;
	className?: string;
	textClassName?: string;
	variant?: 'light' | 'dark';
}

function ProgressBar({
	currentTime,
	duration,
	onSeek,
	formatTime,
	className,
	textClassName,
	variant = 'light',
}: ProgressBarProps): React.JSX.Element {
	return (
		<div className={cn('sds:space-y-1', className)}>
			<Slider
				value={[currentTime]}
				max={duration || 100}
				step={0.1}
				onValueChange={onSeek}
				className='sds:cursor-pointer'
			/>
			<div
				className={cn(
					'sds:flex sds:justify-between sds:text-xs',
					textClasses[variant],
					textClassName,
				)}>
				<span>{formatTime(currentTime)}</span>
				<span>{formatTime(duration)}</span>
			</div>
		</div>
	);
}

export { ProgressBar };
