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
 *
 * NOTE: og-image.png is NOT generated here — it's a hand-crafted 1200×630
 * cropped screenshot of the live homepage hero and is checked into
 * public/og-image.png directly. Don't add it back; resvg-rendered cards
 * never matched the typography of the real site.
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
// public/og-image.png is now a hand-crafted homepage screenshot,
// not generated here. See the header comment.

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
      loadSystemFonts: false,
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

console.log('done.')
