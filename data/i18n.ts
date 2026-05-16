export type LocaleCode = 'zh-Hant' | 'zh-Hans' | 'en' | 'ja'

export const SUPPORTED_LOCALES: LocaleCode[] = ['zh-Hant', 'zh-Hans', 'en', 'ja']

/**
 * Either a plain string (same for every locale) or a per-locale dictionary.
 * Use `useT()` to resolve to the current locale.
 */
export type Localized = string | Partial<Record<LocaleCode, string>>

export function resolveLocalized(value: Localized, locale: LocaleCode): string {
  if (typeof value === 'string') return value
  return value[locale] || value['zh-Hant'] || value.en || Object.values(value)[0] || ''
}

/**
 * Composable that returns a reactive resolver for the current i18n locale.
 *  const t = useT()
 *  t(service.title) → string
 */
export function useT() {
  const { locale } = useI18n()
  return (value: Localized) => resolveLocalized(value, locale.value as LocaleCode)
}
