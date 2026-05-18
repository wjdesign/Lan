#!/usr/bin/env node
/**
 * One-shot migration: read data/portfolio.ts and emit one Markdown file per
 * work into content/portfolio/. Run once; data/portfolio.ts will be deleted
 * afterwards and replaced with a queryCollection-based composable.
 */
import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = resolve(__dirname, '..', 'content', 'portfolio')
mkdirSync(OUT, { recursive: true })

// Inline the portfolio data (mirrors data/portfolio.ts)
const unsplash = (id, w = 1400) =>
  `https://images.unsplash.com/${id}?w=${w}&auto=format&fit=crop&q=80`

const portfolio = [
  {
    slug: 'banquet-toast',
    title: '宴客．舉杯的那一刻',
    category: 'bridal-banquet',
    year: 2023,
    location: '台中・宴會廳',
    coverImage: '/images/portfolio/1035x350-1.jpg',
    images: ['/images/portfolio/1035x350-1.jpg', '/images/portfolio/345x350-4.jpg'],
    excerpt: '迎賓敬酒、與每一桌的家人朋友碰杯——這時的妝，要禁得起暖光與長時間的笑。',
    story:
      '宴客時刻是新娘整日中最社交的時段，妝感必須維持到敬酒結束。我為這位新娘設計了帶光的奶杏色底妝，搭配抗暈染唇彩，從晚上六點到十點，鏡頭一如最初。',
    credits: { venue: '台中宴會廳' },
    tags: ['宴客', '抗暈染', '暖光'],
    isReal: true,
  },
  {
    slug: 'lipstick-detail',
    title: '近距離．唇彩工序',
    category: 'process',
    year: 2024,
    location: '工作室現場',
    coverImage: '/images/portfolio/1035x350-3.jpg',
    images: ['/images/portfolio/1035x350-3.jpg', '/images/portfolio/345x350-3.jpg'],
    excerpt: '上唇彩前的最後一筆。每一道筆觸都是二十年練出來的肌肉記憶。',
    tags: ['幕後', '工序'],
    isReal: true,
  },
  {
    slug: 'jeweled-engagement',
    title: '訂婚．金鏈與石榴紅',
    category: 'engagement',
    year: 2024,
    location: '嘉義．家中文定',
    coverImage: '/images/portfolio/345x350-4.jpg',
    images: ['/images/portfolio/345x350-4.jpg', '/images/portfolio/345x350-7.jpg'],
    excerpt: '搭配新娘的金鍊嫁妝，妝感選擇了石榴紅唇與透白底妝，氣場與喜氣兼得。',
    tags: ['訂婚', '石榴紅', '金飾'],
    isReal: true,
  },
  {
    slug: 'soft-bouquet',
    title: '粉霧捧花與旗袍新娘',
    category: 'engagement',
    year: 2023,
    location: '嘉義',
    coverImage: '/images/portfolio/345x350-1.jpg',
    images: [
      '/images/portfolio/345x350-1.jpg',
      '/images/portfolio/345x350-2.jpg',
      '/images/portfolio/345x350-5.jpg',
    ],
    excerpt: '粉霧色乾燥捧花呼應旗袍上的暈染牡丹——色彩語言一致時，整個畫面才能呼吸。',
    tags: ['訂婚', '旗袍', '粉霧'],
    isReal: true,
  },
  {
    slug: 'studio-process-1',
    title: '化妝間．凌晨四點',
    category: 'process',
    year: 2024,
    coverImage: '/images/portfolio/345x350-2.jpg',
    images: ['/images/portfolio/345x350-2.jpg'],
    excerpt: '迎娶當天最重要的一筆——白紗前的最後對焦。',
    tags: ['幕後', '凌晨'],
    isReal: true,
  },
  {
    slug: 'golden-floral',
    title: '金色乾燥花藝',
    category: 'editorial',
    year: 2023,
    coverImage: '/images/portfolio/345x350-5.jpg',
    images: ['/images/portfolio/345x350-5.jpg'],
    excerpt: '為造型搭配的花藝設計，由工作室親手挑選與整束。',
    tags: ['花藝', '金色'],
    isReal: true,
  },
  {
    slug: 'classic-banquet-2',
    title: '宴客．經典側影',
    category: 'bridal-banquet',
    year: 2023,
    coverImage: '/images/portfolio/1035x350-4.jpg',
    images: ['/images/portfolio/1035x350-4.jpg', '/images/portfolio/345x350-6.jpg'],
    excerpt: '宴客典雅造型，髮飾選用低調珍珠串。',
    tags: ['宴客', '珍珠', '典雅'],
    isReal: true,
  },
  {
    slug: 'closeup-foundation',
    title: '光感底妝特寫',
    category: 'process',
    year: 2024,
    coverImage: '/images/portfolio/345x350-7.jpg',
    images: ['/images/portfolio/345x350-7.jpg'],
    excerpt: '透亮但不浮粉的底妝，是經得起 4K 鏡頭的關鍵。',
    tags: ['幕後', '底妝'],
    isReal: true,
  },
  {
    slug: 'amber-light',
    title: '琥珀光線下的儀式',
    category: 'bridal-white',
    year: 2025,
    location: '台南・晶英酒店',
    coverImage: unsplash('photo-1519741497674-611481863552', 1600),
    images: [
      unsplash('photo-1519741497674-611481863552', 1600),
      unsplash('photo-1606216794074-735e91aa2c92', 1400),
      unsplash('photo-1525258946800-98cfd641d0de', 1400),
    ],
    excerpt: '以琥珀金色為主軸，將新娘輕透膚感襯出晨光裡的柔軟。',
    tags: ['白紗', '晨光', '琥珀金'],
    isReal: false,
  },
  {
    slug: 'midnight-velvet',
    title: '深夜絲絨',
    category: 'bridal-banquet',
    year: 2025,
    coverImage: unsplash('photo-1492106087820-71f1a00d2b11', 1600),
    images: [unsplash('photo-1492106087820-71f1a00d2b11', 1600)],
    excerpt: '酒紅絲絨禮服 × 微煙燻眼，宴客場的氣場一鏡到底。',
    tags: ['宴客', '酒紅'],
    isReal: false,
  },
  {
    slug: 'porcelain',
    title: '瓷',
    category: 'editorial',
    year: 2024,
    coverImage: unsplash('photo-1487412947147-5cebf100ffc2', 1600),
    images: [unsplash('photo-1487412947147-5cebf100ffc2', 1600)],
    excerpt: '形象寫真：以最簡淨的瓷白光感，凝結最坦率的眼神。',
    tags: ['形象', '極簡'],
    isReal: false,
  },
  {
    slug: 'mother-of-the-bride',
    title: '媽媽，今天最美的人是你',
    category: 'mother',
    year: 2025,
    coverImage: unsplash('photo-1522337360788-8b13dee7a37e', 1600),
    images: [unsplash('photo-1522337360788-8b13dee7a37e', 1600)],
    excerpt: '為新娘的媽媽做了一個她自己也忘記的優雅。',
    tags: ['媽媽妝', '溫潤'],
    isReal: false,
  },
  {
    slug: 'gala-night',
    title: '紅毯之夜',
    category: 'evening',
    year: 2024,
    coverImage: unsplash('photo-1606216794074-735e91aa2c92', 1600),
    images: [unsplash('photo-1606216794074-735e91aa2c92', 1600)],
    excerpt: '頒獎典禮造型——光線打下來那一刻，整場安靜了三秒。',
    tags: ['晚宴', '紅毯'],
    isReal: false,
  },
]

const yamlEscape = (s) => {
  if (typeof s !== 'string') return s
  // If string contains : or starts with special chars, wrap in double quotes
  if (/[:#\-?&*!|>{}[\]@`"'%]/.test(s) || /^[\s]/.test(s)) {
    return `"${s.replace(/"/g, '\\"')}"`
  }
  return s
}

const yamlList = (arr, indent = '  ') =>
  arr.map((v) => `${indent}- ${yamlEscape(v)}`).join('\n')

for (let i = 0; i < portfolio.length; i++) {
  const w = portfolio[i]
  const credits = w.credits || {}

  const lines = []
  lines.push('---')
  lines.push(`title: ${yamlEscape(w.title)}`)
  lines.push(`category: ${w.category}`)
  lines.push(`year: ${w.year}`)
  if (w.location) lines.push(`location: ${yamlEscape(w.location)}`)
  lines.push(`coverImage: ${w.coverImage}`)
  lines.push('images:')
  lines.push(yamlList(w.images))
  lines.push(`excerpt: ${yamlEscape(w.excerpt)}`)
  if (Object.keys(credits).length > 0) {
    lines.push('credits:')
    if (credits.photography) lines.push(`  photography: ${yamlEscape(credits.photography)}`)
    if (credits.gown) lines.push(`  gown: ${yamlEscape(credits.gown)}`)
    if (credits.venue) lines.push(`  venue: ${yamlEscape(credits.venue)}`)
  }
  if (w.tags && w.tags.length) {
    lines.push('tags:')
    lines.push(yamlList(w.tags))
  }
  lines.push(`isReal: ${w.isReal}`)
  lines.push(`order: ${i + 1}`)
  lines.push('---')
  lines.push('')
  if (w.story) {
    lines.push(w.story)
    lines.push('')
  }

  const path = resolve(OUT, `${w.slug}.md`)
  writeFileSync(path, lines.join('\n'), 'utf8')
  console.log('✓', `${w.slug}.md`)
}

console.log(`\nMigrated ${portfolio.length} portfolio items → ${OUT}`)
