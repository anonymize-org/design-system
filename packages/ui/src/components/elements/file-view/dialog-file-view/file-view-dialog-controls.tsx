'use client';

import { Button } from '@/components/core/button';
import { cn } from '@/lib/utils';
import { DownloadIcon, ZoomIn, ZoomOut } from 'lucide-react';

interface ControlsImageFileProps {
	zoom: number;
	onZoomIn: () => void;
	onZoomOut: () => void;
	className?: string;
}

function ControlsImageFile({
	zoom,
	onZoomIn,
	onZoomOut,
	className,
}: ControlsImageFileProps): React.ReactNode {
	return (
		<div className={cn('sds:flex sds:items-center sds:gap-2', className)}>
			<Button
				variant='outline'
				size='icon'
				onClick={onZoomOut}
				disabled={zoom <= 50}>
				<ZoomOut />
			</Button>
			<span className='sds:text-muted-foreground sds:min-w-12 sds:text-center sds:text-sm'>
				{zoom}%
			</span>
			<Button
				variant='outline'
				size='icon'
				onClick={onZoomIn}
				disabled={zoom >= 200}>
				<ZoomIn />
			</Button>
		</div>
	);
}

function DownloadButton({
	...props
}: React.ComponentProps<typeof Button>): React.ReactNode {
	return (
		<Button variant='outline' size='icon' {...props}>
			<DownloadIcon />
		</Button>
	);
}

export { ControlsImageFile, DownloadButton };
