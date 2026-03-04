import { Button } from '@/components/core/button';
import { Slider } from '@/components/core/slider';
import { cn } from '@/lib/utils';
import { Volume2, VolumeX } from 'lucide-react';
import { Size, Variant } from './types';

const iconSize = {
	sm: 'sds:h-4 sds:w-4',
	md: 'sds:h-5 sds:w-5',
	lg: 'sds:h-8 sds:w-8',
};

const buttonSize = {
	sm: 'sds:h-8 sds:w-8',
	md: 'sds:h-10 sds:w-10',
	lg: 'sds:h-12 sds:w-12',
};

const variantClasses = {
	light: {
		button: 'sds:text-white sds:hover:bg-white/20 sds:hover:text-white',
		slider:
			'sds:bg-white/30 sds:data-[orientation=horizontal]:h-1 sds:data-[orientation=horizontal]:w-full sds:data-[orientation=vertical]:h-full sds:data-[orientation=vertical]:w-1',
	},
	dark: {
		button: 'sds:text-primary-foreground hover:sds:bg-primary-foreground/10',
		slider:
			'sds:bg-primary-foreground/30 sds:data-[orientation=horizontal]:h-1 sds:data-[orientation=horizontal]:w-full sds:data-[orientation=vertical]:h-full sds:data-[orientation=vertical]:w-1',
	},
};

interface VolumeControlProps {
	volume: number;
	isMuted: boolean;
	onToggleMute: () => void;
	onVolumeChange: (value: number[]) => void;
	className?: string;
	classes?: {
		button?: string;
		slider?: string;
	};
	size?: Size;
	variant?: Variant;
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
					buttonSize[size],
					variantClasses[variant].button,
					classes?.button,
				)}>
				{isMuted || volume === 0 ? (
					<VolumeX className={iconSize[size]} />
				) : (
					<Volume2 className={iconSize[size]} />
				)}
			</Button>
			<Slider
				value={[isMuted ? 0 : volume]}
				max={1}
				step={0.01}
				onValueChange={onVolumeChange}
				className={cn(
					'sds:cursor-pointer sds:w-40',
					variantClasses[variant].slider,
					classes?.slider,
				)}
			/>
		</div>
	);
}

export default VolumeControl;
