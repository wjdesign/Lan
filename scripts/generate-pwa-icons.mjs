#!/usr/bin/env node
/**
 * Generate PWA icons + favicon set from a single character "蘭" rendered onto a wine-red square.
 * Run:  node scripts/generate-pwa-icons.mjs
 */
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC = resolve(__dirname, '..', 'public')

const WINE = '#3a1d1f'
const CHAMPAGNE = '#f5ecdf'
const ROSE = '#c8553c'

function iconSvg(size, padding = 0, char = '蘭', bg = WINE, fg = CHAMPAGNE, accent = ROSE) {
  const inner = size - padding * 2
  const charSize = Math.round(inner * 0.62)
  const ringR = Math.round(inner * 0.42)
  const cx = size / 2
  const cy = size / 2
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${bg}"/>
  <circle cx="${cx}" cy="${cy}" r="${ringR}" fill="none" stroke="${accent}" stroke-width="${Math.max(2, size / 96)}" stroke-opacity="0.4"/>
  <circle cx="${cx}" cy="${cy}" r="${ringR - Math.max(4, size / 32)}" fill="none" stroke="${accent}" stroke-width="1" stroke-opacity="0.3"/>
  <text
    x="${cx}" y="${cy + charSize * 0.06}"
    font-family="Songti TC, Noto Serif TC, STSong, serif"
    font-size="${charSize}"
    fill="${fg}"
    text-anchor="middle"
    dominant-baseline="central"
    font-weight="500"
  >${char}</text>
  <text
    x="${cx}" y="${size - Math.round(inner * 0.12)}"
    font-family="Times New Roman, serif"
    font-size="${Math.round(inner * 0.07)}"
    fill="${fg}"
    fill-opacity="0.6"
    text-anchor="middle"
    letter-spacing="${Math.round(inner * 0.02)}"
  >LAN YEH</text>
</svg>`
}

async function render(svg, outPath, size) {
  await sharp(Buffer.from(svg)).resize(size, size).png({ quality: 95 }).toFile(outPath)
  console.log('✓', outPath)
}

const targets = [
  { name: 'pwa-192.png', size: 192, padding: 0 },
  { name: 'pwa-512.png', size: 512, padding: 0 },
  // Maskable icons need a safe area – we pad heavily so the design fits inside the safe zone.
  { name: 'pwa-maskable-512.png', size: 512, padding: 64 },
  { name: 'apple-touch-icon.png', size: 180, padding: 0 },
  { name: 'icon-32.png', size: 32, padding: 2 },
  { name: 'icon-16.png', size: 16, padding: 1 },
]

for (const t of targets) {
  await render(iconSvg(t.size, t.padding), resolve(PUBLIC, t.name), t.size)
}

// Generate OG/social share fallback (1200×630)
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${WINE}"/>
      <stop offset="1" stop-color="#2a1517"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <circle cx="200" cy="315" r="180" fill="none" stroke="${ROSE}" stroke-opacity="0.35" stroke-width="2"/>
  <circle cx="200" cy="315" r="150" fill="none" stroke="${ROSE}" stroke-opacity="0.25" stroke-width="1"/>
  <text x="200" y="335" font-family="Songti TC, Noto Serif TC, serif" font-size="220" fill="${CHAMPAGNE}" text-anchor="middle" dominant-baseline="central">蘭</text>

  <text x="440" y="240" font-family="Times New Roman, serif" font-size="38" letter-spacing="14" fill="${CHAMPAGNE}" fill-opacity="0.7">LAN YEH BRIDAL MAKEUP</text>
  <text x="440" y="345" font-family="Songti TC, Noto Serif TC, serif" font-size="72" fill="${CHAMPAGNE}" font-weight="500">葉小蘭時尚彩妝</text>
  <text x="440" y="425" font-family="Songti TC, Noto Serif TC, serif" font-size="34" fill="${CHAMPAGNE}" fill-opacity="0.8">嘉義新娘秘書．二十年資歷．全台預約</text>
  <line x1="440" y1="465" x2="500" y2="465" stroke="${ROSE}" stroke-width="2"/>
  <text x="440" y="510" font-family="Times New Roman, serif" font-size="22" letter-spacing="6" fill="${ROSE}" fill-opacity="0.9">Couture bridal makeup, crafted in Chiayi</text>
</svg>`
await render(ogSvg, resolve(PUBLIC, 'og-image.png'), 1200)
await sharp(Buffer.from(ogSvg)).resize(1200, 630, { fit: 'fill' }).png({ quality: 92 }).toFile(resolve(PUBLIC, 'og-image.png'))
console.log('done.')
