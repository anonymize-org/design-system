import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
	entry: [
		'src/**/*.ts',
		'src/**/*.tsx',
		'!src/**/*.d.ts',
		'src/styles/globals.css',
	],
	format: ['cjs', 'esm'],
	dts: true,
	treeshake: true,
	splitting: true,
	// `react` is always provided by the host app. `mammoth`, `shiki` and
	// `@office-kit/xlsx` are declared as optional peer dependencies: keeping them
	// external means consumers who never open a docx/code/spreadsheet file pay
	// nothing, and consumers who do control the version they resolve.
	//
	// `@office-kit/xlsx` has no root barrel, so the bare name alone would miss the
	// `/io` and `/worksheet` entries the sheet viewer actually imports.
	//
	// `file-type` is deliberately absent here so it stays bundled: `detectMediaType`
	// runs on every file open, so making it a peer would break the core path rather
	// than a single viewer, and at 148 KB it is cheap to ship.
	external: [
		'react',
		'mammoth',
		'shiki',
		'@office-kit/xlsx',
		/^@office-kit\/xlsx\//,
	],
	clean: true,
	...options,
}));
