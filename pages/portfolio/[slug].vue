<script setup lang="ts">
import { portfolio } from '~/data/portfolio'

const route = useRoute()
const slug = computed(() => route.params.slug as string)
const work = computed(() => portfolio.find(p => p.slug === slug.value))

if (!work.value) {
  throw createError({ statusCode: 404, statusMessage: '作品不存在', fatal: true })
}

const related = computed(() =>
  portfolio.filter(p => p.slug !== work.value!.slug && p.category === work.value!.category).slice(0, 3),
)

useSeoMeta({
  title: () => `${work.value!.title}｜葉小蘭時尚彩妝・作品集`,
  description: () => work.value!.excerpt,
  ogTitle: () => `${work.value!.title}｜葉小蘭時尚彩妝`,
  ogDescription: () => work.value!.excerpt,
  ogImage: () => work.value!.coverImage,
  twitterCard: 'summary_large_image',
})

const lightbox = ref<string | null>(null)
</script>

<template>
  <div v-if="work">
    <!-- HERO -->
    <section class="relative h-[80svh] min-h-[480px] overflow-hidden bg-wine-900 text-champagne-50">
      <img :src="work.coverImage" :alt="work.title" class="absolute inset-0 size-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-b from-wine-900/30 via-wine-900/40 to-wine-900/90" />
      <div class="relative h-full flex items-end pb-16">
        <div class="container-wide">
          <p class="eyebrow !text-champagne-300 mb-4">{{ work.year }} ・ {{ work.location || '' }}</p>
          <h1 class="font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] max-w-4xl">
            {{ work.title }}
          </h1>
          <p class="mt-6 max-w-2xl text-champagne-100/85 font-serif text-lg">{{ work.excerpt }}</p>
        </div>
      </div>
    </section>

    <!-- STORY + DETAILS -->
    <section class="section">
      <div class="container-wide grid lg:grid-cols-12 gap-12">
        <article class="lg:col-span-7" v-reveal>
          <span class="eyebrow block mb-4">Behind the Lens</span>
          <h2 class="font-display text-3xl lg:text-4xl text-wine-800 leading-tight mb-6">那一天的故事</h2>
          <p class="text-ink-800 font-serif leading-loose">
            {{ work.story || work.excerpt }}
          </p>
        </article>
        <aside class="lg:col-span-5 space-y-6" v-reveal="{ delay: 120 }">
          <dl class="bg-champagne-100/60 p-8 rounded-sm space-y-5">
            <div v-if="work.credits?.photography">
              <dt class="text-xs tracking-widest text-ink-500 uppercase">Photography</dt>
              <dd class="font-serif text-ink-800 mt-1">{{ work.credits.photography }}</dd>
            </div>
            <div v-if="work.credits?.gown">
              <dt class="text-xs tracking-widest text-ink-500 uppercase">Gown</dt>
              <dd class="font-serif text-ink-800 mt-1">{{ work.credits.gown }}</dd>
            </div>
            <div v-if="work.credits?.venue">
              <dt class="text-xs tracking-widest text-ink-500 uppercase">Venue</dt>
              <dd class="font-serif text-ink-800 mt-1">{{ work.credits.venue }}</dd>
            </div>
            <div>
              <dt class="text-xs tracking-widest text-ink-500 uppercase">Year</dt>
              <dd class="font-serif text-ink-800 mt-1">{{ work.year }}</dd>
            </div>
            <div v-if="work.tags?.length">
              <dt class="text-xs tracking-widest text-ink-500 uppercase mb-2">Tags</dt>
              <dd class="flex flex-wrap gap-2">
                <span
                  v-for="t in work.tags"
                  :key="t"
                  class="text-xs font-serif tracking-wider px-3 py-1 bg-white border border-champagne-300 text-ink-700"
                >#{{ t }}</span>
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>

    <!-- GALLERY -->
    <section class="container-wide pb-16 lg:pb-24">
      <div class="grid sm:grid-cols-2 gap-4 lg:gap-6">
        <button
          v-for="(img, i) in work.images"
          :key="i"
          v-reveal="{ delay: i * 80 }"
          type="button"
          class="img-zoom relative aspect-[4/5] overflow-hidden rounded-sm group"
          @click="lightbox = img"
        >
          <img :src="img" :alt="`${work.title} ${i + 1}`" class="absolute inset-0 size-full object-cover" loading="lazy" />
          <span class="absolute inset-0 bg-wine-900/0 group-hover:bg-wine-900/20 transition" />
        </button>
      </div>
    </section>

    <!-- RELATED -->
    <section v-if="related.length" class="section bg-champagne-100/60">
      <div class="container-wide">
        <SectionHeading eyebrow="Related" title="同類別作品" />
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <PortfolioCard v-for="(r, i) in related" :key="r.slug" :work="r" :index="i" />
        </div>
      </div>
    </section>

    <ContactCTA />

    <!-- LIGHTBOX -->
    <Teleport to="body">
      <Transition name="lightbox">
        <div
          v-if="lightbox"
          class="fixed inset-0 z-[200] bg-wine-900/95 backdrop-blur-sm flex items-center justify-center p-4"
          @click="lightbox = null"
        >
          <button
            class="absolute top-6 right-6 text-champagne-100 hover:text-white"
            aria-label="關閉"
            @click="lightbox = null"
          >
            <UIcon name="i-lucide-x" class="size-8" />
          </button>
          <img :src="lightbox" :alt="work.title" class="max-w-full max-h-[90vh] object-contain" />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 300ms ease;
}
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
