import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			author: z.enum(['Fernando Fasolo', 'Fernando Fasolo Jr.']).default('Fernando Fasolo'),
			category: z.enum(['Tech', 'Negócios', 'Games', 'Esportes', 'Cotidiano']).default('Tech'),
		}),
});

export const collections = { blog };
