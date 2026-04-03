import {
	AsideBlogPostAnchorUI,
	BlogPostAnchor,
	BlogPostAnchorType,
} from '@/components/elements/blog/aside/aside-blog-post-anchor-elements';

interface AsideBlogPostAnchorProps {
	title: string;
	list?: BlogPostAnchorType[];
	className?: string;
	classes?: {
		title?: string;
		anchor?: string;
		anchorTitle?: string;
	};
}

function AsideBlogPostAnchor({
	title,
	list,
	className,
	classes,
}: AsideBlogPostAnchorProps): React.ReactNode {
	return (
		<AsideBlogPostAnchorUI
			title={title}
			className={className}
			classes={{
				title: classes?.title,
			}}>
			{list?.map((item) => (
				<BlogPostAnchor
					key={item.href}
					{...item}
					className={classes?.anchor}
					classes={{
						title: classes?.anchorTitle,
					}}
				/>
			))}
		</AsideBlogPostAnchorUI>
	);
}

export { AsideBlogPostAnchor };
