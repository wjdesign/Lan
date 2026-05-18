/**
 * Portfolio category lookup table.
 *
 * Works themselves live in `content/portfolio/*.md` and are managed via
 * Sveltia CMS — see `public/admin/`. Categories are a fixed taxonomy so we
 * keep them in code (the CMS reads this list to render the dropdown).
 */
export type PortfolioCategory =
  | 'bridal-white'
  | 'bridal-banquet'
  | 'engagement'
  | 'evening'
  | 'editorial'
  | 'mother'
  | 'process'

export const portfolioCategories: { value: PortfolioCategory | 'all', label: string }[] = [
  { value: 'all', label: '全部作品' },
  { value: 'bridal-white', label: '白紗造型' },
  { value: 'bridal-banquet', label: '宴客造型' },
  { value: 'engagement', label: '訂婚造型' },
  { value: 'mother', label: '媽媽妝' },
  { value: 'evening', label: '晚宴妝' },
  { value: 'editorial', label: '形象拍攝' },
  { value: 'process', label: '幕後紀錄' },
]

/**
 * Frontmatter shape — what each `content/portfolio/*.md` file exposes via
 * `queryCollection('portfolio')`. Mirror of the Zod schema in
 * `content.config.ts`.
 */
export interface PortfolioWork {
  path: string // injected by @nuxt/content (e.g. `/portfolio/banquet-toast`)
  title: string
  category: PortfolioCategory
  date: string // ISO datetime (YYYY-MM-DDTHH:mm:ss)
  location?: string
  coverImage: string
  images: string[]
  excerpt: string
  story?: string
  credits?: { photography?: string, gown?: string, venue?: string }
  tags?: string[]
  isReal?: boolean
  body?: unknown
}
