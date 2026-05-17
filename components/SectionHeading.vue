<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}>()
</script>

<template>
  <div
    v-reveal
    :class="[
      'mb-12 lg:mb-16 max-w-3xl',
      align === 'center' ? 'mx-auto text-center' : '',
    ]"
  >
    <span v-if="eyebrow" class="eyebrow block mb-4">{{ eyebrow }}</span>
    <h2 class="font-display text-4xl md:text-5xl lg:text-6xl text-wine-800 leading-[1.15]">
      <slot name="title">{{ title }}</slot>
    </h2>
    <p
      v-if="subtitle || $slots.subtitle"
      class="mt-6 text-base lg:text-lg text-ink-700 leading-loose font-serif"
    >
      <slot name="subtitle">{{ subtitle }}</slot>
    </p>
  </div>
</template>
