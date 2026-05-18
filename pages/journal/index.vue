<script setup lang="ts">
import { format, parseISO } from 'date-fns'
import { zhTW, zhCN, enUS, ja } from 'date-fns/locale'

const { t, locale } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('nav.journal') + ' ・ ' + t('brand.name'),
  description: () => t('journal.hero.intro'),
})

const { data: posts } = await useAsyncData('journal-list', () =>
  queryCollection('journal').order('date', 'DESC').all(),
)

const dateLocale = computed(() => {
  switch (locale.value) {
    case 'zh-Hans': return zhCN
    case 'en': return enUS
    case 'ja': return ja
    default: return zhTW
  }
})

const dateLabel = (iso: string) => {
  try { return format(parseISO(iso), 'yyyy.MM.dd', { locale: dateLocale.value }) }
  catch { return iso }
}
</script>

<template>
  <div>
    <section class="bg-champagne-100/60">
      <div class="container-wide py-24 lg:py-32 max-w-4xl">
        <p class="eyebrow mb-6" v-reveal>{{ $t('journal.hero.eyebrow') }}</p>
        <h1 class="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.05] text-wine-800" v-reveal="{ delay: 80 }">
          {{ $t('journal.hero.title') }}
        </h1>
        <p class="mt-8 text-ink-700 font-serif leading-loose text-base lg:text-lg max-w-2xl" v-reveal="{ delay: 160 }">
          {{ $t('journal.hero.intro') }}
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container-wide">
        <div v-if="posts?.length" class="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <article
            v-for="(post, i) in posts"
            :key="post.path"
            v-reveal="{ delay: i * 80 }"
            class="group"
          >
            <NuxtLink :to="localePath(post.path)" class="block">
              <div class="img-zoom relative aspect-[16/10] overflow-hidden bg-champagne-100 mb-6">
                <img :src="useAssetUrl(post.cover)" :alt="post.title" class="absolute inset-0 size-full object-cover" loading="lazy" />
              </div>
              <p class="flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-ink-500 mb-3">
                <span>{{ dateLabel(post.date) }}</span>
                <span class="block w-4 h-px bg-ink-300" />
                <span class="text-rose-500">{{ post.category }}</span>
                <span v-if="post.readingTime" class="text-ink-500">・ {{ post.readingTime }}</span>
              </p>
              <h2 class="font-display text-2xl lg:text-3xl text-wine-800 leading-tight group-hover:text-rose-700 transition-colors duration-200">
                {{ post.title }}
              </h2>
              <p class="mt-3 text-ink-700 font-serif leading-loose line-clamp-2">{{ post.description }}</p>
              <span class="mt-5 inline-flex items-center gap-2 text-sm tracking-[0.3em] uppercase text-wine-700 group-hover:gap-3 transition-all duration-200">
                {{ $t('cta.readMore') }} <UIcon name="i-lucide-arrow-right" class="size-4" />
              </span>
            </NuxtLink>
          </article>
        </div>
        <p v-else class="text-center py-20 text-ink-500 font-serif">
          {{ $t('journal.empty') }}
        </p>
      </div>
    </section>
  </div>
</template>
