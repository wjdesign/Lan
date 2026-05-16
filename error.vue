<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-6 bg-champagne-50">
    <div class="max-w-lg text-center">
      <p class="eyebrow mb-6">Page Not Found</p>
      <h1 class="font-display text-8xl text-wine-800 mb-4">{{ error?.statusCode || 404 }}</h1>
      <p class="text-ink-700 mb-10 leading-relaxed">
        看來這條路線指引到了未開啟的章節。<br>
        回到首頁，繼續探索屬於你的夢中造型。
      </p>
      <UButton color="primary" size="lg" @click="handleError">
        回到首頁
      </UButton>
    </div>
  </div>
</template>
