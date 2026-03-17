import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

const AudioOverlayVariants = cva(
	'sds:via-primary/50 sds:to-primary sds:from-primary/25 sds:overflow-hidden sds:bg-radial sds:backdrop-blur-sm',
	{
		variants: {
			fullScreen: {
				true: 'sds:h-screen sds:w-full sds:rounded-none',
				false: 'sds:h-fit sds:w-full sds:rounded-xl sds:shadow',
			},
		},
		defaultVariants: {
			fullScreen: false,
		},
	},
);

interface AudioOverlayProps extends React.ComponentPropsWithoutRef<'div'> {
	classes?: {
		content?: string;
	};
	fullScreen?: boolean;
}

function AudioOverlay({
	children,
	className,
	classes,
	fullScreen = false,
	...props
}: AudioOverlayProps): React.ReactNode {
	return (
		<div
			className={cn(AudioOverlayVariants({ fullScreen }), className)}
			{...props}>
			<div
				className={cn(
					'sds:relative sds:h-full sds:w-full sds:p-4 sds:md:p-8',
					classes?.content,
				)}>
				{children}
			</div>
		</div>
	);
}

export { AudioOverlay };
