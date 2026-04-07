import { AnchorText } from '@/components/elements/anchor-text';
import {
	BlogPostCardContent,
	BlogPostCardBottom,
	BlogPostCardContainer,
	BlogPostCardWrapper,
	BlogPostCardBody,
	BlogPostCardHeader,
	TagCard,
	BlogPostCardContainerProps,
} from '@/components/elements/blog/card/blog-post-card-elements';

interface BlogPostCardProps {
	tagLabel?: string;
	img: {
		src: string;
		width?: number;
		height?: number;
	};
	title: string;
	description: string;
	text: string;
	link?: {
		href: string;
		label: string;
	};
	className?: string;
	classes?: {
		img?: string;
		header?: string;
		content?: string;
		bottom?: string;
		anchor?: string;
	};
	size?: BlogPostCardContainerProps['size'];
}

function BlogPostCard({
	tagLabel,
	img,
	title,
	description,
	text,
	link,
	className,
	classes,
	size,
}: BlogPostCardProps): React.ReactNode {
	return (
		<BlogPostCardWrapper>
			{tagLabel && <TagCard tag={tagLabel} />}

			<BlogPostCardContainer className={className} size={size}>
				<BlogPostCardHeader
					src={img.src}
					width={img.width}
					height={img.height}
					className={classes?.header}
				/>

				<BlogPostCardContent className={classes?.content}>
					<BlogPostCardBody
						title={title}
						description={description}
						text={text}
					/>
				</BlogPostCardContent>
				{link && (
					<BlogPostCardBottom className={classes?.bottom}>
						<AnchorText href={link.href} className={classes?.anchor}>
							{link.label}
						</AnchorText>
					</BlogPostCardBottom>
				)}
			</BlogPostCardContainer>
		</BlogPostCardWrapper>
	);
}

export { BlogPostCard };
