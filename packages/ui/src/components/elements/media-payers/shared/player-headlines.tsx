import { cn } from '@/lib/utils';
import { Title } from '../../typo/title';

export const PlayerHeadlines = ({
	title,
	description,
	className,
	withBackdrop = false,
}: {
	title?: string;
	description?: string;
	className?: string;
	withBackdrop?: boolean;
}) => {
	return (
		<div
			className={cn(
				withBackdrop &&
					'sds:rounded-lg sds:bg-zinc-500/5 sds:px-4 sds:py-3 sds:backdrop-blur-xs',
				className,
			)}>
			<Title
				variant={'h4'}
				className='sds:text-primary-foreground sds:text-lg sds:drop-shadow-md'>
				{title}
			</Title>
			<p className='sds:text-primary-foreground/90 sds:text-sm sds:drop-shadow-md sm:sds:text-base'>
				{description}
			</p>
		</div>
	);
};
