import { cn } from '@/lib/utils';

function AccountParagraph({
	children,
	className,
}: React.HTMLAttributes<HTMLParagraphElement>): React.ReactNode {
	return <p className={className}>{children}</p>;
}

interface AccountUserInfoProps {
	name?: string;
	org?: string;
	classes?: {
		name?: string;
		org?: string;
	};
}
function AccountUserInfo({
	name,
	org,
	classes,
}: AccountUserInfoProps): React.ReactNode {
	return (
		<>
			<AccountParagraph
				className={cn(
					'sds:text-sm sds:leading-snug sds:font-semibold',
					classes?.name,
				)}>
				{name}
			</AccountParagraph>
			<AccountParagraph
				className={cn(
					'sds:text-primary sds:font-mono sds:text-xs sds:leading-snug sds:font-medium',
					classes?.org,
				)}>
				{org}
			</AccountParagraph>
		</>
	);
}

export { AccountUserInfo };
