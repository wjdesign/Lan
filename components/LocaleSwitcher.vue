<script setup lang="ts">
const props = defineProps<{ onDark?: boolean }>()
const { locale, locales, setLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const open = ref(false)

const available = computed(() =>
  (locales.value as { code: string, name: string }[])
    .filter(l => l.code !== locale.value),
)
const current = computed(() =>
  (locales.value as { code: string, name: string }[]).find(l => l.code === locale.value),
)

const onSelect = async (code: string) => {
  open.value = false
  await setLocale(code as 'zh-Hant' | 'zh-Hans' | 'en' | 'ja')
}

const root = ref<HTMLElement>()
onClickOutside(root, () => (open.value = false))
</script>

<template>
  <div ref="root" class="relative">
    <button
      type="button"
      :class="['inline-flex items-center gap-2 px-3 py-2 text-xs tracking-[0.25em] uppercase cursor-pointer border border-transparent transition-colors duration-200',
               props.onDark
                 ? 'text-champagne-100 hover:text-champagne-50 hover:border-champagne-100/30'
                 : 'text-ink-700 hover:text-wine-800 hover:border-champagne-300']"
      :aria-expanded="open"
      aria-haspopup="listbox"
      :aria-label="`Language: ${current?.name}`"
      @click="open = !open"
    >
      <UIcon name="i-lucide-globe" class="size-4" />
      <span class="hidden sm:inline">{{ current?.name }}</span>
      <UIcon
        name="i-lucide-chevron-down"
        :class="['size-3 transition-transform duration-300', open ? 'rotate-180' : '']"
      />
    </button>

    <Transition name="locale-menu">
      <div
        v-if="open"
        class="absolute right-0 mt-2 w-44 z-50 bg-champagne-50 border border-champagne-300/70 shadow-[0_20px_60px_-20px_rgba(58,29,31,0.3)] overflow-hidden"
      >
        <ul role="listbox">
          <li v-for="l in available" :key="l.code">
            <NuxtLink
              :to="switchLocalePath(l.code as 'zh-Hant' | 'zh-Hans' | 'en' | 'ja') || '/'"
              :hreflang="l.code"
              role="option"
              class="flex items-center justify-between px-4 py-3 text-sm font-serif text-ink-800 hover:bg-champagne-100 hover:text-wine-800 transition-colors duration-200 cursor-pointer"
              @click="onSelect(l.code)"
            >
              <span>{{ l.name }}</span>
              <UIcon name="i-lucide-arrow-up-right" class="size-3.5 opacity-50" />
            </NuxtLink>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.locale-menu-enter-active,
.locale-menu-leave-active {
  transition: opacity 240ms ease, transform 240ms ease;
  transform-origin: top right;
}
.locale-menu-enter-from,
.locale-menu-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.96);
}
</style>
