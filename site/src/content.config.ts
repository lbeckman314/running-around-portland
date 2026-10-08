import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const titleSchema = z.string().max(60);

const baseSchema = z.object({
	title: titleSchema,
});

const post = defineCollection({
	loader: glob({ base: "./content/posts", pattern: "**/*.{md,mdx}" }),
	schema: ({ image }) =>
		baseSchema.extend({
			description: z.string(),
			coverImage: z
				.object({
					alt: z.string(),
					src: image(),
				})
				.optional(),
			draft: z.boolean().default(false),
			ogImage: z.string().optional(),
			// Route-specific fields, present on posts transcribed from
			// "Running Around Portland" (1979). All optional so other posts still validate.
			routeNumber: z.number().int().optional(),
			section: z.string().optional(),
			distanceMiles: z.number().optional(),
			distanceKm: z.number().optional(),
			// Overrides the plain "X mi (Y km)" display for routes with more than one loop/distance.
			distanceLabel: z.string().optional(),
			difficulty: z.number().min(1).max(10).optional(),
			beginningPoint: z.string().optional(),
			// Approximate coordinates of the beginning point, for the home page overview map.
			// Estimated from the beginning-point description, not surveyed — good for "roughly
			// where this route is," not turn-by-turn accuracy.
			lat: z.number().min(-90).max(90).optional(),
			lng: z.number().min(-180).max(180).optional(),
			runningSurface: z.string().optional(),
			suggestedBy: z.string().optional(),
			routeConditions: z
				.object({
					aesthetics: z.number().min(0).max(10).optional(),
					badWeatherRunning: z.number().min(0).max(10).optional(),
					autoTraffic: z.number().min(0).max(10).optional(),
				})
				.optional(),
			// The hand-drawn course map (and elevation profile) scanned from the book.
			// When set, the post renders in the two-column "book spread" layout.
			routeMap: z
				.object({
					alt: z.string(),
					src: image(),
					caption: z.string().optional(),
				})
				.optional(),
			publishDate: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val))
				.optional(),
			updatedDate: z
				.string()
				.optional()
				.transform((str) => (str ? new Date(str) : undefined))
				.optional(),
			pinned: z.boolean().default(false),
		}),
});

export const collections = { post };
