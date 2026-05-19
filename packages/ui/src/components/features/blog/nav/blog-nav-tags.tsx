import {
	BlogNavTagItem,
	BlogNavTags,
	BlogNavTagsList,
	TagMenuItem,
} from '@/components/elements/blog/nav/blog-nav-tags-elements';

interface BlogNavTagsMenuProps {
	tags: BlogNavTagItem[];
	className?: string;
	classes?: {
		list?: string;
		item?: string;
	};
}

function BlogNavTagsMenu({ tags, className, classes }: BlogNavTagsMenuProps) {
	return (
		<BlogNavTags className={className}>
			<BlogNavTagsList className={classes?.list}>
				{tags.map((tag, i) => (
					<TagMenuItem key={i} {...tag} className={classes?.item} />
				))}
			</BlogNavTagsList>
		</BlogNavTags>
	);
}

export { BlogNavTagsMenu };
