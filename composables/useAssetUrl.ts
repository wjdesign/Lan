/**
 * Prepend the deployment baseURL (e.g. "/Lan/") to a local asset path so it
 * resolves correctly on GitHub Pages project sites.
 *
 * Plain <img src="/foo.jpg"> bypasses Nuxt's URL helpers; with baseURL "/Lan/"
 * the browser would fetch https://host/foo.jpg, not https://host/Lan/foo.jpg.
 * Use this helper anywhere we render a raw <img>, <audio>, etc.
 */
export function useAssetUrl(path: string): string {
  if (!path) return path
  if (/^(https?:|data:|\/\/)/.test(path)) return path // external or data URL
  const base = useRuntimeConfig().app.baseURL || '/'
  // join without doubling slashes
  return (base.replace(/\/$/, '') + (path.startsWith('/') ? path : `/${path}`))
}
