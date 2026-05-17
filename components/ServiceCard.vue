<script setup lang="ts">
import type { Service } from '~/data/services'
import { useT } from '~/data/i18n'

defineProps<{ service: Service, index?: number }>()
const t = useT()
const localePath = useLocalePath()
</script>

<template>
  <article
    v-reveal="{ delay: (index ?? 0) * 80 }"
    class="group relative overflow-hidden rounded-sm bg-white border border-champagne-200/60 transition-all duration-700 hover:shadow-[0_30px_80px_-30px_rgba(58,29,31,0.4)]"
  >
    <div class="img-zoom relative aspect-[4/5] overflow-hidden">
      <img
        :src="service.image"
        :alt="t(service.title)"
        class="absolute inset-0 size-full object-cover"
        loading="lazy"
      >
      <div class="absolute inset-0 bg-gradient-to-t from-wine-900/70 via-wine-900/10 to-transparent" />
      <div class="absolute top-6 left-6">
        <UIcon :name="service.icon" class="size-7 text-champagne-100" />
      </div>
      <div class="absolute bottom-6 left-6 right-6">
        <p class="eyebrow !text-champagne-200 mb-2">{{ t(service.subtitle) }}</p>
        <h3 class="font-display text-3xl text-champagne-50">{{ t(service.title) }}</h3>
      </div>
    </div>
    <div class="p-7 lg:p-8">
      <p class="text-ink-700 font-serif leading-loose text-[15px]">{{ t(service.description) }}</p>
      <ul class="mt-5 space-y-2">
        <li
          v-for="h in service.highlights"
          :key="t(h)"
          class="flex items-start gap-2 text-sm text-ink-700"
        >
          <UIcon name="i-ph-flower-tulip" class="mt-0.5 size-4 text-rose-400 shrink-0" />
          <span>{{ t(h) }}</span>
        </li>
      </ul>
      <NuxtLink
        :to="`${localePath('/services')}#${service.slug}`"
        class="mt-6 inline-flex items-center gap-2 text-sm tracking-[0.3em] uppercase text-wine-700 group-hover:gap-3 transition-all duration-200"
      >
        {{ $t('cta.readMore') }}
        <UIcon name="i-lucide-arrow-right" class="size-4" />
      </NuxtLink>
    </div>
  </article>
</template>
