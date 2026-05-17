<script setup lang="ts">
import { services } from '~/data/services'
import { useT } from '~/data/i18n'

const { t, tm, rt } = useI18n()
const tr = useT()

useSeoMeta({
  title: () => t('nav.services') + ' ・ ' + t('brand.name'),
  description: () => t('services.hero.intro'),
  ogImage: '/og-image.png',
})

const flow = computed(() =>
  (tm('services.flow.items') as Array<Record<string, unknown>>).map(f => ({
    step: rt(f.step as never),
    title: rt(f.title as never),
    desc: rt(f.desc as never),
  })),
)
const faq = computed(() =>
  (tm('services.faq.items') as Array<Record<string, unknown>>).map(f => ({
    q: rt(f.q as never),
    a: rt(f.a as never),
  })),
)
</script>

<template>
  <div>
    <section class="relative bg-champagne-100/60 overflow-hidden">
      <div class="container-wide py-24 lg:py-32 max-w-4xl">
        <p class="eyebrow mb-6" v-reveal>{{ $t('services.hero.eyebrow') }}</p>
        <h1 class="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.05] text-wine-800" v-reveal="{ delay: 80 }">
          {{ $t('services.hero.titleA') }}<br>
          <span class="italic text-rose-600">{{ $t('services.hero.titleB') }}</span>
        </h1>
        <i18n-t
          keypath="services.hero.intro"
          tag="p"
          class="mt-8 text-ink-700 font-serif leading-loose text-base lg:text-lg max-w-2xl"
          v-reveal="{ delay: 160 }"
        >
          <template #strong>
            <strong>{{ $t('services.hero.introStrong') }}</strong>
          </template>
        </i18n-t>
      </div>
    </section>

    <!-- SERVICE LIST -->
    <section v-for="(service, i) in services" :id="service.slug" :key="service.slug" class="section">
      <div class="container-wide grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div :class="['lg:col-span-6', i % 2 === 1 ? 'lg:order-2' : '']" v-reveal>
          <div class="img-zoom relative aspect-[5/6] overflow-hidden rounded-sm">
            <img :src="service.image" :alt="tr(service.title)" class="absolute inset-0 size-full object-cover" loading="lazy" />
            <div class="absolute top-6 left-6 size-14 rounded-full bg-champagne-50/90 grid place-items-center">
              <UIcon :name="service.icon" class="size-7 text-wine-800" />
            </div>
          </div>
        </div>
        <div :class="['lg:col-span-6', i % 2 === 1 ? 'lg:order-1' : '']" v-reveal="{ delay: 120 }">
          <p class="eyebrow mb-4">{{ tr(service.subtitle) }}</p>
          <h2 class="font-display text-4xl lg:text-5xl text-wine-800 leading-tight">{{ tr(service.title) }}</h2>
          <p class="mt-6 text-ink-700 font-serif leading-loose">{{ tr(service.description) }}</p>
          <ul class="mt-6 grid sm:grid-cols-2 gap-3">
            <li v-for="h in service.highlights" :key="tr(h)" class="flex items-start gap-2 text-sm text-ink-700">
              <UIcon name="i-ph-check-circle-duotone" class="mt-0.5 size-5 text-rose-500 shrink-0" />
              <span>{{ tr(h) }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- FLOW -->
    <section class="section bg-wine-800 text-champagne-50">
      <div class="container-wide">
        <div class="mb-12 lg:mb-16 max-w-3xl mx-auto text-center">
          <span class="eyebrow !text-champagne-300 block mb-4">{{ $t('services.flow.eyebrow') }}</span>
          <h2 class="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.15] text-champagne-50">
            {{ $t('services.flow.title') }}
          </h2>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-5 gap-px bg-champagne-300/20 border border-champagne-300/20">
          <div
            v-for="(f, i) in flow"
            :key="f.step"
            v-reveal="{ delay: i * 100 }"
            class="bg-wine-800 p-8"
          >
            <p class="font-display text-5xl text-champagne-200/50">{{ f.step }}</p>
            <h3 class="mt-4 font-serif text-xl text-champagne-50">{{ f.title }}</h3>
            <p class="mt-3 text-sm text-champagne-100/85 leading-loose font-serif">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section">
      <div class="container-narrow">
        <SectionHeading
          :eyebrow="$t('services.faq.eyebrow')"
          :title="$t('services.faq.title')"
          align="center"
        />
        <div class="space-y-3">
          <FaqItem
            v-for="(item, i) in faq"
            :key="i"
            v-reveal="{ delay: i * 50 }"
            :question="item.q"
            :answer="item.a"
          />
        </div>
      </div>
    </section>

    <ContactCTA />
  </div>
</template>
