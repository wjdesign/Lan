<script setup lang="ts">
import { timeline } from '~/data/timeline'
import { siteConfig } from '~/data/site'

const { t, tm, rt } = useI18n()

useSeoMeta({
  title: () => t('nav.about') + ' ・ ' + t('brand.name'),
  description: () => t('about.hero.intro'),
  ogTitle: () => t('nav.about') + ' ・ ' + t('brand.name'),
  ogImage: '/images/about/teacher-lan.jpg',
})

const philosophies = computed(() => {
  const items = tm('about.philosophy.items') as Array<Record<string, unknown>>
  const icons = ['i-ph-eye-duotone', 'i-ph-flower-tulip-duotone', 'i-ph-pencil-line-duotone', 'i-ph-heart-duotone']
  return items.map((it, i) => ({
    title: rt(it.title as never),
    desc: rt(it.desc as never),
    icon: icons[i] || icons[0],
  }))
})
</script>

<template>
  <div>
    <!-- HERO -->
    <section class="relative bg-wine-800 text-champagne-50 overflow-hidden">
      <div class="absolute inset-0 opacity-30">
        <NuxtImg
          src="/images/about/teacher-lan.jpg"
          alt=""
          class="size-full object-cover blur-2xl scale-110"
          loading="eager"
        />
      </div>
      <div class="relative container-wide py-28 lg:py-40">
        <p class="eyebrow !text-champagne-300 mb-6" v-reveal>{{ $t('about.hero.eyebrow') }}</p>
        <h1 class="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.05] max-w-4xl" v-reveal="{ delay: 80 }">
          {{ $t('about.hero.titleA') }}<br>
          <span class="italic text-champagne-200">{{ $t('about.hero.titleB') }}</span>
        </h1>
        <p class="mt-8 max-w-2xl text-champagne-100/85 font-serif leading-loose text-base lg:text-lg" v-reveal="{ delay: 160 }">
          {{ $t('about.hero.intro') }}
        </p>
      </div>
    </section>

    <!-- PROFILE -->
    <section class="section">
      <div class="container-wide grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        <div v-reveal class="lg:col-span-5">
          <div class="img-zoom relative aspect-[4/5] overflow-hidden rounded-sm bg-champagne-100">
            <NuxtImg
              src="/images/about/teacher-lan.jpg"
              :alt="$t('brand.name')"
              class="absolute inset-0 size-full object-cover"
              loading="lazy"
            />
          </div>
          <div class="mt-6 grid grid-cols-2 gap-4">
            <a
              v-for="s in siteConfig.socials"
              :key="s.label"
              :href="s.href"
              target="_blank"
              rel="noopener"
              class="flex items-center gap-3 p-4 border border-champagne-300/70 hover:border-wine-700 hover:bg-white transition-colors"
            >
              <UIcon :name="s.icon" class="size-5 text-wine-700" />
              <div class="flex flex-col">
                <span class="text-[10px] tracking-widest text-ink-500 uppercase">{{ s.label }}</span>
                <span class="text-sm font-serif text-ink-800">{{ s.handle }}</span>
              </div>
            </a>
          </div>
        </div>

        <div class="lg:col-span-7" v-reveal="{ delay: 120 }">
          <span class="eyebrow mb-4 block">{{ $t('about.profile.eyebrow') }}</span>
          <h2 class="font-display text-4xl lg:text-5xl text-wine-800 leading-[1.15]">
            {{ $t('about.profile.titleA') }}<br>
            {{ $t('about.profile.titleB') }}
          </h2>
          <div class="mt-8 space-y-5 text-ink-800 font-serif leading-loose">
            <p>{{ $t('about.profile.p1') }}</p>
            <p>{{ $t('about.profile.p2') }}</p>
            <p>{{ $t('about.profile.p3') }}</p>
            <p class="font-display italic text-wine-700 text-xl pt-2">
              {{ $t('about.profile.quote') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- PHILOSOPHY -->
    <section class="section bg-champagne-100/60">
      <div class="container-wide">
        <SectionHeading
          :eyebrow="$t('about.philosophy.eyebrow')"
          :title="$t('about.philosophy.title')"
          align="center"
        />
        <div class="grid sm:grid-cols-2 gap-px bg-champagne-300/70 border border-champagne-300/70 rounded-sm overflow-hidden">
          <div
            v-for="(p, i) in philosophies"
            :key="p.title"
            v-reveal="{ delay: i * 100 }"
            class="bg-champagne-50 p-8 lg:p-12 flex gap-6"
          >
            <UIcon :name="p.icon" class="size-10 text-wine-700 shrink-0" />
            <div>
              <h3 class="font-display text-2xl text-wine-800 mb-3">{{ p.title }}</h3>
              <p class="text-ink-700 font-serif leading-loose text-[15px]">{{ p.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TIMELINE -->
    <section class="section">
      <div class="container-wide">
        <SectionHeading
          :eyebrow="$t('about.timeline.eyebrow')"
          :title="$t('about.timeline.title')"
          :subtitle="$t('about.timeline.subtitle')"
        />
        <ol class="relative max-w-3xl mx-auto">
          <span aria-hidden="true" class="absolute left-[7.5rem] top-2 bottom-2 w-px bg-champagne-300/80" />
          <li
            v-for="(item, i) in timeline"
            :key="item.year"
            v-reveal="{ delay: i * 80 }"
            class="relative grid grid-cols-[7rem_auto_1fr] gap-6 py-6 first:pt-0"
          >
            <p class="font-display text-3xl text-wine-700 text-right">{{ item.year }}</p>
            <span class="size-3 rounded-full bg-rose-400 mt-3 ring-4 ring-champagne-50" />
            <div>
              <h3 class="font-serif text-xl text-wine-800 mb-2">{{ item.title }}</h3>
              <p class="text-ink-700 leading-loose font-serif text-[15px]">{{ item.description }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <ContactCTA />
  </div>
</template>
