<script setup lang="ts">
import { siteConfig } from '~/data/site'

useSeoMeta({
  title: '預約諮詢｜葉小蘭時尚彩妝・嘉義新娘秘書',
  description: '與葉小蘭老師預約新娘秘書檔期。LINE：ye168248、電話：0919-168-248、IG：@ye168248。線上表單填寫，48 小時內回覆。',
  ogTitle: '預約諮詢｜葉小蘭時尚彩妝',
})

const contactCards = [
  {
    label: 'LINE 官方帳號',
    primary: siteConfig.contact.line,
    secondary: '最快的回覆管道',
    href: siteConfig.contact.lineHref,
    icon: 'i-lucide-message-circle',
    accent: 'bg-[#06C755]',
  },
  {
    label: '電話',
    primary: siteConfig.contact.phone,
    secondary: '09:00 – 21:00',
    href: siteConfig.contact.phoneHref,
    icon: 'i-lucide-phone',
    accent: 'bg-wine-700',
  },
  {
    label: 'Email',
    primary: siteConfig.contact.email,
    secondary: '正式合作 / 媒體洽詢',
    href: `mailto:${siteConfig.contact.email}`,
    icon: 'i-lucide-mail',
    accent: 'bg-champagne-700',
  },
  {
    label: 'Instagram',
    primary: siteConfig.contact.instagram,
    secondary: '最新作品搶先看',
    href: siteConfig.contact.instagramUrl,
    icon: 'i-lucide-instagram',
    accent: 'bg-rose-500',
  },
]
</script>

<template>
  <div>
    <!-- HERO -->
    <section class="bg-champagne-100/60">
      <div class="container-wide py-24 lg:py-32 max-w-4xl">
        <p class="eyebrow mb-6" v-reveal>Booking & Inquiry</p>
        <h1 class="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.05] text-wine-800" v-reveal="{ delay: 80 }">
          當你準備好<br>
          <span class="italic text-rose-600">我們開始一段對話</span>
        </h1>
        <p class="mt-8 text-ink-700 font-serif leading-loose text-base lg:text-lg max-w-2xl" v-reveal="{ delay: 160 }">
          每場儀式都僅接一組新人，請至少提前 4–6 個月預約。<br>
          填寫下方表單，或直接透過 LINE 聯繫——通常 48 小時內回覆。
        </p>
      </div>
    </section>

    <!-- QUICK CONTACT CARDS -->
    <section class="section">
      <div class="container-wide">
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <a
            v-for="(c, i) in contactCards"
            :key="c.label"
            :href="c.href"
            target="_blank"
            rel="noopener"
            v-reveal="{ delay: i * 80 }"
            class="group relative overflow-hidden bg-white border border-champagne-300/70 rounded-sm p-7 transition-all hover:border-wine-700 hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(58,29,31,0.3)]"
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

    <!-- BOOKING FORM + LINE QR -->
    <section class="section bg-champagne-100/60">
      <div class="container-wide grid lg:grid-cols-12 gap-12 items-start">
        <!-- Form embed -->
        <div class="lg:col-span-8" v-reveal>
          <p class="eyebrow mb-4">Online Form</p>
          <h2 class="font-display text-3xl lg:text-4xl text-wine-800 mb-6">線上預約表單</h2>
          <p class="text-ink-700 font-serif leading-loose mb-8 max-w-2xl">
            填寫以下表單後將寄送一封確認信至你提供的 Email；如需即時回覆，建議優先使用 LINE。
          </p>
          <div class="relative bg-white border border-champagne-300/70 rounded-sm overflow-hidden">
            <iframe
              :src="siteConfig.contact.bookingFormUrl"
              loading="lazy"
              class="w-full h-[860px]"
              title="線上預約表單"
            >
              載入中…
            </iframe>
          </div>
          <p class="mt-4 text-sm text-ink-500">
            如表單無法載入，請
            <a :href="siteConfig.contact.bookingFormShare" target="_blank" class="text-wine-700 underline">點此於新分頁開啟</a>。
          </p>
        </div>

        <!-- LINE QR -->
        <aside class="lg:col-span-4 space-y-6 lg:sticky lg:top-28" v-reveal="{ delay: 120 }">
          <div class="bg-white border border-champagne-300/70 rounded-sm p-8 text-center">
            <UIcon name="i-lucide-message-circle" class="size-8 text-[#06C755] mx-auto mb-4" />
            <h3 class="font-serif text-xl text-wine-800">最快的預約方式</h3>
            <p class="mt-2 text-sm text-ink-600">掃描下方 QR Code，或點擊按鈕加我 LINE</p>
            <div class="my-6 p-3 bg-champagne-50 rounded-sm inline-block">
              <img
                :src="siteConfig.contact.lineQrUrl"
                alt="加入 LINE：ye168248"
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
            >
              加入 LINE
            </UButton>
          </div>

          <div class="bg-wine-800 text-champagne-50 p-8 rounded-sm">
            <p class="eyebrow !text-champagne-300 mb-3">Working Hours</p>
            <p class="font-serif text-lg">{{ siteConfig.contact.workingHours }}</p>
            <hr class="my-5 border-champagne-300/30">
            <p class="eyebrow !text-champagne-300 mb-3">Studio</p>
            <p class="font-serif">{{ siteConfig.contact.address }}</p>
            <p class="mt-1 text-sm text-champagne-200/80">確認預約後，將於婚期前 1 個月安排試妝地點。</p>
          </div>
        </aside>
      </div>
    </section>

    <!-- MAP -->
    <section class="bg-wine-800 text-champagne-50">
      <div class="container-wide py-16 lg:py-24 text-center">
        <p class="eyebrow !text-champagne-300 mb-4">Service Area</p>
        <h2 class="font-display text-3xl lg:text-5xl mb-6">駐點嘉義 ・ 全台預約</h2>
        <p class="max-w-xl mx-auto text-champagne-100/85 font-serif leading-loose">
          以嘉義為核心，服務範圍涵蓋台北、台中、台南、高雄、宜蘭、花蓮、海外婚禮。<br>
          外縣市加計交通與住宿，海外婚禮另議。
        </p>
      </div>
    </section>
  </div>
</template>
