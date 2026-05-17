<script setup lang="ts">
import { siteConfig } from '~/data/site'

const { t } = useI18n()
const localePath = useLocalePath()

const year = new Date().getFullYear()
const nav = computed(() => [
  { label: t('nav.home'), to: localePath('/') },
  { label: t('nav.about'), to: localePath('/about') },
  { label: t('nav.services'), to: localePath('/services') },
  { label: t('nav.portfolio'), to: localePath('/portfolio') },
  { label: t('nav.journal'), to: localePath('/journal') },
  { label: t('nav.contact'), to: localePath('/contact') },
])
</script>

<template>
  <footer class="bg-wine-800 text-champagne-100 mt-24">
    <div class="container-wide py-20 lg:py-24 grid lg:grid-cols-12 gap-12">
      <div class="lg:col-span-5">
        <p class="font-display text-3xl lg:text-4xl text-champagne-300 mb-4 leading-none">
          Lan yeh
        </p>
        <h2 class="font-serif text-3xl lg:text-4xl text-champagne-50 leading-tight">
          {{ $t('brand.name') }}
        </h2>
        <p class="mt-6 text-champagne-200/80 leading-loose max-w-md font-serif">
          {{ $t('brand.tagline') }}
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <a
            v-for="s in siteConfig.socials"
            :key="s.label"
            :href="s.href"
            target="_blank"
            rel="noopener"
            class="grid place-items-center size-11 rounded-full border border-champagne-300/30 text-champagne-200 hover:bg-champagne-100 hover:text-wine-800 transition-all duration-200"
            :aria-label="s.label"
          >
            <UIcon :name="s.icon" class="size-5" />
          </a>
        </div>
      </div>

      <div class="lg:col-span-3">
        <h3 class="font-serif italic text-base text-champagne-300 mb-6">{{ $t('footer.navTitle') }}</h3>
        <ul class="space-y-3 font-serif">
          <li v-for="item in nav" :key="item.to">
            <NuxtLink :to="item.to" class="text-champagne-100/80 hover:text-champagne-50 transition-colors duration-200">
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div class="lg:col-span-4">
        <h3 class="font-serif italic text-base text-champagne-300 mb-6">{{ $t('footer.contactTitle') }}</h3>
        <dl class="space-y-3 text-champagne-100/85 font-serif text-[15px]">
          <div>
            <dt class="font-display text-xl text-champagne-300/80 mb-0.5 leading-none">{{ $t('footer.region') }}</dt>
            <dd>{{ siteConfig.contact.region }}</dd>
          </div>
          <div>
            <dt class="font-display text-xl text-champagne-300/80 mb-0.5 leading-none">Line</dt>
            <dd class="font-display text-xl">
              <a
                :href="siteConfig.contact.lineHref"
                target="_blank"
                rel="noopener"
                class="hover:text-champagne-50 underline-offset-4 hover:underline"
              >{{ siteConfig.contact.line }}</a>
            </dd>
          </div>
          <div>
            <dt class="font-display text-xl text-champagne-300/80 mb-0.5 leading-none">Email</dt>
            <dd class="font-display text-xl">
              <a
                :href="`mailto:${siteConfig.contact.email}`"
                class="hover:text-champagne-50 underline-offset-4 hover:underline"
              >{{ siteConfig.contact.email }}</a>
            </dd>
          </div>
        </dl>
        <UButton
          :to="localePath('/contact')"
          color="secondary"
          variant="solid"
          size="lg"
          class="mt-8"
          trailing-icon="i-lucide-arrow-right"
        >
          {{ $t('cta.bookConsultation') }}
        </UButton>
      </div>
    </div>
    <div class="border-t border-champagne-300/10">
      <div class="container-wide py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-champagne-300/70">
        <p class="font-display text-[16px] leading-none">
          © {{ year }} {{ $t('brand.name') }} ・ {{ $t('footer.rights') }}
        </p>
        <p class="font-display text-[16px] leading-none text-champagne-200/80">
          {{ $t('footer.signature') }}
        </p>
      </div>
    </div>
  </footer>
</template>
