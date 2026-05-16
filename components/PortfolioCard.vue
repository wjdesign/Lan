<script setup lang="ts">
import type { PortfolioWork } from '~/data/portfolio'

defineProps<{ work: PortfolioWork, index?: number }>()
</script>

<template>
  <NuxtLink
    v-reveal="{ delay: (index ?? 0) * 60 }"
    :to="`/portfolio/${work.slug}`"
    class="group block img-zoom relative overflow-hidden rounded-sm bg-wine-900"
  >
    <div class="relative aspect-[3/4] overflow-hidden">
      <img
        :src="work.coverImage"
        :alt="work.title"
        class="absolute inset-0 size-full object-cover transition-opacity duration-700 group-hover:opacity-60"
        loading="lazy"
      >
      <div class="absolute inset-0 bg-gradient-to-t from-wine-900/85 via-transparent to-transparent" />
    </div>
    <div class="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-champagne-50">
      <p class="text-[10px] tracking-[0.4em] uppercase text-champagne-200/80 mb-2">
        {{ work.year }}・{{ work.location || '' }}
      </p>
      <h3 class="font-display text-2xl lg:text-3xl leading-tight">{{ work.title }}</h3>
      <p class="mt-2 text-sm text-champagne-100/85 line-clamp-2 font-serif">{{ work.excerpt }}</p>
      <div class="mt-4 flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-champagne-200 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
        View Story <UIcon name="i-lucide-arrow-right" class="size-3.5" />
      </div>
    </div>
  </NuxtLink>
</template>
