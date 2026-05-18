#!/usr/bin/env node
/**
 * One-shot migration: convert `year: N` frontmatter to `date: N-01-01T00:00:00`
 * in every content/portfolio/*.md file. After running, the field is a full
 * ISO datetime that Sveltia's datetime widget can edit, and queryCollection
 * can sort by `date DESC` for newest-first ordering.
 *
 * Old year-only data is mapped to Jan 1 of that year so existing relative
 * ordering is preserved; the editor can refine to real dates later.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIR = resolve(__dirname, '..', 'content', 'portfolio')

const files = readdirSync(DIR).filter((f) => f.endsWith('.md'))

for (const file of files) {
  const path = join(DIR, file)
  const raw = readFileSync(path, 'utf8')

  // Match `year: 2024` at start of line in frontmatter
  const match = raw.match(/^year:\s*(\d{4})\s*$/m)
  if (!match) {
    console.log('-', file, '(no year field, skipped)')
    continue
  }
  const year = match[1]
  const iso = `${year}-01-01T00:00:00`

  const next = raw.replace(/^year:\s*\d{4}\s*$/m, `date: ${iso}`)
  writeFileSync(path, next, 'utf8')
  console.log('✓', file, `→ ${iso}`)
}

console.log(`\nMigrated ${files.length} files`)
