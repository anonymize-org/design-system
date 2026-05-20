import SpinnerLoader from '@/components/elements/loader/spinner';
import { useSheetData } from './hooks/use-sheet-data';
import {
	SheetViewerTable,
	SheetViewerTableBody,
	SheetViewerTableHeader,
} from '@/components/elements/media-payers/sheet/table-sheet-elements';
import { TableCell, TableHead, TableRow } from '@/components/core/table';
import { cn } from '@/lib/utils';
import { ErrorFileFallback } from '@/components/elements/media-payers/shared/file-alert-fallback';

function SheetFileViewer({ file }: { file: File }): React.ReactNode {
	const { data, error } = useSheetData(file);

	if (error) return <ErrorFileFallback />;

	if (!data) return <SpinnerLoader />;

	const headerRow = data.length > 0 ? data[0] : [];
	const bodyRows = data.length > 1 ? data.slice(1) : [];

	return (
		<SheetViewerTable
			className={cn('sds:bg-background sds:w-full sds:border-collapse')}>
			<SheetViewerTableHeader className='sds:sticky sds:top-0 sds:z-10 sds:bg-slate-400/50 sds:backdrop-blur-sm'>
				<TableRow>
					{headerRow.map((cell, i) => (
						<TableHead key={i} className='sds:font-semibold'>
							{cell}
						</TableHead>
					))}
				</TableRow>
			</SheetViewerTableHeader>
			<SheetViewerTableBody>
				{bodyRows.map((row, i) => (
					<TableRow key={i}>
						{row.map((cell, j) => (
							<TableCell key={j} className='sds:text-sm'>
								{cell}
							</TableCell>
						))}
					</TableRow>
				))}
			</SheetViewerTableBody>
		</SheetViewerTable>
	);
}

export { SheetFileViewer };
