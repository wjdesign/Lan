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
  },
})
