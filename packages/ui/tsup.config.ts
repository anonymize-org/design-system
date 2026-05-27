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
	splitting: false,
	external: ['react', 'mammoth', 'shiki', 'xlsx'],
	clean: true,
	...options,
}));
