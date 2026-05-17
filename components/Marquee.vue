<script setup lang="ts">
defineProps<{ items: string[] }>()
</script>

<template>
  <div class="relative overflow-hidden border-y border-wine-800/15 bg-champagne-100/60">
    <div class="flex whitespace-nowrap animate-marquee gap-12 py-4 leading-none">
      <span
        v-for="(item, i) in [...items, ...items]"
        :key="i"
        class="marquee-item inline-flex items-center gap-12 text-wine-800/75 tracking-[0.3em] uppercase"
      >
        {{ item }}
        <span class="size-1 rounded-full bg-rose-400 shrink-0" />
      </span>
    </div>
  </div>
</template>

<style scoped>
/* Render marquee text in a Latin serif explicitly (not the global font-serif
   variable, which resolves to Noto Serif TC first — its Latin glyphs and the
   @nuxt/fonts metric-adjusted fallback give the row an inflated line-box).
   We also pin line-height/font-size to keep the marquee row a fixed visual
   height in every locale, including the Allura-leaning English content. */
.marquee-item {
  font-family: 'Cormorant Garamond', 'Noto Serif TC', 'Songti TC', serif;
  font-size: 0.95rem;
  line-height: 1;
  font-feature-settings: 'kern' 1;
}
@media (min-width: 1024px) {
  .marquee-item {
    font-size: 1rem;
  }
}
</style>
