<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()

const { t } = useI18n()
const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-6 bg-champagne-50">
    <div class="max-w-lg text-center">
      <p class="eyebrow mb-6">{{ t('error.notFound') }}</p>
      <h1 class="font-display text-8xl text-wine-800 mb-4">{{ error?.statusCode || 404 }}</h1>
      <p class="text-ink-700 mb-10 leading-relaxed whitespace-pre-line">
        {{ t('error.message') }}
      </p>
      <UButton color="primary" size="lg" @click="handleError">
        {{ t('cta.backHome') }}
      </UButton>
    </div>
  </div>
</template>
