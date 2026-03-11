import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';

interface SpinnerLoaderProps {
	withText?: boolean;
	className?: string;
	classes?: {
		loader?: string;
		text?: string;
	};
}

function SpinnerLoader({
	withText = false,
	className,
	classes,
}: SpinnerLoaderProps): React.ReactNode {
	return (
		<div
			className={cn(
				'sds:flex sds:flex-col sds:items-center sds:justify-center sds:gap-1',
				className,
			)}>
			<Loader
				className={cn(
					'sds:animate-spin sds:text-muted-foreground',
					classes?.loader,
				)}
			/>
			{withText && (
				<p
					className={cn(
						'sds:text-muted-foreground sds:text-xs',
						classes?.text,
					)}>
					Loading...
				</p>
			)}
		</div>
	);
}

export default SpinnerLoader;
