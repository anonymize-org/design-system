import { cn } from '@/lib/utils';
import {
	FileView,
	FileViewIconProps,
} from '../../elements/file-view/file-view-item-elements';
import { getTailwindClass } from './utils/file-color';
import { getFontSizeClass, getSizeValue, Size } from './utils/file-size-ui';

interface FileViewItemProps {
	extension: FileViewIconProps['extension'];
	size: FileViewIconProps['size'] | Size;
	label?: string;
	classes?: {
		tag?: string;
		icon?: string;
		label?: string;
	};
}

function FileViewItem({
	extension,
	size,
	label,
	classes,
	...props
}: React.ComponentPropsWithoutRef<'div'> & FileViewItemProps) {
	const colorsClass = getTailwindClass(extension);
	const sizeValue = getSizeValue(size);
	const fontSizeClass = getFontSizeClass(size);
	return (
		<FileView {...props}>
			<FileView.Icon
				extension={extension}
				size={sizeValue}
				classes={{
					tag: cn(colorsClass, classes?.tag),
					icon: cn(colorsClass, classes?.icon),
				}}
			/>
			{label ? (
				<FileView.Label className={cn(fontSizeClass, classes?.label)}>
					{label}
				</FileView.Label>
			) : null}
		</FileView>
	);
}

export default FileViewItem;
