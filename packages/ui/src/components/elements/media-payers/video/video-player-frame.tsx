import { cn } from '@/lib/utils';

function VideoPlayerFrame({
	onMouseEnter,
	onMouseLeave,
	className,
	children,
	ref,
}: React.ComponentPropsWithRef<'div'>) {
	return (
		<div
			ref={ref}
			className={cn(
				'sds:group sds:relative sds:flex sds:h-fit sds:min-h-60 sds:w-full sds:flex-col sds:items-center sds:justify-center sds:overflow-hidden sds:rounded-xl sds:bg-black sds:shadow-2xl sds:lg:h-full',
				className,
			)}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}>
			{children}
		</div>
	);
}

export { VideoPlayerFrame };
