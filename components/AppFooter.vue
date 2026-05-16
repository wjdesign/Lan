<script setup lang="ts">
import { siteConfig } from '~/data/site'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-wine-800 text-champagne-100 mt-24">
    <div class="container-wide py-20 lg:py-24 grid lg:grid-cols-12 gap-12">
      <div class="lg:col-span-5">
        <p class="eyebrow !text-champagne-300 mb-6">{{ siteConfig.brand.nameEn }}</p>
        <h2 class="font-display text-4xl lg:text-5xl text-champagne-50 leading-tight">
          {{ siteConfig.brand.nameZh }}
        </h2>
        <p class="mt-6 text-champagne-200/80 leading-loose max-w-md">
          {{ siteConfig.brand.tagline }}。<br>
          自 {{ siteConfig.brand.foundedYear }} 年起駐點嘉義，<br>
          以二十餘年資歷為每位新娘量身打造儀式感。
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <a
            v-for="s in siteConfig.socials"
            :key="s.label"
            :href="s.href"
            target="_blank"
            rel="noopener"
            class="grid place-items-center size-11 rounded-full border border-champagne-300/30 text-champagne-200 hover:bg-champagne-100 hover:text-wine-800 transition-all"
            :aria-label="s.label"
          >
            <UIcon :name="s.icon" class="size-5" />
          </a>
        </div>
      </div>

      <div class="lg:col-span-3">
        <h3 class="text-sm tracking-[0.3em] uppercase text-champagne-300 mb-6">導覽</h3>
        <ul class="space-y-3 font-serif">
          <li v-for="item in siteConfig.navigation" :key="item.to">
            <NuxtLink :to="item.to" class="text-champagne-100/80 hover:text-champagne-50 transition-colors">
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div class="lg:col-span-4">
        <h3 class="text-sm tracking-[0.3em] uppercase text-champagne-300 mb-6">聯絡</h3>
        <dl class="space-y-3 text-champagne-100/85 font-serif text-[15px]">
          <div>
            <dt class="text-champagne-300/70 text-xs tracking-widest mb-0.5">服務區域</dt>
            <dd>{{ siteConfig.contact.region }}</dd>
          </div>
          <div>
            <dt class="text-champagne-300/70 text-xs tracking-widest mb-0.5">LINE</dt>
            <dd>
              <a
                :href="siteConfig.contact.lineHref"
                target="_blank"
                rel="noopener"
                class="hover:text-champagne-50 underline-offset-4 hover:underline"
              >{{ siteConfig.contact.line }}</a>
            </dd>
          </div>
          <div>
            <dt class="text-champagne-300/70 text-xs tracking-widest mb-0.5">Email</dt>
            <dd>
              <a
                :href="`mailto:${siteConfig.contact.email}`"
                class="hover:text-champagne-50 underline-offset-4 hover:underline"
              >{{ siteConfig.contact.email }}</a>
            </dd>
          </div>
        </dl>
        <UButton
          to="/contact"
          color="secondary"
          variant="solid"
          size="lg"
          class="mt-8"
          icon="i-lucide-arrow-right"
          :trailing="true"
        >
          開始預約
        </UButton>
      </div>
    </div>
    <div class="border-t border-champagne-300/10">
      <div class="container-wide py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-champagne-300/60">
        <p>© {{ year }} {{ siteConfig.brand.nameZh }} ・ All rights reserved.</p>
        <p class="tracking-wider">
          Site rebuilt in Nuxt．Designed with quiet luxury.
        </p>
      </div>
    </div>
  </footer>
</template>
