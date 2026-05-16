<script setup lang="ts">
import { timeline } from '~/data/timeline'
import { siteConfig } from '~/data/site'

useSeoMeta({
  title: '關於小蘭老師｜葉小蘭時尚彩妝・嘉義新娘秘書',
  description: '葉小蘭老師職涯與彩妝理念。二十餘年新娘秘書資歷，駐點嘉義，作品見於全台婚禮與形象拍攝。',
  ogTitle: '關於葉小蘭｜嘉義新娘秘書．二十年資歷',
  ogImage: '/images/about/teacher-lan.jpg',
})

const philosophies = [
  {
    icon: 'i-ph-eye-duotone',
    title: '看見你的特質',
    desc: '不套模板。從膚色、骨架、眼型，到你說話的語速與穿搭風格——讓妝感成為你的延伸而不是面具。',
  },
  {
    icon: 'i-ph-flower-tulip-duotone',
    title: '尊重儀式氛圍',
    desc: '日光教堂、晚宴飯店、家中文定——不同的場合需要不同強度的光感與色彩飽和度。',
  },
  {
    icon: 'i-ph-pencil-line-duotone',
    title: '經得起鏡頭',
    desc: '4K 攝影、長時間錄影、近距離合照——底妝必須兼顧通透與耐看。每一處工序都為了「之後一輩子的相簿」。',
  },
  {
    icon: 'i-ph-heart-duotone',
    title: '陪伴的能力',
    desc: '化妝時是新娘最緊張的時刻。我會在這幾個小時裡，讓你感覺像在和一位老朋友聊天。',
  },
]
</script>

<template>
  <div>
    <!-- HERO -->
    <section class="relative bg-wine-800 text-champagne-50 overflow-hidden">
      <div class="absolute inset-0 opacity-30">
        <NuxtImg
          src="/images/about/teacher-lan.jpg"
          alt=""
          class="size-full object-cover blur-2xl scale-110"
          loading="eager"
        />
      </div>
      <div class="relative container-wide py-28 lg:py-40">
        <p class="eyebrow !text-champagne-300 mb-6" v-reveal>About</p>
        <h1 class="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.05] max-w-4xl" v-reveal="{ delay: 80 }">
          二十年的工序<br>
          <span class="italic text-champagne-200">為的是你最坦率的笑</span>
        </h1>
        <p class="mt-8 max-w-2xl text-champagne-100/85 font-serif leading-loose text-base lg:text-lg" v-reveal="{ delay: 160 }">
          葉小蘭老師——駐點嘉義、服務全台。從新娘秘書到形象彩妝，作品見於台灣各大宴會廳與外景婚禮。
        </p>
      </div>
    </section>

    <!-- PROFILE -->
    <section class="section">
      <div class="container-wide grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        <div v-reveal class="lg:col-span-5">
          <div class="img-zoom relative aspect-[4/5] overflow-hidden rounded-sm bg-champagne-100">
            <NuxtImg
              src="/images/about/teacher-lan.jpg"
              alt="葉小蘭 老師"
              class="absolute inset-0 size-full object-cover"
              loading="lazy"
            />
          </div>
          <div class="mt-6 grid grid-cols-2 gap-4">
            <a
              v-for="s in siteConfig.socials"
              :key="s.label"
              :href="s.href"
              target="_blank"
              rel="noopener"
              class="flex items-center gap-3 p-4 border border-champagne-300/70 hover:border-wine-700 hover:bg-white transition-colors"
            >
              <UIcon :name="s.icon" class="size-5 text-wine-700" />
              <div class="flex flex-col">
                <span class="text-[10px] tracking-widest text-ink-500 uppercase">{{ s.label }}</span>
                <span class="text-sm font-serif text-ink-800">{{ s.handle }}</span>
              </div>
            </a>
          </div>
        </div>

        <div class="lg:col-span-7" v-reveal="{ delay: 120 }">
          <span class="eyebrow mb-4 block">Lan Yeh ・ Founder & Lead Artist</span>
          <h2 class="font-display text-4xl lg:text-5xl text-wine-800 leading-[1.15]">
            從一支眉筆開始的<br>
            二十年工序
          </h2>
          <div class="mt-8 space-y-5 text-ink-800 font-serif leading-loose">
            <p>
              我最初接觸彩妝時，師承一位脾氣很嚴的老師。她讓我練底妝練了整整三個月——她說，新娘最重要的不是眼影顏色，是「皮膚的呼吸感」。這句話我記到今天。
            </p>
            <p>
              從台中入行、最後回到家鄉嘉義成立工作室，我做過上千對新人的造型。在這座城市裡，我看著一個又一個女孩走進大廳、走過紅毯、走進新的人生。每一場，我都記得當天的光、當天的笑、和當天她哭出來的那一瞬間。
            </p>
            <p>
              這份工作的核心，其實不是「化妝」——是「陪伴」。陪你度過儀式前最焦慮的幾個小時、陪你補妝、陪你緊張地確認髮型有沒有歪。<br>
              而當儀式結束，相片洗出來，妳看著鏡頭裡的自己會說——「啊，這就是我。」
            </p>
            <p class="font-display italic text-wine-700 text-xl pt-2">
              — 那一刻，就是我做這份工作的全部意義。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- PHILOSOPHY -->
    <section class="section bg-champagne-100/60">
      <div class="container-wide">
        <SectionHeading
          eyebrow="Philosophy"
          title="工作室的四個信念"
          align="center"
        />
        <div class="grid sm:grid-cols-2 gap-px bg-champagne-300/70 border border-champagne-300/70 rounded-sm overflow-hidden">
          <div
            v-for="(p, i) in philosophies"
            :key="p.title"
            v-reveal="{ delay: i * 100 }"
            class="bg-champagne-50 p-8 lg:p-12 flex gap-6"
          >
            <UIcon :name="p.icon" class="size-10 text-wine-700 shrink-0" />
            <div>
              <h3 class="font-display text-2xl text-wine-800 mb-3">{{ p.title }}</h3>
              <p class="text-ink-700 font-serif leading-loose text-[15px]">{{ p.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TIMELINE -->
    <section class="section">
      <div class="container-wide">
        <SectionHeading
          eyebrow="Timeline"
          title="工作室的軌跡"
          subtitle="二十餘年的旅程，每一年都是新的相遇。"
        />
        <ol class="relative max-w-3xl mx-auto">
          <span aria-hidden="true" class="absolute left-[7.5rem] top-2 bottom-2 w-px bg-champagne-300/80" />
          <li
            v-for="(item, i) in timeline"
            :key="item.year"
            v-reveal="{ delay: i * 80 }"
            class="relative grid grid-cols-[7rem_auto_1fr] gap-6 py-6 first:pt-0"
          >
            <p class="font-display text-3xl text-wine-700 text-right">{{ item.year }}</p>
            <span class="size-3 rounded-full bg-rose-400 mt-3 ring-4 ring-champagne-50" />
            <div>
              <h3 class="font-serif text-xl text-wine-800 mb-2">{{ item.title }}</h3>
              <p class="text-ink-700 leading-loose font-serif text-[15px]">{{ item.description }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <ContactCTA />
  </div>
</template>
