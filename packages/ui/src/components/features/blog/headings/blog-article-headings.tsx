import {
	BlogArticleHeadLinesDescription,
	BlogArticleHeadLinesRoot,
	BlogArticleHeadLinesSubTitle,
	BlogArticleHeadLinesTitle,
} from '@/components/elements/blog/heading/blog-article-headings-elements';

interface BlogArticleHeadingsProps {
	title: string;
	subTitle?: string;
	description?: string;
	className?: string;
	classes?: {
		title?: string;
		subTitle?: string;
		description?: string;
	};
}

function BlogArticleHeadings({
	title,
	subTitle,
	description,
	className,
	classes,
}: BlogArticleHeadingsProps): React.ReactNode {
	return (
		<BlogArticleHeadLinesRoot className={className}>
			<BlogArticleHeadLinesTitle className={classes?.title}>
				{title}
			</BlogArticleHeadLinesTitle>
			{subTitle && (
				<BlogArticleHeadLinesSubTitle className={classes?.subTitle}>
					{subTitle}
				</BlogArticleHeadLinesSubTitle>
			)}
			{description && (
				<BlogArticleHeadLinesDescription className={classes?.description}>
					{description}
				</BlogArticleHeadLinesDescription>
			)}
		</BlogArticleHeadLinesRoot>
	);
}

export { BlogArticleHeadings };
