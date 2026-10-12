/** Prefixes a site-root path ("/about/") with the configured `base` from astro.config.ts, so
 *  links keep working when the site is served from a sub-path such as
 *  liambeckman.com/running-around-portland/. Use for every internal link and asset path that
 *  isn't an imported image (Astro already prefixes those).
 */
export function withBase(path: string): string {
	const base = import.meta.env.BASE_URL.replace(/\/$/, "");
	return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** The inverse of withBase for comparing against Astro.url.pathname, e.g. to mark the
 *  current nav link: "/running-around-portland/about/" -> "/about/".
 */
export function stripBase(pathname: string): string {
	const base = import.meta.env.BASE_URL.replace(/\/$/, "");
	return base && pathname.startsWith(base) ? pathname.slice(base.length) || "/" : pathname;
}
