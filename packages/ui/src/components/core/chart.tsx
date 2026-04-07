'use client';

import * as React from 'react';
import * as RechartsPrimitive from 'recharts';

import { cn } from '@/lib/utils';

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: '', dark: '.dark' } as const;

export type ChartConfig = {
	[k in string]: {
		label?: React.ReactNode;
		icon?: React.ComponentType;
	} & (
		| { color?: string; theme?: never }
		| { color?: never; theme: Record<keyof typeof THEMES, string> }
	);
};

type ChartContextProps = {
	config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
	const context = React.useContext(ChartContext);

	if (!context) {
		throw new Error('useChart must be used within a <ChartContainer />');
	}

	return context;
}

function ChartContainer({
	id,
	className,
	children,
	config,
	...props
}: React.ComponentProps<'div'> & {
	config: ChartConfig;
	children: React.ComponentProps<
		typeof RechartsPrimitive.ResponsiveContainer
	>['children'];
}) {
	const uniqueId = React.useId();
	const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`;

	return (
		<ChartContext.Provider value={{ config }}>
			<div
				data-slot='chart'
				data-chart={chartId}
				className={cn(
					'sds:flex sds:aspect-video sds:justify-center sds:text-xs sds:[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground sds:[&_.recharts-cartesian-grid_line[stroke=#ccc]]:stroke-border/50 sds:[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border sds:[&_.recharts-dot[stroke=#fff]]:stroke-transparent sds:[&_.recharts-layer]:outline-hidden sds:[&_.recharts-polar-grid_[stroke=#ccc]]:stroke-border sds:[&_.recharts-radial-bar-background-sector]:fill-muted sds:[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted sds:[&_.recharts-reference-line_[stroke=#ccc]]:stroke-border sds:[&_.recharts-sector]:outline-hidden sds:[&_.recharts-sector[stroke=#fff]]:stroke-transparent sds:[&_.recharts-surface]:outline-hidden',
					className,
				)}
				{...props}>
				<ChartStyle id={chartId} config={config} />
				<RechartsPrimitive.ResponsiveContainer>
					{children}
				</RechartsPrimitive.ResponsiveContainer>
			</div>
		</ChartContext.Provider>
	);
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
	const colorConfig = Object.keys(config)
		.map((key) => [key, config[key]] as const)
		.filter(([, config]) => config.theme || config.color);

	if (!colorConfig.length) {
		return null;
	}

	return (
		<style
			dangerouslySetInnerHTML={{
				__html: Object.keys(THEMES)
					.map((theme) => {
						const prefix = THEMES[theme as keyof typeof THEMES];
						return `
${prefix} [data-chart=${id}] {
${colorConfig
	.map(([key, itemConfig]) => {
		const color =
			itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
			itemConfig.color;
		return color ? `  --color-${key}: ${color};` : null;
	})
	.join('\n')}
}
`;
					})
					.join('\n'),
			}}
		/>
	);
};

const ChartTooltip = RechartsPrimitive.Tooltip;

function ChartTooltipContent({
	active,
	payload,
	className,
	indicator = 'dot',
	hideLabel = false,
	hideIndicator = false,
	label,
	labelFormatter,
	labelClassName,
	formatter,
	color,
	nameKey,
	labelKey,
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
	React.ComponentProps<'div'> & {
		hideLabel?: boolean;
		hideIndicator?: boolean;
		indicator?: 'line' | 'dot' | 'dashed';
		nameKey?: string;
		labelKey?: string;
	}) {
	const { config } = useChart();

	const tooltipLabel = React.useMemo(() => {
		if (hideLabel || !payload?.length) {
			return null;
		}

		const [item] = payload;
		const key = `${labelKey || item?.dataKey || item?.name || 'value'}`;
		const itemConfig = getPayloadConfigFromPayload(config, item, key);
		const value =
			!labelKey && typeof label === 'string'
				? config[label as keyof typeof config]?.label || label
				: itemConfig?.label;

		if (labelFormatter) {
			return (
				<div className={cn('sds:font-medium', labelClassName)}>
					{labelFormatter(value, payload)}
				</div>
			);
		}

		if (!value) {
			return null;
		}

		return <div className={cn('sds:font-medium', labelClassName)}>{value}</div>;
	}, [
		label,
		labelFormatter,
		payload,
		hideLabel,
		labelClassName,
		config,
		labelKey,
	]);

	if (!active || !payload?.length) {
		return null;
	}

	const nestLabel = payload.length === 1 && indicator !== 'dot';

	return (
		<div
			className={cn(
				'sds:grid sds:min-w-[8rem] sds:items-start sds:gap-1.5 sds:rounded-lg sds:border sds:border-border/50 sds:bg-background sds:px-2.5 sds:py-1.5 sds:text-xs sds:shadow-xl',
				className,
			)}>
			{!nestLabel ? tooltipLabel : null}
			<div className='sds:grid sds:gap-1.5'>
				{payload
					.filter((item) => item.type !== 'none')
					.map((item, index) => {
						const key = `${nameKey || item.name || item.dataKey || 'value'}`;
						const itemConfig = getPayloadConfigFromPayload(config, item, key);
						const indicatorColor = color || item.payload.fill || item.color;

						return (
							<div
								key={item.dataKey}
								className={cn(
									'sds:flex sds:w-full sds:flex-wrap sds:items-stretch sds:gap-2 sds:[&>svg]:h-2.5 sds:[&>svg]:w-2.5 sds:[&>svg]:text-muted-foreground',
									indicator === 'dot' && 'sds:items-center',
								)}>
								{formatter && item?.value !== undefined && item.name ? (
									formatter(item.value, item.name, item, index, item.payload)
								) : (
									<>
										{itemConfig?.icon ? (
											<itemConfig.icon />
										) : (
											!hideIndicator && (
												<div
													className={cn(
														'sds:shrink-0 sds:rounded-[2px] sds:border-(--color-border) sds:bg-(--color-bg)',
														{
															'h-2.5 w-2.5': indicator === 'dot',
															'w-1': indicator === 'line',
															'w-0 border-[1.5px] border-dashed bg-transparent':
																indicator === 'dashed',
															'my-0.5': nestLabel && indicator === 'dashed',
														},
													)}
													style={
														{
															'--color-bg': indicatorColor,
															'--color-border': indicatorColor,
														} as React.CSSProperties
													}
												/>
											)
										)}
										<div
											className={cn(
												'sds:flex sds:flex-1 sds:justify-between sds:leading-none',
												nestLabel ? 'sds:items-end' : 'sds:items-center',
											)}>
											<div className='sds:grid sds:gap-1.5'>
												{nestLabel ? tooltipLabel : null}
												<span className='sds:text-muted-foreground'>
													{itemConfig?.label || item.name}
												</span>
											</div>
											{item.value && (
												<span className='sds:font-mono sds:font-medium sds:text-foreground sds:tabular-nums'>
													{item.value.toLocaleString()}
												</span>
											)}
										</div>
									</>
								)}
							</div>
						);
					})}
			</div>
		</div>
	);
}

const ChartLegend = RechartsPrimitive.Legend;

function ChartLegendContent({
	className,
	hideIcon = false,
	payload,
	verticalAlign = 'bottom',
	nameKey,
}: React.ComponentProps<'div'> &
	Pick<RechartsPrimitive.LegendProps, 'payload' | 'verticalAlign'> & {
		hideIcon?: boolean;
		nameKey?: string;
	}) {
	const { config } = useChart();

	if (!payload?.length) {
		return null;
	}

	return (
		<div
			className={cn(
				'sds:flex sds:items-center sds:justify-center sds:gap-4',
				verticalAlign === 'top' ? 'sds:pb-3' : 'sds:pt-3',
				className,
			)}>
			{payload
				.filter((item) => item.type !== 'none')
				.map((item) => {
					const key = `${nameKey || item.dataKey || 'value'}`;
					const itemConfig = getPayloadConfigFromPayload(config, item, key);

					return (
						<div
							key={item.value}
							className={cn(
								'sds:flex sds:items-center sds:gap-1.5 sds:[&>svg]:h-3 sds:[&>svg]:w-3 sds:[&>svg]:text-muted-foreground',
							)}>
							{itemConfig?.icon && !hideIcon ? (
								<itemConfig.icon />
							) : (
								<div
									className='sds:h-2 sds:w-2 sds:shrink-0 sds:rounded-[2px]'
									style={{
										backgroundColor: item.color,
									}}
								/>
							)}
							{itemConfig?.label}
						</div>
					);
				})}
		</div>
	);
}

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
	config: ChartConfig,
	payload: unknown,
	key: string,
) {
	if (typeof payload !== 'object' || payload === null) {
		return undefined;
	}

	const payloadPayload =
		'payload' in payload &&
		typeof payload.payload === 'object' &&
		payload.payload !== null
			? payload.payload
			: undefined;

	let configLabelKey: string = key;

	if (
		key in payload &&
		typeof payload[key as keyof typeof payload] === 'string'
	) {
		configLabelKey = payload[key as keyof typeof payload] as string;
	} else if (
		payloadPayload &&
		key in payloadPayload &&
		typeof payloadPayload[key as keyof typeof payloadPayload] === 'string'
	) {
		configLabelKey = payloadPayload[
			key as keyof typeof payloadPayload
		] as string;
	}

	return configLabelKey in config
		? config[configLabelKey]
		: config[key as keyof typeof config];
}

export {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	ChartLegend,
	ChartLegendContent,
	ChartStyle,
};
