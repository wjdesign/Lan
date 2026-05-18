<script setup lang="ts">
const { t, tm, rt, locale } = useI18n()
const localePath = useLocalePath()

interface Slide {
  image: string
  eyebrow: string
  titleTop: string
  titleBottom: string
  excerpt: string
}

const images = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=2200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=2200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=2200&auto=format&fit=crop&q=80',
]

const slides = computed<Slide[]>(() => {
  const data = tm('home.heroSlides') as Array<Record<string, unknown>>
  return (data || []).map((s, i) => ({
    image: images[i] || images[0],
    eyebrow: rt(s.eyebrow as never),
    titleTop: rt(s.titleTop as never),
    titleBottom: rt(s.titleBottom as never),
    excerpt: rt(s.excerpt as never),
  }))
})

const active = ref(0)
const interval = ref<ReturnType<typeof setInterval> | null>(null)

const start = () => {
  interval.value = setInterval(() => {
    active.value = (active.value + 1) % slides.value.length
  }, 6500)
}
const stop = () => {
  if (interval.value) clearInterval(interval.value)
}

onMounted(start)
onBeforeUnmount(stop)

const go = (i: number) => {
  active.value = i
  stop()
  start()
}
</script>

<template>
  <section class="relative -mt-[72px] lg:-mt-[88px] h-[100svh] min-h-[640px] overflow-hidden text-champagne-50">
    <TransitionGroup name="hero" tag="div" class="absolute inset-0">
      <div
        v-for="(slide, i) in slides"
        v-show="active === i"
        :key="slide.image"
        class="absolute inset-0"
      >
        <img
          :src="slide.image"
          :alt="slide.titleTop"
          class="absolute inset-0 size-full object-cover hero-kenburns"
          loading="eager"
          fetchpriority="high"
        >
        <div class="absolute inset-0 bg-gradient-to-b from-wine-900/40 via-wine-900/30 to-wine-900/85" />
      </div>
    </TransitionGroup>

    <!-- pt-28/32 reserves space beneath the fixed header so longer hero
         content (esp. English locale with the larger script subtitle)
         can't crowd the wordmark. justify-end keeps the natural bottom
         anchor on short content. -->
    <div class="relative z-10 h-full flex flex-col justify-end pt-28 lg:pt-36 pb-20 lg:pb-32">
      <div class="container-wide w-full">
        <div class="max-w-3xl">
          <Transition name="hero-text" mode="out-in">
            <div :key="active">
              <p class="eyebrow !text-champagne-200 mb-6">{{ slides[active]?.eyebrow }}</p>
              <h1 class="hero-title font-display leading-[1.1]">
                <span class="block">{{ slides[active]?.titleTop }}</span>
                <span class="block italic text-champagne-200">
                  <em
                    v-if="locale === 'en'"
                    class="script-em text-champagne-200 not-italic"
                  >{{ slides[active]?.titleBottom }}</em>
                  <template v-else>{{ slides[active]?.titleBottom }}</template>
                </span>
              </h1>
              <p class="mt-8 max-w-xl text-champagne-100/90 leading-loose font-serif text-base lg:text-lg">
                {{ slides[active]?.excerpt }}
              </p>
            </div>
          </Transition>
          <div class="mt-10 flex flex-wrap gap-4">
            <UButton :to="localePath('/contact')" size="xl" color="secondary" variant="solid" trailing-icon="i-lucide-arrow-right" :title="t('tooltips.bookCta')">
              {{ t('cta.bookConsultation') }}
            </UButton>
            <NuxtLink
              :to="localePath('/portfolio')"
              :title="t('tooltips.viewWorks')"
              class="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-medium tracking-wider uppercase border border-champagne-50 text-champagne-50 bg-champagne-50/15 backdrop-blur-sm hover:bg-champagne-50 hover:text-wine-800 transition-all duration-200 cursor-pointer"
            >
              {{ t('cta.viewWorks') }}
              <UIcon name="i-lucide-arrow-up-right" class="size-4" />
            </NuxtLink>
          </div>
        </div>

        <div class="mt-16 flex items-center gap-6">
          <button
            v-for="(slide, i) in slides"
            :key="i"
            type="button"
            class="group flex items-center gap-3 cursor-pointer"
            :aria-label="`${i + 1}`"
            :title="t('tooltips.heroSlide')"
            @click="go(i)"
          >
            <span
              :class="[
                'h-px transition-all duration-700',
                active === i ? 'w-16 bg-champagne-50' : 'w-6 bg-champagne-50/40',
              ]"
            />
            <span
              :class="[
                'text-[11px] tracking-[0.35em] uppercase transition-colors',
                active === i ? 'text-champagne-50' : 'text-champagne-50/40',
              ]"
            >0{{ i + 1 }}</span>
          </button>
        </div>
      </div>
    </div>

    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-champagne-200/70 text-[10px] tracking-[0.4em] uppercase">
      <span>{{ t('cta.scroll') }}</span>
      <span class="block w-px h-12 bg-champagne-200/40 animate-pulse" />
    </div>
  </section>
</template>

<style scoped>
.hero-enter-active,
.hero-leave-active {
  transition: opacity 1400ms cubic-bezier(0.22, 1, 0.36, 1);
}
.hero-enter-from,
.hero-leave-to { opacity: 0; }

.hero-text-enter-active,
.hero-text-leave-active {
  transition: opacity 800ms cubic-bezier(0.22, 1, 0.36, 1),
              transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
}
.hero-text-enter-from { opacity: 0; transform: translateY(24px); }
.hero-text-leave-to   { opacity: 0; transform: translateY(-12px); }

@keyframes kenburns {
  0%   { transform: scale(1.08) translate(0, 0); }
  100% { transform: scale(1.16) translate(-1.5%, -1%); }
}
.hero-kenburns {
  animation: kenburns 12s ease-out forwards;
  will-change: transform;
}

/* Fluid hero title size — scales smoothly from 320px → 1440px+ viewports
   without the 8-char Chinese phrases ever wrapping mid-word on mobile. */
.hero-title {
  font-size: clamp(2rem, 9vw, 5.5rem);
  /* Modern browsers: prefer balanced wrapping for short headlines */
  text-wrap: balance;
  word-break: keep-all;       /* don't split inside CJK clauses */
  overflow-wrap: break-word;  /* but allow break between phrases if needed */
}
</style>
