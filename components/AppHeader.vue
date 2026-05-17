<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()
const { isDarkHero } = useHeaderTheme()

const scrollY = useScroll(typeof window !== 'undefined' ? window : null).y
const isScrolled = computed(() => scrollY.value > 32)
const mobileOpen = ref(false)

/** True when we're sitting transparently over a dark hero — invert text. */
const onDark = computed(() => isDarkHero.value && !isScrolled.value && !mobileOpen.value)

// Reset scroll position on every nav so same-route nav (e.g. clicking "首頁"
// from home) snaps back to top instead of stranding the user mid-page.
watch(() => route.fullPath, () => {
  if (import.meta.client) window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
})

const nav = computed(() => [
  { label: t('nav.home'), to: localePath('/') },
  { label: t('nav.about'), to: localePath('/about') },
  { label: t('nav.services'), to: localePath('/services') },
  { label: t('nav.portfolio'), to: localePath('/portfolio') },
  { label: t('nav.journal'), to: localePath('/journal') },
  { label: t('nav.contact'), to: localePath('/contact') },
])

watch(() => route.path, () => { mobileOpen.value = false })

watchEffect(() => {
  if (import.meta.client) {
    document.body.style.overflow = mobileOpen.value ? 'hidden' : ''
  }
})
</script>

<template>
  <header
    :class="[
      'fixed inset-x-0 top-0 z-50 transition-all duration-200',
      mobileOpen
        ? 'bg-champagne-50/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.04)]'
        : isScrolled
          ? 'bg-champagne-50/40 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.04)]'
          : 'bg-transparent',
    ]"
  >
    <div class="container-wide flex items-center justify-between py-5 lg:py-6">
      <NuxtLink :to="localePath('/')" class="group flex items-center gap-3" :aria-label="$t('nav.home')">
        <span
          :class="['font-display text-3xl lg:text-4xl leading-none transition-colors duration-200',
                   onDark ? 'text-champagne-50' : 'text-wine-800']"
        >Lan yeh</span>
        <span :class="['hidden sm:block h-4 w-px transition-colors duration-200',
                       onDark ? 'bg-champagne-100/40' : 'bg-wine-800/30']" />
        <span
          :class="['hidden sm:block font-serif text-sm tracking-[0.2em] transition-colors duration-200',
                   onDark ? 'text-champagne-100' : 'text-ink-700']"
        >{{ $t('brand.name') }}</span>
      </NuxtLink>

      <nav class="hidden lg:flex items-center gap-10">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          :class="['relative font-serif italic text-base tracking-[0.2em] transition-colors duration-200',
                   onDark ? 'text-champagne-100 hover:text-champagne-50' : 'text-ink-800 hover:text-wine-700']"
          :active-class="onDark ? 'text-champagne-50' : 'text-wine-800'"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-2">
        <LocaleSwitcher :on-dark="onDark" />
        <UButton
          :to="localePath('/contact')"
          :color="onDark ? 'secondary' : 'primary'"
          variant="solid"
          size="md"
          class="hidden lg:inline-flex !cursor-pointer"
        >
          {{ $t('cta.book') }}
        </UButton>
        <button
          type="button"
          :class="['lg:hidden p-2 -mr-2 cursor-pointer transition-colors duration-200',
                   onDark ? 'text-champagne-50' : 'text-wine-800']"
          :aria-label="$t('nav.home')"
          @click="mobileOpen = !mobileOpen"
        >
          <UIcon
            :name="mobileOpen ? 'i-lucide-x' : 'i-lucide-menu'"
            class="size-6"
          />
        </button>
      </div>
    </div>

    <Transition name="mobile-menu">
      <div
        v-if="mobileOpen"
        class="lg:hidden border-t border-wine-800/10 bg-champagne-50/95 backdrop-blur"
      >
        <nav class="container-wide flex flex-col py-6 gap-1">
          <NuxtLink
            v-for="item in nav"
            :key="item.to"
            :to="item.to"
            class="py-3 font-serif italic text-xl tracking-wider text-ink-800"
            active-class="text-wine-800"
          >
            {{ item.label }}
          </NuxtLink>
          <UButton :to="localePath('/contact')" color="primary" block size="lg" class="mt-4">
            {{ $t('cta.book') }}
          </UButton>
        </nav>
      </div>
    </Transition>
  </header>
  <div aria-hidden="true" class="h-[72px] lg:h-[88px]" />
</template>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 320ms ease, transform 320ms ease;
  transform-origin: top;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
