import {
	BlogHeadingTitle,
	BlogHeadingDescription,
	BlogHeadingTitleVariant,
} from '@/components/elements/blog/heading/blog-post-heading-elements';
import { SecrecyBadge } from '@/components/elements/secrecy-badge';
import { cn } from '@/lib/utils';

interface BlogPostHeadingProps {
	title: string;
	variant?: BlogHeadingTitleVariant;
	description?: string;
	badgeLabel?: string;
	className?: string;
	classes?: {
		badge?: string;
		title?: string;
		description?: string;
	};
}

function BlogPostHeading({
	className,
	classes,
	title,
	description,
	badgeLabel,
	variant,
}: BlogPostHeadingProps): React.ReactNode {
	return (
		<div
			className={cn(
				'sds:flex sds:flex-col sds:items-center sds:gap-4 sds:text-center',
				className,
			)}>
			{badgeLabel && (
				<SecrecyBadge className={classes?.badge}>{badgeLabel}</SecrecyBadge>
			)}
			<BlogHeadingTitle className={classes?.title} variant={variant}>
				{title}
			</BlogHeadingTitle>
			{description && (
				<BlogHeadingDescription className={classes?.description}>
					{description}
				</BlogHeadingDescription>
			)}
		</div>
	);
}

export { BlogPostHeading };
