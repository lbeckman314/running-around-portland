import rss from "@astrojs/rss";
import { getAllPosts, postHref } from "@/data/post";
import { siteConfig } from "@/site.config";

export const GET = async () => {
	const posts = await getAllPosts();
	// Route posts (transcribed from "Running Around Portland") carry no date and aren't
	// really "news" — an RSS feed needs a pubDate, so they're excluded rather than faked.
	const datedPosts = posts.filter((post) => post.data.publishDate !== undefined);

	return rss({
		title: siteConfig.title,
		description: siteConfig.description,
		site: new URL(import.meta.env.BASE_URL, import.meta.env.SITE).href,
		items: datedPosts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.publishDate as Date,
			link: postHref(post),
		})),
	});
};
