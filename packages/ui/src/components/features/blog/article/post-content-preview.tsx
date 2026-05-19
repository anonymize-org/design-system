import MDEditor from '@uiw/react-md-editor';
import React from 'react';

function BlogPostArticlePreview({
	body,
	style,
}: {
	body: string;
	style?: React.CSSProperties;
}): React.ReactNode {
	return (
		<MDEditor.Markdown
			source={body}
			style={{
				whiteSpace: 'pre-wrap',
				backgroundColor: 'transparent',
				color: 'black',
				...style,
			}}
		/>
	);
}
export { BlogPostArticlePreview };
