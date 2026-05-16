<script setup lang="ts">
import { siteConfig } from '~/data/site'

const route = useRoute()
const scrollY = useScroll(typeof window !== 'undefined' ? window : null).y
const isScrolled = computed(() => scrollY.value > 32)
const mobileOpen = ref(false)

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
      'fixed inset-x-0 top-0 z-50 transition-all duration-500',
      isScrolled || mobileOpen
        ? 'bg-champagne-50/85 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.04)]'
        : 'bg-transparent',
    ]"
  >
    <div class="container-wide flex items-center justify-between py-5 lg:py-6">
      <NuxtLink to="/" class="group flex items-center gap-3" aria-label="回首頁">
        <span
          class="font-display text-lg lg:text-xl text-wine-800 tracking-[0.4em] uppercase"
        >Lan Yeh</span>
        <span class="hidden sm:block h-4 w-px bg-wine-800/30" />
        <span class="hidden sm:block font-serif text-sm text-ink-700 tracking-[0.2em]">
          時尚彩妝
        </span>
      </NuxtLink>

      <nav class="hidden lg:flex items-center gap-10">
        <NuxtLink
          v-for="item in siteConfig.navigation"
          :key="item.to"
          :to="item.to"
          class="relative font-serif text-sm tracking-[0.3em] text-ink-800 transition-colors hover:text-wine-700"
          active-class="text-wine-800"
        >
          {{ item.label }}
          <span
            class="absolute -bottom-1.5 left-1/2 h-px w-0 -translate-x-1/2 bg-wine-700 transition-all duration-500 group-[.router-link-active]:w-6"
          />
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-3">
        <UButton
          to="/contact"
          color="primary"
          variant="solid"
          size="md"
          class="hidden lg:inline-flex"
        >
          線上預約
        </UButton>
        <button
          class="lg:hidden text-wine-800 p-2 -mr-2"
          aria-label="切換選單"
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
            v-for="item in siteConfig.navigation"
            :key="item.to"
            :to="item.to"
            class="py-3 font-serif text-lg tracking-wider text-ink-800"
            active-class="text-wine-800"
          >
            {{ item.label }}
          </NuxtLink>
          <UButton to="/contact" color="primary" block size="lg" class="mt-4">
            線上預約
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
