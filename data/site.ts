export interface SocialLink {
  label: string
  href: string
  icon: string
  handle?: string
}

export const siteConfig = {
  brand: {
    nameZh: '葉小蘭時尚彩妝',
    nameEn: 'LAN YEH BRIDAL MAKEUP',
    tagline: '為每一場儀式 留下最從容的優雅',
    taglineEn: 'Couture bridal makeup, crafted in Chiayi.',
    foundedYear: 2002,
  },
  contact: {
    artistName: '葉小蘭 老師',
    artistTitle: 'Founder & Lead Artist',
    region: '嘉義｜全台預約',
    address: '嘉義市（預約制工作室）',
    phone: '0919-168-248',
    phoneRaw: '0919168248',
    phoneHref: 'tel:+886919168248',
    email: 'ye168248@gmail.com',
    line: 'ye168248',
    lineHref: 'https://line.me/R/ti/p/ye168248',
    lineQrUrl:
      'https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=0&data=https%3A%2F%2Fline.me%2FR%2Fti%2Fp%2Fye168248',
    instagram: '@ye168248',
    instagramUrl: 'https://www.instagram.com/ye168248/',
    facebookUrl: 'https://www.facebook.com/ye168248/',
    pixnetUrl: 'https://ye168248.pixnet.net/blog',
    // Native form submits to Formsubmit.co which forwards to the email below.
    // No third-party account required.
    formspreeEndpoint: 'https://formsubmit.co/ajax/ye168248@gmail.com',
    workingHours: '每日 09:00 – 21:00（LINE / 表單預約優先）',
  },
  socials: <SocialLink[]>[
    { label: 'Instagram', href: 'https://www.instagram.com/ye168248/', handle: '@ye168248', icon: 'i-lucide-instagram' },
    { label: 'Facebook', href: 'https://www.facebook.com/ye168248/', handle: '葉小蘭', icon: 'i-lucide-facebook' },
    { label: 'LINE', href: 'https://line.me/R/ti/p/ye168248', handle: 'ye168248', icon: 'i-lucide-message-circle' },
    { label: 'Pixnet', href: 'https://ye168248.pixnet.net/blog', handle: '部落格', icon: 'i-lucide-book-open' },
  ],
  navigation: [
    { label: '首頁', to: '/' },
    { label: '關於小蘭', to: '/about' },
    { label: '彩妝服務', to: '/services' },
    { label: '作品集', to: '/portfolio' },
    { label: '日誌', to: '/journal' },
    { label: '預約', to: '/contact' },
  ],
} as const

export type SiteConfig = typeof siteConfig
