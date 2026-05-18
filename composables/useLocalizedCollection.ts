/**
 * Resolve a content-collection name for the current i18n locale.
 *
 *   useLocalizedCollection('portfolio')
 *     // locale = en        → 'portfolioEn'
 *     // locale = zh-Hans   → 'portfolioZhHans'
 *     // locale = ja        → 'portfolioJa'
 *     // locale = zh-Hant   → 'portfolioZhHant'
 *
 * Pair with `queryCollection(useLocalizedCollection('portfolio'))` in page
 * setup. When a translation is missing (a Sveltia editor hasn't filled
 * that locale yet), the caller can fall back to the zh-Hant collection.
 */

type ContentType = 'portfolio' | 'journal'

const LOCALE_SUFFIX: Record<string, string> = {
  'zh-Hant': 'ZhHant',
  'zh-Hans': 'ZhHans',
  'en': 'En',
  'ja': 'Ja',
}

export function useLocalizedCollection(type: ContentType): string {
  const { locale } = useI18n()
  const suffix = LOCALE_SUFFIX[locale.value] || LOCALE_SUFFIX['zh-Hant']
  return `${type}${suffix}`
}

/** The fallback (default-locale) collection name for content type. */
export function useDefaultCollection(type: ContentType): string {
  return `${type}ZhHant`
}

/**
 * Strip the locale suffix from a content path so it can be matched against
 * the equivalent file in another locale.
 *
 *   '/portfolio/banquet-toast.zh-Hant' → 'banquet-toast'
 */
export function stripLocaleSuffix(path: string): string {
  return path.replace(/\.(zh-Hant|zh-Hans|en|ja)$/, '').replace(/^.*\//, '')
}
