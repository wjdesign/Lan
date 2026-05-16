<script setup lang="ts">
import { services } from '~/data/services'
import { portfolio } from '~/data/portfolio'
import { testimonials } from '~/data/testimonials'
import { siteConfig } from '~/data/site'

useSeoMeta({
  title: '葉小蘭時尚彩妝｜嘉義新娘秘書．二十年資歷的全台預約彩妝師',
  description: '葉小蘭老師駐點嘉義，二十餘年新娘秘書與彩妝資歷。新娘秘書、訂婚造型、晚宴妝、媽媽妝、形象拍攝、彩妝教學一站完整。線上預約諮詢，全台北中南服務。',
  ogTitle: '葉小蘭時尚彩妝｜嘉義新娘秘書',
  ogDescription: '二十年資歷的嘉義新娘秘書，為每一位新娘打造一日多換的造型敘事。',
  ogType: 'website',
  ogImage: '/images/portfolio/1035x350-1.jpg',
  twitterCard: 'summary_large_image',
})

useSchemaOrg([
  defineWebSite({
    name: '葉小蘭時尚彩妝',
    inLanguage: 'zh-Hant',
  }),
  defineWebPage({
    name: '葉小蘭時尚彩妝｜嘉義新娘秘書',
    isPartOf: { '@id': '#website' },
  }),
])

const heroServices = services.slice(0, 4)
const featuredWorks = portfolio.filter(p => p.isReal).slice(0, 6)
const heroTestimonials = testimonials.slice(0, 3)

const stats = [
  { value: '20+', label: '年資歷', sub: 'Years of Craft' },
  { value: '1500+', label: '對新人', sub: 'Brides Styled' },
  { value: '300+', label: '場宴客', sub: 'Banquets Covered' },
  { value: '全台', label: '預約服務', sub: 'Island-wide' },
]
</script>

<template>
  <div>
    <HeroBanner />

    <Marquee :items="['Bridal Couture', '葉小蘭時尚彩妝', 'Since 2002', '駐點嘉義．服務全台', 'Editorial & Evening']" />

    <!-- ── ABOUT INTRO ──────────────────────────── -->
    <section class="section">
      <div class="container-wide grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <div v-reveal class="lg:col-span-5 relative">
          <div class="img-zoom relative aspect-[4/5] overflow-hidden rounded-sm">
            <NuxtImg
              src="/images/about/teacher-lan.jpg"
              alt="葉小蘭 老師"
              class="absolute inset-0 size-full object-cover"
              loading="lazy"
            />
          </div>
          <div class="hidden lg:block absolute -bottom-10 -right-10 w-48 aspect-square bg-wine-800 text-champagne-50 p-6 flex flex-col justify-end rounded-sm">
            <p class="font-display text-4xl leading-none">Since</p>
            <p class="font-display text-6xl leading-none mt-2">2002</p>
            <p class="mt-3 text-xs tracking-[0.3em] uppercase text-champagne-200">嘉義．工作室</p>
          </div>
        </div>
        <div class="lg:col-span-7" v-reveal="{ delay: 120 }">
          <span class="eyebrow mb-4 block">About the Artist</span>
          <h2 class="font-display text-4xl md:text-5xl lg:text-6xl text-wine-800 leading-[1.15]">
            妝是一種儀式<br>
            是讓你<span class="italic text-rose-600">成為自己</span>的時刻
          </h2>
          <div class="mt-8 space-y-5 text-ink-800 font-serif leading-loose text-[15px] lg:text-base max-w-xl">
            <p>
              從 2002 年踏入彩妝這一行，二十多年來經歷過上千位新娘、上百場宴客現場。每一個女孩走進工作室的時候，我看的不是「你想要什麼風格」——而是「你的眼神在哪一刻最像自己」。
            </p>
            <p>
              我相信好的新娘妝，從來不是模板，而是一場深度的對話。從膚色、五官、禮服質地、儀式氛圍、到當天的光線——所有元素都會被仔細安排，讓你成為儀式裡最從容的那個主角。
            </p>
          </div>
          <div class="mt-10 flex flex-wrap gap-4">
            <UButton to="/about" size="lg" color="primary" trailing-icon="i-lucide-arrow-right">
              認識小蘭老師
            </UButton>
            <UButton :to="siteConfig.contact.lineHref" target="_blank" variant="outline" color="primary" size="lg" leading-icon="i-lucide-message-circle">
              LINE 諮詢
            </UButton>
          </div>
        </div>
      </div>
    </section>

    <!-- ── STATS ──────────────────────────── -->
    <section class="container-wide pb-8">
      <StatBar :stats="stats" />
    </section>

    <!-- ── SERVICES ──────────────────────────── -->
    <section class="section bg-champagne-100/60">
      <div class="container-wide">
        <SectionHeading
          eyebrow="Services"
          title="從晨光到燭光 一日從容"
          subtitle="新娘秘書、訂婚／媽媽造型、晚宴妝、形象拍攝、一對一彩妝教學——每一種儀式，都值得一份細膩的工序。"
          align="center"
        />
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <ServiceCard
            v-for="(service, i) in heroServices"
            :key="service.slug"
            :service="service"
            :index="i"
          />
        </div>
        <div class="mt-12 text-center">
          <UButton to="/services" variant="ghost" color="primary" size="lg" trailing-icon="i-lucide-arrow-right">
            查看全部服務
          </UButton>
        </div>
      </div>
    </section>

    <!-- ── PORTFOLIO ──────────────────────────── -->
    <section class="section">
      <div class="container-wide">
        <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16">
          <div v-reveal class="max-w-2xl">
            <span class="eyebrow block mb-4">Portfolio</span>
            <h2 class="font-display text-4xl md:text-5xl lg:text-6xl text-wine-800 leading-tight">
              <span>每一場儀式</span><br>
              <span class="italic">都是獨一無二的</span>
            </h2>
          </div>
          <NuxtLink to="/portfolio" class="inline-flex items-center gap-3 self-start lg:self-end text-sm tracking-[0.35em] uppercase text-wine-700 hover:gap-5 transition-all">
            All Works
            <span class="block w-8 h-px bg-wine-700" />
          </NuxtLink>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <PortfolioCard
            v-for="(work, i) in featuredWorks"
            :key="work.slug"
            :work="work"
            :index="i"
          />
        </div>
      </div>
    </section>

    <!-- ── TESTIMONIALS ──────────────────────────── -->
    <section class="section bg-champagne-100/60">
      <div class="container-wide">
        <SectionHeading
          eyebrow="Voices"
          title="她們說"
          subtitle="每一句回饋都是我繼續做這份工作的理由。"
          align="center"
        />
        <div class="grid lg:grid-cols-3 gap-6 lg:gap-8">
          <TestimonialCard
            v-for="(t, i) in heroTestimonials"
            :key="t.name"
            :testimonial="t"
            :index="i"
          />
        </div>
      </div>
    </section>

    <ContactCTA />
  </div>
</template>
