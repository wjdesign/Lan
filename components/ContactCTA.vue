<script setup lang="ts">
import { siteConfig } from '~/data/site'

const localePath = useLocalePath()
</script>

<template>
  <section class="section bg-wine-800 text-champagne-50 relative overflow-hidden">
    <div class="absolute inset-0 opacity-[0.07] pointer-events-none">
      <img
        src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=2000&auto=format&fit=crop&q=70"
        class="size-full object-cover"
        alt=""
      >
    </div>
    <div class="container-narrow relative grid lg:grid-cols-12 gap-12 items-center">
      <div class="lg:col-span-7" v-reveal>
        <p class="eyebrow !text-champagne-300 mb-6">{{ $t('contact.cta.eyebrow') }}</p>
        <h2 class="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
          {{ $t('contact.cta.title') }}<br>
          {{ $t('contact.cta.titleB') }}
        </h2>
        <p class="mt-6 text-champagne-100/85 font-serif leading-loose max-w-lg whitespace-pre-line">
          {{ $t('contact.cta.subtitle') }}
        </p>
      </div>
      <div class="lg:col-span-5 flex flex-col gap-4" v-reveal="{ delay: 120 }">
        <UButton
          :to="localePath('/contact')"
          color="secondary"
          variant="solid"
          size="xl"
          block
          trailing-icon="i-lucide-arrow-right"
        >
          {{ $t('cta.bookOnline') }}
        </UButton>
        <UButton
          :to="siteConfig.contact.lineHref"
          target="_blank"
          variant="outline"
          color="neutral"
          size="xl"
          block
          class="!border-champagne-100/40 !text-champagne-50 hover:!bg-champagne-50/10"
          trailing-icon="i-lucide-message-circle"
        >
          {{ $t('cta.lineInquiry') }}
        </UButton>
        <p class="text-center text-xs text-champagne-300/70 tracking-widest mt-2">
          {{ $t('contact.cta.reply') }}
        </p>
      </div>
    </div>
  </section>
</template>
