const MODULE_NOT_FOUND =
	/cannot find module|failed to resolve module|failed to fetch dynamically imported module|dynamically imported module/i;

/**
 * Per-package install guidance, for peers where `npm install <pkg>` is not the
 * whole story.
 *
 * `xlsx` is the one case: SheetJS stopped publishing to the npm registry after
 * 0.18.5 and treats its own CDN as the authoritative source, so the registry
 * copy is permanently out of date. Which build to use — and how to read the
 * advisories filed against 0.18.5, which SheetJS disputes — is the consumer's
 * call, so point at the upstream docs rather than prescribing a package here.
 */
const INSTALL_HINT: Record<string, string> = {
	xlsx: 'The npm registry copy is frozen at 0.18.5; see https://docs.sheetjs.com/docs/getting-started/installation/nodejs for current releases and security notes.',
};

/**
 * Turns a failed `import()` of an optional peer dependency into an actionable
 * message, and passes any other failure through untouched.
 */
function optionalDependencyError(pkg: string, err: unknown): Error {
	const message = err instanceof Error ? err.message : String(err);

	if (MODULE_NOT_FOUND.test(message)) {
		const hint = INSTALL_HINT[pkg] ?? `Install it with: npm install ${pkg}`;

		return new Error(
			`Preview requires the optional "${pkg}" package. ${hint}`,
		);
	}

	return err instanceof Error ? err : new Error(message);
}

export { optionalDependencyError };
