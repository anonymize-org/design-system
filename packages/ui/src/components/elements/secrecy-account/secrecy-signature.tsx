import { cn } from '@/lib/utils';
import { SecrecyIcon } from '../svg';

function SecrecySignature({
	className,
	classes,
	text = 'Secured by',
}: {
	className?: string;
	classes?: {
		img?: string;
	};
	text?: string;
}): React.ReactNode {
	return (
		<div
			className={cn(
				'sds:bg-accent sds:flex sds:h-8 sds:w-full sds:items-center sds:justify-center sds:gap-1 sds:p-4',
				className,
			)}>
			{text && (
				<span className='sds:text-muted-foreground sds:text-xs'>{text}</span>
			)}
			<SecrecyIcon className={cn('sds:h-4 sds:w-4', classes?.img)} />
			<span className='sds:text-sm'>Secrecy</span>
		</div>
	);
}

export { SecrecySignature };
