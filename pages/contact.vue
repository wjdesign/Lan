<script setup lang="ts">
import { siteConfig } from '~/data/site'

const { t } = useI18n()

useSeoMeta({
  title: () => t('nav.contact') + ' ・ ' + t('brand.name'),
  description: () => t('contact.hero.intro'),
})

const contactCards = computed(() => [
  {
    label: t('contact.cards.line.label'),
    primary: siteConfig.contact.line,
    secondary: t('contact.cards.line.sub'),
    href: siteConfig.contact.lineHref,
    icon: 'i-lucide-message-circle',
    accent: 'bg-[#06C755]',
    tip: t('tooltips.lineChat'),
  },
  {
    label: t('contact.cards.phone.label'),
    primary: siteConfig.contact.phone,
    secondary: t('contact.cards.phone.sub'),
    href: siteConfig.contact.phoneHref,
    icon: 'i-lucide-phone',
    accent: 'bg-wine-700',
    tip: t('tooltips.phoneCall'),
  },
  {
    label: t('contact.cards.email.label'),
    primary: siteConfig.contact.email,
    secondary: t('contact.cards.email.sub'),
    href: `mailto:${siteConfig.contact.email}`,
    icon: 'i-lucide-mail',
    accent: 'bg-champagne-700',
    tip: t('tooltips.emailUs'),
  },
  {
    label: t('contact.cards.ig.label'),
    primary: siteConfig.contact.instagram,
    secondary: t('contact.cards.ig.sub'),
    href: siteConfig.contact.instagramUrl,
    icon: 'i-lucide-instagram',
    accent: 'bg-rose-500',
    tip: t('tooltips.instagram'),
  },
])
</script>

<template>
  <div>
    <section class="bg-champagne-100/60">
      <div class="container-wide py-24 lg:py-32 max-w-4xl">
        <p class="eyebrow mb-6" v-reveal>{{ $t('contact.hero.eyebrow') }}</p>
        <h1 class="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.05] text-wine-800" v-reveal="{ delay: 80 }">
          {{ $t('contact.hero.titleA') }}<br>
          <span class="italic text-rose-600">{{ $t('contact.hero.titleB') }}</span>
        </h1>
        <p class="mt-8 text-ink-700 font-serif leading-loose text-base lg:text-lg max-w-2xl" v-reveal="{ delay: 160 }">
          {{ $t('contact.hero.intro') }}
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container-wide">
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <a
            v-for="(c, i) in contactCards"
            :key="c.label"
            :href="c.href"
            target="_blank"
            rel="noopener"
            :title="c.tip"
            v-reveal="{ delay: i * 80 }"
            class="group relative overflow-hidden bg-white border border-champagne-300/70 p-7 transition-all duration-200 hover:border-wine-700 hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(58,29,31,0.3)]"
          >
            <div :class="['size-12 rounded-full grid place-items-center text-white mb-5 transition-transform group-hover:scale-110', c.accent]">
              <UIcon :name="c.icon" class="size-6" />
            </div>
            <p class="text-xs tracking-[0.25em] uppercase text-ink-500">{{ c.label }}</p>
            <p class="mt-1 font-serif text-lg text-wine-800 break-all">{{ c.primary }}</p>
            <p class="mt-2 text-sm text-ink-600">{{ c.secondary }}</p>
          </a>
        </div>
      </div>
    </section>

    <section class="section bg-champagne-100/60">
      <div class="container-wide grid lg:grid-cols-12 gap-12 items-start">
        <div class="lg:col-span-8" v-reveal>
          <p class="eyebrow mb-4">{{ $t('contact.form.eyebrow') }}</p>
          <h2 class="font-display text-3xl lg:text-4xl text-wine-800 mb-6">{{ $t('contact.form.title') }}</h2>
          <p class="text-ink-700 font-serif leading-loose mb-8 max-w-2xl">
            {{ $t('contact.form.intro') }}
          </p>
          <div class="bg-white border border-champagne-300/70 p-6 lg:p-10">
            <BookingForm />
          </div>
        </div>

        <aside class="lg:col-span-4 space-y-6 lg:sticky lg:top-28" v-reveal="{ delay: 120 }">
          <div class="bg-white border border-champagne-300/70 p-8 text-center">
            <UIcon name="i-lucide-message-circle" class="size-8 text-[#06C755] mx-auto mb-4" />
            <h3 class="font-serif text-xl text-wine-800">{{ $t('contact.qr.title') }}</h3>
            <p class="mt-2 text-sm text-ink-600">{{ $t('contact.qr.intro') }}</p>
            <div class="my-6 p-3 bg-champagne-50 inline-block">
              <img
                :src="siteConfig.contact.lineQrUrl"
                alt="LINE QR Code"
                class="size-48 mx-auto"
                width="192"
                height="192"
              />
            </div>
            <p class="font-display text-lg text-wine-800 tracking-wider mb-4">{{ siteConfig.contact.line }}</p>
            <UButton
              :to="siteConfig.contact.lineHref"
              target="_blank"
              color="primary"
              size="lg"
              block
              trailing-icon="i-lucide-arrow-up-right"
              :title="$t('tooltips.addLine')"
            >
              {{ $t('contact.qr.addLine') }}
            </UButton>
          </div>

          <div class="bg-wine-800 text-champagne-50 p-8">
            <p class="eyebrow !text-champagne-300 mb-3">{{ $t('contact.hours.label') }}</p>
            <p class="font-serif text-lg">{{ siteConfig.contact.workingHours }}</p>
            <hr class="my-5 border-champagne-300/30">
            <p class="eyebrow !text-champagne-300 mb-3">{{ $t('contact.hours.studioLabel') }}</p>
            <p class="font-serif">{{ siteConfig.contact.address }}</p>
            <p class="mt-1 text-sm text-champagne-200/80">{{ $t('contact.hours.studioNote') }}</p>
          </div>
        </aside>
      </div>
    </section>

    <section class="bg-wine-800 text-champagne-50">
      <div class="container-wide py-16 lg:py-24 text-center">
        <p class="eyebrow !text-champagne-300 mb-4">{{ $t('contact.area.eyebrow') }}</p>
        <h2 class="font-display text-3xl lg:text-5xl mb-6">{{ $t('contact.area.title') }}</h2>
        <p class="max-w-xl mx-auto text-champagne-100/85 font-serif leading-loose">
          {{ $t('contact.area.intro') }}
        </p>
      </div>
    </section>
  </div>
</template>
