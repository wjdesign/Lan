/**
 * Auto-reload the page when a new service worker takes control.
 *
 * Why this exists: each new deploy emits JS bundles whose filenames contain a
 * fresh content hash AND embed the i18n lazy-load hash inside their code. If
 * a returning visitor's tab is still running the OLD bundle in memory, that
 * old bundle keeps requesting the OLD i18n hash paths from the server — which
 * the new deploy has already overwritten → 404 → every page renders raw i18n
 * keys.
 *
 * Workbox's `skipWaiting + clientsClaim` (configured in nuxt.config.ts) makes
 * the new SW take over open clients immediately, which fires
 * `navigator.serviceWorker.controllerchange`. We listen for that event and
 * trigger a single reload so the tab fetches the new HTML and the new JS
 * bundle whose embedded hashes match the server.
 *
 * The `reloading` guard prevents an infinite reload loop in the (rare) case
 * where controllerchange fires twice in succession.
 */
export default defineNuxtPlugin(() => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return

  let reloading = false
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (reloading) return
    reloading = true
    window.location.reload()
  })
})
