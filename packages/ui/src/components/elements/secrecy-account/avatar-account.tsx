import { Avatar, AvatarFallback, AvatarImage } from '@/components/core/avatar';
import { cn } from '@/lib/utils';

function AvatarOverlay({ className }: { className?: string }) {
	return (
		<span
			className={cn(
				'sds:bg-primary/70 sds:absolute sds:top-0 sds:left-0 sds:h-0 sds:w-full sds:origin-top sds:backdrop-blur-xs sds:transition-all sds:duration-400 sds:group-hover:top-full sds:group-hover:h-full',
				className,
			)}
		/>
	);
}

export interface AvatarAccountProps {
	avatar: {
		src?: string;
		fallback: string;
	};
	className?: string;
	withAnimation?: boolean;
	classes?: {
		img?: string;
		fallback?: string;
	};
}

function AvatarAccount({
	avatar,
	className,
	withAnimation = true,
	classes,
}: AvatarAccountProps): React.ReactNode {
	return (
		<Avatar
			className={cn(
				'sds:border-primary/20 sds:border',
				withAnimation &&
					'sds:group sds:hover:sds:border-primary/50 sds:relative sds:cursor-pointer sds:overflow-hidden sds:transition-all sds:duration-400',
				className,
			)}>
			{withAnimation && <AvatarOverlay />}
			<AvatarImage src={avatar.src ?? undefined} className={classes?.img} />
			<AvatarFallback
				className={cn('sds:font-sans-geist sds:text-sm', classes?.fallback)}>
				{avatar.fallback}
			</AvatarFallback>
		</Avatar>
	);
}

export { AvatarAccount };
