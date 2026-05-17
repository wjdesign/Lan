<script setup lang="ts">
import { services } from '~/data/services'
import { portfolio } from '~/data/portfolio'
import { testimonials } from '~/data/testimonials'
import { siteConfig } from '~/data/site'

const { t, tm, rt, locale } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('brand.name') + ' ・ ' + t('brand.tagline'),
  description: () => locale.value === 'zh-Hant'
    ? '葉小蘭老師駐點嘉義，二十餘年新娘秘書與彩妝資歷。新娘秘書、訂婚造型、晚宴妝、媽媽妝、形象拍攝、彩妝教學一站完整。線上預約諮詢，全台北中南服務。'
    : t('brand.tagline'),
  ogType: 'website',
  ogImage: '/og-image.png',
  twitterCard: 'summary_large_image',
})

useSchemaOrg([
  defineWebSite({ name: () => t('brand.name'), inLanguage: () => locale.value }),
  defineWebPage(),
])

const heroServices = computed(() => services.slice(0, 4))
const featuredWorks = computed(() => portfolio.filter(p => p.isReal).slice(0, 6))
const heroTestimonials = computed(() => testimonials.slice(0, 3))

const marqueeItems = computed(() =>
  (tm('home.marquee') as unknown[]).map(item => rt(item as never)),
)
const stats = computed(() =>
  (tm('home.stats') as Array<Record<string, unknown>>).map(s => ({
    value: rt(s.value as never),
    label: rt(s.label as never),
    sub: rt(s.sub as never),
  })),
)
</script>

<template>
  <div>
    <HeroBanner />

    <Marquee :items="marqueeItems" />

    <!-- ── ABOUT INTRO ──────────────────────────── -->
    <section class="section">
      <div class="container-wide grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <div v-reveal class="lg:col-span-5 relative">
          <div class="img-zoom relative aspect-[4/5] overflow-hidden rounded-sm">
            <NuxtImg
              src="/images/about/teacher-lan.jpg"
              :alt="$t('brand.name')"
              class="absolute inset-0 size-full object-cover"
              loading="lazy"
            />
          </div>
          <div class="hidden lg:block absolute -bottom-10 -right-10 w-48 aspect-square bg-wine-800 text-champagne-50 p-6 flex flex-col justify-end rounded-sm">
            <p class="font-display text-4xl leading-none">{{ $t('common.since') }}</p>
            <p class="font-display text-6xl leading-none mt-2">2002</p>
            <p class="mt-3 text-xs tracking-[0.3em] uppercase text-champagne-200">{{ $t('common.studio') }}</p>
          </div>
        </div>
        <div class="lg:col-span-7" v-reveal="{ delay: 120 }">
          <span class="eyebrow mb-4 block">{{ $t('home.about.eyebrow') }}</span>
          <h2 class="font-display text-4xl md:text-5xl lg:text-6xl text-wine-800 leading-[1.15]">
            {{ $t('home.about.titleA') }}<br>
            {{ $t('home.about.titleB') }}<span class="italic text-rose-600">{{ $t('home.about.titleC') }}</span>{{ $t('home.about.titleD') }}
          </h2>
          <div class="mt-8 space-y-5 text-ink-800 font-serif leading-loose text-[15px] lg:text-base max-w-xl">
            <p>{{ $t('home.about.p1') }}</p>
            <p>{{ $t('home.about.p2') }}</p>
          </div>
          <div class="mt-10 flex flex-wrap gap-4">
            <UButton :to="localePath('/about')" size="lg" color="primary" trailing-icon="i-lucide-arrow-right">
              {{ $t('home.about.ctaAbout') }}
            </UButton>
            <UButton :to="siteConfig.contact.lineHref" target="_blank" variant="outline" color="primary" size="lg" leading-icon="i-lucide-message-circle">
              {{ $t('cta.lineConsult') }}
            </UButton>
          </div>
        </div>
      </div>
    </section>

    <!-- ── STATS ──────────────────────────── -->
    <section class="container-wide pb-8">
      <StatBar :stats="stats" />
    </section>

    <!-- ── SERVICES ──────────────────────────── -->
    <section class="section bg-champagne-100/60">
      <div class="container-wide">
        <SectionHeading
          :eyebrow="$t('home.services.eyebrow')"
          :title="$t('home.services.title')"
          :subtitle="$t('home.services.subtitle')"
          align="center"
        />
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <ServiceCard
            v-for="(service, i) in heroServices"
            :key="service.slug"
            :service="service"
            :index="i"
          />
        </div>
        <div class="mt-12 text-center">
          <UButton :to="localePath('/services')" variant="ghost" color="primary" size="lg" trailing-icon="i-lucide-arrow-right">
            {{ $t('cta.viewAll') }}
          </UButton>
        </div>
      </div>
    </section>

    <!-- ── PORTFOLIO ──────────────────────────── -->
    <section class="section">
      <div class="container-wide">
        <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16">
          <div v-reveal class="max-w-2xl">
            <span class="eyebrow block mb-4">{{ $t('home.portfolio.eyebrow') }}</span>
            <h2 class="font-display text-4xl md:text-5xl lg:text-6xl text-wine-800 leading-tight">
              <span>{{ $t('home.portfolio.titleA') }}</span><br>
              <span class="italic">{{ $t('home.portfolio.titleB') }}</span>
            </h2>
          </div>
          <NuxtLink :to="localePath('/portfolio')" class="inline-flex items-center gap-3 self-start lg:self-end text-sm tracking-[0.35em] uppercase text-wine-700 hover:gap-5 transition-all">
            {{ $t('cta.allWorks') }}
            <span class="block w-8 h-px bg-wine-700" />
          </NuxtLink>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <PortfolioCard
            v-for="(work, i) in featuredWorks"
            :key="work.slug"
            :work="work"
            :index="i"
          />
        </div>
      </div>
    </section>

    <!-- ── TESTIMONIALS ──────────────────────────── -->
    <section class="section bg-champagne-100/60">
      <div class="container-wide">
        <SectionHeading
          :eyebrow="$t('home.testimonials.eyebrow')"
          :title="$t('home.testimonials.title')"
          :subtitle="$t('home.testimonials.subtitle')"
          align="center"
        />
        <div class="grid lg:grid-cols-3 gap-6 lg:gap-8">
          <TestimonialCard
            v-for="(t, i) in heroTestimonials"
            :key="t.name"
            :testimonial="t"
            :index="i"
          />
        </div>
      </div>
    </section>

    <ContactCTA />
  </div>
</template>
