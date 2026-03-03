import { cn } from '@/lib/utils';
import { FileTextIcon } from 'lucide-react';
import React from 'react';

type Size = 'sm' | 'md' | 'lg' | 'xl';

const sizeMap: Record<Size, number> = {
	sm: 24,
	md: 32,
	lg: 40,
	xl: 48,
};

const getSizeValue = (size: Size | number) => {
	if (typeof size === 'number') {
		return size;
	}
	return sizeMap[size];
};

function FileViewLabel({
	name,
	children,
	className,
}: React.ComponentProps<'span'> & { name?: string }) {
	return (
		<span
			className={cn(
				'sds:truncate sds:font-mono sds:text-xs sds:text-zinc-700 sds:sm:text-sm',
				className,
			)}>
			{name ?? children}
		</span>
	);
}

export interface FileViewIconProps {
	extension: string;
	size?: Size | number;
	classNames?: {
		tag?: string;
		container?: string;
		icon?: string;
	};
}

function FileViewIcon({
	extension,
	size = 'md',
	classNames,
}: React.ComponentPropsWithoutRef<'div'> & FileViewIconProps) {
	const sizeValue = getSizeValue(size);
	return (
		<div className={cn('sds:relative', classNames?.container)}>
			<FileTextIcon
				size={sizeValue}
				className={cn('sds:stroke-1', classNames?.icon)}
			/>
			{extension.length > 0 ? (
				<div
					className={cn(
						'sds:absolute sds:top-0 sds:-left-1 sds:flex sds:items-center sds:justify-center sds:border-solid sds:bg-white sds:px-1 sds:font-semibold',
						classNames?.tag,
					)}
					style={{
						fontSize: sizeValue / 5,
						borderRadius: sizeValue / 15,
						paddingTop: sizeValue / 40,
						paddingBottom: sizeValue / 40,
						borderWidth: sizeValue / 30,
					}}>
					{extension}
				</div>
			) : null}{' '}
		</div>
	);
}

function FileViewContainer({
	children,
	disabled,
}: React.PropsWithChildren<{ disabled?: boolean }>) {
	return (
		<div
			className={cn(
				'sds:flex sds:items-center sds:gap-2',
				disabled && 'sds:pointer-events-none sds:opacity-50',
			)}>
			{children}
		</div>
	);
}

const FileView = Object.assign(FileViewContainer, {
	Icon: FileViewIcon,
	Label: FileViewLabel,
});

export { FileView, FileViewIcon, FileViewLabel };
