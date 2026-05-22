import { fileURLToPath } from 'node:url'

const SITE_URL = process.env.NUXT_PUBLIC_SITE_URL || 'https://wjdesign.github.io'
const BASE_URL = process.env.NUXT_APP_BASE_URL || '/'
const withBase = (p: string) => (BASE_URL.replace(/\/$/, '') + (p.startsWith('/') ? p : `/${p}`))
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
      // Auto-detect from navigator.languages on first visit, store the chosen
      // locale in a cookie so LocaleSwitcher choices stick across sessions.
      useCookie: true,
      cookieKey: 'lanyeh_lang',
      cookieCrossOrigin: false,
      // 'no prefix' means: on any URL that doesn't have a locale prefix
      // (i.e. served as zh-Hant), redirect a non-zh-Hant device to its
      // preferred locale. Lets a Japanese-locale visitor opening "/about"
      // land directly on "/ja/about" without manual switching.
      redirectOn: 'no prefix',
      alwaysRedirect: false,
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
        { rel: 'icon', type: 'image/x-icon', href: withBase('favicon.ico') },
        { rel: 'icon', type: 'image/png', href: withBase('favicon.png') },
        { rel: 'apple-touch-icon', sizes: '180x180', href: withBase('apple-touch-icon.png') },
      ],
      script: [
        {
          // Skip the opening splash on repeat visits within the same session.
          // Runs before paint, so the splash never flashes for returning users.
          key: 'splash-seen',
          children: `try{var k='lanyeh_splash_seen';if(sessionStorage.getItem(k))document.documentElement.classList.add('splash-seen');else sessionStorage.setItem(k,'1')}catch(e){}`,
          tagPosition: 'head',
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'page', mode: 'out-in' },
  },

  // Build metadata — populated by CI (see .github/workflows/deploy.yml) and
  // printed to the browser console so the live build version is verifiable.
  runtimeConfig: {
    public: {
      buildSha: '',
      buildTime: '',
    },
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
        'https://line.me/R/ti/p/~ye168248',
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
      // Let sitemaps / robots.txt bypass the SPA fallback, otherwise the
      // service worker serves index.html in place of these non-page files.
      navigateFallbackDenylist: [/\.xml/, /\.xsl/, /robots\.txt/],
      // Take over open tabs immediately when a new SW activates, so the
      // i18n lazy-load hashes baked into the JS bundle stay in sync with
      // the hashes on the server. Without these, returning visitors load
      // the OLD JS (from HTTP cache / memory) that asks for OLD i18n hash
      // paths which the new deploy has already overwritten → 404 → every
      // page renders raw i18n keys until a manual hard-refresh.
      skipWaiting: true,
      clientsClaim: true,
      cleanupOutdatedCaches: true,
      // Don't precache audio (3.7 MB is too big to ship in install bundle);
      // the runtimeCaching rule below handles it on first play instead.
      globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,avif,woff2}'],
      globIgnores: ['**/audio/**'],
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
        {
          // Background music — cache after first play, so revisits are silent
          // for offline users too. Range requests are needed for <audio> seeking.
          urlPattern: ({ request }) => request.destination === 'audio',
          handler: 'CacheFirst',
          options: {
            cacheName: 'bg-audio',
            rangeRequests: true,
            expiration: { maxEntries: 4, maxAgeSeconds: 60 * 60 * 24 * 365 },
            cacheableResponse: { statuses: [0, 200] },
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
      // GH Pages serves under /Lan/ — scope and start_url MUST match the
      // baseURL exactly or Chrome silently rejects the install prompt.
      scope: BASE_URL,
      start_url: BASE_URL,
      id: BASE_URL,
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
      // Simplified Chinese (Noto Serif/Sans SC) is intentionally NOT bundled
      // here — it would add ~500 @font-face rules to the global render-blocking
      // CSS for every visitor. It is loaded on demand, only for the zh-Hans
      // locale, via a Google Fonts <link> injected in app.vue.
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
