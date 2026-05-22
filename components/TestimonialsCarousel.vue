<script setup lang="ts">
import type { Testimonial } from '~/data/testimonials'

const props = defineProps<{ items: Testimonial[] }>()

const track = ref<HTMLElement | null>(null)
const activeIndex = ref(0)
const total = computed(() => props.items.length)

/**
 * Step the carousel by one viewport-width of the scroll track. Snap-points
 * align each card to the left edge, so a single scrollLeft += width feels
 * natural on both touch and mouse.
 */
const step = (delta: number) => {
  if (!track.value) return
  const cardWidth = track.value.firstElementChild?.getBoundingClientRect().width || 320
  track.value.scrollBy({ left: cardWidth * delta, behavior: 'smooth' })
}

const next = () => step(1)
const prev = () => step(-1)

const onScroll = () => {
  if (!track.value) return
  const cardWidth = track.value.firstElementChild?.getBoundingClientRect().width || 320
  activeIndex.value = Math.round(track.value.scrollLeft / cardWidth)
}

const goTo = (i: number) => {
  if (!track.value) return
  const cardWidth = track.value.firstElementChild?.getBoundingClientRect().width || 320
  track.value.scrollTo({ left: cardWidth * i, behavior: 'smooth' })
}

const canPrev = computed(() => activeIndex.value > 0)
const canNext = computed(() => activeIndex.value < total.value - 1)
</script>

<template>
  <div class="relative">
    <div
      ref="track"
      class="testimonials-track flex gap-4 lg:gap-6 overflow-x-auto pb-8 -mx-4 px-4 lg:-mx-6 lg:px-6 snap-x snap-mandatory scroll-smooth"
      @scroll.passive="onScroll"
    >
      <div
        v-for="(t, i) in items"
        :key="t.name + i"
        class="snap-start shrink-0 basis-[85%] sm:basis-[55%] lg:basis-[calc((100%-3rem)/3)]"
      >
        <TestimonialCard :testimonial="t" :index="i" />
      </div>
    </div>

    <!-- Pagination dots -->
    <div class="flex items-center justify-center gap-2 mt-4">
      <button
        v-for="(_, i) in items"
        :key="`dot-${i}`"
        type="button"
        :title="$t('tooltips.heroSlide')"
        :aria-label="`Slide ${i + 1}`"
        class="group flex items-center justify-center size-6 cursor-pointer"
        @click="goTo(i)"
      >
        <span
          :class="[
            'h-1.5 rounded-full transition-all duration-200',
            activeIndex === i ? 'w-8 bg-wine-700' : 'w-1.5 bg-wine-700/30 group-hover:bg-wine-700/50',
          ]"
        />
      </button>
    </div>

    <!-- Prev / Next buttons -->
    <div class="hidden lg:flex absolute -top-16 right-0 gap-2">
      <button
        type="button"
        :disabled="!canPrev"
        :title="$t('cta.viewMore')"
        aria-label="Previous"
        :class="[
          'grid place-items-center size-11 border transition-all duration-200 cursor-pointer',
          canPrev
            ? 'border-wine-700 text-wine-800 hover:bg-wine-800 hover:text-champagne-50'
            : 'border-wine-700/20 text-wine-700/30 cursor-not-allowed',
        ]"
        @click="prev"
      >
        <UIcon name="i-lucide-arrow-left" class="size-4" />
      </button>
      <button
        type="button"
        :disabled="!canNext"
        :title="$t('cta.viewMore')"
        aria-label="Next"
        :class="[
          'grid place-items-center size-11 border transition-all duration-200 cursor-pointer',
          canNext
            ? 'border-wine-700 text-wine-800 hover:bg-wine-800 hover:text-champagne-50'
            : 'border-wine-700/20 text-wine-700/30 cursor-not-allowed',
        ]"
        @click="next"
      >
        <UIcon name="i-lucide-arrow-right" class="size-4" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.testimonials-track {
  scrollbar-width: none;
}
.testimonials-track::-webkit-scrollbar {
  display: none;
}
</style>
