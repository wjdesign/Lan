#!/usr/bin/env node
/**
 * Generate favicon + PWA icon set from a single Allura-rendered letter "L".
 *
 *   node scripts/generate-pwa-icons.mjs
 *
 * Why @resvg/resvg-js instead of sharp:
 *   sharp uses librsvg underneath, which IGNORES <style>@font-face</style>
 *   declarations and only renders glyphs from system-installed fonts.
 *   resvg-js takes explicit `fontFiles` and rasterises the SVG with the
 *   font we point it at, so we can ship Allura without installing it.
 *
 * - favicon.{png,ico}         → transparent bg, wine "L" in Allura
 * - apple-touch-icon.png       → padded, transparent bg
 * - pwa-{192,512}.png          → transparent bg (any purpose)
 * - pwa-maskable-512.png       → solid wine bg + champagne "L" (safe zone)
 * - og-image.png               → 1200×630 social card
 */
import { Resvg } from '@resvg/resvg-js'
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC = resolve(__dirname, '..', 'public')
const ALLURA = resolve(__dirname, 'Allura-Regular.ttf')

const WINE = '#3a1d1f'
const CHAMPAGNE = '#f5ecdf'
const ROSE = '#c8553c'

/**
 * Render an SVG to a PNG file using Allura as the font.
 * `width` controls the output pixel size.
 */
async function renderSvg(svg, outPath, width) {
  const resvg = new Resvg(svg, {
    background: 'rgba(0,0,0,0)',
    fitTo: { mode: 'width', value: width },
    font: {
      fontFiles: [ALLURA],
      loadSystemFonts: true, // for CJK fallback in og-image
      defaultFontFamily: 'Allura',
    },
  })
  const png = resvg.render().asPng()
  await writeFile(outPath, png)
  console.log('✓', outPath.replace(PUBLIC + '/', ''))
}

function letterLSvg({ size, bg = 'none', fg = WINE, padding = 0 }) {
  const inner = size - padding * 2
  const fontSize = Math.round(inner * 1.05)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  ${bg !== 'none' ? `<rect width="${size}" height="${size}" fill="${bg}"/>` : ''}
  <text
    x="50%"
    y="${size * 0.82}"
    font-family="Allura"
    font-size="${fontSize}"
    fill="${fg}"
    text-anchor="middle"
  >L</text>
</svg>`
}

// ───── Favicon set ───────────────────────────────────
await renderSvg(letterLSvg({ size: 512 }), resolve(PUBLIC, 'favicon.png'), 192)
await renderSvg(letterLSvg({ size: 64 }), resolve(PUBLIC, 'icon-32.png'), 32)
await renderSvg(letterLSvg({ size: 32 }), resolve(PUBLIC, 'icon-16.png'), 16)

// Apple touch — pad so Safari mask doesn't crop the flourish
await renderSvg(
  letterLSvg({ size: 512, padding: 60 }),
  resolve(PUBLIC, 'apple-touch-icon.png'),
  180,
)

// PWA icons
await renderSvg(letterLSvg({ size: 512 }), resolve(PUBLIC, 'pwa-192.png'), 192)
await renderSvg(letterLSvg({ size: 512 }), resolve(PUBLIC, 'pwa-512.png'), 512)

// Maskable — fill safe zone with solid wine + champagne "L"
await renderSvg(
  letterLSvg({ size: 512, padding: 80, bg: WINE, fg: CHAMPAGNE }),
  resolve(PUBLIC, 'pwa-maskable-512.png'),
  512,
)

// PNG-format favicon.ico for browsers that still try /favicon.ico
await renderSvg(letterLSvg({ size: 64 }), resolve(PUBLIC, 'favicon.ico'), 32)

// ───── OG image ───────────────────────────────────
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${WINE}"/>
      <stop offset="1" stop-color="#2a1517"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="280" y="490" font-family="Allura" font-size="560" fill="${CHAMPAGNE}" text-anchor="middle">L</text>
  <text x="500" y="240" font-family="Cormorant Garamond, Georgia, serif" font-size="34" letter-spacing="12" fill="${CHAMPAGNE}" fill-opacity="0.7">LAN YEH BRIDAL MAKEUP</text>
  <text x="500" y="340" font-family="Songti TC, Noto Serif TC, PingFang TC, serif" font-size="68" fill="${CHAMPAGNE}" font-weight="500">葉小蘭時尚彩妝</text>
  <text x="500" y="420" font-family="Songti TC, Noto Serif TC, PingFang TC, serif" font-size="32" fill="${CHAMPAGNE}" fill-opacity="0.8">嘉義新娘秘書．二十年資歷．全台到府</text>
  <line x1="500" y1="465" x2="560" y2="465" stroke="${ROSE}" stroke-width="2"/>
  <text x="500" y="555" font-family="Allura" font-size="68" fill="${ROSE}" fill-opacity="0.95">Couture · Crafted in Chiayi</text>
</svg>`
await renderSvg(ogSvg, resolve(PUBLIC, 'og-image.png'), 1200)

console.log('done.')
