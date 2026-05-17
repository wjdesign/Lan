<script setup lang="ts">
import { format, parseISO } from 'date-fns'
import { zhTW, zhCN, enUS, ja } from 'date-fns/locale'

const { t, locale } = useI18n()
const route = useRoute()
const localePath = useLocalePath()

// Resolve to the un-prefixed path used by @nuxt/content (locale prefix isn't part of MD source)
const contentPath = computed(() => {
  const localePrefix = locale.value === 'zh-Hant' ? '' : `/${locale.value}`
  return route.path.startsWith(localePrefix) ? route.path.slice(localePrefix.length) || '/' : route.path
})

const { data: post } = await useAsyncData(contentPath.value, () =>
  queryCollection('journal').path(contentPath.value).first(),
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: '文章不存在', fatal: true })
}

const { data: surround } = await useAsyncData(`${contentPath.value}-surround`, () =>
  queryCollectionItemSurroundings('journal', contentPath.value, { fields: ['title', 'description', 'cover'] })
    .order('date', 'DESC'),
)

useSeoMeta({
  title: () => `${post.value!.title}｜葉小蘭時尚彩妝・日誌`,
  description: () => post.value!.description,
  ogTitle: () => post.value!.title,
  ogDescription: () => post.value!.description,
  ogImage: () => post.value!.cover,
  ogType: 'article',
  articleAuthor: () => [post.value!.author],
  articlePublishedTime: () => post.value!.date,
  articleTag: () => post.value!.tags,
  twitterCard: 'summary_large_image',
})

useSchemaOrg([
  defineArticle({
    headline: () => post.value!.title,
    description: () => post.value!.description,
    image: () => post.value!.cover,
    datePublished: () => post.value!.date,
    author: () => ({ name: post.value!.author }),
    keywords: () => post.value!.tags,
  }),
])

const dateLocale = computed(() => {
  switch (locale.value) {
    case 'zh-Hans': return zhCN
    case 'en': return enUS
    case 'ja': return ja
    default: return zhTW
  }
})

const dateFormat = computed(() => {
  switch (locale.value) {
    case 'en': return 'MMM d, yyyy'
    case 'ja': return 'yyyy 年 M 月 d 日'
    default: return 'yyyy 年 M 月 d 日'
  }
})

const dateLabel = computed(() => {
  if (!post.value) return ''
  try { return format(parseISO(post.value.date), dateFormat.value, { locale: dateLocale.value }) }
  catch { return post.value.date }
})

const prev = computed(() => surround.value?.[0])
const next = computed(() => surround.value?.[1])
</script>

<template>
  <article v-if="post">
    <section class="relative bg-wine-900 text-champagne-50 overflow-hidden">
      <img :src="post.cover" :alt="post.title" class="absolute inset-0 size-full object-cover opacity-50" />
      <div class="absolute inset-0 bg-gradient-to-b from-wine-900/40 to-wine-900/95" />
      <div class="relative container-narrow py-32 lg:py-40 text-center">
        <p class="flex items-center justify-center gap-3 text-xs tracking-[0.3em] uppercase text-champagne-200 mb-6">
          <span>{{ dateLabel }}</span>
          <span class="block w-6 h-px bg-champagne-200" />
          <span>{{ post.category }}</span>
        </p>
        <h1 class="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">{{ post.title }}</h1>
        <p class="mt-6 max-w-2xl mx-auto text-champagne-100/85 font-serif leading-loose">{{ post.description }}</p>
        <div v-if="post.tags?.length" class="mt-8 flex flex-wrap justify-center gap-2">
          <span
            v-for="t in post.tags"
            :key="t"
            class="text-xs font-serif tracking-wider px-3 py-1 border border-champagne-200/40 text-champagne-100"
          >#{{ t }}</span>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container-narrow max-w-3xl">
        <div class="prose-journal">
          <ContentRenderer :value="post" />
        </div>

        <hr class="my-16 border-champagne-300/70">

        <div class="flex items-center justify-between gap-4 text-sm">
          <NuxtLink v-if="prev" :to="localePath(prev.path)" class="group flex-1 max-w-xs">
            <p class="text-xs uppercase tracking-widest text-ink-500 mb-1">{{ $t('journal.prev') }}</p>
            <p class="font-serif text-wine-800 group-hover:text-rose-700 transition-colors duration-200">{{ prev.title }}</p>
          </NuxtLink>
          <NuxtLink v-if="next" :to="localePath(next.path)" class="group flex-1 max-w-xs text-right ml-auto">
            <p class="text-xs uppercase tracking-widest text-ink-500 mb-1">{{ $t('journal.next') }}</p>
            <p class="font-serif text-wine-800 group-hover:text-rose-700 transition-colors duration-200">{{ next.title }}</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <ContactCTA />
  </article>
</template>

<style>
.prose-journal h2 {
  font-family: var(--font-serif);
  font-size: 1.75rem;
  color: var(--color-wine-800);
  margin-top: 3rem;
  margin-bottom: 1.25rem;
  letter-spacing: 0.02em;
}
.prose-journal h3 {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  color: var(--color-wine-700);
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}
.prose-journal p {
  margin: 1rem 0;
  line-height: 2;
  font-family: var(--font-serif);
  color: var(--color-ink-800);
}
.prose-journal ul {
  margin: 1.25rem 0;
  padding-left: 1.25rem;
  list-style: '· ';
}
.prose-journal li {
  margin: 0.5rem 0;
  line-height: 1.9;
  font-family: var(--font-serif);
}
.prose-journal blockquote {
  border-left: 3px solid var(--color-rose-400);
  padding-left: 1.25rem;
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--color-wine-700);
  margin: 1.5rem 0;
}
.prose-journal hr {
  border: 0;
  border-top: 1px solid var(--color-champagne-300);
  margin: 2.5rem 0;
}
.prose-journal strong {
  color: var(--color-wine-800);
  font-weight: 600;
}
</style>
