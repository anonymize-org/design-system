import { Minimize } from 'lucide-react';
import { Button } from '../core/button';
import { cn } from '@/lib/utils';

interface FullScreenControlProps {
	className?: string;
	classes?: {
		button?: string;
	};
	onClick?: () => void;
}

function FullScreenControl({
	className,
	classes,
	onClick,
}: FullScreenControlProps): React.ReactNode {
	return (
		<div
			className={cn(
				'sds:border-border/80 sds:bg-background/90 sds:supports-backdrop-filter:bg-background/70 sds:absolute sds:right-5 sds:bottom-5 sds:z-10000 sds:rounded-full sds:border sds:shadow-xl sds:backdrop-blur',
				className,
			)}>
			<Button
				size={'icon-lg'}
				variant={'ghost'}
				className={cn(
					'sds:text-foreground sds:hover:bg-muted/80 sds:rounded-full',
					classes?.button,
				)}
				onClick={onClick}>
				<Minimize />
			</Button>
		</div>
	);
}

function FullScreenOverlay({
	children,
	className,
	...props
}: React.ComponentProps<'div'>): React.ReactNode {
	return (
		<div
			className={cn(
				'sds:absolute sds:inset-0 sds:h-dvh sds:w-screen',
				className,
			)}
			{...props}>
			{children}
		</div>
	);
}

interface FullScreenViewerMode {
	children: React.ReactNode;
	onClose?: () => void;
	classes?: {
		container?: string;
		button?: string;
		overlay?: string;
	};
}

function FileViewerFullScreenMode({
	children,
	onClose,
	classes,
}: FullScreenViewerMode): React.ReactNode {
	return (
		<div className={cn('sds:fixed sds:inset-0 sds:z-9999', classes?.container)}>
			<FullScreenOverlay className={classes?.overlay}>
				{children}
			</FullScreenOverlay>

			<FullScreenControl
				onClick={onClose}
				classes={{ button: classes?.button }}
			/>
		</div>
	);
}

export default FileViewerFullScreenMode;
