import { type CollectionEntry, getCollection } from "astro:content";

/** filter out draft posts based on the environment */
export async function getAllPosts(): Promise<CollectionEntry<"post">[]> {
	return await getCollection("post", ({ data }) => {
		return import.meta.env.PROD ? !data.draft : true;
	});
}

/** The slug used in a post's URL and its /routes/[...slug] page: just the entry's own directory
 *  name, even when the collection nests it under a subfolder (e.g. content ids like
 *  "running-around-portland/01-grant-park-mt-tabor-loop" become the slug
 *  "01-grant-park-mt-tabor-loop"). Single source of truth so every link and the route generator
 *  agree on the same URL shape.
 */
export function postSlug(post: CollectionEntry<"post">): string {
	return post.id.split("/").pop() as string;
}

/** The site-relative URL for a post's own page. */
export function postHref(post: CollectionEntry<"post">): string {
	return `/routes/${postSlug(post)}/`;
}

/** groups posts by their book section (route posts) or publish year (dated posts), using that
 *  as the key. Route posts have no date, so they group under their section heading instead;
 *  sections come out in book order since route numbers are assigned in that order.
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 */
export function groupPosts(posts: CollectionEntry<"post">[]) {
	return Object.groupBy(
		posts,
		(post) => post.data.section ?? post.data.publishDate?.getFullYear().toString() ?? "Other",
	);
}
