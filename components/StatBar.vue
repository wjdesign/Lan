<script setup lang="ts">
interface Stat { value: string, label: string, sub?: string }

defineProps<{ stats: Stat[] }>()
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 divide-x divide-champagne-300/50 border-y border-champagne-300/50">
    <div
      v-for="(s, i) in stats"
      :key="s.label"
      v-reveal="{ delay: i * 120 }"
      class="py-10 lg:py-14 px-6 text-center"
    >
      <p class="font-display text-5xl lg:text-6xl text-wine-800">{{ s.value }}</p>
      <p class="mt-3 text-sm tracking-[0.2em] text-ink-700 font-serif">{{ s.label }}</p>
      <p v-if="s.sub" class="mt-1 text-xs text-ink-500">{{ s.sub }}</p>
    </div>
  </div>
</template>
