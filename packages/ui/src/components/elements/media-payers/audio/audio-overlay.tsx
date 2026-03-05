import { cn } from '@/lib/utils';

function AudioOverlay({
	children,
	className,
	...props
}: React.ComponentPropsWithoutRef<'div'>) {
	return (
		<div
			className={cn(
				'sds:via-primary/50 sds:to-primary sds:from-primary/25 sds:relative sds:overflow-hidden sds:rounded-2xl sds:bg-radial sds:shadow-2xl sds:backdrop-blur-sm',
				className,
			)}
			{...props}>
			<div className='sds:relative sds:p-4 md:sds:p-8 lg:sds:p-10'>
				{children}
			</div>
		</div>
	);
}

export { AudioOverlay };
