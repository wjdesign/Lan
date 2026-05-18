/**
 * Custom sitemap URLs that aren't auto-discovered by crawlLinks.
 *
 * Portfolio detail pages are now generated from @nuxt/content
 * (`content/portfolio/*.md`). The @nuxt/content + @nuxtjs/seo modules
 * cross-wire so portfolio routes appear in the sitemap automatically —
 * we don't need to push them manually here.
 *
 * Keep this handler exporting an array (even if empty) so the
 * `/api/__sitemap__/urls` source stays registered.
 */
export default defineSitemapEventHandler(() => {
  return []
})
