import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		published: z.date(),
		updated: z.date().optional(),
		draft: z.boolean().optional().default(false),
		description: z.string().min(1).default(""),
		image: z.string().optional().default(""),
		tags: z.array(z.string()).optional().default([]),
		category: z.string().min(1).default("未分类"),
		lang: z.string().optional().default(""),
		canonicalURL: z.string().url().optional(),
		author: z.string().optional().default("AI 工具研究所"),

		/* For internal use */
		prevTitle: z.string().default(""),
		prevSlug: z.string().default(""),
		nextTitle: z.string().default(""),
		nextSlug: z.string().default(""),
	}),
});
const toolsCollection = defineCollection({
	schema: z.object({
		name: z.string(),
		description: z.string().min(1),
		logo: z.string().optional().default(""),
		category: z.string(),
		tags: z.array(z.string()).optional().default([]),
		platforms: z.array(z.string()).optional().default([]),
		free: z.boolean().default(false),
		pricing: z.string().default("请以官网为准"),
		officialUrl: z.string().url(),
		downloadUrl: z.string().url().optional(),
		lastTested: z.date().optional(),
		version: z.string().optional(),
		rating: z.number().min(1).max(5).optional(),
		limitations: z.string().optional().default(""),
		featured: z.boolean().optional().default(false),
		relatedPosts: z.array(z.string()).optional().default([]),
	}),
});
const specCollection = defineCollection({
	schema: z.object({}),
});
export const collections = {
	posts: postsCollection,
	tools: toolsCollection,
	spec: specCollection,
};
