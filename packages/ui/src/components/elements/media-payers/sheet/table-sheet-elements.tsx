import { Table, TableBody, TableHeader } from '@/components/core/table';
import { cn } from '@/lib/utils';

function SheetViewerTable({
	className,
	children,
}: React.ComponentProps<typeof Table>) {
	return <Table className={cn(className)}>{children}</Table>;
}

function SheetViewerTableHeader({
	className,
	children,
}: React.ComponentProps<typeof TableHeader>) {
	return <TableHeader className={cn(className)}>{children}</TableHeader>;
}

function SheetViewerTableBody({
	className,
	children,
}: React.ComponentProps<typeof TableBody>) {
	return (
		<TableBody className={cn('sds:border sds:border-border', className)}>
			{children}
		</TableBody>
	);
}

export { SheetViewerTable, SheetViewerTableHeader, SheetViewerTableBody };
