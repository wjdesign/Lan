#!/usr/bin/env node
/**
 * One-shot migration: rename existing single-locale content files to the
 * Sveltia-compatible suffix structure `<slug>.<locale>.md`.
 *
 * - content/portfolio/banquet-toast.md   → banquet-toast.zh-Hant.md
 * - content/journal/2026-05-foo.md       → 2026-05-foo.zh-Hant.md
 *
 * Locale code matches the i18n config in nuxt.config.ts (zh-Hant default).
 * Other locales (zh-Hans / en / ja) start empty; Sveltia + DeepL will fill
 * them in the editor.
 */
import { readdirSync, renameSync, existsSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..', 'content')
const LOCALE = 'zh-Hant'

const dirs = ['portfolio', 'journal']

for (const dir of dirs) {
  const fullDir = join(ROOT, dir)
  if (!existsSync(fullDir)) continue

  const files = readdirSync(fullDir).filter((f) => f.endsWith('.md'))

  for (const file of files) {
    // Skip if already locale-suffixed
    if (/\.[a-z]{2}(-[A-Za-z]+)?\.md$/.test(file)) {
      console.log('-', `${dir}/${file}`, '(already localized, skipped)')
      continue
    }
    const slug = file.replace(/\.md$/, '')
    const next = `${slug}.${LOCALE}.md`
    renameSync(join(fullDir, file), join(fullDir, next))
    console.log('✓', `${dir}/${file}`, '→', next)
  }
}

console.log('\nDone.')
