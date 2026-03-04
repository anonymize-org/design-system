import { Button } from '@/components/core/button';
import { cn } from '@/lib/utils';
import { Play, Pause } from 'lucide-react';
import { Size, Variant } from './types';

const sizeClasses = {
	sm: { button: 'sds:h-8 sds:w-8', icon: 'sds:h-4 sds:w-4' },
	md: { button: 'sds:h-10 sds:w-10', icon: 'sds:h-5 sds:w-5' },
	lg: { button: 'sds:h-16 sds:w-16', icon: 'sds:h-8 sds:w-8' },
};

const variantClasses = {
	light: 'sds:hover:bg-white/20 sds:hover:text-white sds:text-white',
	dark: 'sds:bg-primary-foreground sds:text-primary sds:hover:bg-primary-foreground/90',
};

interface PlayPauseButtonProps {
	isPlaying: boolean;
	onTogglePlay: () => void;
	className?: string;
	size?: Size;
	variant?: Variant;
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

export default PlayPauseButton;
