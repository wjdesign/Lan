/**
 * Prints the deployed build's git SHA + build time to the browser console,
 * so the live version can be verified at a glance (e.g. to catch a stale
 * CDN cache). Values are injected at build time by CI.
 */
export default defineNuxtPlugin(() => {
  const { buildSha, buildTime } = useRuntimeConfig().public
  const sha = String(buildSha || 'dev').slice(0, 7)
  const time = String(buildTime || '')
  console.info(
    `%c葉小蘭時尚彩妝%c build ${sha}${time ? ` · ${time}` : ''}`,
    'font-weight:bold;color:#3a1d1f',
    'color:#9d6f44',
  )
})
