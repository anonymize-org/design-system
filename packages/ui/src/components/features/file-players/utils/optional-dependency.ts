const MODULE_NOT_FOUND =
	/cannot find module|failed to resolve module|failed to fetch dynamically imported module|dynamically imported module/i;

/**
 * Turns a failed `import()` of an optional peer dependency into an actionable
 * message, and passes any other failure through untouched.
 */
function optionalDependencyError(pkg: string, err: unknown): Error {
	const message = err instanceof Error ? err.message : String(err);

	if (MODULE_NOT_FOUND.test(message)) {
		return new Error(
			`Preview requires the optional "${pkg}" package. Install it with: npm install ${pkg}`,
		);
	}

	return err instanceof Error ? err : new Error(message);
}

export { optionalDependencyError };
