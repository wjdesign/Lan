<script setup lang="ts">
import { format, parseISO } from 'date-fns'
import { zhTW } from 'date-fns/locale'
import type { Testimonial } from '~/data/testimonials'

const props = defineProps<{ testimonial: Testimonial, index?: number }>()

const dateLabel = computed(() => {
  try {
    return format(parseISO(props.testimonial.date), 'yyyy 年 M 月', { locale: zhTW })
  }
  catch {
    return props.testimonial.date
  }
})
</script>

<template>
  <figure
    v-reveal="{ delay: (index ?? 0) * 80 }"
    class="relative h-full p-8 lg:p-10 bg-white border border-champagne-200/70 rounded-sm flex flex-col"
  >
    <UIcon name="i-ph-quotes-duotone" class="size-9 text-champagne-400 mb-5" />
    <blockquote class="text-ink-800 font-serif leading-loose flex-1 text-[15px] lg:text-base">
      「{{ testimonial.quote }}」
    </blockquote>
    <figcaption class="mt-6 flex items-center gap-4 pt-6 border-t border-champagne-200/60">
      <img
        v-if="testimonial.avatar"
        :src="testimonial.avatar"
        :alt="testimonial.name"
        class="size-12 rounded-full object-cover"
        loading="lazy"
      >
      <div>
        <p class="font-serif font-medium text-wine-800">{{ testimonial.name }}</p>
        <p class="text-xs text-ink-500 tracking-wider mt-0.5">
          {{ testimonial.role }} ・ {{ dateLabel }}
        </p>
      </div>
    </figcaption>
  </figure>
</template>
