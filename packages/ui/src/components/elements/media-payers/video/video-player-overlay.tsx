import { cn } from '@/lib/utils';
import PlayPauseButton from '../shared/play-pause-btn';

interface VideoOverlayProps {
	isPlaying: boolean;
	showControls: boolean;
	title?: string;
	description?: string;
	onTogglePlay: () => void;
}

function VideoOverlay({
	isPlaying,
	showControls,
	title,
	description,
	onTogglePlay,
}: VideoOverlayProps): React.JSX.Element {
	return (
		<>
			{/* Overlay Gradient */}
			<div
				className={cn(
					'sds:pointer-events-none sds:absolute sds:inset-0 sds:bg-linear-to-t sds:from-black/80 sds:via-transparent sds:to-transparent sds:transition-opacity sds:duration-300',
					showControls ? 'sds:opacity-100' : 'sds:opacity-0',
				)}
			/>

			{/* Center Play Button */}
			{!isPlaying && (
				<div className='sds:absolute sds:inset-0 sds:flex sds:items-center sds:justify-center'>
					<PlayPauseButton
						isPlaying={isPlaying}
						onTogglePlay={onTogglePlay}
						size='lg'
						variant='dark'
						className='sds:backdrop-blur-sm sds:transition-all sds:hover:scale-110'
					/>
				</div>
			)}

			{/* Video Info */}
			{(title ?? description) && (
				<div
					className={cn(
						'sds:absolute sds:top-6 sds:left-6 sds:max-w-md sds:space-y-1 sds:transition-opacity sds:duration-300',
						showControls ? 'sds:opacity-100' : 'sds:opacity-0',
					)}>
					{title && (
						<h3 className='sds:font-sans sds:text-xl sds:font-semibold sds:text-white sds:drop-shadow-lg md:sds:text-2xl'>
							{title}
						</h3>
					)}
					{description && (
						<p className='sds:text-sm sds:text-white/90 sds:drop-shadow-md'>
							{description}
						</p>
					)}
				</div>
			)}
		</>
	);
}

export default VideoOverlay;
