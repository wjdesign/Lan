<script setup lang="ts">
import { portfolio, portfolioCategories, type PortfolioCategory } from '~/data/portfolio'

useSeoMeta({
  title: '作品集｜葉小蘭時尚彩妝・嘉義新娘秘書作品',
  description: '葉小蘭時尚彩妝歷年作品集：白紗造型、宴客造型、訂婚／文定、媽媽妝、晚宴妝、形象拍攝。每一場儀式都是獨一無二的紀錄。',
  ogTitle: '作品集｜葉小蘭時尚彩妝',
  ogImage: '/images/portfolio/1035x350-1.jpg',
})

const active = ref<PortfolioCategory | 'all'>('all')
const filtered = computed(() =>
  active.value === 'all'
    ? portfolio
    : portfolio.filter(p => p.category === active.value),
)
</script>

<template>
  <div>
    <section class="bg-champagne-100/60">
      <div class="container-wide py-24 lg:py-32 max-w-4xl">
        <p class="eyebrow mb-6" v-reveal>Portfolio</p>
        <h1 class="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.05] text-wine-800" v-reveal="{ delay: 80 }">
          每一場儀式<br>
          <span class="italic text-rose-600">都是值得收藏的故事</span>
        </h1>
        <p class="mt-8 text-ink-700 font-serif leading-loose text-base lg:text-lg max-w-2xl" v-reveal="{ delay: 160 }">
          以下作品橫跨白紗造型、宴客場、訂婚／文定、媽媽妝、晚宴與形象拍攝。
          點擊任一作品，閱讀那場儀式背後的故事。
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container-wide">
        <!-- Category Filter -->
        <div class="flex flex-wrap gap-2 mb-12 lg:mb-16">
          <button
            v-for="cat in portfolioCategories"
            :key="cat.value"
            :class="[
              'px-5 py-2.5 text-sm font-serif tracking-wider border transition-all',
              active === cat.value
                ? 'bg-wine-800 text-champagne-50 border-wine-800'
                : 'text-ink-700 border-champagne-300 hover:border-wine-700 hover:text-wine-800',
            ]"
            @click="active = cat.value"
          >
            {{ cat.label }}
          </button>
        </div>

        <TransitionGroup
          tag="div"
          name="grid"
          class="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
        >
          <PortfolioCard
            v-for="(work, i) in filtered"
            :key="work.slug"
            :work="work"
            :index="i"
          />
        </TransitionGroup>

        <p v-if="!filtered.length" class="text-center py-20 text-ink-500 font-serif">
          此類別目前尚無作品 — 敬請期待。
        </p>
      </div>
    </section>

    <ContactCTA />
  </div>
</template>

<style scoped>
.grid-move,
.grid-enter-active,
.grid-leave-active {
  transition: opacity 500ms ease, transform 500ms ease;
}
.grid-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.grid-leave-to {
  opacity: 0;
  transform: scale(0.98);
}
.grid-leave-active {
  position: absolute;
}
</style>
