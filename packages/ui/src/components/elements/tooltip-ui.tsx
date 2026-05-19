import { Tooltip, TooltipContent, TooltipTrigger } from '../core/tooltip';

interface TooltipUIProps {
	children: React.ReactNode;
	description: string | React.ReactNode;
	triggerProps?: React.ComponentProps<typeof TooltipTrigger>;
	contentProps?: React.ComponentProps<typeof TooltipContent>;
}

function TooltipUI({
	children,
	description,
	triggerProps,
	contentProps,
	...tooltipProps
}: React.PropsWithChildren<TooltipUIProps> &
	React.ComponentProps<typeof Tooltip>): React.ReactNode {
	return (
		<Tooltip {...tooltipProps}>
			<TooltipTrigger {...triggerProps}>{children}</TooltipTrigger>
			<TooltipContent {...contentProps}>{description}</TooltipContent>
		</Tooltip>
	);
}

export { TooltipUI };
