<script setup lang="ts">
import { format, parseISO } from 'date-fns'
import { zhTW } from 'date-fns/locale'

useSeoMeta({
  title: '日誌 ・ Journal｜葉小蘭時尚彩妝',
  description: '彩妝筆記、婚前保養、造型趨勢——葉小蘭老師的工作室日誌。',
  ogTitle: '日誌｜葉小蘭時尚彩妝',
})

const { data: posts } = await useAsyncData('journal-list', () =>
  queryCollection('journal').order('date', 'DESC').all(),
)

const dateLabel = (iso: string) => {
  try { return format(parseISO(iso), 'yyyy.MM.dd', { locale: zhTW }) }
  catch { return iso }
}
</script>

<template>
  <div>
    <section class="bg-champagne-100/60">
      <div class="container-wide py-24 lg:py-32 max-w-4xl">
        <p class="eyebrow mb-6" v-reveal>Journal</p>
        <h1 class="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.05] text-wine-800" v-reveal="{ delay: 80 }">
          工作室日誌
        </h1>
        <p class="mt-8 text-ink-700 font-serif leading-loose text-base lg:text-lg max-w-2xl" v-reveal="{ delay: 160 }">
          彩妝筆記、婚前保養、造型趨勢——把這些年累積的心得，慢慢寫下來。
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
            <NuxtLink :to="post.path" class="block">
              <div class="img-zoom relative aspect-[16/10] overflow-hidden rounded-sm bg-champagne-100 mb-6">
                <img :src="post.cover" :alt="post.title" class="absolute inset-0 size-full object-cover" loading="lazy" />
              </div>
              <p class="flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-ink-500 mb-3">
                <span>{{ dateLabel(post.date) }}</span>
                <span class="block w-4 h-px bg-ink-300" />
                <span class="text-rose-500">{{ post.category }}</span>
                <span v-if="post.readingTime" class="text-ink-500">・ {{ post.readingTime }}</span>
              </p>
              <h2 class="font-display text-2xl lg:text-3xl text-wine-800 leading-tight group-hover:text-rose-700 transition-colors">
                {{ post.title }}
              </h2>
              <p class="mt-3 text-ink-700 font-serif leading-loose line-clamp-2">{{ post.description }}</p>
              <span class="mt-5 inline-flex items-center gap-2 text-sm tracking-[0.3em] uppercase text-wine-700 group-hover:gap-3 transition-all">
                Read More <UIcon name="i-lucide-arrow-right" class="size-4" />
              </span>
            </NuxtLink>
          </article>
        </div>
        <p v-else class="text-center py-20 text-ink-500 font-serif">
          尚無文章發表，敬請期待。
        </p>
      </div>
    </section>
  </div>
</template>
