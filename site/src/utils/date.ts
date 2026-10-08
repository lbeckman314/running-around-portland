import type { CollectionEntry } from "astro:content";
import { siteConfig } from "@/site.config";

export function getFormattedDate(
	date: Date | undefined,
	options?: Intl.DateTimeFormatOptions,
): string {
	if (date === undefined) {
		return "Invalid Date";
	}

	return new Intl.DateTimeFormat(siteConfig.lang, {
		...(siteConfig.date.options as Intl.DateTimeFormatOptions),
		...options,
	}).format(date);
}

/** Route posts (transcribed from "Running Around Portland") carry no date — sort those
 *  ascending by routeNumber (book order); fall back to descending publishDate otherwise. */
export function collectionDateSort(a: CollectionEntry<"post">, b: CollectionEntry<"post">) {
	if (a.data.routeNumber !== undefined && b.data.routeNumber !== undefined) {
		return a.data.routeNumber - b.data.routeNumber;
	}
	if (a.data.routeNumber !== undefined) return 1;
	if (b.data.routeNumber !== undefined) return -1;
	return (b.data.publishDate?.getTime() ?? 0) - (a.data.publishDate?.getTime() ?? 0);
}
