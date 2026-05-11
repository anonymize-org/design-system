import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
	entry: ['src/index.ts', 'src/styles/globals.css'],
	format: ['cjs', 'esm'],
	dts: true,
	treeshake: true,
	external: ['react'],
	clean: true,
	...options,
}));
