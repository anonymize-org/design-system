import { Slider } from '@/components/core/slider';
import { cn } from '@/lib/utils';

const textClasses = {
	light: 'sds:text-primary-foreground sds:font-mono',
	dark: 'sds:text-primary-foreground/70',
};

export interface ProgressBarProps {
	currentTime: number;
	duration: number;
	onSeek: (value: number[]) => void;
	formatTime: (time: number) => string;
	className?: string;
	classes?: {
		text?: string;
		slider?: string;
	};
	variant?: 'light' | 'dark';
}

function ProgressBar({
	currentTime,
	duration,
	onSeek,
	formatTime,
	className,
	classes,
	variant = 'light',
}: ProgressBarProps): React.JSX.Element {
	return (
		<div className={cn('sds:space-y-1', className)}>
			<Slider
				value={[currentTime]}
				max={duration || 100}
				step={0.1}
				onValueChange={onSeek}
				className={cn('sds:cursor-pointer', classes?.slider)}
			/>
			<div
				className={cn(
					'sds:flex sds:justify-between sds:text-xs',
					textClasses[variant],
					classes?.text,
				)}>
				<span>{formatTime(currentTime)}</span>
				<span>{formatTime(duration)}</span>
			</div>
		</div>
	);
}

export { ProgressBar };
