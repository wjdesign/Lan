/**
 * Tracks whether the current page renders its hero behind the fixed header,
 * so AppHeader can switch to a light/dark text scheme when not scrolled.
 *
 *   - Pages with a dark hero (home, about, journal post) call `setDarkHero(true)` on mount.
 *   - Pages with a light hero call `setDarkHero(false)` (the default).
 *
 * Uses useState so the value is shared between the page and AppHeader without
 * a provide/inject ceremony and survives hydration.
 */
export function useHeaderTheme() {
  const isDarkHero = useState<boolean>('header-dark-hero', () => false)

  const setDarkHero = (dark: boolean) => {
    isDarkHero.value = dark
  }

  // Reset on route change so the new page must opt-in explicitly.
  const router = useRouter()
  router.afterEach(() => {
    isDarkHero.value = false
  })

  return { isDarkHero, setDarkHero }
}
