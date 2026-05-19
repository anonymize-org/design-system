'use client';

import { Check } from 'lucide-react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../../core/dialog';
import { Button } from '../../core/button';

import { JSX } from 'react/jsx-dev-runtime';
import { cn } from '@/lib/utils';

type ButtonProps = React.ComponentProps<typeof Button>;

interface DialogLangFlagItemProps {
	onFlagClick: () => void;
	label: string | React.ReactNode;
	isActive?: boolean;
	className?: string;
	size?: ButtonProps['size'];
	variant?: ButtonProps['variant'];
}

function DialogLangFlagItem({
	onFlagClick,
	label,
	isActive,
	className,
	size = 'sm',
	variant = 'outline',
}: DialogLangFlagItemProps): JSX.Element {
	return (
		<Button
			variant={variant}
			size={size}
			className={cn('sds:justify-between sds:flex', className)}
			onClick={onFlagClick}>
			{label}
			{isActive && <Check className='sds:h-4 sds:w-4' />}
		</Button>
	);
}

export interface DialogLanguageSelectorUIProps {
	trigger: React.ReactNode;
	children: React.ReactNode;
	className?: string;
	classes?: {
		content?: string;
		title?: string;
		description?: string;
	};
}

type DiaogProps = React.ComponentProps<typeof Dialog>;

function DialogLanguageSelectorUI({
	trigger,
	open,
	onOpenChange,
	children,
	className,
	classes,
	...props
}: DialogLanguageSelectorUIProps & DiaogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange} {...props}>
			<DialogTrigger asChild className={className}>
				{' '}
				{trigger}
			</DialogTrigger>
			<DialogContent className={cn('sds:sm:max-w-xs', classes?.content)}>
				<DialogHeader>
					<DialogTitle className={classes?.title}>
						Choose your language
					</DialogTitle>
					<DialogDescription className={classes?.description}>
						Select the language you&apos;d like to use.
					</DialogDescription>
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	);
}

export { DialogLanguageSelectorUI, DialogLangFlagItem };
