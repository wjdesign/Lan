<script setup lang="ts">
defineProps<{ items: string[] }>()
</script>

<template>
  <div class="relative overflow-hidden border-y border-wine-800/15 bg-champagne-100/60 py-6">
    <div class="flex whitespace-nowrap animate-marquee gap-16">
      <span
        v-for="(item, i) in [...items, ...items]"
        :key="i"
        class="font-display text-2xl lg:text-3xl text-wine-800/80 tracking-[0.2em] uppercase flex items-center gap-16"
      >
        {{ item }}
        <span class="size-1.5 rounded-full bg-rose-400 shrink-0" />
      </span>
    </div>
  </div>
</template>
