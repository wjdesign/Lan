<script setup lang="ts">
import { services } from '~/data/services'

useSeoMeta({
  title: '彩妝服務｜新娘秘書／訂婚／晚宴／媽媽妝／彩妝教學・葉小蘭時尚彩妝',
  description: '完整服務項目與費用方案：新娘秘書（單妝／雙妝／三妝）、訂婚造型、媽媽妝、晚宴派對造型、形象拍攝、一對一彩妝教學。嘉義新娘秘書葉小蘭老師。',
  ogTitle: '彩妝服務｜葉小蘭時尚彩妝',
  ogImage: '/images/portfolio/1035x350-1.jpg',
})

const flow = [
  { step: '01', title: '線上諮詢', desc: '透過 LINE 或表單聯絡，提供婚期、場地、預估造型套數，確認檔期。' },
  { step: '02', title: '訂金保留', desc: '收訂金 30%（轉帳或現金）後，正式為你保留專屬日期，並提供風格問卷。' },
  { step: '03', title: '試妝 / 造型討論', desc: '婚期前一個月安排試妝，依禮服風格、宴客場地光線、肌膚狀況討論妝感方向。' },
  { step: '04', title: '婚禮當日', desc: '依約定時間到府或到飯店，全日跟妝、補妝補髮、配合儀式時間軸調整造型。' },
  { step: '05', title: '婚後關懷', desc: '婚禮結束後追蹤新娘心得與感受，建立長期關係，歡迎日後晚宴或週年紀念再合作。' },
]

const faq = [
  { q: '檔期通常需要多久前預約？', a: '建議至少 4–6 個月，旺季（春、秋季）甚至要預留半年以上。我們一日僅接一組新人，先到先保留。' },
  { q: '可以離鄉、外縣市服務嗎？', a: '可以。基於嘉義工作室，全台北中南皆可服務，外縣市加計交通與住宿費用。' },
  { q: '需要先試妝嗎？費用多少？', a: '建議試妝。試妝費 NT$ 1,800（若後續確認預約並支付訂金，可全額折抵）。' },
  { q: '訂金退款規則？', a: '訂金原則上不予退還。若需更改日期，於婚期 2 個月前可一次更改，視新檔期是否可調整。' },
  { q: '會搭配捧花、頭飾、配件嗎？', a: '工作室提供基本頭飾、皇冠、髮飾、耳環租借，捧花可代訂或自行準備。' },
  { q: '海外婚禮有接嗎？', a: '可。曾服務過日本、峇里島、沖繩等地海外婚禮，需提前 6 個月以上規劃。' },
]
</script>

<template>
  <div>
    <section class="relative bg-champagne-100/60 overflow-hidden">
      <div class="container-wide py-24 lg:py-32 max-w-4xl">
        <p class="eyebrow mb-6" v-reveal>Services & Pricing</p>
        <h1 class="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.05] text-wine-800" v-reveal="{ delay: 80 }">
          每一場儀式<br>
          <span class="italic text-rose-600">都值得專屬的工序</span>
        </h1>
        <p class="mt-8 text-ink-700 font-serif leading-loose text-base lg:text-lg max-w-2xl" v-reveal="{ delay: 160 }">
          從新娘秘書到晚宴形象、從一對一教學到外景婚禮——以下是工作室主要的六大服務項目，搭配方案僅供參考，實際依場次與需求客製報價。
        </p>
      </div>
    </section>

    <!-- SERVICE LIST -->
    <section v-for="(service, i) in services" :id="service.slug" :key="service.slug" class="section">
      <div class="container-wide grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div :class="['lg:col-span-6', i % 2 === 1 ? 'lg:order-2' : '']" v-reveal>
          <div class="img-zoom relative aspect-[5/6] overflow-hidden rounded-sm">
            <img :src="service.image" :alt="service.title" class="absolute inset-0 size-full object-cover" loading="lazy" />
            <div class="absolute top-6 left-6 size-14 rounded-full bg-champagne-50/90 grid place-items-center">
              <UIcon :name="service.icon" class="size-7 text-wine-800" />
            </div>
          </div>
        </div>
        <div :class="['lg:col-span-6', i % 2 === 1 ? 'lg:order-1' : '']" v-reveal="{ delay: 120 }">
          <p class="eyebrow mb-4">{{ service.subtitle }}</p>
          <h2 class="font-display text-4xl lg:text-5xl text-wine-800 leading-tight">{{ service.title }}</h2>
          <p class="mt-6 text-ink-700 font-serif leading-loose">{{ service.description }}</p>
          <ul class="mt-6 grid sm:grid-cols-2 gap-3">
            <li v-for="h in service.highlights" :key="h" class="flex items-start gap-2 text-sm text-ink-700">
              <UIcon name="i-ph-check-circle-duotone" class="mt-0.5 size-5 text-rose-500 shrink-0" />
              <span>{{ h }}</span>
            </li>
          </ul>

          <!-- packages -->
          <div v-if="service.packages" class="mt-8 space-y-4">
            <div
              v-for="pkg in service.packages"
              :key="pkg.name"
              :class="[
                'relative p-6 border rounded-sm',
                pkg.popular ? 'border-rose-500/70 bg-rose-50/40' : 'border-champagne-300/70 bg-white',
              ]"
            >
              <span
                v-if="pkg.popular"
                class="absolute -top-2.5 right-4 bg-rose-500 text-white text-[10px] tracking-[0.3em] px-3 py-1 uppercase rounded-sm"
              >Most Loved</span>
              <div class="flex items-baseline justify-between gap-3 flex-wrap">
                <h3 class="font-serif text-xl text-wine-800">{{ pkg.name }}</h3>
                <p class="font-display text-2xl text-rose-600">{{ pkg.price }}</p>
              </div>
              <p class="mt-2 text-sm text-ink-700 font-serif">{{ pkg.description }}</p>
              <ul class="mt-4 grid sm:grid-cols-2 gap-2 text-sm text-ink-700">
                <li v-for="inc in pkg.includes" :key="inc" class="flex gap-2">
                  <span class="text-rose-400">·</span><span>{{ inc }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FLOW -->
    <section class="section bg-wine-800 text-champagne-50">
      <div class="container-wide">
        <SectionHeading
          eyebrow="Booking Flow"
          title="預約流程"
          align="center"
        >
          <template #title>
            <span class="text-champagne-50">預約流程</span>
          </template>
        </SectionHeading>
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
          eyebrow="FAQ"
          title="常見問答"
          align="center"
        />
        <div class="space-y-3">
          <details
            v-for="(item, i) in faq"
            :key="i"
            v-reveal="{ delay: i * 50 }"
            class="group bg-white border border-champagne-300/60 rounded-sm px-6 py-5 transition-colors hover:border-rose-300"
          >
            <summary class="flex items-center justify-between gap-4 cursor-pointer list-none">
              <span class="font-serif text-lg text-wine-800">{{ item.q }}</span>
              <UIcon name="i-lucide-plus" class="size-5 text-rose-500 transition-transform group-open:rotate-45" />
            </summary>
            <p class="mt-4 text-ink-700 font-serif leading-loose">{{ item.a }}</p>
          </details>
        </div>
      </div>
    </section>

    <ContactCTA />
  </div>
</template>
