import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    journal: defineCollection({
      type: 'page',
      source: 'journal/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(), // ISO yyyy-mm-dd
        cover: z.string(),
        author: z.string().default('葉小蘭'),
        tags: z.array(z.string()).default([]),
        category: z.string().default('日誌'),
        readingTime: z.string().optional(),
      }),
    }),

    /**
     * Portfolio works — each markdown file under content/portfolio/ becomes
     * one piece. Sveltia CMS edits these directly; the page component reads
     * them via `queryCollection('portfolio')`.
     */
    portfolio: defineCollection({
      type: 'page',
      source: 'portfolio/*.md',
      schema: z.object({
        title: z.string(),
        category: z.enum([
          'bridal-white',
          'bridal-banquet',
          'engagement',
          'evening',
          'editorial',
          'mother',
          'process',
        ]),
        // ISO datetime (YYYY-MM-DDTHH:mm:ss). Used for chronological sort
        // (newest first). Sveltia renders a datetime picker for this field.
        date: z.string(),
        location: z.string().optional(),
        coverImage: z.string(),
        images: z.array(z.string()).default([]),
        excerpt: z.string(),
        story: z.string().optional(),
        credits: z
          .object({
            photography: z.string().optional(),
            gown: z.string().optional(),
            venue: z.string().optional(),
          })
          .optional(),
        tags: z.array(z.string()).default([]),
        isReal: z.boolean().default(true),
      }),
    }),
  },
})
