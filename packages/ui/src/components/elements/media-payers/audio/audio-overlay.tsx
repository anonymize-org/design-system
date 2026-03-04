import { Title } from '../../typo/title';

interface AudioOverlayProps {
	track: {
		title: string;
		type: string;
	};
}

function AudioOverlay({ track }: AudioOverlayProps): React.JSX.Element {
	return (
		<div className='sds:via-primary sds:to-primary/80 sds:from-primary/40 sds:relative sds:overflow-hidden sds:rounded-2xl sds:bg-linear-to-br sds:shadow-2xl sds:backdrop-blur-sm'>
			<div className='sds:relative sds:p-6 md:sds:p-8 lg:sds:p-10'>
				{/* Content */}

				<div className='sds:mb-8 sds:flex sds:h-40 sds:flex-col sds:items-center sds:gap-6 md:sds:flex-row md:sds:items-start'>
					<div className='sds:flex-1 sds:space-y-2 sds:text-center md:sds:text-left'>
						<Title variant={'h2'} className='sds:text-primary-foreground/80'>
							{track.title}
						</Title>
						<Title variant={'h4'} className='sds:text-primary-foreground/80'>
							{track.type}
						</Title>
					</div>
				</div>
			</div>
		</div>
	);
}

export { AudioOverlay };
