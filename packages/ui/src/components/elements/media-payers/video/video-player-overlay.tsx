import { Button } from '@/components/core/button';
import { cn } from '@/lib/utils';
import { Play } from 'lucide-react';

interface VideoOverlayProps {
	isPlaying: boolean;
	showControls: boolean;
	onTogglePlay: () => void;
}

function VideoOverlay({
	isPlaying,
	showControls,
	onTogglePlay,
	children,
	className,
	...props
}: React.ComponentPropsWithoutRef<'div'> & VideoOverlayProps): React.ReactNode {
	return (
		<>
			{/* Overlay Gradient */}
			<div
				className={cn(
					'sds:pointer-events-none sds:absolute sds:inset-0 sds:bg-linear-to-t sds:from-black/80 sds:via-transparent sds:to-transparent sds:transition-opacity sds:duration-300',
					showControls ? 'sds:opacity-100' : 'sds:opacity-0',
					className,
				)}
				{...props}
			/>
			{children}

			{/* Center Play Button */}
			{!isPlaying && (
				<div className='sds:absolute sds:inset-0 sds:flex sds:items-center sds:justify-center'>
					<Button
						onClick={onTogglePlay}
						className='sds:bg-primary/20 sds:hover:bg-primary/20 sds:size-10 sds:sm:size-20 sds:rounded-full sds:shadow-xl sds:backdrop-blur-xs sds:transition-all sds:hover:scale-110 sds:hover:backdrop-blur-2xl'>
						<Play className='sds:fill-primary-foreground sds:text-primary-foreground sds:size-5 sds:sm:size-10' />
					</Button>
				</div>
			)}
		</>
	);
}

export { VideoOverlay };
