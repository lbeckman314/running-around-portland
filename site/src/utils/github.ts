import { siteConfig } from "@/site.config";

/** Links to a file's source on GitHub, for an "Edit on GitHub" link.
 *  `filePath` is a CollectionEntry's `filePath` — relative to this Astro
 *  project's root, not the repo root, so siteConfig.repo.dir gets prefixed
 *  back on.
 */
export function githubEditUrl(filePath: string): string {
	const { owner, name, branch, dir } = siteConfig.repo;
	return `https://github.com/${owner}/${name}/blob/${branch}/${dir}/${filePath}`;
}
