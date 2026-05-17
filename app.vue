<script setup lang="ts">
const head = useLocaleHead({
  dir: true,
  lang: true,
  seo: true,
  key: 'hid',
})

useHead(head)
</script>

<template>
  <UApp>
    <AppSplash />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
