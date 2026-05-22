<script setup lang="ts">
const head = useLocaleHead({
  dir: true,
  lang: true,
  seo: true,
  key: 'hid',
})

useHead(head)

// Simplified-Chinese fonts are loaded on demand — only when the zh-Hans
// locale is active — so every other locale's render-blocking CSS stays free
// of the ~500 @font-face rules these fonts would otherwise add.
const { locale } = useI18n()
useHead(() => ({
  link: locale.value === 'zh-Hans'
    ? [
        { key: 'pc-gfonts', rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { key: 'pc-gstatic', rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          key: 'fonts-zh-hans',
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&family=Noto+Serif+SC:wght@400;500;700&display=swap',
        },
      ]
    : [],
}))
</script>

<template>
  <UApp>
    <AppSplash />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
