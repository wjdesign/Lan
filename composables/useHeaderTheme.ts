/**
 * Whether the current page renders its hero behind the fixed header (negative
 * top margin), so AppHeader should use light text while not scrolled.
 *
 * Source of truth is the route meta — pages opt in with:
 *
 *   definePageMeta({ darkHero: true })
 *
 * Route-meta is reactive and works correctly for same-page navigation (where
 * mounted/unmounted hooks do not refire), which a lifecycle-based approach
 * cannot.
 */
export function useHeaderTheme() {
  const route = useRoute()
  const isDarkHero = computed(() => Boolean(route.meta.darkHero))
  return { isDarkHero }
}
