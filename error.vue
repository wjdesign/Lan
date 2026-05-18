<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()

/**
 * Nuxt's `error.vue` is rendered OUTSIDE the layout wrapper and before the
 * i18n plugin has fully initialized, so `useI18n().t()` returns raw keys.
 * We embed minimal locale messages inline and detect the active locale from
 * the URL path so error pages always render readable text in the visitor's
 * language.
 */

type LocaleCode = 'zh-Hant' | 'zh-Hans' | 'en' | 'ja'

const MESSAGES: Record<LocaleCode, { eyebrow: string, body: string, cta: string }> = {
  'zh-Hant': {
    eyebrow: '頁面找不到',
    body: '看來這條路線指引到了未開啟的章節。\n回到首頁，繼續探索屬於你的夢中造型。',
    cta: '回到首頁',
  },
  'zh-Hans': {
    eyebrow: '页面找不到',
    body: '看来这条路线指引到了未开启的章节。\n回到首页，继续探索属于你的梦中造型。',
    cta: '回到首页',
  },
  'en': {
    eyebrow: 'Page Not Found',
    body: 'It seems this path leads to an unwritten chapter.\nReturn home to continue exploring your dream look.',
    cta: 'Back to Home',
  },
  'ja': {
    eyebrow: 'ページが見つかりません',
    body: 'このページはまだ書かれていない章のようです。\nホームへ戻り、夢のスタイルをお探しください。',
    cta: 'ホームへ戻る',
  },
}

const detectLocale = (): LocaleCode => {
  if (typeof window === 'undefined') return 'zh-Hant'
  const seg = window.location.pathname.split('/').filter(Boolean)
  // Drop the GH Pages base prefix (e.g. "Lan") so we look at the locale segment
  const candidate = seg.find(s => /^(zh-Hant|zh-Hans|en|ja)$/i.test(s))
  if (candidate) {
    const norm = candidate.toLowerCase()
    if (norm === 'zh-hant') return 'zh-Hant'
    if (norm === 'zh-hans') return 'zh-Hans'
    if (norm === 'en') return 'en'
    if (norm === 'ja') return 'ja'
  }
  // Fallback to navigator language
  const nav = navigator.language.toLowerCase()
  if (nav.startsWith('ja')) return 'ja'
  if (nav.startsWith('en')) return 'en'
  if (nav.startsWith('zh-cn') || nav.startsWith('zh-hans')) return 'zh-Hans'
  return 'zh-Hant'
}

const locale = ref<LocaleCode>('zh-Hant')
const m = computed(() => MESSAGES[locale.value])

onMounted(() => {
  locale.value = detectLocale()
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-6 bg-champagne-50">
    <div class="max-w-lg text-center">
      <p class="eyebrow mb-6">{{ m.eyebrow }}</p>
      <h1 class="font-display text-8xl text-wine-800 mb-4">{{ error?.statusCode || 404 }}</h1>
      <p class="text-ink-700 mb-10 leading-relaxed whitespace-pre-line font-serif">
        {{ m.body }}
      </p>
      <UButton color="primary" size="lg" @click="handleError">
        {{ m.cta }}
      </UButton>
    </div>
  </div>
</template>
