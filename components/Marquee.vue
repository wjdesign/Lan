<script setup lang="ts">
defineProps<{ items: string[] }>()
</script>

<template>
  <div class="relative overflow-hidden border-y border-wine-800/15 bg-champagne-100/60 py-4">
    <div class="flex whitespace-nowrap animate-marquee gap-12">
      <span
        v-for="(item, i) in [...items, ...items]"
        :key="i"
        class="font-serif text-sm lg:text-base text-wine-800/75 tracking-[0.3em] uppercase flex items-center gap-12"
      >
        {{ item }}
        <span class="size-1 rounded-full bg-rose-400 shrink-0" />
      </span>
    </div>
  </div>
</template>
