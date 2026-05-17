import { fileURLToPath } from 'node:url'

const SITE_URL = process.env.NUXT_PUBLIC_SITE_URL || 'https://wjdesign.github.io'
const GA4_ID = 'G-26E7R738DX'
const GTM_ID = 'GTM-MJR2XMVJ'
const GOOGLE_SITE_VERIFICATION = [
  'gLCAsUu86RoTsFHAsfUVP_D6Gh4p2AbcOBNcEyYFcns',
  'vgDwI3LkxGDTcZPslwNlwDAAzqPANefA0Pf1zkTLz1k',
]

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  ssr: true,

  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxtjs/seo',
    '@nuxtjs/i18n',
    '@vite-pwa/nuxt',
    '@vueuse/nuxt',
  ],

  i18n: {
    vueI18n: './i18n.config.ts',
    strategy: 'prefix_except_default',
    defaultLocale: 'zh-Hant',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'lanyeh_lang',
      redirectOn: 'root',
      fallbackLocale: 'zh-Hant',
    },
    locales: [
      { code: 'zh-Hant', language: 'zh-Hant-TW', name: '繁體中文', file: 'zh-Hant.json', dir: 'ltr' },
      { code: 'zh-Hans', language: 'zh-Hans-CN', name: '简体中文', file: 'zh-Hans.json', dir: 'ltr' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json', dir: 'ltr' },
      { code: 'ja', language: 'ja-JP', name: '日本語', file: 'ja.json', dir: 'ltr' },
    ],
    baseUrl: SITE_URL,
  },

  css: ['~/assets/css/main.css'],

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      htmlAttrs: { lang: 'zh-Hant-TW' },
      title: '葉小蘭時尚彩妝｜嘉義新娘秘書 LAN YEH BRIDAL MAKEUP',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width,initial-scale=1' },
        { name: 'theme-color', content: '#3a1d1f' },
        { name: 'keywords', content: '葉小蘭時尚彩妝,葉小蘭,小蘭老師,嘉義小蘭,嘉義葉小蘭,新娘秘書,新秘,新秘彩妝,嘉義新秘,嘉義新娘秘書,時尚彩妝,新娘造型,白紗造型,晚宴妝,媽媽妝,訂婚造型' },
        { name: 'description', content: '葉小蘭老師駐點嘉義，二十餘年新娘秘書經驗，給全台灣期待獨一無二的新娘最精緻體貼的服務。優雅、靈動、從容——讓你成為自己最想成為的樣子。' },
        ...GOOGLE_SITE_VERIFICATION.map((c) => ({ name: 'google-site-verification', content: c })),
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      ],
      script: [
        {
          // Google Tag Manager
          children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
          tagPosition: 'head',
        },
        {
          // GA4
          src: `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`,
          async: true,
          tagPosition: 'head',
        },
        {
          children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4_ID}');`,
          tagPosition: 'head',
        },
      ],
      noscript: [
        {
          children: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          tagPosition: 'bodyOpen',
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'page', mode: 'out-in' },
  },

  site: {
    url: SITE_URL,
    name: '葉小蘭時尚彩妝',
    description: '嘉義新娘秘書／彩妝師，二十年資歷，為你打造夢中的婚禮造型。',
    defaultLocale: 'zh-Hant',
    indexable: true,
  },

  schemaOrg: {
    identity: {
      type: 'LocalBusiness',
      name: '葉小蘭時尚彩妝',
      alternateName: 'Lan Yeh Bridal Makeup',
      description: '嘉義新娘秘書與彩妝師葉小蘭老師，提供新娘秘書、訂婚／媽媽妝、晚宴妝、形象拍攝、彩妝教學。',
      image: SITE_URL + '/images/about/teacher-lan.jpg',
      logo: SITE_URL + '/favicon.png',
      telephone: '+886-919-168-248',
      email: 'ye168248@gmail.com',
      address: {
        '@type': 'PostalAddress',
        'addressCountry': 'TW',
        'addressRegion': '嘉義市',
        'addressLocality': '嘉義',
      },
      areaServed: [
        { '@type': 'Country', 'name': 'Taiwan' },
        { '@type': 'AdministrativeArea', 'name': '嘉義市' },
        { '@type': 'AdministrativeArea', 'name': '台北市' },
        { '@type': 'AdministrativeArea', 'name': '台中市' },
        { '@type': 'AdministrativeArea', 'name': '台南市' },
        { '@type': 'AdministrativeArea', 'name': '高雄市' },
      ],
      sameAs: [
        'https://www.instagram.com/ye168248/',
        'https://www.facebook.com/ye168248/',
        'https://line.me/R/ti/p/ye168248',
        'https://ye168248.pixnet.net/blog',
      ],
      priceRange: 'NT$ 6,800 – NT$ 30,000+',
      openingHours: 'Mo,Tu,We,Th,Fr,Sa,Su 09:00-21:00',
    },
  },

  sitemap: {
    sources: ['/api/__sitemap__/urls'],
  },

  robots: {
    // We ship a manual public/robots.txt; disable the auto-generator so it
    // doesn't fight us when `site.url` has a base path (GH Pages /Lan/).
    robotsTxt: false,
  },

  ogImage: {
    // Disable dynamic OG renderer (no takumi/sharp installed) — use static fallback per page
    enabled: false,
  },

  pwa: {
    registerType: 'autoUpdate',
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,avif,woff2}'],
      // Each prerendered HTML embeds Tailwind CSS + payload, ~2 MB. Allow up
      // to 3 MB so PWA precache covers them.
      maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
      runtimeCaching: [
        {
          urlPattern: ({ url }) => url.origin === 'https://fonts.gstatic.com',
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts',
            expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
            cacheableResponse: { statuses: [0, 200] },
          },
        },
        {
          urlPattern: ({ url }) => url.origin === 'https://images.unsplash.com',
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'unsplash-images',
            expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 },
          },
        },
      ],
    },
    manifest: {
      name: '葉小蘭時尚彩妝 ・ Lan Yeh Bridal Makeup',
      short_name: '葉小蘭時尚彩妝',
      description: '嘉義新娘秘書．葉小蘭老師．二十年資歷．全台預約服務。',
      lang: 'zh-Hant',
      theme_color: '#3a1d1f',
      background_color: '#fbf7f1',
      display: 'standalone',
      orientation: 'portrait',
      scope: '/',
      start_url: '/',
      categories: ['lifestyle', 'beauty'],
      icons: [
        { src: 'pwa-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
        { src: 'pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
        { src: 'pwa-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    },
    devOptions: { enabled: false },
    client: { installPrompt: true },
  },

  linkChecker: {
    enabled: false, // we have external/dynamic links that fail in CI
  },

  ui: {
    fonts: false,
  },

  fonts: {
    families: [
      // Traditional Chinese (zh-Hant) — default. Keep only weights actually used
      // (each weight × ~80 unicode subsets = many @font-face rules — we cap aggressively).
      { name: 'Noto Serif TC', provider: 'google', weights: [400, 500, 700] },
      { name: 'Noto Sans TC', provider: 'google', weights: [400, 700] },
      // Simplified Chinese (zh-Hans) — switched via :lang(zh-Hans) CSS rule
      // so strokes render with even weight instead of falling back to system fonts.
      { name: 'Noto Serif SC', provider: 'google', weights: [400, 500, 700] },
      { name: 'Noto Sans SC', provider: 'google', weights: [400, 700] },
      // English / Latin
      { name: 'Cormorant Garamond', provider: 'google', weights: [400, 500, 700] },
      // Allura — flowing pen-script used for ALL Latin letters & digits in
      // display / decorative slots (brand mark, hero titles, stats numbers,
      // year markers, footer signature). CJK characters fall through to
      // Noto Serif TC/SC via the font stack.
      { name: 'Allura', provider: 'google', weights: [400] },
    ],
  },

  // Don't inline page-level CSS into the prerendered HTML — with @nuxt/fonts
  // emitting ~2000 @font-face rules across 4 CJK font families, inlining
  // bloats each HTML to 2 MB. Load CSS as separate cacheable files instead;
  // they'll be cached by the SW and reused across navigations.
  features: {
    inlineStyles: false,
  },

  image: {
    format: ['webp', 'avif'],
    quality: 80,
    densities: [1, 2],
    domains: ['images.unsplash.com'],
  },

  content: {
    build: {
      markdown: {
        toc: { depth: 3, searchDepth: 3 },
      },
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/en', '/ja', '/zh-Hans', '/sitemap.xml', '/robots.txt'],
      failOnError: false,
    },
  },

  typescript: {
    strict: true,
    typeCheck: false, // run via `npm run typecheck`
  },

  experimental: {
    payloadExtraction: true,
  },

  alias: {
    '~data': fileURLToPath(new URL('./data', import.meta.url)),
  },
})
