import { cn } from '@/lib/utils';
import { FileTextIcon } from 'lucide-react';
import React from 'react';

function FileViewLabel({
	name,
	children,
	...props
}: React.ComponentPropsWithoutRef<'span'> & { name?: string }) {
	return (
		<span
			className={cn(
				'sds:truncate sds:font-mono sds:text-accent-foreground/80 sds:text-sm sds:sm:text-base',
				props.className,
			)}
			{...props}>
			{name ?? children}
		</span>
	);
}

export interface FileViewIconProps {
	extension: string;
	size: number;
	classes?: {
		tag?: string;
		icon?: string;
	};
}

function FileViewIcon({
	extension,
	size = 32,
	classes,
	...props
}: React.ComponentPropsWithoutRef<'div'> & FileViewIconProps) {
	return (
		<div className={cn('sds:relative', props.className)} {...props}>
			<FileTextIcon size={size} className={cn('sds:stroke-1', classes?.icon)} />
			{extension.length > 0 ? (
				<div
					className={cn(
						'sds:absolute sds:top-0 sds:-left-1 sds:flex sds:items-center sds:justify-center sds:border-solid sds:bg-white sds:px-1 sds:font-semibold',
						classes?.tag,
					)}
					style={{
						fontSize: size / 5,
						borderRadius: size / 15,
						paddingTop: size / 40,
						paddingBottom: size / 40,
						borderWidth: size / 30,
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
	...props
}: React.PropsWithChildren<{ disabled?: boolean }> &
	React.ComponentPropsWithoutRef<'div'>) {
	return (
		<div
			className={cn(
				'sds:flex sds:items-center sds:gap-2',
				disabled && 'sds:pointer-events-none sds:opacity-50',
				props.className,
			)}
			{...props}>
			{children}
		</div>
	);
}

const FileView = Object.assign(FileViewContainer, {
	Icon: FileViewIcon,
	Label: FileViewLabel,
});

export { FileView, FileViewIcon, FileViewLabel };
