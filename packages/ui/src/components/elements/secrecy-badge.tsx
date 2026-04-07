import { cn } from '@/lib/utils';
import { HTMLAttributeAnchorTarget } from 'react';
import { SecrecyLongLogo } from './svg/secrecy-long-logo';

function BadgeDot({
	className,
	classes,
}: {
	className?: string;
	classes?: {
		innerDot?: string;
		outterDot?: string;
	};
}): React.ReactNode {
	return (
		<span className={cn('sds:relative sds:flex sds:h-2 sds:w-2', className)}>
			<span
				className={cn(
					'sds:bg-primary sds:absolute sds:inline-flex sds:h-full sds:w-full sds:animate-ping sds:rounded-full sds:opacity-75',
					classes?.outterDot,
				)}
			/>
			<span
				className={cn(
					'sds:bg-primary sds:relative sds:inline-flex sds:h-2 sds:w-2 sds:rounded-full',
					classes?.innerDot,
				)}
			/>
		</span>
	);
}

function BadgeRoot({
	className,
	...props
}: React.ComponentProps<'div'>): React.ReactNode {
	return (
		<div
			className={cn(
				'sds:bg-primary/10 sds:text-primary sds:inline-flex sds:items-center sds:gap-2 sds:rounded-full sds:px-4 sds:py-2 sds:text-center sds:text-sm sds:font-medium sds:backdrop-blur-xs',
				className,
			)}
			{...props}
		/>
	);
}

function BadgeLogo({
	anchorProps,
	className,
	classes,
}: {
	anchorProps?: Omit<React.ComponentProps<'a'>, 'className'>;
	className?: string;
	classes?: string;
}): React.ReactNode {
	const logo = (
		<SecrecyLongLogo
			className={cn(
				'sds:inline-block sds:h-6 sds:w-auto sds:align-middle',
				classes,
			)}
		/>
	);

	if (!anchorProps?.href) {
		return logo;
	}

	return (
		<a
			className={cn(
				'sds:text-primary sds:hover:text-primary/80 sds:font-mono sds:font-semibold sds:underline sds:hover:underline',
				className,
			)}
			{...anchorProps}>
			<SecrecyLongLogo
				className={cn(
					'sds:inline-block sds:h-6 sds:w-auto sds:align-middle sds:transition-all sds:duration-200 sds:hover:scale-105 sds:hover:brightness-110',
					classes,
				)}
			/>
		</a>
	);
}

export function SecrecyBadge({
	href,
	target,
	rel,
	className,
	children,
	classes,
}: {
	href?: string;
	target?: HTMLAttributeAnchorTarget | undefined;
	rel?: string;
	children?: React.ReactNode | string;
	className?: string;
	classes?: {
		dot?: {
			innerDot?: string;
			outterDot?: string;
		};
		logo?: string;
	};
}): React.ReactNode {
	return (
		<BadgeRoot className={className}>
			<BadgeDot classes={classes?.dot} />
			{children}
			<BadgeLogo anchorProps={{ href, target, rel }} classes={classes?.logo} />
		</BadgeRoot>
	);
}
