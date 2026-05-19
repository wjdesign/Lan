import { defineContentConfig, defineCollection, z } from '@nuxt/content'

/**
 * Multi-locale content collections.
 *
 * File-naming convention (Sveltia CMS "Multiple Files" structure):
 *   content/journal/<slug>.<locale>.md
 *   content/portfolio/<slug>.<locale>.md
 *
 * where <locale> ∈ { zh-Hant, zh-Hans, en, ja }
 *
 * Each locale gets its own collection so we can query a single locale at
 * a time and fall back to zh-Hant when a translation is missing.
 */

const portfolioSchema = z.object({
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
  // Do not rename to `excerpt` — that key is reserved by @nuxt/content for
  // body-derived excerpts and silently drops frontmatter values.
  description: z.string(),
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
})

const journalSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  cover: z.string(),
  author: z.string().default('葉小蘭'),
  tags: z.array(z.string()).default([]),
  category: z.string().default('日誌'),
  readingTime: z.string().optional(),
})

export default defineContentConfig({
  collections: {
    // ────── Journal ──────────────────────────────────────────
    journalZhHant: defineCollection({
      type: 'page',
      source: 'journal/*.zh-Hant.md',
      schema: journalSchema,
    }),
    journalZhHans: defineCollection({
      type: 'page',
      source: 'journal/*.zh-Hans.md',
      schema: journalSchema,
    }),
    journalEn: defineCollection({
      type: 'page',
      source: 'journal/*.en.md',
      schema: journalSchema,
    }),
    journalJa: defineCollection({
      type: 'page',
      source: 'journal/*.ja.md',
      schema: journalSchema,
    }),

    // ────── Portfolio ────────────────────────────────────────
    portfolioZhHant: defineCollection({
      type: 'page',
      source: 'portfolio/*.zh-Hant.md',
      schema: portfolioSchema,
    }),
    portfolioZhHans: defineCollection({
      type: 'page',
      source: 'portfolio/*.zh-Hans.md',
      schema: portfolioSchema,
    }),
    portfolioEn: defineCollection({
      type: 'page',
      source: 'portfolio/*.en.md',
      schema: portfolioSchema,
    }),
    portfolioJa: defineCollection({
      type: 'page',
      source: 'portfolio/*.ja.md',
      schema: portfolioSchema,
    }),
  },
})
